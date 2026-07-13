'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/* Brand palette (Lookupp) as normalized RGB */
const PALETTE = [
  [0.067, 0.427, 1.0], // #116DFF bright blue
  [0.188, 0.333, 0.812], // #3055CF royal blue
  [0.42, 0.62, 1.0], // lighter blue
  [0.55, 0.5, 0.95], // soft indigo (brand-derived)
]
const pick = (a) => a[Math.floor(Math.random() * a.length)]

export default function ConnectionBackground() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    /* ---------- device / accessibility profiling ---------- */
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const cores = navigator.hardwareConcurrency || 8
    const mem = navigator.deviceMemory || 8
    const lowPerf = cores <= 4 || mem <= 4
    const isMobile = window.innerWidth < 768

    let count = 130
    if (isMobile) count = 62
    if (lowPerf) count = Math.min(count, 55)

    const connectDist = isMobile ? 110 : 150
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2)
    const interactive = !lowPerf && !reduceMotion
    const maxLines = count * 8

    /* ---------- renderer / scene / camera ---------- */
    let W = window.innerWidth
    let H = window.innerHeight

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(dpr)
    renderer.setSize(W, H)
    renderer.setClearColor(0x000000, 0)
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-W / 2, W / 2, H / 2, -H / 2, -1000, 1000)
    camera.position.z = 10

    /* ---------- simulation state ---------- */
    const bx = new Float32Array(count)
    const by = new Float32Array(count)
    const vx = new Float32Array(count)
    const vy = new Float32Array(count)
    const dx = new Float32Array(count)
    const dy = new Float32Array(count)
    const nodeSize = new Float32Array(count)
    const layer = new Float32Array(count)
    const col = new Float32Array(count * 3)
    const rx = new Float32Array(count)
    const ry = new Float32Array(count)
    const hMask = new Float32Array(count)
    const htx = new Float32Array(count)
    const hty = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      bx[i] = (Math.random() - 0.5) * W
      by[i] = (Math.random() - 0.5) * H
      const sp = 8 + Math.random() * 14
      const ang = Math.random() * Math.PI * 2
      vx[i] = Math.cos(ang) * sp
      vy[i] = Math.sin(ang) * sp
      layer[i] = Math.random()
      nodeSize[i] = (26 + Math.random() * 46) * (0.7 + layer[i] * 0.6)
      const c = pick(PALETTE)
      col[i * 3] = c[0]
      col[i * 3 + 1] = c[1]
      col[i * 3 + 2] = c[2]
    }

    const state = {
      hearting: false,
      hStart: 0,
      lastActivity: performance.now(),
      cursor: { x: 9999, y: 9999, active: false },
      scrollY: 0,
    }

    /* ---------- node points ---------- */
    const nodeGeo = new THREE.BufferGeometry()
    nodeGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(count * 3), 3))
    const aSize = new THREE.BufferAttribute(new Float32Array(count), 1)
    for (let i = 0; i < count; i++) aSize.array[i] = nodeSize[i]
    nodeGeo.setAttribute('aSize', aSize)
    nodeGeo.setAttribute('aColor', new THREE.BufferAttribute(col, 3))
    nodeGeo.setAttribute('aAlpha', new THREE.BufferAttribute(new Float32Array(count).fill(0.85), 1))

    const nodeMat = new THREE.ShaderMaterial({
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: THREE.NormalBlending,
      uniforms: { uOpacity: { value: 0.9 }, uDpr: { value: dpr } },
      vertexShader: `
        attribute float aSize;
        attribute vec3 aColor;
        attribute float aAlpha;
        varying vec3 vColor;
        varying float vAlpha;
        uniform float uDpr;
        void main() {
          vColor = aColor;
          vAlpha = aAlpha;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * uDpr;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        uniform float uOpacity;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float halo = smoothstep(0.5, 0.0, d);
          float core = smoothstep(0.26, 0.0, d);
          float a = (halo * 0.30 + core * 0.9) * vAlpha * uOpacity;
          gl_FragColor = vec4(vColor + core * 0.12, a);
        }
      `,
    })
    const nodePoints = new THREE.Points(nodeGeo, nodeMat)
    nodePoints.frustumCulled = false
    scene.add(nodePoints)

    /* ---------- connection lines ---------- */
    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(maxLines * 2 * 3), 3))
    lineGeo.setAttribute('aAlpha', new THREE.BufferAttribute(new Float32Array(maxLines * 2), 1))
    lineGeo.setDrawRange(0, 0)

    const lineMat = new THREE.ShaderMaterial({
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: THREE.NormalBlending,
      uniforms: { uOpacity: { value: 0.5 }, uColor: { value: new THREE.Color(0.13, 0.45, 1.0) } },
      vertexShader: `
        attribute float aAlpha;
        varying float vAlpha;
        void main() {
          vAlpha = aAlpha;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying float vAlpha;
        uniform vec3 uColor;
        uniform float uOpacity;
        void main() {
          gl_FragColor = vec4(uColor, vAlpha * uOpacity);
        }
      `,
    })
    const lineSegments = new THREE.LineSegments(lineGeo, lineMat)
    lineSegments.frustumCulled = false
    scene.add(lineSegments)

    /* ---------- interaction listeners ---------- */
    const markActive = () => { state.lastActivity = performance.now() }
    const onMove = (e) => {
      state.cursor.x = e.clientX - W / 2
      state.cursor.y = -(e.clientY - H / 2)
      state.cursor.active = true
      markActive()
    }
    const onLeave = () => { state.cursor.active = false }
    const onScroll = () => { state.scrollY = window.scrollY || 0; markActive() }
    const onKey = () => markActive()
    const onResize = () => {
      W = window.innerWidth
      H = window.innerHeight
      renderer.setSize(W, H)
      camera.left = -W / 2; camera.right = W / 2; camera.top = H / 2; camera.bottom = -H / 2
      camera.updateProjectionMatrix()
    }
    if (interactive) {
      window.addEventListener('pointermove', onMove, { passive: true })
      window.addEventListener('pointerdown', onMove, { passive: true })
      window.addEventListener('pointerleave', onLeave)
      window.addEventListener('keydown', onKey)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)

    const triggerHeart = () => {
      const idx = []
      for (let i = 0; i < count; i++) idx.push(i)
      idx.sort((a, b) => (bx[a] * bx[a] + by[a] * by[a]) - (bx[b] * bx[b] + by[b] * by[b]))
      const K = Math.min(46, count)
      const chosen = idx.slice(0, K)
      chosen.sort((a, b) => Math.atan2(by[a], bx[a]) - Math.atan2(by[b], bx[b]))
      const scale = Math.min(W, H) * 0.019
      hMask.fill(0)
      for (let k = 0; k < K; k++) {
        const t = (k / K) * Math.PI * 2
        const hx = 16 * Math.pow(Math.sin(t), 3)
        const hy = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)
        const n = chosen[k]
        htx[n] = hx * scale
        hty[n] = hy * scale
        hMask[n] = 1
      }
      state.hearting = true
      state.hStart = performance.now()
    }

    /* ---------- animation loop ---------- */
    let raf
    let last = performance.now()

    const step = () => {
      raf = requestAnimationFrame(step)
      if (document.hidden) { last = performance.now(); return }

      const now = performance.now()
      let dt = (now - last) / 1000
      last = now
      if (dt > 0.05) dt = 0.05

      const halfW = W / 2, halfH = H / 2
      const CD = connectDist
      const CD2 = CD * CD
      const CR = 150
      const CR2 = CR * CR

      let hEnv = 0
      if (interactive && !state.hearting && now - state.lastActivity > 8000) {
        triggerHeart()
        state.lastActivity = now
      }
      if (state.hearting) {
        const e = (now - state.hStart) / 1000
        const total = 3.8
        if (e >= total) { state.hearting = false; state.lastActivity = now }
        else {
          if (e < 0.9) hEnv = e / 0.9
          else if (e > total - 0.9) hEnv = Math.max(0, (total - e) / 0.9)
          else hEnv = 1
          hEnv = hEnv * hEnv * (3 - 2 * hEnv)
        }
      }

      const parr = nodeGeo.attributes.position.array
      for (let i = 0; i < count; i++) {
        if (!reduceMotion) {
          vx[i] += (Math.random() - 0.5) * 6 * dt
          vy[i] += (Math.random() - 0.5) * 6 * dt
          const sp = Math.hypot(vx[i], vy[i])
          if (sp > 26) { vx[i] *= 26 / sp; vy[i] *= 26 / sp }
          bx[i] += vx[i] * dt
          by[i] += vy[i] * dt
          if (bx[i] < -halfW) { bx[i] = -halfW; vx[i] *= -1 }
          else if (bx[i] > halfW) { bx[i] = halfW; vx[i] *= -1 }
          if (by[i] < -halfH) { by[i] = -halfH; vy[i] *= -1 }
          else if (by[i] > halfH) { by[i] = halfH; vy[i] *= -1 }
          dx[i] *= 0.9
          dy[i] *= 0.9
        }

        const par = -state.scrollY * (0.015 + layer[i] * 0.05)
        let py = by[i] + par
        py = ((py + halfH) % H + H) % H - halfH

        let x = bx[i] + dx[i]
        let y = py + dy[i]

        if (interactive && !reduceMotion && state.cursor.active) {
          const ddx = x - state.cursor.x
          const ddy = y - state.cursor.y
          const d2 = ddx * ddx + ddy * ddy
          if (d2 < CR2 && d2 > 0.01) {
            const d = Math.sqrt(d2)
            const force = (1 - d / CR) * 30 * dt
            dx[i] += (ddx / d) * force
            dy[i] += (ddy / d) * force
          }
        }

        if (state.hearting && hMask[i] > 0 && hEnv > 0) {
          x = x * (1 - hEnv) + htx[i] * hEnv
          y = y * (1 - hEnv) + hty[i] * hEnv
        }

        rx[i] = x
        ry[i] = y
        parr[i * 3] = x
        parr[i * 3 + 1] = y
        parr[i * 3 + 2] = 0
      }
      nodeGeo.attributes.position.needsUpdate = true

      const lpos = lineGeo.attributes.position.array
      const lalpha = lineGeo.attributes.aAlpha.array
      let li = 0
      for (let i = 0; i < count; i++) {
        const xi = rx[i], yi = ry[i]
        for (let j = i + 1; j < count; j++) {
          const ddx = xi - rx[j]
          const ddy = yi - ry[j]
          const d2 = ddx * ddx + ddy * ddy
          if (d2 < CD2) {
            const t = 1 - Math.sqrt(d2) / CD
            let a = t * t
            if (state.hearting) a = Math.max(a, hEnv * 0.6 * (hMask[i] * hMask[j]))
            const o = li * 6
            lpos[o] = xi; lpos[o + 1] = yi; lpos[o + 2] = 0
            lpos[o + 3] = rx[j]; lpos[o + 4] = ry[j]; lpos[o + 5] = 0
            lalpha[li * 2] = a
            lalpha[li * 2 + 1] = a
            li++
            if (li >= maxLines) break
          }
        }
        if (li >= maxLines) break
      }
      lineGeo.attributes.position.needsUpdate = true
      lineGeo.attributes.aAlpha.needsUpdate = true
      lineGeo.setDrawRange(0, li * 2)

      renderer.render(scene, camera)
    }

    if (reduceMotion) {
      // render a single static frame
      for (let i = 0; i < count; i++) {
        rx[i] = bx[i]; ry[i] = by[i]
        const p = nodeGeo.attributes.position.array
        p[i * 3] = bx[i]; p[i * 3 + 1] = by[i]; p[i * 3 + 2] = 0
      }
      nodeGeo.attributes.position.needsUpdate = true
      renderer.render(scene, camera)
    } else {
      raf = requestAnimationFrame(step)
    }

    /* ---------- cleanup ---------- */
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onMove)
      window.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      nodeGeo.dispose()
      lineGeo.dispose()
      nodeMat.dispose()
      lineMat.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none', opacity: 0.58 }}
    />
  )
}
