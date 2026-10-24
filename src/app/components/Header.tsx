
import Image from "next/image";
import Link from "next/link";
import NavLink from "./NavLink";

const Header = () => {
    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
        timeZone: "Asia/Dhaka",
    });

    return (
        <header className="w-full bg-[#fbfdfb] text-[#202923]">
            <div className="border-b border-gray-100">
                <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-5">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#078b45]">
                            <Image
                                src="/logo-icon.png"
                                width={20}
                                height={20}
                                alt="বাজার দর"
                                className=" brightness-0 invert rounded-xl object-contain"
                                priority
                            />
                        </div>

                        <div>
                            <h1 className="text-xl font-extrabold leading-tight tracking-tight sm:text-2xl">
                                বাজার দর
                            </h1>
                            <p className="mt-0.5 text-xs text-gray-600 sm:text-sm">
                                {date}
                            </p>
                        </div>
                    </Link>

                    <div className="flex items-center gap-2">
                        <Link
                            href="/sign-in"
                            className="rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-gray-100 sm:px-4 sm:text-base"
                        >
                            সাইন ইন
                        </Link>

                        <Link
                            href="/sign-up"
                            className="rounded-lg bg-[#078b45] px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#06753b] sm:px-4 sm:text-base"
                        >
                            সাইন আপ
                        </Link>
                    </div>
                </div>
            </div>

            <NavLink />
        </header>
    );
};

export default Header;

