import { Suspense } from "react";
import HomeClient from "./home-client";

export const dynamic = "force-dynamic"; // évite le prerender strict

export default function Page() {
  return (
    <Suspense fallback={null}>
      <HomeClient />
    </Suspense>
  );
}
