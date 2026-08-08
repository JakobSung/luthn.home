import HomePage from "../home-page";
import { createLocaleMetadata } from "../site-config";

export const metadata = createLocaleMetadata("en", "/en");

export default function EnglishPage() {
  return <HomePage initialLocale="en" canonicalPath="/en" />;
}
