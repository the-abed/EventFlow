import Image from "next/image";
import CTABanner from "./components/CTABanner";
import Hero from "./components/Hero";
import Testimonials from "./components/Testimonials";
import EventsPage from "./(protected)/event/[id]/page";
import Pricing from "./components/Pricing";
import Features from "./components/Features";

export default function Home() {
  return (
    <main>
      <Hero></Hero>
      <CTABanner></CTABanner>
      <EventsPage></EventsPage>
      <Pricing></Pricing>
      <Features></Features>
      <Testimonials></Testimonials>
    </main>
  );
}
