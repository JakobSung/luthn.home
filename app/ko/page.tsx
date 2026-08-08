import HomePage from "../home-page";
import { createLocaleMetadata } from "../site-config";

export const metadata = createLocaleMetadata("ko", "/ko");

export default function KoreanPage() {
  return <HomePage initialLocale="ko" canonicalPath="/ko" />;
}
