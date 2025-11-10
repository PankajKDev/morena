import Image from "next/image";
import { Button } from "../../ui/button";

function Hero() {
  return (
    <section className="w-full rounded-md p-10  h-[80vh] gap-10 flex justify-center items-center  flex-col">
      <Image
        src="/morena.png"
        className="object-cover rounded-full border  border-black w-42 h-42"
        width={256}
        height={256}
        alt="hero"
      />
      <div className="flex flex-col  items-center">
        <h1 className=" text-3xl md:text-6xl  font-extrabold text-center">
          Your Profile. Unfiltered.
        </h1>
        <h2 className="text-sm  mt-5 tracking-widest md:text-lg text-center text-zinc-700">
          create custom profiles with your aesthetic
        </h2>
        <div className="flex gap-3 mt-5">
          <Button className="p-5">Claim my page now</Button>
          <Button variant="outline" className="p-5">
            See live demo
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
