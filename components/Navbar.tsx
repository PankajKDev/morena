import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

function Navbar() {
  return (
    <header className="w-full h-16 bg-black text-white flex items-center justify-center">
      <div className="w-[80%] justify-between flex items-center">
        <h1 className="font-bold text-2xl tracking-wider">Morena</h1>
        <div className="flex gap-5">
          <SignedOut>
            <Link
              href="/sign-in"
              className="px-4 py-2  text-white border-white rounded hover:bg-white hover:text-black transition"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="px-4 py-2  text-white border-white rounded hover:bg-white hover:text-black transition"
            >
              Sign Up
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
