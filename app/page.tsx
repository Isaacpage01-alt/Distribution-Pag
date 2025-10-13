import { Suspense } from "react";
import HomeClient from "./home-client";

// évite le pré-rendu strict pour cette page
export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <HomeClient />
    </Suspense>
  );
}
