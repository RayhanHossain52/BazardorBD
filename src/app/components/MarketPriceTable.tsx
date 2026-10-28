
import type { Product } from "@/types/productType";

interface MarketPriceTableProps {
    data: Product;
}

const toBanglaNumber = (value: number) =>
    value.toLocaleString("bn-BD", {
        maximumFractionDigits: 2,
    });

const MarketPriceTable = ({ data }: MarketPriceTableProps) => {
    return (
        <section className="rounded-xl border border-[#e0e8e0] bg-[#fbfdfb] p-4 sm:p-5">
            <h2 className="mb-4 text-base font-bold text-[#26352b]">
                বাজারভিত্তিক আজকের দাম
            </h2>

            <div className="overflow-x-auto rounded-xl border border-[#e0e8e0]">
                <table className="w-full min-w-[600px] border-collapse text-left text-sm">
                    <thead className="bg-[#f7faf7] text-xs text-gray-600">
                        <tr>
                            <th className="px-3 py-3 font-medium">বাজার</th>
                            <th className="px-3 py-3 font-medium">বিভাগ</th>
                            <th className="px-3 py-3 text-right font-medium">
                                সর্বনিম্ন
                            </th>
                            <th className="px-3 py-3 text-right font-medium">
                                সর্বাধিক
                            </th>
                            <th className="px-3 py-3 text-right font-medium">
                                গড়
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.markets.map((item, index) => {
                            const average = (item.min + item.max) / 2;

                            return (
                                <tr
                                    key={`${item.market}-${item.division}-${index}`}
                                    className="border-t border-[#dce4dc] transition hover:bg-[#f0f5f0]"
                                >
                                    <td className="whitespace-nowrap px-3 py-3 font-medium text-[#26352b]">
                                        {item.market}
                                    </td>

                                    <td className="whitespace-nowrap px-3 py-3 text-gray-600">
                                        {item.division}
                                    </td>

                                    <td className="whitespace-nowrap px-3 py-3 text-right text-gray-700">
                                        {toBanglaNumber(item.min)} টাকা
                                    </td>

                                    <td className="whitespace-nowrap px-3 py-3 text-right text-gray-700">
                                        {toBanglaNumber(item.max)} টাকা
                                    </td>

                                    <td className="whitespace-nowrap px-3 py-3 text-right font-semibold text-[#26352b]">
                                        {toBanglaNumber(average)} টাকা
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default MarketPriceTable;
