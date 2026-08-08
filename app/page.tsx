import HomePage from "./home-page";
import { createLocaleMetadata } from "./site-config";

export const metadata = createLocaleMetadata("en", "/");

export default function Page() {
  return <HomePage initialLocale="en" canonicalPath="/" />;
}
