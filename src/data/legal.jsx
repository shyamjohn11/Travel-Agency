import { Link } from "react-router-dom";
import { BUSINESS } from "../config/business.config";

export const LEGAL_UPDATED = "14 November 2026";
const co = BUSINESS.name;
const mail = <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>;

export const LEGAL = {
  privacy: {
    path: "/privacy-policy",
    title: "Privacy Policy",
    seoTitle: "Privacy Policy | RJ Groups Travel Agency",
    description: "How RJ Groups collects, uses, stores and protects your personal data when you browse, enquire or book with us.",
    body: (
      <>
        <p>{co} ("RJ Groups", "we", "us") respects your privacy. This policy explains what personal data we collect through {BUSINESS.domain}, how we use it, and the choices you have. We process personal data in line with the Digital Personal Data Protection Act, 2023 and the Information Technology Act, 2000, and other applicable Indian law.</p>
        <h2>1. Data we collect</h2>
        <ul>
          <li><b>Details you give us:</b> name, phone number, email, travel dates, number of travellers, preferences and any message when you send an enquiry, subscribe or contact us.</li>
          <li><b>Booking details:</b> traveller names, ages, ID or passport details and payment-related information, only when you proceed with a booking.</li>
          <li><b>Technical data:</b> device and browser type, pages viewed, approximate location and referral source (UTM parameters), collected through cookies and similar technologies if you consent.</li>
        </ul>
        <h2>2. Why we use your data</h2>
        <ul>
          <li>To respond to enquiries, prepare quotes and itineraries, and manage bookings with airlines, hotels, transport and activity providers.</li>
          <li>To send service messages, such as confirmations and travel updates.</li>
          <li>To send offers and newsletters, only if you opted in. You can opt out at any time.</li>
          <li>To improve our website, measure marketing performance, prevent fraud and meet legal obligations.</li>
        </ul>
        <h2>3. Legal basis</h2>
        <p>We process your data based on your consent (for example marketing, analytics and non-essential cookies), to perform a request you make (a quote or booking), and for legitimate uses permitted by law such as security and legal compliance.</p>
        <h2>4. Sharing your data</h2>
        <p>We share data only as needed to deliver your trip: airlines, hotels, transport operators, visa and insurance partners and payment processors. Service providers such as analytics and advertising platforms (for example Google Analytics and Meta Pixel) receive data only if you accept the relevant cookies. We do not sell your personal data.</p>
        <h2>5. International transfers</h2>
        <p>International trips require sharing details with overseas suppliers. Some of our service providers may process data outside India. We take reasonable steps to ensure appropriate safeguards.</p>
        <h2>6. Retention</h2>
        <p>We keep enquiry data for as long as needed to serve you and meet legal, tax and accounting requirements, and delete or anonymise it when it is no longer required.</p>
        <h2>7. Security</h2>
        <p>We use reasonable technical and organisational safeguards. No online system is completely secure, so please avoid sharing sensitive information over unsecured channels.</p>
        <h2>8. Your rights</h2>
        <p>Subject to applicable law, you may ask to access, correct, update or erase your personal data, withdraw consent, or raise a grievance. Write to {mail} and we will respond within a reasonable time.</p>
        <h2>9. Children</h2>
        <p>Our website is not directed to children. Bookings that include minors must be made by a parent or legal guardian.</p>
        <h2>10. Cookies</h2>
        <p>Please read our <Link to="/cookie-policy">Cookie Policy</Link> for details and to change your preferences.</p>
        <h2>11. Changes</h2>
        <p>We may update this policy from time to time. The date at the top shows the latest version.</p>
        <h2>12. Contact / Grievance</h2>
        <p>{co}, {BUSINESS.address.full}. Phone: {BUSINESS.phone}. Email: {mail}.</p>
      </>
    ),
  },
  terms: {
    path: "/terms-and-conditions",
    title: "Terms & Conditions",
    seoTitle: "Terms & Conditions | RJ Groups Travel Agency",
    description: "Booking, payment, cancellation and liability terms for tour packages and travel services from RJ Groups.",
    body: (
      <>
        <p>These terms apply to your use of {BUSINESS.domain} and to travel services booked through {co}. By using the website or booking with us you agree to these terms.</p>
        <h2>1. Our role</h2>
        <p>We organise and arrange tour packages and act as an agent for airlines, hotels, transporters, and other suppliers. Their own terms also apply to the services they provide.</p>
        <h2>2. Prices and customisation</h2>
        <p>Prices shown on the website, including estimates from the package customiser, are indicative, per person unless stated, and in Indian Rupees. Final prices depend on travel dates, availability, currency rates, taxes and supplier changes, and are confirmed in writing by our team before booking.</p>
        <h2>3. Booking and payment</h2>
        <ul>
          <li>A booking is confirmed only after we receive the advance amount and send written confirmation.</li>
          <li>The balance must be paid by the due date shown in your confirmation. Late payment may lead to cancellation.</li>
          <li>Payment methods and any applicable gateway charges will be shared at the time of booking.</li>
        </ul>
        <h2>4. Travel documents and visas</h2>
        <p>You are responsible for valid passports, visas, permits, vaccinations and ID. We offer visa assistance, but approval rests with the issuing authority and visa fees are non-refundable once applied.</p>
        <h2>5. Changes and cancellations by you</h2>
        <p>Cancellation charges depend on how close to departure you cancel and on supplier policies (airlines, hotels and special-season bookings can be non-refundable). The cancellation schedule specific to your booking will be shared with your quote. Charges already paid to suppliers cannot be recovered by us.</p>
        <h2>6. Changes and cancellations by us</h2>
        <p>We may change itineraries, hotels or vehicles for safety, weather, strikes, government orders or supplier issues, offering a comparable alternative where possible. If we must cancel a package, we will refund amounts paid to us after deducting non-recoverable supplier costs already incurred.</p>
        <h2>7. Offers</h2>
        <p>Offer packages are valid for the dates shown, subject to availability, and cannot be combined with other offers unless stated.</p>
        <h2>8. Your conduct</h2>
        <p>Travellers must follow local laws, supplier rules and the guide's safety instructions. We may remove a traveller whose behaviour endangers others, without refund.</p>
        <h2>9. Liability</h2>
        <p>To the extent permitted by law, we are not liable for loss, injury, delay or damage caused by suppliers, force majeure events (natural disasters, pandemics, strikes, political unrest, airline schedule changes) or circumstances beyond our control. We strongly recommend travel insurance. Nothing here limits your rights under the Consumer Protection Act, 2019.</p>
        <h2>10. Website use and content</h2>
        <p>All content, images and logos on this website belong to {co} or its licensors. You may not copy or reuse them commercially without written permission. We try to keep information accurate but do not guarantee it is error-free.</p>
        <h2>11. Governing law</h2>
        <p>These terms are governed by the laws of India. Courts at Kanyakumari District, Tamil Nadu have jurisdiction, subject to applicable consumer law.</p>
        <h2>12. Contact</h2>
        <p>Questions about these terms: {mail} or {BUSINESS.phone}. See also our <Link to="/privacy-policy">Privacy Policy</Link> and <Link to="/cookie-policy">Cookie Policy</Link>.</p>
      </>
    ),
  },
  cookies: {
    path: "/cookie-policy",
    title: "Cookie Policy",
    seoTitle: "Cookie Policy | RJ Groups Travel Agency",
    description: "The cookies and similar technologies used on the RJ Groups website, why we use them and how to manage your choices.",
    body: (
      <>
        <p>Cookies are small text files stored on your device. We also use similar technologies such as local storage. This page explains what we use and how you can control it.</p>
        <h2>Your choices</h2>
        <p>When you first visit, you can accept all, reject non-essential, or customise. You can change your mind at any time:</p>
        <p><button type="button" className="rj-btn-solid" onClick={() => window.dispatchEvent(new CustomEvent("rj:open-cookie-settings"))}>Open cookie settings</button></p>
        <h2>Categories we use</h2>
        <table>
          <thead><tr><th>Category</th><th>Examples</th><th>Purpose</th></tr></thead>
          <tbody>
            <tr><td><b>Necessary</b> (always on)</td><td>rj_consent_v1, rj_cms_v1, rj_preloader_seen, rj_popup_seen, rj_utm</td><td>Remember your cookie choice, keep the site working, avoid repeating the intro animation and offer pop-up, and note which campaign brought you to us.</td></tr>
            <tr><td><b>Analytics</b> (consent)</td><td>_ga, _ga_*</td><td>Google Analytics measures visits and page performance, with IP anonymisation turned on.</td></tr>
            <tr><td><b>Marketing</b> (consent)</td><td>_fbp, fr</td><td>Meta Pixel measures ad performance and helps us show relevant offers.</td></tr>
          </tbody>
        </table>
        <p>Analytics and marketing scripts load only after you give consent and only if they are enabled for this site.</p>
        <h2>Managing cookies in your browser</h2>
        <p>You can block or delete cookies in your browser settings. Blocking necessary cookies may stop some features from working.</p>
        <h2>More information</h2>
        <p>See our <Link to="/privacy-policy">Privacy Policy</Link> for how we handle personal data, or write to {mail}.</p>
      </>
    ),
  },
};
