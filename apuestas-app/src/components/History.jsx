"use client"
import { TeamHero } from "./TeamHero";
import { getApuestasByUserId } from "@/services/bet.service";
import { useEffect, useState } from "react";
import { getPartidoById } from "@/services/partidos.service";

export function History() {
    const [apuestaHistoryInfo, setApuestaHistoryInfo] = useState([]);
    const [activeSection, setActiveSection] = useState("activeBets"); // "activeBets" or "historicalBets"
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        async function getApuestas() {
            const apuestasFetched = await getApuestasByUserId(userId);
            const apuestasInfo = await Promise.all(apuestasFetched.length > 0 ? apuestasFetched.data.map(async (apuesta) => {
                const partido = await getPartidoById(apuesta.idPartido);
                return {
                    ...apuesta,
                    equipoVisitante: partido.data.nombreEquipoVisitante,
                    equipoLocal: partido.data.nombreEquipoLocal,
                    puntosApostados: apuesta.CantidadApostada,
                    prediccionLocal: apuesta.prediccionEquipoLocal,
                    prediccionVisitante: apuesta.prediccionEquipoVisitante,
                    marcadorLocal: apuesta.marcadorLocalFinal,
                    marcadorVisitante: apuesta.marcadorVisitanteFinal,
                };
            }) : []);

            // Invertir el orden de las apuestas
            apuestasInfo.reverse();

            setApuestaHistoryInfo(apuestasInfo);
        }

        getApuestas();
    }, [userId]);

    const toggleSection = (section) => {
        setActiveSection(activeSection === section ? null : section);
    };

    const activeBets = apuestaHistoryInfo.filter(apuesta => apuesta.marcadorLocal === null);
    const historicalBets = apuestaHistoryInfo.filter(apuesta => apuesta.marcadorLocal !== null);

    return (
        <div className="py-5">
            <h1 className="text-xl font-medium my-4 text-center">Historial de apuestas</h1>
            <div className="space-y-4">
                <div className={`bg-gray-800 ${activeSection !== "activeBets" ? "rounded-lg" : "rounded-t-lg"}`}>
                    <div
                        className={`flex justify-between items-center p-3 bg-gray-700 cursor-pointer ${activeSection === "activeBets" ? "rounded-t-lg" : "rounded-lg"}`}
                        onClick={() => toggleSection("activeBets")}
                    >
                        <h2 className="text-lg font-semibold">Apuestas Activas</h2>
                        <span className={`transform ${activeSection === "activeBets" ? "rotate-180" : "rotate-0"} transition-transform duration-200`}>
                            ▼
                        </span>
                    </div>
                    {activeSection === "activeBets" && (
                        <div className="h-[30vh] overflow-y-scroll custom-scrollbar p-3 bg-gray-800 rounded-b-lg">
                            {activeBets.length > 0 ? activeBets.map((apuesta, index) => (
                                <div key={index} className="flex flex-row justify-between items-center mb-2 rounded-lg">
                                    <TeamHero hasResult={false} equipo={apuesta.equipoLocal} />
                                    <p className="font-bold text-xl">VS</p>
                                    <TeamHero isReversed={true} hasResult={false} equipo={apuesta.equipoVisitante} />
                                </div>
                            )) : <p className="text-center">No hay apuestas activas</p>}
                        </div>
                    )}
                </div>

                <div className={`bg-gray-800 ${activeSection !== "historicalBets" ? "rounded-lg" : "rounded-t-lg"}`}>
                    <div
                        className={`flex justify-between items-center p-3 bg-gray-700 cursor-pointer ${activeSection === "historicalBets" ? "rounded-t-lg" : "rounded-lg"}`}
                        onClick={() => toggleSection("historicalBets")}
                    >
                        <h2 className="text-lg font-semibold">Apuestas Pasadas</h2>
                        <span className={`transform ${activeSection === "historicalBets" ? "rotate-180" : "rotate-0"} transition-transform duration-200`}>
                            ▼
                        </span>
                    </div>
                    {activeSection === "historicalBets" && (
                        <div className="h-[30vh] overflow-y-scroll custom-scrollbar bg-gray-800 rounded-b-lg">
                            {historicalBets.length > 0 ? historicalBets.map((apuesta, index) => {
                                let color = "gray-500";
                                let separator = "";
                                if (apuesta.marcadorLocal !== null) {
                                    if (apuesta.prediccionLocal === apuesta.marcadorLocal && apuesta.prediccionVisitante === apuesta.marcadorVisitante) {
                                        color = "green-500";
                                        separator = "+";
                                    } else {
                                        color = "red-500";
                                        separator = "-";
                                    }
                                }
                                return (
                                    <div key={index} className={`flex flex-row justify-between items-center gap-4 p-3`}>
                                        <TeamHero hasResult={true} result={apuesta.marcadorLocal} equipo={apuesta.equipoLocal} />
                                        <p className="font-bold text-xl">VS</p>
                                        <TeamHero isReversed={true} hasResult={true} result={apuesta.marcadorVisitante} equipo={apuesta.equipoVisitante} />
                                        <div className={`badge ${separator === "+" ? "bg-green-500" : "bg-red-500"} text-white px-3 py-1 rounded-full`}>
                                            {separator}{apuesta.puntosApostados}
                                        </div>
                                    </div>
                                );
                            }) : <p className="text-center">No hay apuestas pasadas</p>}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
