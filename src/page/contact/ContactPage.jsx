import React from "react";
import ContactHero from "../../components/contact/ContactHero";
import ContactSection from "../../components/contact/ContactSection";

const ContactPage = () => (
  <main className="!mt-20">
    <ContactHero />
    <ContactSection />
  </main>
);

export default React.memo(ContactPage);
