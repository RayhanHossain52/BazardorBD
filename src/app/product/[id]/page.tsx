
"use client";

import MarketPriceTable from "@/app/components/MarketPriceTable";
import PriceSummary from "@/app/components/PriceSumary";
import type { Product } from "@/types/productType";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function Page({ params }: PageProps) {
    const { data: session, isPending } = useSession();
    const router = useRouter();

    const [id, setId] = useState<string | null>(null);
    const [data, setData] = useState<Product | null>(null);
    const [loadingProduct, setLoadingProduct] = useState(true);
    const [productNotFound, setProductNotFound] = useState(false);

    useEffect(() => {
        params.then(({ id }) => setId(id));
    }, [params]);

    useEffect(() => {
        if (!isPending && !session) {
            router.replace(`/sign-in?callbackURL=${encodeURIComponent(window.location.pathname)}`);
        }
    }, [session, isPending, router]);

    useEffect(() => {
        if (isPending || !session || !id) return;

        const loadProduct = async () => {
            try {
                const res = await fetch(
                    `https://openapi.programming-hero.com/api/bazardor/products/${id}`
                );

                if (!res.ok) {
                    setProductNotFound(true);
                    return;
                }

                const product: Product = await res.json();
                setData(product);
            } catch {
                setProductNotFound(true);
            } finally {
                setLoadingProduct(false);
            }
        };

        loadProduct();
    }, [id, session, isPending]);

    if (isPending || !session || !id || loadingProduct) {
        return <p className="p-6 text-center">লোড হচ্ছে...</p>;
    }

    if (productNotFound || !data) {
        notFound();
    }

    const toBanglaNumber = (value: number) =>
        value.toLocaleString("bn-BD", { maximumFractionDigits: 2 });

    const unitInBangla: Record<string, string> = {
        kg: "কেজি",
        litre: "লিটার",
        liter: "লিটার",
        piece: "টি",
    };

    return (
        <main className="min-h-screen bg-[#f0f5f0] px-4 py-6 sm:px-6">
            <div className="mx-auto max-w-5xl space-y-4">
                <section className="flex flex-col gap-4 rounded-xl border border-[#e0e8e0] bg-[#fbfdfb] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                    <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-3xl">
                            {data.image || data.categoryIcon}
                        </div>

                        <div className="min-w-0">
                            <h1 className="text-xl font-bold text-[#26352b] sm:text-2xl">
                                {data.nameBn}
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                প্রতি {unitInBangla[data.unit] ?? data.unit} ·{" "}
                                {data.categoryNameBn}
                            </p>

                            <p className="mt-2 text-xs text-gray-600">
                                গতকালের তুলনায় আজ{" "}
                                {data.change.dir === "up"
                                    ? `দাম বেড়েছে ${toBanglaNumber(Math.abs(data.change.pct))}%`
                                    : data.change.dir === "down"
                                        ? `দাম কমেছে ${toBanglaNumber(Math.abs(data.change.pct))}%`
                                        : "দাম অপরিবর্তিত"}
                            </p>
                        </div>
                    </div>

                    <div className="shrink-0 rounded-xl bg-[#f0f5f0] px-5 py-3 text-center sm:min-w-32">
                        <p className="text-xs text-gray-500">আজকের দাম</p>
                        <h2 className="mt-1 text-2xl font-bold text-[#26352b]">
                            {toBanglaNumber(data.today)}
                        </h2>
                        <p className="text-xs text-gray-500">
                            টাকা / {unitInBangla[data.unit] ?? data.unit}
                        </p>

                        <div className="mt-2 flex justify-center">
                            {data.change.dir === "up" ? (
                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-600">
                                    <BiSolidUpArrow className="text-[10px]" />
                                    {toBanglaNumber(Math.abs(data.change.pct))}%
                                </span>
                            ) : data.change.dir === "flat" ? (
                                <span className="text-xs font-semibold text-gray-500">
                                    — {toBanglaNumber(Math.abs(data.change.pct))}%
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-600">
                                    <BiSolidDownArrow className="text-[10px]" />
                                    {toBanglaNumber(Math.abs(data.change.pct))}%
                                </span>
                            )}
                        </div>
                    </div>
                </section>

                <PriceSummary data={data} />
                <MarketPriceTable data={data} />
            </div>
        </main>
    );
}
