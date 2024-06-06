"use client";

import Input from "./Input";
import Link from "next/link";
import { useState } from "react";
import { createUser } from "@/services/user.service";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import { validateUser } from "@/validators/uservalidator";
import CryptoJS from "crypto-js";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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

    const [showPassword, setShowPassword] = useState(false);

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
        e.preventDefault();

        const { isValid, message } = validateUser(user);
        if (!isValid) {
            toast.error(message);
            return;
        }

        // Encriptar la contraseña antes de enviar
        const encryptedPassword = CryptoJS.MD5(user.clave).toString();
        const userWithEncryptedPassword = { ...user, clave: encryptedPassword };

        try {
            const response = await createUser(userWithEncryptedPassword);
            if (response.status) {
                toast.success("Usuario creado correctamente");
                router.push("/");
            } else {
                toast.error("Error al crear usuario");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error al crear usuario");
        }
    }

    return (
        <div className="flex flex-col justify-center items-center ">
            <h1 className="text-2xl z-10">BetApp Register</h1>

            <form className="flex flex-col items-center my-5 gap-5 z-10" onSubmit={submitChanges}>
                <Input placeholder={"Nombre"} type={"text"} value={user.nombreUsuario} onChange={getName} />
                <Input placeholder={"Apellido"} type={"text"} value={user.apellidoUsuario} onChange={getApellidoUsuario} />
                <Input placeholder={"Nombre de usuario"} type={"text"} value={user.userName} onChange={getUserName} />
                <Input placeholder={"Correo"} type={"text"} value={user.email} onChange={getEmail} />
                <div className="relative">
                    <Input placeholder={"Contraseña"} type={showPassword ? "text" : "password"} value={user.clave} onChange={getPassword} />
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-2 flex items-center text-gray-700"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
                <p className="gap-2 flex flex-row">¿Ya tienes una cuenta?
                    <Link href="/" className="text-blue-700">
                        Inicia sesión
                    </Link>
                </p>
                <button className="bg-gray-900 px-5 py-2 rounded-lg" type="submit">Registrar</button>
            </form>

            <div className="absolute z-0 opacity-15 bottom-0">
                <img src="/image/background.png" alt="" />
            </div>
        </div>
    );
}
