"use client";

import { useEffect, useState } from 'react';
import { getApuestasByUserId } from "@/services/bet.service";
import { getPartidoById } from "@/services/partidos.service";
import { deleteApuesta } from '@/services/bet.service';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function BetsPage() {
    const [apuestaHistoryInfo, setApuestaHistoryInfo] = useState([]);
    const userId = typeof window !== 'undefined' ? localStorage.getItem("userId") : null;

    async function getApuestas() {
        try {
            const apuestasFetched = await getApuestasByUserId(userId);
            if (apuestasFetched && apuestasFetched.data.length > 0) {
                const apuestasInfo = await Promise.all(apuestasFetched.data.map(async (apuesta) => {
                    const partido = await getPartidoById(apuesta.idPartido);
                    if (partido && partido.data) {
                        return {
                            ...apuesta,
                            equipoVisitante: partido.data.nombreEquipoVisitante,
                            equipoLocal: partido.data.nombreEquipoLocal,
                            idApuestas: apuesta.idApuestas,
                            puntosApostados: apuesta.CantidadApostada,
                            prediccionLocal: apuesta.prediccionEquipoLocal,
                            prediccionVisitante: apuesta.prediccionEquipoVisitante,
                            marcadorLocal: apuesta.marcadorLocalFinal,
                            marcadorVisitante: apuesta.marcadorVisitanteFinal,
                        };
                    } else {
                        return apuesta;
                    }
                }));

                // Invertir el orden de las apuestas
                apuestasInfo.reverse();
                setApuestaHistoryInfo(apuestasInfo);
            } else {
                setApuestaHistoryInfo([]);
            }
        } catch (error) {
            console.error("Error fetching apuestas:", error);
            setApuestaHistoryInfo([]);
        }
    }

    useEffect(() => {


        if (userId) {
            getApuestas();
        } else {
            console.log("userId es undefined");
        }
    }, [userId]);

    async function deleteApuestaF(idApuesta) {
        console.log(idApuesta)
        try {
            const response = await deleteApuesta(idApuesta);
            if (response) {
                toast.success("Apuesta eliminada correctamente");
                getApuestas();
            } else {
                toast.error("Error eliminando apuesta");
            }

        } catch (e) {
            console.error("Error deleting apuesta", e)
        }
    }

    return (
        <div className="py-5">
            <h1 className="text-4xl font-medium my-4 text-center">Mis apuestas</h1>
            <div className="space-y-4">
                <div className="bg-gray-800 rounded-lg">
                    <Table className="text-white">
                        <TableHeader className="text-white">
                            <TableRow className="hover:bg-gray-800">
                                <TableHead className="w-[10%]">#</TableHead>
                                <TableHead className="w-[25%]">Equipo Local</TableHead>
                                <TableHead className="w-[25%]">Equipo Visitante</TableHead>
                                <TableHead className="w-[15%]">Puntos Apostados</TableHead>
                                <TableHead className="w-[15%]">Mi prediccion</TableHead>

                                <TableHead >Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="rounded-lg">
                            {apuestaHistoryInfo.length > 0 ? apuestaHistoryInfo.map((apuesta, index) => (
                                <TableRow key={index} className="hover:bg-gray-700 rounded-lg">
                                    <TableCell className="font-medium">{index + 1}</TableCell>
                                    <TableCell className="font-medium">{apuesta.equipoLocal}</TableCell>
                                    <TableCell className="font-medium">{apuesta.equipoVisitante}</TableCell>
                                    <TableCell className="font-medium">{apuesta.puntosApostados}</TableCell>
                                    <TableCell className="font-">{apuesta.prediccionLocal} - {apuesta.prediccionVisitante}</TableCell>
                                    <TableCell className="flex flex-row justify-start items-center gap-5">
                                        {apuesta.marcadorLocal === null ? (
                                            <button
                                                className="bg-red-900 hover:bg-red-700 text-white py-2 px-4 rounded-lg"
                                                onClick={() => deleteApuestaF(apuesta.idApuestas)}
                                            >
                                                Cancelar
                                            </button>
                                        ) : (
                                            <span className="text-gray-500">Finalizado</span>
                                        )}
                                    </TableCell>

                                </TableRow>
                            )) : <TableRow><TableCell colSpan="5" className="text-center">No hay apuestas :/</TableCell></TableRow>}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
