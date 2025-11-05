import Image from "next/image";
import { Button } from "../ui/button";

function Hero() {
  return (
    <section className="w-full border border-gray-800 rounded-md p-10 h-full gap-10 flex justify-center items-center mt-5 flex-col">
      <Image
        src="/morena.png"
        className="object-contain "
        width={256}
        height={256}
        alt="hero"
      />
      <div className="flex flex-col gap-5 items-center">
        <h1 className="md:text-4xl text-xl  font-bold text-center">
          Get a Page which defines you
        </h1>
        <Button className=" cursor-pointer p-5 bg-black">Explore Morena</Button>
      </div>
    </section>
  );
}

export default Hero;
