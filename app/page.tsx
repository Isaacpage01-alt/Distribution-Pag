// >>> force aussi en statique sur Edge
export const dynamic = "force-static";
export const runtime = "edge";

export default function Home() {
  return (
    <div className="p-10 text-white text-center rounded-xl border border-white/20 bg-black/40">
      <h1 className="text-2xl font-bold">Accueil OK ✅</h1>
      <p>Si vous voyez ceci, le 504 est réglé et l’image de fond est chargée.</p>
    </div>
  );
}
