import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({
  weight: ["600"],
  subsets: ["latin"],
});

export const PrivacyPolicy = () => {
  return (
    <div className="max-w-[54rem] px-4 text-justify">
      <h1 className={cn("mb-2 text-left text-2xl md:text-4xl lg:text-5xl", font.className)}>Privacy Policy for DoorMandi</h1>
      <p className="text-gray-600">Effective Date : November 29,2024</p>
      <p className="text-gray-600">Last Updated On: November 29,2024</p>
      <br />
      {/* SECTION 1. INTRODUCTION */}
      <section>
        <h2 className="font-semibold text-lg">1. Introduction</h2>
        <p>DoorMandi (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) values the privacy of our users (&quot;you&quot; or &quot;your&quot;). This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you use our vegetable and fruits delivery service. By accessing or using our services, you agree to the terms of this Privacy Policy.</p>
      </section>
      <br />
      {/* SECTION 2. INFORMATION WE COLLECT */}
      <section>
        <h2 className="font-semibold text-lg">2. Information We Collect</h2>
        <p>We collect and process the following types of information:</p>
        <div>
          <div>
            <p>a. Personal Information:</p>
            <div className="ml-4">
              <p>- Name</p>
              <p>- Email</p>
              <p>- Address</p>
              <p>- Phone number</p>
            </div>
          </div>
          <div>
            <p>b. Technical Information:</p>
            <div className="ml-4">
              <p>- IP Address (for security and fraud prevention)</p>
            </div>
          </div>
          <div>
            <p>c. Location Data:</p>
            <div className="ml-4">
              <p>- GPS location (only when fetching the delivery address during order placement)</p>
            </div>
          </div>
          <div>
            <p>d. Payment Information:</p>
            <div className="ml-4">
              <p>- Payment details are collected and processed securely by our third-party payment service provider. We do not store payment details on our servers.</p>
            </div>
          </div>
        </div>
      </section>
      <br />
      {/* SECTION 3. HOW WE USE YOUR INFORMATION */}
      <section>
        <h2 className="font-semibold text-lg">3. How We Use Your Information</h2>
        <p>We use the collected information for the following purposes:</p>
        <div>
          <p>- Order Fulfillment: To process and deliver your orders.</p>
          <p>- Customer Support: To respond to your inquiries and resolve issues.</p>
          <p>- Security: To detect and prevent fraudulent activities and unauthorized access.</p>
          <p>- Personalization: To improve your experience and provide tailored content.</p>
          <p>- Legal Compliance: To comply with applicable laws and regulations.</p>
        </div>
      </section>
      <br />
      {/* SECTION 4. SHARING YOUR INFORMATION */}
      <section>
        <h2 className="font-semibold text-lg">4. Sharing Your Information</h2>
        <p>We do not sell, trade, or rent your personal information to third parties. However, we may share your information in the following cases:</p>
        <div>
          <p>a. Service Providers:</p>
          <p>With third-party vendors who assist in delivering our services (e.g., payment processors, delivery partners).</p>
        </div>
        <div>
          <p>b. Legal Requirements:</p>
          <p>To comply with legal obligations, respond to lawful requests from public authorities, or protect our rights.</p>
        </div>
        <div>
          <p>c. Business Transfers:</p>
          <p>In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</p>
        </div>
      </section>
      <br />
      {/* SECTION 5. DATA SECURITY */}
      <section>
        <h2 className="font-semibold text-lg">5. Data Security</h2>
        <p>We implement robust security measures to protect your information from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.</p>
      </section>
      <br />
      {/* SECTION 6. DATA RETENTION */}
      <section>
        <h2 className="font-semibold text-lg">6. Data Retention</h2>
        <p>We retain your personal information only as long as necessary to fulfill the purposes outlined in this Privacy Policy or comply with legal requirements.</p>
      </section>
      <br />
      {/* SECTION 7. YOUR RIGHTS */}
      <section>
        <h2 className="font-semibold text-lg">7. Your Rights</h2>
        <p>Under Indian laws, you have the following rights regarding your personal data:</p>
        <div>
          <p>- Access and review the data we collect about you.</p>
          <p>- Request correction of inaccurate or incomplete data.</p>
          <p>- Withdraw consent for processing personal data (subject to limitations).</p>
          <p>- Request deletion of your personal data (subject to legal and contractual obligations).</p>
        </div>
        <p>To exercise your rights, contact us at [privacy@doormandi.com].</p>
      </section>
      <br />
      {/* SECTION 8. COOKIES AND TRACKING TECHNOLOGIES */}
      <section>
        <h2 className="font-semibold text-lg">8. Cookies and Tracking Technologies</h2>
        <p>We may use cookies and similar technologies to enhance your experience. You can manage your cookie preferences through your browser settings.</p>
      </section>
      <br />
      {/* SECTION 9. THIRD-PARTY SERVICES */}
      <section>
        <h2 className="font-semibold text-lg">9. Third-Party Services</h2>
        <p>Our app may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to read their privacy policies.</p>
      </section>
      <br />
      {/* SECTION 10. CHANGES TO THIS PRIVACY POLICY */}
      <section>
        <h2 className="font-semibold text-lg">10. Changes to This Privacy Policy</h2>
        <p>We may update this Privacy Policy from time to time. Any changes will be communicated through our app or website. Continued use of our services after such updates constitutes your agreement to the revised policy.</p>
      </section>
      <br />
      {/* SECTION 11. CONTACT US */}
      <section>
        <h2 className="font-semibold text-lg">11. Contact Us</h2>
        <p>If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
        <div>
          <p>Email: [privacy@doormandi.com]</p>
          <p>Phone: [+91 7788998877]</p>
          <p>Address: [41, Street, City, State, India]</p>
        </div>
      </section>
      <br />
      {/* COMPLIANCE WITH INDIAN LAWS */}
      <section>
        <h2 className="font-semibold text-lg">Compliance with Indian Laws:</h2>
        <p>This Privacy Policy complies with applicable Indian data protection laws, including the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, under the Information Technology Act, 2000.</p>
        <p>By using our services, you consent to the collection, use, and sharing of your information as described in this Privacy Policy.</p>
      </section>
    </div>
  );
};
