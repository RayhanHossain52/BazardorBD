// import CategoryNavLinks from "./CategoryNavLinks";
// import Link from "next/link";

// interface Nav {
//     id: string | number;
//     slug: string;
//     nameBn: string;
//     icon: string;
// }

// const NavLink = async () => {
//     const res = await fetch(
//         "https://openapi.programming-hero.com/api/bazardor/categories"
//     );

//     if (!res.ok) {
//         return null;
//     }

//     const data: Nav[] = await res.json();

//     return (
//         <nav className="border-b border-gray-100 bg-[#fbfdfb]">
//             <div className="mx-auto max-w-6xl overflow-x-auto px-3 sm:px-5">
//                 <CategoryNavLinks data={data} />
//             </div>
//         </nav>
//     );
// };

// export default NavLink;




"use client";

import { useEffect, useState } from "react";
import CategoryNavLinks from "./CategoryNavLinks";

interface Nav {
    id: string | number;
    slug: string;
    nameBn: string;
    icon: string;
}

const NavLink = () => {
    const [categories, setCategories] = useState<Nav[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await fetch(
                "https://openapi.programming-hero.com/api/bazardor/categories"
            );

            if (!res.ok) {
                throw new Error("Failed to fetch categories");
            }

            const data = await res.json();

            setCategories(data);
        };

        fetchCategories().catch((error) => {
            console.error("Category fetch error:", error);
        });
    }, []);

    return (
        <nav className="border-b border-gray-100 bg-[#fbfdfb]">
            <div className="mx-auto max-w-6xl overflow-x-auto px-3 sm:px-5">
                <CategoryNavLinks data={categories} />
            </div>
        </nav>
    );
};

export default NavLink;
