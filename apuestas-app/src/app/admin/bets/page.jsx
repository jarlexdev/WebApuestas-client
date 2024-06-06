"use client";

import { useEffect, useState } from "react";
import { getAllApuestas, deleteApuesta } from "@/services/bet.service";
import { getUserById } from "@/services/user.service";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function ApuestasPage() {
    const [apuestas, setApuestas] = useState([]);
    const [usuarios, setUsuarios] = useState({});

    useEffect(() => {
        fetchApuestas();
    }, []);

    const fetchApuestas = async () => {
        try {
            const response = await getAllApuestas();
            if (response.status) {
                const apuestasData = response.data;
                const userPromises = apuestasData.map(apuesta => getUserById(apuesta.idUsuario));
                const users = await Promise.all(userPromises);

                const usuariosData = {};
                users.forEach((user, index) => {
                    if (user.status) {
                        usuariosData[apuestasData[index].idUsuario] = user.data.nombreUsuario;
                    }
                });

                setUsuarios(usuariosData);
                setApuestas(apuestasData);
            } else {
                toast.error(response.mensaje);
            }
        } catch (error) {
            console.error("Error fetching apuestas:", error);
            toast.error("Error al obtener las apuestas");
        }
    };

    const handleDeleteApuesta = async (id) => {
        try {
            const response = await deleteApuesta(id);
            if (response.status) {
                toast.success("Apuesta eliminada correctamente");
                fetchApuestas();
            } else {
                toast.error(response.mensaje);
            }
        } catch (error) {
            console.error("Error deleting apuesta:", error);
            toast.error("Error al eliminar la apuesta");
        }
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold my-4">Apuestas</h1>
            <Table className="text-white">
                <TableHeader className="text-white">
                    <TableRow>
                        <TableHead className="w-[10%]">ID</TableHead>
                        <TableHead className="w-[30%]">ID Partido</TableHead>
                        <TableHead className="w-[30%]">Cantidad</TableHead>
                        <TableHead className="w-[30%]">Usuario</TableHead>

                    </TableRow>
                </TableHeader>
                <TableBody>
                    {apuestas.map((apuesta) => (
                        <TableRow key={apuesta.idApuestas}>
                            <TableCell>{apuesta.idApuestas}</TableCell>
                            <TableCell>{apuesta.idPartido}</TableCell>
                            <TableCell>{apuesta.CantidadApostada}</TableCell>
                            <TableCell>{usuarios[apuesta.idUsuario] || "Cargando..."}</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
