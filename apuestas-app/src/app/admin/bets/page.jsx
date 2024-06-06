"use client";

import { useEffect, useState } from "react";
import { getAllApuestas, deleteApuesta } from "@/services/bet.service";
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
    const [user, setUser] = useState({});

    useEffect(() => {
        fetchApuestas();
    }, []);

    const fetchApuestas = async () => {
        try {
            const response = await getAllApuestas();
            if (response.status) {
                setApuestas(response.data);

            } else {
                toast.error(response.mensaje);
            }
        } catch (error) {
            console.error("Error fetching apuestas:", error);
            toast.error("Error al obtener las apuestas");
        }
    };

    async function getUserById(id) {
        const response = await getUserById(id);
        if (response.status) {
            return response.data;
            console.log(response.data);
        }
    }


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

                        <TableHead className="w-[20%]">ID Partido</TableHead>
                        <TableHead className="w-[20%]">Cantidad</TableHead>
                        <TableHead className="w-[20%]">ID Usuario</TableHead>
                        <TableHead>Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {apuestas.map((apuesta) => (
                        <TableRow key={apuesta.idApuesta}>
                            <TableCell>{apuesta.idApuestas}</TableCell>

                            <TableCell>{apuesta.idPartido}</TableCell>
                            <TableCell>{apuesta.CantidadApostada}</TableCell>
                            <TableCell>{apuesta.idUsuario}</TableCell>
                            <TableCell>
                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                                    onClick={() => handleDeleteApuesta(apuesta.idApuesta)}
                                >
                                    Eliminar
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
