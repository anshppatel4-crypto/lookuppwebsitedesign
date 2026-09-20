export default function LegalPage({ title, effectiveDate, intro, sections }) {
  return (
    <article className="bg-[#F8F9FF] px-6 py-24 text-[#16163F] sm:py-32">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3055CF]">Lookupp</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-4 text-sm text-[#16163F]/55">Effective date: {effectiveDate}</p>
        <p className="mt-10 text-lg leading-8 text-[#16163F]/75">{intro}</p>

        <div className="mt-12 space-y-10">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-semibold">{section.heading}</h2>
              <div className="mt-3 space-y-4 text-base leading-7 text-[#16163F]/70">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </section>
          ))}
        </div>
      </div>
    </article>
  )
}

export const legalEffectiveDate = 'September 20, 2026'

export const termsSections = [
  { heading: '1. About Lookupp', paragraphs: ['Lookupp is a youth-led nonprofit focused on helping people build healthier digital habits and spend more meaningful time together in person. These Terms and Conditions govern your use of the Lookupp website and related services.'] },
  { heading: '2. Acceptable use', paragraphs: ['You agree to use Lookupp lawfully and respectfully. You must not misuse our website, interfere with its operation, attempt to access areas or information you are not authorized to access, or use our services to harm others.'] },
  { heading: '3. Information and content', paragraphs: ['We work to keep the information on our website accurate and current, but we do not guarantee that every page is complete, error-free, or continuously available. Our content is provided for general informational purposes.'] },
  { heading: '4. Intellectual property', paragraphs: ['The Lookupp name, logo, original content, and materials on this website belong to Lookupp or our licensors. You may view and share links to our content for personal, non-commercial purposes, but you may not reproduce or modify it without permission.'] },
  { heading: '5. Donations and third-party services', paragraphs: ['Donations may be processed by third-party providers. Their terms and privacy policies may also apply to your transaction. Lookupp is not responsible for the availability or practices of third-party websites and services linked from our website.'] },
  { heading: '6. Disclaimer and limitation of liability', paragraphs: ['To the fullest extent permitted by law, Lookupp provides this website and its content without warranties of any kind. Lookupp will not be liable for indirect, incidental, or consequential losses arising from your use of the website.'] },
  { heading: '7. Changes and contact', paragraphs: ['We may update these Terms from time to time. Continued use of the website after an update means you accept the revised Terms. Questions can be sent to hello@lookupp.net.'] },
]

export const privacySections = [
  { heading: '1. Information we collect', paragraphs: ['We may collect information you provide directly, such as your name, email address, phone number, donation details, or message when you contact us, use a form, or support Lookupp. We may also receive basic technical information, such as browser type and pages visited.'] },
  { heading: '2. How we use information', paragraphs: ['We use information to respond to requests, provide and improve our services, process donations, communicate with you, maintain website security, and understand how our website is used. We do not sell your personal information.'] },
  { heading: '3. Sharing information', paragraphs: ['We may share information with trusted service providers who help us operate the website, communicate with supporters, or process donations. These providers may only use information to perform services for us. We may also disclose information when required by law or to protect rights and safety.'] },
  { heading: '4. Cookies and analytics', paragraphs: ['Our website may use cookies or similar technologies to remember preferences, support functionality, and understand website traffic. You can adjust cookie settings through your browser, though some features may not work as intended.'] },
  { heading: '5. Your choices and rights', paragraphs: ['You may ask us to access, correct, or delete personal information we hold about you, subject to applicable law. You may also opt out of non-essential communications by following the instructions in the message or contacting us directly.'] },
  { heading: '6. Data security and retention', paragraphs: ['We use reasonable administrative, technical, and organizational safeguards to protect personal information. We retain information only for as long as reasonably necessary for the purposes described in this policy, legal obligations, and legitimate nonprofit operations.'] },
  { heading: '7. Children and updates', paragraphs: ['Our website is not intended to knowingly collect personal information from children without appropriate consent. We may update this Privacy Policy from time to time. Questions about privacy can be sent to hello@lookupp.net.'] },
]

export const termsIntro = 'Please read these Terms and Conditions carefully before using the Lookupp website or services.'
export const privacyIntro = 'This Privacy Policy explains how Lookupp collects, uses, and protects information when you visit our website or interact with our services.'

export function TermsPage() {
  return <LegalPage title="Terms and Conditions" effectiveDate={legalEffectiveDate} intro={termsIntro} sections={termsSections} />
}

export function PrivacyPage() {
  return <LegalPage title="Privacy Policy" effectiveDate={legalEffectiveDate} intro={privacyIntro} sections={privacySections} />
}

export function TermsMetadata() {
  return { title: 'Terms and Conditions | Lookupp', description: 'Terms and Conditions for using Lookupp.' }
}

export function PrivacyMetadata() {
  return { title: 'Privacy Policy | Lookupp', description: 'Privacy Policy for Lookupp.' }
}

