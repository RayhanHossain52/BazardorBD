
import { Product } from "@/types/productType";
import Link from "next/link";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

const unitInBangla: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  liter: "লিটার",
  piece: "টি",
};

const toBanglaNumber = (value: number) =>
  value.toLocaleString("bn-BD", {
    maximumFractionDigits: 2,
  });

const Marquee = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products/"
  );

  if (!res.ok) {
    return null;
  }

  const data: Product[] = await res.json();

  return (
    <div className="w-full border-b border-gray-200 bg-[#f4f7f4] text-[#252525]">
      <div className="h-px w-full bg-gray-200" />

      <div className="overflow-hidden">
        <MarqueeText direction="right" duration={25}>
          {data.map((headline) => (
            <Link
              key={headline.id}
              href={`/product/${headline.id}`}
              className="inline-flex items-center gap-1.5 whitespace-nowrap border-r border-gray-200 px-4 py-2.5 text-sm transition hover:bg-[#e8f0e8] sm:gap-2 sm:px-5 sm:text-base"
            >
              <span>{headline.categoryIcon}</span>

              <span className="font-medium">{headline.nameBn}</span>

              <span>
                {toBanglaNumber(headline.today)} টাকা/
                {unitInBangla[headline.unit] ?? headline.unit}
              </span>

              <span
                className={`inline-flex shrink-0 items-center gap-1 font-semibold ${headline.change.dir === "up"
                    ? "text-red-600"
                    : headline.change.dir === "down"
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
              >
                {headline.change.dir === "up" ? (
                  <BiSolidUpArrow className="text-[10px]" />
                ) : headline.change.dir === "down" ? (
                  <BiSolidDownArrow className="text-[10px]" />
                ) : (
                  "—"
                )}

                {toBanglaNumber(Math.abs(headline.change.pct))}%
              </span>
            </Link>
          ))}
        </MarqueeText>
      </div>

      <div className="h-px w-full bg-gray-200" />
    </div>
  );
};

export default Marquee;
