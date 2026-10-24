
import { BiSolidUpArrow } from "react-icons/bi";
import PriceIncreaseCard from "./PriceIncreaseCard";

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

const PriceIncreaseProduct = async () => {
    const res = await fetch(
        "https://openapi.programming-hero.com/api/bazardor/products/"
    );

    if (!res.ok) {
        throw new Error("Failed to fetch product prices");
    }

    const data: Types[] = await res.json();

    const upProducts = data.filter(
        (product) => product.change.dir === "up"
    );

    return (
        <section className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-0">

            <div className="mb-3 flex items-center gap-2">
                <BiSolidUpArrow
                    aria-hidden="true"
                    className="shrink-0 text-[13px] text-red-600"
                />

                <h2 className="text-xl font-bold text-[#17291e] sm:text-2xl">
                    আজ দাম বেড়েছে
                </h2>
            </div>

            {upProducts.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {upProducts.map((product) => (
                        <PriceIncreaseCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            ) : (
                <p className="rounded-xl border border-[#dce6de] bg-[#fafcfb] p-5 text-sm text-[#7a8980]">
                    বর্তমানে দাম বেড়েছে এমন কোনো পণ্য নেই।
                </p>
            )}

        </section>
    );
};

export default PriceIncreaseProduct;
