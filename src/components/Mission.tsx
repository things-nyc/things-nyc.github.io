import Lottie from "lottie-react";
import missionAnim from "../assets/mission.json";

export default function Mission() {
  return (
    <section className="border border-white rounded-2xl mx-auto max-w-7xl px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-gradient-to-b from-white-500 to-blue-100">
      {/* left side - animation */}
      <div className="flex justify-center">
        <Lottie
          animationData={missionAnim}
          loop={true}
          className="w-64 h-64 md:w-80 md:h-80"
        />
      </div>

      {/* right side - text */}
      <div>
        <h1 className="text-black text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
          Our Mission
        </h1>
        <p className="text-lg text-slate-700 leading-relaxed">
          Our mission is to build a community of technical experts to support
          wider use of long-range public-access radio networking for remote
          sensing. <br />
          <br />
          We're doing this based on{" "}
          <a
            className="underline"
            href="https://www.thethingsnetwork.org/"
            target="_blank"
          >
            The Things Network
          </a>
          , an international collaboration of community networks. The network is
          free to access, based on open source software, and owned & operated by
          its users.
        </p>
      </div>
    </section>
  );
}
