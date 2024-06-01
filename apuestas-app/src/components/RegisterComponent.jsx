"use client";

import Input from "./Input";
import Link from "next/link";
import { useState } from "react";
import { createUser } from "@/services/user.service";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";

export function RegisterComponent() {
    const router = useRouter();

    const [user, setUser] = useState({
        nombreUsuario: "",
        apellidoUsuario: "",
        dui: "00000000-0",
        email: "",
        userName: "",
        clave: "",
        idRol: "1"
    });

    function getName(e) {
        setUser({ ...user, nombreUsuario: e.target.value });
    }

    function getEmail(e) {
        setUser({ ...user, email: e.target.value });
    }

    function getPassword(e) {
        setUser({ ...user, clave: e.target.value });
    }

    function getUserName(e) {
        setUser({ ...user, userName: e.target.value });
    }

    function getApellidoUsuario(e) {
        setUser({ ...user, apellidoUsuario: e.target.value });
    }



    async function submitChanges(e) {
        try {
            e.preventDefault();
            const response = await createUser(user);
            if (response.status) {
                toast.success("Usuario creado correctamente");
                router.push("/");
            } else {
                toast.error("Error al crear usuario");
            }
        }
        catch (error) {
            console.error(error);
        }
    }



    return (
        <div className="flex flex-col justify-center items-center ">
            <h1 className="text-2xl z-10">BetApp login</h1>

            <form className="flex flex-col items-center my-5 gap-5 z-10" onSubmit={submitChanges}>
                <Input placeholder={"Nombre"} type={"text"} value={user.nombreUsuario} onChange={getName} />
                <Input placeholder={"Apellido"} type={"text"} value={user.apellidoUsuario} onChange={getApellidoUsuario} />
                <Input placeholder={"Nombre de usuario"} type={"text"} value={user.userName} onChange={getUserName} />
                <Input placeholder={"Correo"} type={"text"} value={user.email} onChange={getEmail} />
                <Input placeholder={"Contraseña"} type={"password"} value={user.clave} onChange={getPassword} />
                <p className="gap-2 flex flex-row">¿Ya tienes una cuenta?
                    <Link href="/" className="text-blue-700">
                        Registrarse
                    </Link>
                </p>
                <button className="bg-gray-900 px-5 py-2 rounded-lg" type="submit">Iniciar sesión</button>
            </form>

            <div className="absolute z-0 opacity-15 bottom-0">
                <img src="/image/background.png" alt="" />
            </div>
        </div>
    );
};
