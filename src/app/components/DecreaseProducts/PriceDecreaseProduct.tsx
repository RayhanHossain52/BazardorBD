
import { BiSolidDownArrow } from "react-icons/bi";
import PriceDecreaseCard from "./PriceDecreaseCard";
import { Product } from "@/types/productTyp";


const PriceDecreaseProduct = async () => {
    const res = await fetch(
        "https://openapi.programming-hero.com/api/bazardor/products/"
    );

    if (!res.ok) {
        throw new Error("Failed to fetch product prices");
    }

    const data: Product[] = await res.json();

    const upProducts = data.filter(
        (product) => product.change.dir === "down"
    );

    return (
        <section className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-0">

            <div className="mb-3 flex items-center gap-2">

                <BiSolidDownArrow
                    aria-hidden="true"
                    className="shrink-0 text-[13px] text-green-600"
                />

                <h2 className="text-xl font-bold text-[#17291e] sm:text-2xl">
                    আজ দাম কমেছে
                </h2>
            </div>

            {upProducts.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {upProducts.map((product) => (
                        <PriceDecreaseCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            ) : (
                <p className="rounded-xl border border-[#dce6de] bg-[#fafcfb] p-5 text-sm text-[#7a8980]">
                    বর্তমানে দাম কমেছে এমন কোনো পণ্য নেই।
                </p>
            )}

        </section>
    );
};

export default PriceDecreaseProduct;
