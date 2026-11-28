import React from "react";
import AboutHero from "../../components/about/AboutHero";
import AboutIntro from "../../components/about/AboutIntro";
import CountriesSlider from "../../components/about/CountriesSlider";
import ValuesSection from "../../components/about/ValuesSection";
import VisionMission from "../../components/about/VisionMission";

const AboutPage = () => (
  <main className="!mt-20">
    <AboutHero />
    <VisionMission />
    <AboutIntro />
    <ValuesSection />
    <CountriesSlider />
  </main>
);

export default React.memo(AboutPage);
