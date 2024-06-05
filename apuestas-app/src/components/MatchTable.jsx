'use client';

import { MatchBet } from "./MatchBet";
import { MatchCard } from "./MatchCard";
import { useEffect, useState } from "react";
import { getPartidosNoFinalizados } from "@/services/partidos.service";

export function MatchTable() {
    const [partidos, setPartidos] = useState([]);
    const [partidoActual, setPartidoActual] = useState(null);

    useEffect(() => {
        async function fetchPartidos() {
            try {
                const response = await getPartidosNoFinalizados();
                if (response.status) {
                    const partidosNoFinalizados = response.data;
                    if (partidosNoFinalizados.length > 0) {
                        setPartidoActual(partidosNoFinalizados[0]);
                        setPartidos(partidosNoFinalizados.slice(1));
                    } else {
                        setPartidoActual(null);
                        setPartidos([]);
                    }
                } else {
                    console.error('Error fetching non-finalized matches:', response.message);
                }
            } catch (error) {
                console.error('Error fetching non-finalized matches:', error);
            }
        }

        fetchPartidos();
    }, []);

    return (
        <div className="w-full">
            <h2 className="text-xl font-bold text-white">Partido actual</h2>
            <div className="mt-5">
                {partidoActual ? <MatchBet partido={partidoActual} /> : <h2 className="text-2xl text-center my-28">No hay partidos actuales o próximos :(</h2>}
            </div>

            {partidos.length > 0 && (
                <>
                    <h2 className="text-xl font-bold text-white mt-10">Partidos próximos</h2>
                    <div className="mt-5">
                        {partidos.map((partido) => (
                            <MatchCard key={partido.idPartido} partido={partido} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
