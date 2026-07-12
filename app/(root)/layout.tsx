import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />
      <div className="flex-1 min-h-screen">{children}</div>
      <Footer />
    </div>
  );
}

export default layout;
