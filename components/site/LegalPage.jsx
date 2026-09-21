export default function LegalPage({ title, effectiveDate, intro, sections }) {
  return (
    <article className="bg-[#F8F9FF] px-6 py-24 text-[#16163F] sm:py-32">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3055CF]">Lookupp</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
        {effectiveDate && <p className="mt-4 text-sm text-[#16163F]/55">{effectiveDate}</p>}
        <p className="mt-10 whitespace-pre-line text-lg leading-8 text-[#16163F]/75">{intro}</p>
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

export const termsIntro = `Welcome to Lookupp, a mobile application provided by:
Lookupp
4030 Wake Forest Road STE 349, Raleigh, NC 27609
Contact Email: team@lookupp.net

By using Lookupp, you agree to the following Terms and Conditions.`

export const termsSections = [
  { heading: '1. Eligibility', paragraphs: ['By using Lookupp, you confirm that:', '• You are at least 13 years old.', '• You are not located in a country under U.S. government embargo or on any U.S. government list of prohibited parties.', '• If you are under 18, you must have parental or guardian consent to use the app.'] },
  { heading: '2. Account Registration', paragraphs: ['• To use Lookupp and access key features, including earning points and redeeming rewards, you must create an account.', '• You are responsible for maintaining the confidentiality of your account login details.', '• You may only register one account unless otherwise specified.'] },
  { heading: '3. Acceptable Use', paragraphs: ['You agree to:', '• Use Lookupp only for its intended purpose: to participate in Lookupp Zones and earn rewards by reducing phone use in social situations.', '• Not use bots or automation to register accounts or collect points.', '• Not attempt to misuse, hack, or disrupt the app’s services.', 'We reserve the right to suspend or delete accounts that violate these terms.'] },
  { heading: '4. Rewards System', paragraphs: ['• Lookupp allows users to earn points for participating in Lookupp Zones and redeem them for rewards.', '• Daily point limits may apply (e.g. maximum 2.5 hours per day).', '• Rewards are subject to availability and may vary by region.', '• We reserve the right to deny, revoke, modify, or cancel rewards and points at our sole discretion, including in cases of suspected misuse, suspicious activity, or violations of these terms.', '• Points or rewards earned through misuse, fraud, or violations may be revoked without notice.', '• Participation in the rewards system does not create any entitlement or legal right to receive any specific reward.'] },
  { heading: '5. App Updates and Software License', paragraphs: ['• Lookupp may release updates periodically, which you may need to install to continue using the app.', '• You are granted a non-exclusive, non-transferable license to use Lookupp for its intended purpose.', '• We may modify, suspend, or discontinue Lookupp or any of its features at any time, with or without notice.'] },
  { heading: '6. Limitation of Liability', paragraphs: ['• Lookupp is provided "as is" and "as available."', '• We do not guarantee that the app will always be error-free or uninterrupted.', '• To the fullest extent permitted by law, we are not liable for indirect, incidental, or consequential damages.', '• We are not responsible for service interruptions caused by circumstances beyond our reasonable control, including but not limited to infrastructure failures, internet outages, or government actions.'] },
  { heading: '7. User-Generated Content', paragraphs: ['• If you submit content through Lookupp (e.g., names, comments, event titles), you are solely responsible for that content.', '• We reserve the right to remove any content that is inappropriate, offensive, or violates these terms.'] },
  { heading: '8. Suspension and Termination', paragraphs: ['• Suspension: Temporary loss of access to your account. Suspensions may be lifted at our discretion.', '• Termination: Permanent closure of your account and forfeiture of all accumulated points and rewards.', '• You may close your account at any time by contacting us.', '• We may suspend or terminate your account at our sole discretion for violations of these terms or for any other valid reason.'] },
  { heading: '9. Dispute Resolution (Arbitration)', paragraphs: ['• Any disputes arising from these terms will be resolved through binding arbitration in Virginia, in accordance with the rules of the American Arbitration Association.', '• You waive the right to bring class actions or participate in class action lawsuits.', '• Both parties waive the right to a jury trial.'] },
  { heading: '10. Governing Law', paragraphs: ['• These terms are governed by the laws of the Commonwealth of Virginia, United States.', '• Any disputes will be resolved in the courts located in Virginia, unless settled through arbitration.'] },
  { heading: '11. Third-Party Services', paragraphs: ['• Lookupp integrates with third-party services (e.g. Google, Firebase). We are not responsible for their content, security, or functionality.', '• Your use of third-party services is subject to their own terms and conditions.'] },
  { heading: '12. Refund and Cancellation Policy', paragraphs: ['• All purchases made through Lookupp, including premium features, are final and non-refundable, unless otherwise required by law.'] },
  { heading: '13. Accessibility', paragraphs: ['• We are committed to making Lookupp accessible to all users. Please contact us if you experience any barriers or have suggestions for improvement.'] },
  { heading: '14. Changes to These Terms', paragraphs: ['• We may update these Terms and Conditions at any time. Changes will take effect upon posting in the app.', '• Continued use of the app indicates your acceptance of the updated terms.'] },
  { heading: '15. Contact', paragraphs: ['If you have any questions, please contact us at:', 'team@lookupp.net'] },
]

export const privacyIntro = `Lookupp (“we,” “our,” or “us”) values your privacy and is committed to protecting your personal data. This Privacy & Data Policy explains how we collect, use, disclose, and safeguard your information when you use the Lookupp mobile application, website, and related services (collectively, the “Platform”).`

export const privacySections = [
  { heading: 'Lookupp Privacy & Data Policy', paragraphs: ['Effective Date: 09/8/2025', 'Last Updated: 09/01/2025'] },
  { heading: '1. Information We Collect', paragraphs: ['• Personal Information: Name, email, phone number, age/date of birth (for age.', '• Account Information: Lookupp account ID, profile preferences, points earned, and redemption history.', '• Behavioral and Usage Data: Participation in Lookupp Zones, rewards activity, and app usage.', '• Device and Technical Information: IP address, operating system, unique device identifiers, logs.', '• Location: We may use your location to support features of the app, but we do not store your live location.', '• Sensitive Information: Voluntary self-reported well-being or mental health indicators, anonymized where possible.', '• Optional Research Data: With your consent, we may collect additional information if you participate in research studies. This is always optional and not required for using Lookupp.', '• Third-Party Data: Information from connected services (e.g., Google, Apple).', '• Cookies and Tracking: We may use cookies or similar technologies on our website for analytics and functionality.'] },
  { heading: '2. Sources of Data', paragraphs: ['We collect information directly from you, from your device, or from third-party services you connect.'] },
  { heading: '3. How We Use Your Information', paragraphs: ['• Provide and improve Lookupp’s functionality.', '• Personalize user experience, rewards, and recommendations.', '• Detect fraudulent activity or misuse.', '• Communicate updates and changes.', '• Comply with legal obligations.', '• Conduct anonymized research to study digital well-being and improve services. By using this product, you consent to the use of anonymized data for research purposes if you are 18 years or older, or if under 18, with parent/guardian consent.', '• Opt-Out: You may email us at team@lookupp.net at any time to opt out of your anonymized data being used for research.'] },
  { heading: '4. How We Share Your Information', paragraphs: ['• Service Providers: With trusted vendors (e.g., hosting, analytics) for operational purposes.', '• Legal Obligations: When required by law or regulation.', '• With Consent: When you explicitly authorize sharing (e.g., external reward platforms).', '• Third-Party Services: Lookupp integrates with services such as Firebase and analytics providers. While we carefully select partners, we are not responsible for their internal practices. You should review the privacy and security policies of any third-party services you engage with through Lookupp.'] },
  { heading: '5. Data Security', paragraphs: ['We protect user data with:', '• Encryption in transit (TLS 1.2+) and at rest (AES-256).', '• Role-based access controls and multi-factor authentication.', '• Continuous monitoring for anomalies and suspicious activity.'] },
  { heading: '6. User Responsibilities', paragraphs: ['• Keep your login credentials secure.', '• Notify us of unauthorized access or suspicious activity at team@lookupp.net.', '• Do not misuse or attempt to compromise the Platform.'] },
  { heading: '7. Breach Notification', paragraphs: ['If a confirmed security breach occurs, we will notify affected users in accordance with applicable laws.'] },
  { heading: '8. Children’s Privacy', paragraphs: ['Lookupp is not intended for children under 13 without parental consent. We comply with COPPA and related laws. Parents may:', '• Review their child’s personal information,', '• Request deletion, or', '• Refuse further collection of data at any time.', 'Requests can be made by contacting us at team@lookupp.net.'] },
  { heading: '9. Your Privacy Rights', paragraphs: ['Depending on your jurisdiction, you may:', '• Access, correct, or delete your data.', '• Request data portability.', '• Opt out of marketing communications.', '• Exercise GDPR/CCPA rights, such as stopping the sale/sharing of data or correcting inaccuracies.', 'Identity Verification: We may request reasonable verification of your identity before fulfilling privacy requests.', 'To exercise these rights, contact us at team@lookupp.net or through our website at www.lookupp.net.'] },
  { heading: '10. Data Retention', paragraphs: ['We retain your personal data indefinitely, until you request deletion of your account or until retention is no longer required by law. Aggregated or anonymized data may be kept indefinitely for analytics and research.'] },
  { heading: '11. Third-Party Services', paragraphs: ['Lookupp integrates with third-party services such as Firebase. We are not responsible for their practices. Please review their privacy and security policies separately.'] },
  { heading: '12. International Data Transfers', paragraphs: ['If you access Lookupp outside the U.S., your data may be transferred and processed in the U.S.'] },
  { heading: '13. Accessibility', paragraphs: ['We are committed to making this policy accessible to all users. Contact us if you need it in an alternative format.'] },
  { heading: '14. Changes to This Policy', paragraphs: ['We may update this Policy from time to time. By continuing to use Lookupp after updates, you agree to the updated policies. Up-to-date policy will be posted on our website.'] },
  { heading: '15. Compliance', paragraphs: ['Our practices are designed to comply with COPPA, GDPR, and CCPA requirements, where applicable.'] },
  { heading: '16. Contact Us', paragraphs: ['For questions or privacy requests:', 'Email: team@lookupp.net', 'Website: www.lookupp.net', 'Address: 4030 Wake Forest Road STE 349, Raleigh, NC 27609, USA'] },
]

export function TermsPage() { return <LegalPage title="Terms and Conditions" intro={termsIntro} sections={termsSections} /> }
export function PrivacyPage() { return <LegalPage title="Privacy Policy" intro={privacyIntro} sections={privacySections} /> }
export function TermsMetadata() { return { title: 'Terms and Conditions | Lookupp', description: 'Terms and Conditions for using Lookupp.' } }
export function PrivacyMetadata() { return { title: 'Privacy Policy | Lookupp', description: 'Privacy Policy for Lookupp.' } }
