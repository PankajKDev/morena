import { SignIn } from "@clerk/nextjs";

function page() {
  return <SignIn fallbackRedirectUrl="/" />;
}

export default page;
