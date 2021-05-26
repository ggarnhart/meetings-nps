export default function FeatureParticleField() {
  return (
    <div className="hidden lg:inline">
      <span className="absolute block bg-indigo-300 rounded-sm square-one lg:inset-y-1/2 particle-square-one-animation h-14 w-14 rotate-12" />
      <span className="absolute block w-16 h-16 bg-indigo-400 rounded-full circle-one lg:top-36 lg:left-96 particle-circle-one-animation" />
      <span className="absolute block w-12 h-12 ml-8 bg-indigo-300 rounded-full lg:inset-1/3 particle-circle-five-animation" />
      <span className="absolute block w-12 h-12 ml-8 bg-indigo-300 rounded-full lg:inset-x-1/4 lg:bottom-36 particle-circle-two-animation" />
      <span className="absolute block w-10 h-10 -rotate-45 bg-indigo-300 rounded-full lg:inset-y-20 lg:inset-x-1/2 particle-square-three-animation " />
      <span className="absolute block w-10 h-10 -rotate-45 bg-indigo-500 rounded-full lg:bottom-20 lg:inset-x-1/2 particle-square-two-animation " />
      <span className="absolute block w-10 h-10 -rotate-45 bg-indigo-400 rounded-sm -ml-36 lg:inset-y-3/4 lg:inset-x-2/3 particle-square-three-animation " />
      <span className="absolute block w-16 h-16 bg-indigo-500 rounded-full ml-36 lg:inset-x-3/4 lg:inset-y-3/4 particle-square-two-animation" />
      <span className="absolute block ml-48 bg-indigo-300 rounded-sm w-14 h-14 lg:inset-x-3/4 lg:inset-y-1/4 particle-square-two-animation" />
    </div>
  );
}
