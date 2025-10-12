import dynamic from "next/dynamic";
export const dynamic = "force-dynamic"; // évite tout prérendu

const CheckoutBody = dynamic(() => import("./CheckoutBody"), { ssr: false });

export default function CheckoutPage() {
  return <CheckoutBody />;
}
