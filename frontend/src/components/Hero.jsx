export default function Hero() {
  return (
    <section className="relative py-24 text-center overflow-hidden">

      <div className="absolute inset-0 flex justify-center">
        <div className="w-[500px] h-[500px] rounded-full bg-indigo-600/20 blur-[150px]" />
      </div>

      <div className="relative z-10">

        <h1 className="text-6xl md:text-7xl font-black leading-tight">
          <span className="text-indigo-400">
            Know What Apps
          </span>

          <br />

          <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Really Know About You
          </span>
        </h1>

        <p className="mt-6 text-gray-400 text-lg">
          You clicked Allow. We show the consequences.
        </p>

        <p className="mt-4 text-sm text-gray-500">
          No login • No device access • Zero personal data processed • ArmorIQ enforced
        </p>

      </div>
    </section>
  );
}