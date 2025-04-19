import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
    const router = useRouter();

    const isActive = (path) =>
        router.pathname === path ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-500";

    return (
        <nav className="bg-white shadow px-6 py-4 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="text-xl  text-gray-900">Sales Dashboard
                    <p className="text-sm text-gray-500 mt-1">
                        Powered by Next.js + FastAPI + Tailwind
                    </p>
                </div>

                <div className="space-x-6 text-sm">
                    <Link href="/" className={isActive("/")}>
                        Home
                    </Link>
                    <Link href="/charts" className={isActive("/charts")}>
                        Charts
                    </Link>
                </div>
            </div>
        </nav>
    );
}
