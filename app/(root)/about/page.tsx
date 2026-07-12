import AboutHero from "@/components/shared/AboutHero";

import AboutTeam from "@/components/shared/AboutTeam";
import AboutValues from "@/components/shared/AboutValues";

function page() {
  return (
    <div className="flex flex-col">
      <AboutHero />

      <AboutValues />
      <AboutTeam />
    </div>
  );
}

export default page;
