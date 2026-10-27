
import Link from "next/link";

interface Nav {
    id: string | number;
    slug: string;
    nameBn: string;
    icon: string;
}

const NavLink = async () => {
    const res = await fetch(
        "https://openapi.programming-hero.com/api/bazardor/categories"
    );

    if (!res.ok) {
        return null;
    }

    const data: Nav[] = await res.json();

    return (
        <nav className="border-b border-gray-100 bg-[#fbfdfb]">
            <div className="mx-auto max-w-6xl overflow-x-auto px-3 sm:px-5">
                <div className="flex min-w-max items-center justify-start gap-1 sm:gap-4">
                    {data.map((link) => (
                        <Link
                            key={link.id}
                            href={`/category/${link.slug}`}
                            className="group relative flex items-center gap-1.5 whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-700 transition hover:text-[#078b45] sm:px-2 sm:text-base">
                            <span>{link.icon}</span>
                            <span>{link.nameBn}</span>
                            <span className="absolute inset-x-3 bottom-0 h-0.5 scale-x-0 bg-pink-500 transition-transform group-hover:scale-x-100" />
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default NavLink;
