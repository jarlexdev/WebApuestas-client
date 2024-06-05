"use client";
import { useState, useEffect } from 'react';
import { FaAngleDown, FaBars, FaTimes } from "react-icons/fa";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { getUserById } from '@/services/user.service';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [user, setUser] = useState({});
    const router = useRouter();

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        const userRole = localStorage.getItem("userRole");
        async function getUser() {
            const user = await getUserById(userId);
            if (user.status) {
                setUser(user.data);
            } else {
                router.push("/");
            }
        }

        if (userId && userRole) {
            getUser();
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("userRole");
        toast.success("Sesión cerrada correctamente");
        router.push("/");
    };

    return (
        <header className="flex flex-row sm:flex-row justify-between items-center my-5">
            {/* Logo */}
            <div>
                <h1 className="text-2xl">BetApp</h1>
            </div>
            {/* Navigation */}
            <nav className={`fixed z-10 inset-0 bg-gray-950 p-5 transform transition-transform ease-in-out duration-500 sm:duration-700 ${isOpen ? 'translate-x-0' : '-translate-x-full'} sm:flex sm:translate-x-0 sm:relative sm:p-0 sm:bg-transparent`}>
                <button onClick={() => setIsOpen(!isOpen)} className="absolute top-0 right-0 p-5 text-2xl sm:hidden">
                    <FaTimes />
                </button>
                <div className={`flex flex-col items-center gap-5 sm:flex-row  ${isOpen == true ? "mt-10 text-xl" : ""} `}>
                    <Link href="/dashboard" className="hover:text-white font-bold">Inicio</Link>
                    <Link href="/dashboard/bets" className="hover:text-white font-bold">Gestionar apuestas</Link>
                    <div className="bg-gray-900 py-2 px-10 gap-2 rounded-lg flex flex-row items-center">
                        <RiMoneyDollarCircleFill size={25} />
                        {user.puntosUser}
                    </div>

                    <div className="relative">
                        <div
                            className="bg-gray-900 px-4 w-48 py-2 rounded-lg flex flex-row items-center justify-between gap-3 cursor-pointer"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            {user.userName}
                            <FaAngleDown />
                        </div>
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg z-20">
                                <button
                                    className="block w-full px-4 font-bold text-white py-2 text-left rounded-lg bg-red-600  transition-all duration-500"
                                    onClick={handleLogout}
                                >
                                    Cerrar sesión
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
            <button onClick={() => setIsOpen(!isOpen)} className="sm:hidden">
                <FaBars />
            </button>
        </header>
    );
}
