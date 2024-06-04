'use client';

import { MatchBet } from "./MatchBet";
import { useEffect, useState } from "react";
import { getAllPartidos } from "@/services/partidos.service";

export function MatchTable() {
    const [partido, setPartido] = useState(null);

    useEffect(() => {
        async function fetchPartido() {
            const partidos = await getAllPartidos();
            if (partidos.data.length > 0) {
                setPartido(partidos.data[0]);
            }
        }

        fetchPartido();
    }, []);

    return (
        <div className="w-full">
            <h2 className="text-xl font-bold text-white">Partidos próximos</h2>
            <div className="mt-5">
                {partido ? <MatchBet partido={partido} /> : <p>No hay partidos</p>}

            </div>
        </div>
    );
};
