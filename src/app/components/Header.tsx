
// import Image from "next/image";
// import Link from "next/link";
// import NavLink from "./NavLink";
// import { Button, Spinner } from "@heroui/react";
// import { signOut } from "@/lib/auth-client";

// const Header = () => {

//     const { data: session, isPending } = authClient.useSession()

//     const date = new Date().toLocaleDateString("bn-BD", {
//         dateStyle: "full",
//         timeZone: "Asia/Dhaka",
//     });

//     if (isPending) {
//         return (
//             <div className="flex flex-col items-center gap-2">
//                 <Spinner />
//                 <span className="text-xs text-muted"></span>
//             </div>
//         )
//     }

//     return (
//         <header className="w-full bg-[#fbfdfb] text-[#202923]">
//             <div className="border-b border-gray-100">
//                 <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-5">
//                     <Link href="/" className="flex items-center gap-2">
//                         <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#078b45]">
//                             <Image
//                                 src="/logo-icon.png"
//                                 width={20}
//                                 height={20}
//                                 alt="বাজার দর"
//                                 className=" brightness-0 invert rounded-xl object-contain"
//                                 priority
//                             />
//                         </div>

//                         <div>
//                             <h1 className="text-xl font-extrabold leading-tight tracking-tight sm:text-2xl">
//                                 বাজার দর
//                             </h1>
//                             <p className="mt-0.5 text-xs text-gray-600 sm:text-sm">
//                                 {date}
//                             </p>
//                         </div>
//                     </Link>

//                     <div className="flex items-center gap-2">

//                         {
//                             session?.user ? <>
//                                 <div>

//                                     <span>{session.user?.name}</span>

//                                 </div>
//                                 <Button onClick={() => signOut()}>Sign Out</Button>
//                             </> : <>
//                                <Link
//                             href="/sign-in"
//                             className="rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-gray-100 sm:px-4 sm:text-base"
//                         >
//                             সাইন ইন
//                         </Link>

//                         <Link
//                             href="/sign-up"
//                             className="rounded-lg bg-[#078b45] px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#06753b] sm:px-4 sm:text-base"
//                         >
//                             সাইন আপ
//                         </Link>
//                             </>
//                         }

//                     </div>

//                 </div>
//             </div>

//             <NavLink />
//         </header>
//     );
// };

// export default Header;






"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import NavLink from "./NavLink";
import { Spinner } from "@heroui/react";
import { authClient, signOut } from "@/lib/auth-client";
import { CgProfile } from "react-icons/cg";

const Header = () => {
    const router = useRouter();
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const { data: session, isPending } = authClient.useSession();

    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
        timeZone: "Asia/Dhaka",
    });

    const user = session?.user;
    const initial = user?.name?.charAt(0)?.toUpperCase() || "U";

    const handleSignOut = async () => {
        await signOut();
        setIsProfileOpen(false);
        router.push("/");
        router.refresh();
    };

    return (
        <header className="w-full bg-[#fbfdfb] text-[#202923]">
            {/* Top Header */}
            <div className="border-b border-gray-100">
                <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-5">
                    {/* Logo and Date */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#078b45]">
                            <Image
                                src="/logo-icon.png"
                                width={20}
                                height={20}
                                alt="বাজার দর"
                                className="rounded-xl object-contain brightness-0 invert"
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

                    {/* Authentication */}
                    <div className="flex items-center gap-2">
                        {isPending ? (
                            <Spinner size="sm" />
                        ) : user ? (
                            /* Logged-in Profile Dropdown */
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setIsProfileOpen(!isProfileOpen)
                                    }
                                    aria-expanded={isProfileOpen}
                                    aria-label="প্রোফাইল মেনু"
                                    className="flex items-center gap-2 rounded-xl px-2 py-1.5 transition hover:bg-gray-100"
                                >
                                    {/* User Initial */}
                                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#078b45] text-sm font-bold text-white">
                                        {initial}
                                    </span>

                                    {/* User Name */}
                                    <span className="max-w-[150px] truncate text-sm font-medium sm:max-w-none">
                                        {user.name}
                                    </span>

                                    {/* Dropdown Arrow */}
                                    <svg
                                        className={`h-4 w-4 text-gray-500 transition-transform ${isProfileOpen ? "rotate-180" : ""
                                            }`}
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.09 1.032l-4.25 4.5a.75.75 0 01-1.09 0l-4.25-4.5a.75.75 0 01.02-1.052z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>

                                {/* Dropdown Menu */}
                                {isProfileOpen && (
                                    <div className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-[#dce6de] bg-[#fbfdfb] shadow-lg">
                                        {/* User Information */}
                                        <div className="border-b border-[#e8eee9] px-4 py-4">
                                            <p className="truncate text-sm font-semibold text-[#26352b]">
                                                {user.name}
                                            </p>
                                            <p className="mt-1 truncate text-xs text-gray-500">
                                                {user.email}
                                            </p>
                                        </div>

                                        {/* Profile Link */}
                                        <Link
                                            href="/My-Profile"
                                            onClick={() =>
                                                setIsProfileOpen(false)
                                            }
                                            className="flex items-center gap-3 px-4 py-3 text-sm transition hover:bg-[#eef6ef]"
                                        >
                                            <span className="text-green-700"><CgProfile />
                                            </span>
                                            <span>আমার প্রোফাইল</span>
                                        </Link>

                                        {/* Sign Out */}
                                        <button
                                            type="button"
                                            onClick={handleSignOut}
                                            className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-red-600 transition hover:bg-red-50"
                                        >
                                            <span>↪</span>
                                            <span>সাইন আউট</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            /* Logged-out Buttons */
                            <>
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
                            </>
                        )}
                    </div>
                </div>
            </div>

            <NavLink />
        </header>
    );
};

export default Header;
