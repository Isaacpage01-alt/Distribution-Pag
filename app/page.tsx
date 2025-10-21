export const dynamic = "force-static";
export const runtime = "edge";

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Bannière si /public/banniere.png existe (sinon juste du texte) */}
      <div className="relative w-full h-[220px] sm:h-[300px] lg:h-[360px] rounded-xl overflow-hidden border border-white/15 bg-black/40">
        <img
          src="/banniere.png"
          alt="Distribution Pagé"
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            // Si l'image n'existe pas, on garde un fond sombre
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <h1 className="text-2xl sm:text-3xl font-bold">Distribution Pagé</h1>
        </div>
      </div>

      {/* Barre de recherche simple */}
      <form action="/search" className="w-full max-w-sm mx-auto flex gap-2">
        <input
          name="q"
          placeholder="Rechercher un produit…"
          className="flex-1 h-10 rounded-full px-4 border border-black bg-white text-black text-sm"
        />
        <button className="h-10 rounded-full bg-cyan-400 px-4 text-black text-sm font-semibold hover:brightness-110">
          Chercher
        </button>
      </form>

      {/* Contenu de bienvenue (aucune dépendance) */}
      <div className="rounded-xl border border-white/15 bg-black/40 p-6 text-center">
        <p className="text-white">
          Accueil en ligne ✅ — si vous voyez ceci, la route <code>/</code> fonctionne et le fond utilise <code>/bg.jpg</code>.
        </p>
        <p className="text-gray-300 text-sm mt-2">
          Vous pourrez réactiver plus tard votre Header, Panier et sections produits.
        </p>
      </div>
    </div>
  );
}
