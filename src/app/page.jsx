import Image from "next/image";
import CTABanner from "./components/CTABanner";
import Hero from "./components/Hero";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import Features from "./components/Features";
import UpcomingEvents from "./components/UpcomingEvents";

export default function Home() {
  return (
    <main>
      <Hero></Hero>
      <CTABanner></CTABanner>
      <UpcomingEvents></UpcomingEvents>
      <Pricing></Pricing>
      <Features></Features>
      {/* <Testimonials></Testimonials> */}
    </main>
  );
}
