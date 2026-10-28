import Link from "next/link";

const EmptyState = () => {
    return (
        <div className="flex min-h-[60vh] items-center justify-center bg-[#f0f5f0] px-4 py-12">
            <div className="w-full max-w-md rounded-2xl border border-[#dce6de] bg-[#fbfdfb] p-8 text-center shadow-sm">
                <div className="mb-5 text-6xl font-extrabold text-[#078b45]">
                    404
                </div>

                <h1 className="text-xl font-bold text-[#202923] sm:text-2xl">
                    কোনো তথ্য পাওয়া যায়নি!
                </h1>

                <Link
                    href="/"
                    className="mt-6 inline-flex items-center justify-center rounded-lg bg-[#078b45] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#06753b]"
                >
                    হোম পেজে ফিরে যান
                </Link>
            </div>
        </div>
    );
};

export default EmptyState;