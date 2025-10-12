import dynamic from "next/dynamic";
export const dynamic = "force-dynamic";
const CheckoutBody = dynamic(() => import("./CheckoutBody"), { ssr: false });
export default function CheckoutPage() { return <CheckoutBody />; }
