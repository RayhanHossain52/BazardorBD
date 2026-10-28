"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Nav {
    id: string | number;
    slug: string;
    nameBn: string;
    icon: string;
}

export default function CategoryNavLinks({ data }: { data: Nav[] }) {
    const pathname = usePathname();

    return (
        <div className="flex min-w-max items-center justify-start gap-1 sm:gap-4">
            {data.map((link) => {
                const isActive = pathname === `/category/${link.slug}`;

                return (
                    <Link
                        key={link.id}
                        href={`/category/${link.slug}`}
                        className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition sm:px-2 sm:text-base ${
                            isActive
                                ? "bg-[#078b45] text-white"
                                : "text-gray-700 hover:bg-[#e3f1e7] hover:text-[#078b45]"
                        }`}
                    >
                        <span>{link.icon}</span>
                        <span>{link.nameBn}</span>
                    </Link>
                );
            })}
        </div>
    );
}