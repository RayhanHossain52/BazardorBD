
import AllProductCard from "./AllProductCard";
import { Product } from "@/types/productTyp";


const AllProduct = async () => {
    const res = await fetch(
        "https://openapi.programming-hero.com/api/bazardor/products/"
    );

    if (!res.ok) {
        throw new Error("Failed to fetch product prices");
    }

    const data: Product[] = await res.json();

    const toBanglaNumber = (value: number) =>
        value.toLocaleString("bn-BD", {
            maximumFractionDigits: 2,
        });

    return (
        <section id="products" className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-0">

                <h2 className="mb-2 text-xl font-bold text-[#17291e] sm:text-2xl">
                    সব পণ্য
                </h2>


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
