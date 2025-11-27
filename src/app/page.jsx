import Image from "next/image";
import CTABanner from "./components/CTABanner";
import Hero from "./components/Hero";
import Testimonials from "./components/Testimonials";
import FeaturesSection from "./components/FeaturesSection";
import EventsPage from "./(protected)/event/[id]/page";

export default function Home() {
  return (
    <main>
      <Hero></Hero>
      <CTABanner></CTABanner>
      <EventsPage></EventsPage>
      <FeaturesSection></FeaturesSection>
      <Testimonials></Testimonials>
    </main>
  );
}
