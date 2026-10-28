
import type { Product } from "@/types/productTyp";

interface PriceSummaryProps {
    data: Product;
}

const toBanglaNumber = (value: number) =>
    value.toLocaleString("bn-BD", {
        maximumFractionDigits: 2,
    });

const PriceSummary = ({ data }: PriceSummaryProps) => {
    const markets = data.markets;

    const minPrice =
        markets.length > 0
            ? Math.min(...markets.map((market) => market.min))
            : 0;

    const maxPrice =
        markets.length > 0
            ? Math.max(...markets.map((market) => market.max))
            : 0;

    const averagePrice =
        markets.length > 0
            ? markets.reduce(
                  (total, market) =>
                      total + (market.min + market.max) / 2,
                  0
              ) / markets.length
            : 0;

    return (
        <section className="rounded-xl border border-[#e0e8e0] bg-[#fbfdfb] p-4 sm:p-5">
            <h2 className="mb-3 text-base font-bold text-[#26352b]">
                দামের সারসংক্ষেপ
            </h2>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-[#e0e8e0] p-4">
                    <p className="text-xs text-gray-500">সর্বনিম্ন দাম</p>
                    <h3 className="mt-1 text-xl font-bold text-[#078b45]">
                        {toBanglaNumber(minPrice)}{" "}
                        <span className="text-sm font-medium">টাকা</span>
                    </h3>
                    <p className="mt-1 text-xs text-gray-500">
                        সব বাজারের মধ্যে সর্বনিম্ন
                    </p>
                </div>

                <div className="rounded-xl border border-[#e0e8e0] p-4">
                    <p className="text-xs text-gray-500">সর্বাধিক দাম</p>
                    <h3 className="mt-1 text-xl font-bold text-red-600">
                        {toBanglaNumber(maxPrice)}{" "}
                        <span className="text-sm font-medium">টাকা</span>
                    </h3>
                    <p className="mt-1 text-xs text-gray-500">
                        সব বাজারের মধ্যে সর্বাধিক
                    </p>
                </div>

                <div className="rounded-xl border border-[#e0e8e0] p-4">
                    <p className="text-xs text-gray-500">গড় দাম</p>
                    <h3 className="mt-1 text-xl font-bold text-[#078b45]">
                        {toBanglaNumber(averagePrice)}{" "}
                        <span className="text-sm font-medium">টাকা</span>
                    </h3>
                    <p className="mt-1 text-xs text-gray-500">
                        বাজারগুলোর গড় মধ্যমূল্য
                    </p>
                </div>
            </div>
        </section>
    );
};

export default PriceSummary;
