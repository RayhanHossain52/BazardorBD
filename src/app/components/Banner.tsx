import Image from "next/image";
import Link from "next/link";

const Banner = () => {
    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
        timeZone: "Asia/Dhaka",
    });

    return (
        <section className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-0">
            <div className="grid grid-cols-1 items-center gap-8 rounded-3xl border border-[#dce6de] bg-[#fafcfb] px-5 py-8 sm:px-8 md:grid-cols-2 md:gap-6 lg:px-10 lg:py-10">


                <div className="flex flex-col items-start">
                    <p className="mb-4 rounded-full bg-[#e3f1e7] px-3 py-1 text-sm font-medium text-[#078b45]">
                        {date}
                    </p>

                    <h1 className="mb-4 max-w-lg text-3xl font-bold leading-tight text-[#17291e] sm:text-4xl lg:text-[42px]">
                        আজকের বাজারের দাম এক নজরে
                    </h1>

                    <p className="mb-6 max-w-xl text-base leading-7 text-[#526258] sm:text-lg">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
                        বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক
                        এবং দামের পরিবর্তন এক জায়গায়।
                    </p>

                    <Link
                        href="#products"
                        scroll={true}
                        className="inline-flex items-center justify-center rounded-lg bg-[#078b45] px-4 py-2.5 text-sm font-semibold text-white shadow-md transition duration-200 hover:bg-[#06753b] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#078b45] sm:text-base"
                    >
                        সব পণ্য দেখুন
                    </Link>
                </div>


                <div className="flex items-center justify-center">
                    <Image
                        src="/bazar-hero.png"
                        width={300}
                        height={300}
                        alt="বাজারের তাজা ফল ও সবজির ঝুড়ি"
                        priority
                        className="h-auto w-48 object-contain sm:w-60 md:w-full md:max-w-[300px] lg:max-w-[340px]"
                    />
                </div>

            </div>
        </section>
    );
};

export default Banner;