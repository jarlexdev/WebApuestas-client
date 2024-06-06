'use client';

import Link from 'next/link';
import { FaUserLock } from "react-icons/fa";
import { FaHouseFlag } from "react-icons/fa6";
import { BiWorld } from "react-icons/bi";
import { PiSoccerBallFill } from "react-icons/pi";
import { FaUser } from "react-icons/fa";
import { FaUsersBetweenLines } from "react-icons/fa6";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminLayout({ children }) {

    const router = useRouter();

    function closeSession() {
        localStorage.removeItem("userId");
        localStorage.removeItem("userRole");
        toast.success("Sesión cerrada correctamente");
        router.push("/");
    }

    return (
        <div className="min-h-screen  flex flex-col bg-gray-900 h-full">
            <div className="flex flex-1">
                {/* Sidebar */}
                <aside className="w-64 bg-gray-00 text-white flex-shrink-0 shadow-lg">
                    <h2 className='text-2xl font-bold px-4 pt-2 pb-10 text-white'>Bet Admin</h2>
                    <div className='flex flex-col justify-between'>
                        <nav >
                            <Link href="/admin/roles" className="flex items-center px-4 py-4 font-bold gap-2 hover:bg-gray-700 ">
                                <FaUserLock />
                                Roles
                            </Link>
                            <Link href="/admin/visited-team" className="flex items-center py-4 px-4 font-bold hover:bg-gray-700 gap-2">
                                <FaHouseFlag />
                                Equipos visitantes
                            </Link>
                            <Link href="/admin/local-team" className="flex items-center py-4 px-4 font-bold  hover:bg-gray-700 gap-2">
                                <BiWorld />
                                Equipos locales
                            </Link>

                            <Link href="/admin/matches" className="flex items-center py-4 px-4 font-bold  hover:bg-gray-700 gap-2">
                                <PiSoccerBallFill />
                                Partidos
                            </Link>
                            <Link href="/admin/users" className="flex items-center py-4 px-4 font-bold  hover:bg-gray-700 gap-2">
                                <FaUser />
                                Usuarios
                            </Link>
                            <Link href="/admin/bets" className="flex items-center py-4 px-4 font-bold  hover:bg-gray-700 gap-2">
                                <FaUsersBetweenLines />
                                Apuestas
                            </Link>
                        </nav>
                        <div>
                            <button onClick={closeSession} className="block w-full px-4 font-bold text-white py-2 text-left rounded-lg bg-red-600  transition-all duration-500">
                                Cerrar Sesion
                            </button>
                        </div>
                    </div>
                </aside>
                {/* Content Area */}
                <main className="flex-1 bg-gray-800 p-10">
                    {children}
                </main>
            </div>
        </div>
    );
}
