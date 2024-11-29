import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Link from "next/link";

const font = Poppins({
  weight: ["600"],
  subsets: ["latin"],
});

export const TermsOfService = () => {
  return (
    <div className="max-w-[54rem] px-4 text-justify">
      <h1 className={cn("mb-2 text-left text-2xl md:text-4xl lg:text-[2.5rem]", font.className)}>Terms and Conditions for DoorMandi</h1>
      <p className="text-gray-600">Effective Date : November 29,2024</p>
      <p className="text-gray-600">Last Updated On: November 29,2024</p>
      <br />
      <p>Welcome to DoorMandi! These Terms and Conditions (&quot;Terms&quot;) govern your access to and use of our vegetable and fruit delivery service, including our website, mobile application, and any related services (collectively referred to as &quot;Services&quot;). By accessing or using our Services, you agree to be bound by these Terms. Please read them carefully.</p>
      <br />
      {/* SECTION 1. INTRODUCTION */}
      <section>
        <h2 className="font-semibold text-lg">1. Introduction</h2>
        <p>DoorMandi (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates an online platform for ordering and delivering fresh vegetables and fruits. These Terms outline your rights and obligations when using our Services. </p>
      </section>
      <br />
      {/* SECTION 2. ELIGIBILITY */}
      <section>
        <h2 className="font-semibold text-lg">2. Eligibility</h2>
        <div className="space-y-2">
          <p>- You must be at least 12 years old to use our Services.</p>
          <p>- If you are under 12, you may use the Services only with the involvement of a parent or legal guardian who agrees to these Terms.</p>
          <p>- By using our Services, you represent and warrant that you meet these requirements.</p>
        </div>
      </section>
      <br />
      {/* SECTION 3. REGISTRATION AND ACCOUNT SECURITY */}
      <section>
        <h2 className="font-semibold text-lg">3. Registration and Account Security</h2>
        <div className="space-y-2">
          <p>- To access certain features, you may need to create an account.</p>
          <p>- You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
          <p>- You agree to provide accurate and complete information during registration and to update it as necessary.</p>
          <p>- We reserve the right to suspend or terminate accounts that are found to contain false information or are used for fraudulent purposes.</p>
        </div>
      </section>
      <br />
      {/* SECTION 4. ORDERS AND PAYMENTS */}
      <section>
        <h2 className="font-semibold text-lg">4. Orders and Payment</h2>
        <div className="space-y-2">
          <p>- Orders can be placed through our app or website until 11:59 PM daily for delivery before 10 AM the next day.</p>
          <p>- All payments are processed through secure third-party payment gateways. By making a payment, you agree to the payment provider&apos;s terms and policies.</p>
          <p>- We reserve the right to reject or cancel orders due to unavailability of stock, incorrect pricing, or other issues.</p>
          <p>- If an order is canceled after payment, the refund will be processed as per our **Refund Policy** (see Section 9).</p>
        </div>
      </section>
      <br />
      {/* SECTION 5. DELIVERY */}
      <section>
        <h2 className="font-semibold text-lg">5. Delivery</h2>
        <div className="space-y-2">
          <p>- We strive to ensure timely delivery, but unforeseen circumstances (e.g., weather, traffic, or other disruptions) may cause delays.</p>
          <p>- Delivery is available only to specified pin codes listed on our platform.</p>
          <p>- It is your responsibility to ensure accurate delivery details. We are not liable for failed deliveries due to incorrect information.</p>
        </div>
      </section>
      <br />
      {/* SECTION 6. PRICING AND TAXES */}
      <section>
        <h2 className="font-semibold text-lg">6. Pricing and Taxes</h2>
        <div className="space-y-2">
          <p>- All prices listed on our platform are inclusive of applicable taxes unless stated otherwise.</p>
          <p>- Prices are subject to change without prior notice. However, the price applicable at the time of order placement will apply.</p>
          <p>- Delivery charges, if any, will be displayed at checkout.</p>
        </div>
      </section>
      <br />
      {/* SECTION 7. USER RESPONSIBILITIES */}
      <section>
        <h2 className="font-semibold text-lg">7. User Responsibilities</h2>
        <p>By using our services, you agree to:</p>
        <div className="space-y-2">
          <p>- Not misuse or abuse the platform, including but not limited to engaging in fraudulent activities or violating any laws.</p>
          <p>- Refrain from uploading or transmitting harmful content, such as viruses or malicious software.</p>
          <p>- Use the Services for personal, non-commercial purposes only unless explicitly authorized.</p>
        </div>
      </section>
      <br />
      {/* SECTION 8. INTELLECTUAL PROPERTY RIGHTS */}
      <section>
        <h2 className="font-semibold text-lg">8. Intellectual Property Rights</h2>
        <div className="space-y-2">
          <p>- All content on our platform, including but not limited to text, images, logos, and software, is our intellectual property or licensed to us.</p>
          <p>- You may not reproduce, distribute, modify, or exploit any content without our prior written consent.</p>
        </div>
      </section>
      <br />
      {/* SECTION 9. CANCELLATIONS, REFUNDS, AND RETURNS */}
      <section>
        <h2 className="font-semibold text-lg">9. Cancellation, Refunds, and Returns</h2>
        <div className="space-y-2">
          <div>
            <p>a. Cancellations:</p>
            <p>You may cancel your order within a limited timeframe specified on our platform. Once processing begins, cancellations may not be allowed.</p>
          </div>
          <div>
            <p>b. Refunds:</p>
            <p>Refunds for eligible cancellations will be processed within 7 business days. The timeline may vary depending on the payment gateway.</p>
          </div>
          <div>
            <p>c. Returns and Replacements:</p>
            <p>If you receive damaged or spoiled items, you must report the issue within 2 hours of delivery. We may offer a replacement or refund based on our inspection.</p>
          </div>
        </div>
      </section>
      <br />
      {/* SECTION 10. LIMITATION OF LIABILITY */}
      <section>
        <h2 className="font-semibold text-lg">10. Limitation of Liability</h2>
        <div className="space-y-2">
          <p>- Our Services are provided on an &apos;as is&apos; and &apos;as available&apos; basis.</p>
          <p>- We are not liable for any indirect, incidental, or consequential damages arising from your use of the Services.</p>
          <p>Our liability is limited to the amount paid by you for the affected order.</p>
        </div>
      </section>
      <br />
      {/* SECTION 11. PRIVACY POLICY */}
      <section>
        <h2 className="font-semibold text-lg">11. Privacy Policy</h2>
        <p>Your use of the Services is governed by our Privacy Policy, which explains how we collect, use, and protect your information. Please review it carefully.</p>
      </section>
      <br />
      {/* SECTION 12. TERMINATION */}
      <section>
        <h2 className="font-semibold text-lg">12. Termination</h2>
        <p>We reserve the right to suspend or terminate your access to the Services at our sole discretion if you violate these Terms or engage in activities harmful to us or other users.</p>
      </section>
      <br />
      {/* SECTION 13. GOVERNING LAW AND DISPUTE RESOLUTION */}
      <section>
        <h2 className="font-semibold text-lg">13. Governing Law and Dispute Resolution</h2>
        <div className="space-y-2">
          <p>- These Terms are governed by the laws of India.</p>
          <p>- Any disputes will be resolved through arbitration under the Arbitration and Conciliation Act, 1996, with the seat of arbitration in [Jaipur, India]. The arbitration will be conducted in English.</p>
          <p>Courts in [Jaipur, India] will have exclusive jurisdiction for any disputes not resolved through arbitration.</p>
        </div>
      </section>
      <br />
      {/* SECTION 14. FORCE MAJEURE */}
      <section>
        <h2 className="font-semibold text-lg">14. Force Majeure</h2>
        <p>We are not responsible for delays or failures in performance caused by events beyond our reasonable control, including natural disasters, strikes, or government actions.</p>
      </section>
      <br />
      {/* SECTION 15. AMENDMENTS TO TERMS */}
      <section>
        <h2 className="font-semibold text-lg">15. Amendments to Terms</h2>
        <p>We reserve the right to update these Terms at any time. Any changes will be communicated through our platform, and continued use of the Services constitutes acceptance of the revised Terms.</p>
      </section>
      <br />
      {/* SECTION 16. CONTACT US */}
      <section>
        <h2 className="font-semibold text-lg">16. Contact Us</h2>
        <p>If you have any questions or concerns about these Terns, please contact us at:</p>
        <div>
          <p>
            Email: [
            <Link className="text-blue-800" href={"mailto:terms@doormandi.com"}>
              terms@doormandi.com
            </Link>
            ]
          </p>
          <p>Phone: [+91 7788998877]</p>
          <p>Address: [41, Street, City, State, India]</p>
        </div>
      </section>

      {/* COMPLIANCE WITH INDIAN LAWS */}
      <section>
        <h2 className="font-semibold text-lg">Compliance with Indian Laws:</h2>
        <p>These Terms comply with relevant Indian laws, including the Consumer Protection Act, 2019, and other applicable regulations.</p>
        <br />
        <p>By using our Services, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.</p>
      </section>
    </div>
  );
};
