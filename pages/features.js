import Nav from "../components/Nav";
import FeatureHero from "../components/Features/FeatureHero";
import FeatureParticleField from "../components/Features/FeatureParticleField";

export default function Features() {
  return (
    <div className="flex items-center justify-center w-screen min-h-screen overflow-x-hidden overflow-y-auto text-white bg-indigo-800">
      <Nav />
      <div className="w-4/5 h-full mx-auto">
        <FeatureParticleField />
        <FeatureHero />
      </div>
    </div>
  );
}
