"use client"
import Input from "./Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { loginUser } from "@/services/user.service";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function LoginComponent() {
    const router = useRouter();

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        const userRole = localStorage.getItem("userRole");

        if (userId && userRole) {
            router.push("/dashboard");
            toast.success("Tu inicio de sesión ha sido restaurado");
        }
    }, [router]);

    const [user, setUser] = useState({
        userName: "",
        clave: ""
    });

    function getUsername(e) {
        setUser({ ...user, userName: e.target.value });
    }

    function getPassword(e) {
        setUser({ ...user, clave: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await loginUser(user);
            if (response.status) {
                toast.success("Inicio de sesión exitoso");
                localStorage.setItem("userId", response.user.idUsuario);
                localStorage.setItem("userRole", response.user.idRol);
                router.push("/dashboard");
            } else {
                toast.error("Credenciales invalidas, por favor intente de nuevo");
            }
        } catch (error) {
            toast.success("Error al iniciar sesión " + error);
        }
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl z-10">BetApp login</h1>
            <form className="flex flex-col z-10 items-center my-5 gap-5" onSubmit={handleSubmit}>
                <Input placeholder={"Usuario"} type={"text"} value={user.userName} onChange={getUsername} />
                <Input placeholder={"Contraseña"} type={"password"} value={user.clave} onChange={getPassword} />
                <p className="gap-2 flex flex-row">¿No tienes una aún?
                    <Link href="/register" className="text-blue-700">
                        Crea una
                    </Link>
                </p>
                <button className="bg-gray-900 px-5 py-2 rounded-lg " type="submit">Iniciar sesión</button>
            </form>

            <div className="absolute opacity-15 bottom-0 ">
                <img src="/image/background.png" alt="" />
            </div>
        </div>
    );
};
