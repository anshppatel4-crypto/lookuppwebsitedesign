import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'
import { NextResponse } from 'next/server'

let client
let db

async function connectToMongo() {
  if (!client) {
    client = new MongoClient(process.env.MONGO_URL)
    await client.connect()
    db = client.db(process.env.DB_NAME)
  }
  return db
}

function handleCORS(response) {
  response.headers.set('Access-Control-Allow-Origin', process.env.CORS_ORIGINS || '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  response.headers.set('Access-Control-Allow-Credentials', 'true')
  return response
}

export async function OPTIONS() {
  return handleCORS(new NextResponse(null, { status: 200 }))
}

async function handleRoute(request, { params }) {
  const { path = [] } = await params
  const route = `/${path.join('/')}`
  const method = request.method

  try {
    const db = await connectToMongo()

    if ((route === '/' || route === '/root') && method === 'GET') {
      return handleCORS(NextResponse.json({ message: 'Lookupp API' }))
    }

    // Contact form submissions
    if (route === '/contact' && method === 'POST') {
      const body = await request.json()
      if (!body.name || !body.email || !body.message) {
        return handleCORS(NextResponse.json({ error: 'name, email and message are required' }, { status: 400 }))
      }
      const doc = {
        id: uuidv4(),
        name: body.name,
        email: body.email,
        message: body.message,
        createdAt: new Date(),
      }
      await db.collection('contact_submissions').insertOne(doc)
      const { _id, ...clean } = doc
      return handleCORS(NextResponse.json({ success: true, submission: clean }))
    }

    if (route === '/contact' && method === 'GET') {
      const items = await db.collection('contact_submissions').find({}).sort({ createdAt: -1 }).limit(500).toArray()
      return handleCORS(NextResponse.json(items.map(({ _id, ...r }) => r)))
    }

    // Business inquiry submissions
    if (route === '/business' && method === 'POST') {
      const body = await request.json()
      if (!body.businessName || !body.contactName || !body.email) {
        return handleCORS(NextResponse.json({ error: 'businessName, contactName and email are required' }, { status: 400 }))
      }
      const doc = {
        id: uuidv4(),
        businessName: body.businessName,
        contactName: body.contactName,
        email: body.email,
        phone: body.phone || '',
        website: body.website || '',
        address: body.address || '',
        businessType: body.businessType || '',
        description: body.description || '',
        rewards: body.rewards || '',
        notes: body.notes || '',
        createdAt: new Date(),
      }
      await db.collection('business_submissions').insertOne(doc)
      const { _id, ...clean } = doc
      return handleCORS(NextResponse.json({ success: true, submission: clean }))
    }

    if (route === '/business' && method === 'GET') {
      const items = await db.collection('business_submissions').find({}).sort({ createdAt: -1 }).limit(500).toArray()
      return handleCORS(NextResponse.json(items.map(({ _id, ...r }) => r)))
    }

    return handleCORS(NextResponse.json({ error: `Route ${route} not found` }, { status: 404 }))
  } catch (error) {
    console.error('API Error:', error)
    return handleCORS(NextResponse.json({ error: 'Internal server error' }, { status: 500 }))
  }
}

export const GET = handleRoute
export const POST = handleRoute
export const PUT = handleRoute
export const DELETE = handleRoute
export const PATCH = handleRoute
