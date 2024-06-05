'use client';

export function MatchCard({ partido }) {
    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg my-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-white">{partido.nombreEquipoLocal} vs {partido.nombreEquipoVisitante}</h3>
                <p className="text-white">{new Date(partido.fechaPartido).toLocaleDateString()}</p>
            </div>
            <div className="flex justify-between items-center mt-2">
                <p className="text-white">Local: {partido.nombreEquipoLocal}</p>
                <p className="text-white">Visitante: {partido.nombreEquipoVisitante}</p>
            </div>
        </div>
    );
}
