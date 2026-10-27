
import { BiSolidDownArrow } from "react-icons/bi";
import PriceDecreaseCard from "./PriceDecreaseCard";
import AllProductCard from "./AllProductCard";


interface Types {
    id: number;
    nameBn: string;
    categoryIcon: string;
    unit: string;
    today: number;
    change: {
        dir: "up" | "down";
        pct: number;
    };
}

const AllProduct = async () => {
    const res = await fetch(
        "https://openapi.programming-hero.com/api/bazardor/products/"
    );

    if (!res.ok) {
        throw new Error("Failed to fetch product prices");
    }

    const data: Types[] = await res.json();

    const toBanglaNumber = (value: number) =>
        value.toLocaleString("bn-BD", {
            maximumFractionDigits: 2,
        });

    return (
        <section className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-0">

            <div className="mb-3 flex items-center gap-2">

                <BiSolidDownArrow
                    aria-hidden="true"
                    className="shrink-0 text-[13px] text-green-600"
                />

                <h2 className="text-xl font-bold text-[#17291e] sm:text-2xl">
                    সব পণ্য
                </h2>
            </div>

            {data.length > 0 ? (<p className="mb-4 mb-1 text-xs text-[#7a8980]">মোট {toBanglaNumber(data.length)}টি পণ্য দেখানো হচ্ছে</p>) : ""}


            {
                data.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {data.map((product) => (
                            <AllProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="rounded-xl border border-[#dce6de] bg-[#fafcfb] p-5 text-sm text-[#7a8980]">
                        বর্তমানে কোনো পণ্য নেই।
                    </p>
                )}

        </section>
    );
};

export default AllProduct;
