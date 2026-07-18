import { SignUp } from "@clerk/nextjs";

function page() {
  return <SignUp fallbackRedirectUrl="/" />;
}

export default page;
