"use client";

import { useState } from "react";
import { Product } from "@/types/productTyp";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";

interface CategoryProductsProps {
    products: Product[];
}

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

const CategoryProducts = ({ products }: CategoryProductsProps) => {

    const [sortby, setSortby] = useState<"default" | "price-low" | "price-high">("default");

    const sortList = (list: Product[]) => {
        const sortListArr = [...list];

        if (sortby === "default") {
            sortListArr.sort((a, b) => a.nameBn.localeCompare(b.nameBn, "bn"));
        } else if (sortby === "price-low") {
            sortListArr.sort((a, b) => a.today - b.today);
        } else if (sortby === "price-high") {
            sortListArr.sort((a, b) => b.today - a.today);
        }

        return sortListArr;
    }

    const category = products[0];
    return (
        <div>
            {/* Category header */}
            <section className="flex items-center gap-3 rounded-xl border border-[#e0e8e0] bg-[#fbfdfb] px-4 py-4 sm:px-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-2xl">
                    {category.categoryIcon}
                </div>

                <div>
                    <h1 className="text-2xl font-bold">
                        {category.categoryNameBn}
                    </h1>

                    <p className="mt-0.5 text-sm text-gray-500">
                        প্রতিদিনের পণ্যের আজকের দাম ও পরিবর্তন
                    </p>
                </div>
            </section>

            {/* Sorting bar */}
            <section className="mt-5 flex items-center justify-end gap-2 rounded-xl border border-[#e0e8e0] bg-[#fbfdfb] px-4 py-3">
                <label htmlFor="sort" className="text-base text-gray-500">
                    সাজান
                </label>

                <select
                    id="sortby"
                    value={sortby}
                    onChange={(e) => setSortby(e.target.value as "default" | "price-low" | "price-high")}
                    className="rounded-lg border border-gray-300 bg-[#fbfdfb] px-3 py-2 text-base outline-none focus:border-[#078b45]"
                >
                    <option value="default">ডিফল্ট</option>
                    <option value="price-low">দাম: কম থেকে বেশি</option>
                    <option value="price-high">দাম: বেশি থেকে কম</option>
                </select>
            </section>

            {/* Product count */}
            <p className="my-3 text-sm text-gray-500">
                মোট {toBanglaNumber(products.length)}টি পণ্য দেখানো হচ্ছে
            </p>

            {/* Product grid */}
            <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {sortList(products).map((product) => (
                    <article
                        key={product.id}
                        className="rounded-2xl border border-[#e0e8e0] bg-[#fbfdfb] p-3 transition hover:border-[#b8d4bd] hover:shadow-sm sm:p-4"
                    >
                        {/* Product name */}
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-xl">
                                {product.image || product.categoryIcon}
                            </div>

                            <div className="min-w-0">
                                <h2 className="truncate text-base font-bold">
                                    {product.nameBn}
                                </h2>

                                <p className="mt-0.5 text-sm text-gray-500">
                                    প্রতি {unitInBangla[product.unit] ?? product.unit}
                                </p>
                            </div>
                        </div>

                        {/* Price and change */}
                        <div className="mt-3 flex items-end justify-between gap-2">
                            <div>
                                <p className="text-sm text-gray-500">
                                    আজকের দাম
                                </p>

                                <p className="mt-0.5 text-lg font-bold">
                                    {toBanglaNumber(product.today)} টাকা
                                </p>
                            </div>

                            <span
                                className={`mb-0.5 inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${product.change.dir === "up"
                                    ? "bg-red-50 text-red-600"
                                    : product.change.dir === "down"
                                        ? "bg-green-50 text-green-600"
                                        : "bg-gray-100 text-gray-600"
                                    }`}
                            >
                                {product.change.dir === "up"
                                    ? <BiSolidUpArrow className="text-sm" />
                                    : product.change.dir === "down"
                                        ? <BiSolidDownArrow
                                            aria-hidden="true"
                                            className="shrink-0 text-sm text-green-600"
                                        />
                                        : "— "}

                                {toBanglaNumber(Math.abs(product.change.pct))}%
                            </span>
                        </div>
                    </article>
                ))}
            </section>
        </div>
    );
};

export default CategoryProducts;