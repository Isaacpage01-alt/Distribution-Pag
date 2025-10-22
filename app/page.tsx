export const dynamic = "force-static";

export default function Home() {
  return (
    <div style={{padding:24, color:"#fff"}}>
      <h1 style={{fontSize:24, fontWeight:700}}>Accueil (app/) ✅</h1>
      <a href="/products" style={{textDecoration:"underline", color:"#67e8f9"}}>Aller à /products</a>
    </div>
  );
}
