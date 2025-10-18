export default function Price({
  price,
  compareAt,
  className = "",
}: { price: number | undefined; compareAt?: number; className?: string }) {
  const safePrice = typeof price === "number" && Number.isFinite(price) ? price : 0;
  const hasCompare = typeof compareAt === "number" && Number.isFinite(compareAt) && compareAt > safePrice;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className={`font-semibold ${hasCompare ? "text-cyan-400" : "text-white"}`}>
        {safePrice.toFixed(2)} $
      </span>
      {hasCompare && (
        <span className="text-xs text-gray-300 line-through">
          {compareAt!.toFixed(2)} $
        </span>
      )}
    </div>
  );
}
