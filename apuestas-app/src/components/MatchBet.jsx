'use client';

import { useState, useEffect } from "react";
import { FaCalendar } from "react-icons/fa6";
import { BetPopUp } from "./BetPopUp";
import { getAllEquipoLocal } from "@/services/equipolocal.service";
import { getAllEquipoVisitante } from "@/services/equipovisitante.service";
import { TeamHero } from "./TeamHero";

export function MatchBet({ partido }) {
    const [equipoLocal, setEquipoLocal] = useState(null);
    const [equipoVisitante, setEquipoVisitante] = useState(null);
    const [dateMatch, setDateMatch] = useState();
    const imageUrl = "https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2021/06/24/16245558914634.jpg";

    useEffect(() => {
        async function getEquipos() {
            const equipoLocalFetched = await getAllEquipoLocal();
            const equipoVisitanteFetched = await getAllEquipoVisitante();

            equipoLocalFetched.data.forEach((equipo) => {
                if (equipo.idEquipoLocal === partido.idEquipoLocal) {
                    setEquipoLocal({
                        nombre: equipo.nombreEquipoLocal,
                        representante: equipo.representanteEquipoLocal,
                        fechaFundacion: equipo.fechaFundacionLocal,
                    });
                }
            });

            equipoVisitanteFetched.data.forEach((equipo) => {
                if (equipo.idEquipoVisitante === partido.idEquipoVisitante) {
                    setEquipoVisitante({
                        nombre: equipo.nombreEquipoVisitante,
                        representante: equipo.representanteEquipoVisitante,
                        fechaFundacion: equipo.fechaFundacionVisitante,
                    });
                }
            });
        }

        function parseDate() {
            const fechaString = partido.fechaPartido;
            const fecha = new Date(fechaString);
            const createDate = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;
            setDateMatch(createDate);
        }

        getEquipos();
        parseDate();
    }, [partido.idEquipoLocal, partido.idEquipoVisitante, partido.fechaPartido]);

    const [showPopUp, setShowPopUp] = useState(false);

    const handleShowPopUp = () => {
        setShowPopUp(!showPopUp);
    }

    const handleClosePopUp = () => {
        setShowPopUp(false);
    }

    return (
        <div className="relative w-full h-full bg-cover bg-center rounded-xl shadow-lg" style={{ backgroundImage: `url(${imageUrl})` }}>
            <div className="absolute inset-0 bg-gray-900 bg-opacity-80 rounded-xl"></div>
            <div className="relative z-10 flex flex-col justify-between h-full p-5 text-white">
                <div className="flex flex-row justify-between items-center">
                    <TeamHero hasResult={false} equipo={equipoLocal ? equipoLocal.nombre : ""} />
                    <p className="font-bold text-xl">VS</p>
                    <TeamHero isReversed={true} hasResult={false} equipo={equipoVisitante ? equipoVisitante.nombre : ""} />
                </div>
                <div className="mt-5 text-center">
                    <p className="flex flex-row items-center justify-center gap-2 text-lg">
                        <FaCalendar /> {dateMatch}
                    </p>
                    <h2 className="text-3xl font-bold mt-2">{equipoLocal?.nombre} vs {equipoVisitante?.nombre}</h2>
                    <p className="mt-2 text-lg">Place a bet on this match today, get instant cashback and participate in various raffles.</p>
                </div>
                <div className="w-full mt-5 flex justify-center">
                    <button className="w-full max-w-xs bg-gray-800 hover:bg-gray-800 transition-all duration-500 hover:scale-105 py-3 rounded-xl text-lg font-semibold" onClick={handleShowPopUp}>Bet now</button>
                </div>
            </div>
            {showPopUp &&
                <div className="fixed w-[80%] md:w-[50%] lg:w-[30%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
                    <BetPopUp
                        onClose={handleClosePopUp}
                        handleShowPopUp={handleShowPopUp}
                        team1={equipoLocal ? equipoLocal.nombre : ""}
                        team2={equipoVisitante ? equipoVisitante.nombre : ""}
                        partido={partido}
                    />
                </div>
            }
        </div>
    );
};
