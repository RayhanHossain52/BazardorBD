import { Product } from "@/types/productTyp";
import Link from "next/link";
import { BiSolidDownArrow } from "react-icons/bi";

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

const PriceDecreaseCard = ({ product }: { product: Product }) => {
    return (

        <Link key={product.id}
            href={`/product/${product.id}`}
            className="block">


            <div className="flex min-h-[138px] flex-col justify-between rounded-2xl border border-[#dce6de] bg-[#fafcfb] p-4 transition duration-200 hover:border-[#b8d5c1] hover:shadow-sm">

                {/* Product information */}
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-2xl">
                        {product.categoryIcon}
                    </div>

                    <div className="min-w-0">
                        <h3 className="truncate text-base font-bold text-[#17291e] sm:text-lg">
                            {product.nameBn}
                        </h3>

                        <p className="text-xs text-[#7a8980] sm:text-sm">
                            প্রতি {unitInBangla[product.unit] ?? product.unit}
                        </p>
                    </div>
                </div>

                {/* Today's price */}
                <div className="mt-3">
                    <p className="mb-1 text-xs text-[#7a8980]">
                        আজকের দাম
                    </p>

                    <div className="flex items-center justify-between gap-2">
                        <p className="text-lg font-bold leading-none text-[#17291e] sm:text-xl">
                            {toBanglaNumber(product.today)} টাকা
                        </p>

                        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#f0f5f0] px-2.5 py-1 text-xs font-medium text-green-600">
                            <BiSolidDownArrow
                                aria-hidden="true"
                                className="shrink-0 text-[13px] text-green-600"
                            />
                            {toBanglaNumber(Math.abs(product.change.pct))}%
                        </span>
                    </div>
                </div>

            </div>
        </Link>


    );
};

export default PriceDecreaseCard;
