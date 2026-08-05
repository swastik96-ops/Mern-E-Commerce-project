import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { BsLightningChargeFill } from "react-icons/bs";

const HeroSection = () => {
  return (
    <section
      className="relative overflow-hidden rounded-[32px] mx-8 mt-8 h-[88vh] bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/Mainimage.png')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Soft gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent"></div>

      {/* Background glow */}
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#5F8D6B]/20 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[#A67C52]/20 blur-3xl"></div>

      {/* Content */}
      <div className="relative z-10 flex items-center h-full px-14">

        <div className="max-w-2xl px-6 py-4">

          <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <BsLightningChargeFill />
            Luxury Old Money Collection
          </span>

          <h1 className="text-5xl font-extrabold leading-tight text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.45)]">
            Timeless Style,
            <br />
            <span className="text-[#D4A373]">
              Crafted for
              Modern Elegance
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-xl leading-9 font-medium text-black drop-shadow-[0_4px_18px_rgba(0,0,0,0.6)]">
           <p className="mt-6 text-lg leading-8 text-[#5F5A54] max-w-xl">
            From tailored classics to everyday essentials, our collection is
            designed to embody heritage, elegance, and effortless refinement for
            every occasion.
          </p>
          </p>

          <div className="flex gap-5 mt-10">

            <Link
              to="/shop"
              className="flex items-center gap-2 bg-[#2E5E4E] hover:bg-[#3B705C] text-white px-8 py-4 rounded-full font-semibold transition duration-300"
            >
              Shop Now
              <FiArrowRight />
            </Link>

            <Link
              to="/shop"
              className="border border-white/40 text-white backdrop-blur-md hover:bg-white/15 px-8 py-4 rounded-full font-semibold transition duration-300"
            >
              Explore Collection
            </Link>

          </div>

          <div className="flex gap-12 mt-14">

            <div>
              <h2 className="text-3xl font-bold text-white">500+</h2>
              <p className="text-white/80">Products</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white">50+</h2>
              <p className="text-white/80">Brands</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white">10K+</h2>
              <p className="text-white/80">Customers</p>
            </div>

          </div>

        </div>

      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#F8F6EF]/75 via-[#F8F6EF]/40 to-transparent"></div>

    </section>
  );
};

export default HeroSection;