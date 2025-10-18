export default function Price({
  price,
  compareAt,
  className = "",
}: { price: number; compareAt?: number; className?: string }) {
  const discounted = compareAt && compareAt > price;
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className={`font-semibold ${discounted ? "text-green-700" : ""}`}>
        {price.toFixed(2)} $
      </span>
      {discounted && (
        <span className="text-xs text-gray-500 line-through">
          {compareAt!.toFixed(2)} $
        </span>
      )}
    </div>
  );
}
