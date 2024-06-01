'use client';

import Link from 'next/link';
import { FaUserLock } from "react-icons/fa";
import { FaHouseFlag } from "react-icons/fa6";
import { BiWorld } from "react-icons/bi";
import { PiSoccerBallFill } from "react-icons/pi";
export default function AdminLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-900">
            <div className="flex flex-1">
                {/* Sidebar */}
                <aside className="w-64 bg-gray-00 text-white flex-shrink-0 shadow-lg">
                    <h2 className='text-2xl font-bold px-4 pt-2 pb-10 text-white'>Bet Admin</h2>
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
                    </nav>
                </aside>
                {/* Content Area */}
                <main className="flex-1 bg-gray-800 p-10">
                    {children}
                </main>
            </div>
        </div>
    );
}
