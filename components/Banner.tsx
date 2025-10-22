export default function Banner() {
  return (
    <div className="w-full">
      <img
        src="/banniere.png"
        alt="Distribution Pagé"
        className="
          w-full h-[180px] sm:h-[240px] lg:h-[300px]
          object-contain mx-auto
          mix-blend-multiply   /* << fond blanc 'disparaît' sur le bois */
          opacity-95           /* ajuste si tu veux plus/moins foncé */
          pointer-events-none   /* évite surbrillance au clic */
          select-none
        "
      />
    </div>
  );
}
