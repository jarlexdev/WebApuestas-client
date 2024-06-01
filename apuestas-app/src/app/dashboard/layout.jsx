"use client"
import Header from "@/components/Header";
import { History } from "@/components/History";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RootLayout({ children }) {

    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        const userRole = localStorage.getItem("userRole");
        console.log(userId, userRole)

        if (!userId || !userRole) {
            router.push("/");
        } else {
            setLoading(false);
        }
    }, [router]);

    if (loading) {
        return (
            <div className="flex items-center flex-col gap-10 justify-center min-h-screen">
                <div className="w-16 h-16 border-4 border-white border-t-transparent border-solid  rounded-full animate-spin"></div>
                <h2>Verificando usuario...</h2>
            </div>
        )
    }

    return (
        <div className="mx-10 my-5">
            <Header />
            <main className="flex flex-col lg:flex-row items-start my-5 gap-10">
                {/* Historial */}
                <div className="lg:w-1/4 w-full">
                    <History />
                </div>
                <div className="lg:w-9/12 w-full">
                    {/* Principal */}
                    {children}
                </div>
            </main>
        </div>
    );
};
