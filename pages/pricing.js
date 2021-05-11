import PricingHero from "../components/Pricing/index";
import ParticleField from "../components/Pricing/ParticleField";
import Image from "next/image";
import Nav from "../components/Nav";

export default function Pricing() {
  return (
    <div className="flex items-center justify-center min-w-full min-h-screen overflow-auto text-white bg-indigo-800">
      <Nav />
      <div className="w-4/5 h-full mx-auto">
        <ParticleField />
        <PricingHero />
      </div>
    </div>
  );
}
