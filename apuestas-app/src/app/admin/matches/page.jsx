'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { IoAdd } from "react-icons/io5";
import { useState, useEffect } from "react";
import { getAllPartidos, addPartido, deletePartido, updatePartido, finalizarPartido, getFinalizados } from "@/services/partidos.service";
import { getAllEquipoLocal } from "@/services/equipolocal.service";
import { getAllEquipoVisitante } from "@/services/equipovisitante.service";
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Page() {
    const [partidos, setPartidos] = useState([]);
    const [equiposLocales, setEquiposLocales] = useState([]);
    const [equiposVisitantes, setEquiposVisitantes] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showFinalizarModal, setShowFinalizarModal] = useState(false);
    const [currentPartido, setCurrentPartido] = useState(null);
    const [fechaPartido, setFechaPartido] = useState('');
    const [idEquipoLocal, setIdEquipoLocal] = useState('');
    const [idEquipoVisitante, setIdEquipoVisitante] = useState('');
    const [marcadorLocalFinal, setMarcadorLocalFinal] = useState('');
    const [marcadorVisitanteFinal, setMarcadorVisitanteFinal] = useState('');
    const [finalizados, setFinalizados] = useState([]);

    useEffect(() => {
        fetchPartidos();
        fetchEquipos();
        fetchFinalizados();
    }, []);

    const fetchPartidos = async () => {
        try {
            const data = await getAllPartidos();
            setPartidos(data.data);
        } catch (error) {
            console.error('Error fetching partidos:', error);
            toast.error('Error al obtener los partidos');
        }
    };

    const fetchEquipos = async () => {
        try {
            const dataLocales = await getAllEquipoLocal();
            const dataVisitantes = await getAllEquipoVisitante();
            setEquiposLocales(dataLocales.data);
            setEquiposVisitantes(dataVisitantes.data);
        } catch (error) {
            console.error('Error fetching equipos:', error);
            toast.error('Error al obtener los equipos');
        }
    };

    const fetchFinalizados = async () => {
        try {
            const response = await getFinalizados();
            setFinalizados(response.data.map(f => f.idPartido));
        } catch (error) {
            console.error('Error fetching finalizados:', error);
            toast.error('Error al obtener los partidos finalizados');
        }
    };

    const handleAddPartido = async () => {
        try {
            await addPartido({
                fechaPartido,
                marcadorLocal: 0,
                marcadorVisitante: 0,
                idEquipoLocal,
                idEquipoVisitante
            });
            setFechaPartido('');
            setIdEquipoLocal('');
            setIdEquipoVisitante('');
            setShowAddModal(false);
            fetchPartidos();
            toast.success('Partido agregado correctamente');
        } catch (error) {
            console.error('Error adding partido:', error);
            toast.error('Error al agregar el partido');
        }
    };

    const handleDeletePartido = async (id) => {
        try {
            const response = await deletePartido(id);
            fetchPartidos();
            if (response.status) {
                toast.success('Partido eliminado correctamente');
            } else {
                toast.error(response.mensaje);
            }
        } catch (error) {
            console.error('Error deleting partido:', error);
            toast.error('Error al eliminar el partido');
        }
    };

    const handleEditPartido = async () => {
        try {
            await updatePartido(currentPartido.idPartido, {
                fechaPartido,
                marcadorLocal: 0,
                marcadorVisitante: 0,
                idEquipoLocal,
                idEquipoVisitante
            });
            setCurrentPartido(null);
            setFechaPartido('');
            setIdEquipoLocal('');
            setIdEquipoVisitante('');
            setShowEditModal(false);
            fetchPartidos();
            toast.success('Partido actualizado correctamente');
        } catch (error) {
            console.error('Error updating partido:', error);
            toast.error('Error al actualizar el partido');
        }
    };

    const handleFinalizarPartido = async () => {
        try {
            const response = await finalizarPartido({
                idPartido: currentPartido.idPartido,
                marcadorVisitanteFinal: parseInt(marcadorVisitanteFinal, 10) || 0,
                marcadorLocalFinal: parseInt(marcadorLocalFinal, 10) || 0,
                fechaFinalizacion: new Date().toISOString()
            });
            console.log(response)
            setShowFinalizarModal(false);
            fetchPartidos();
            fetchFinalizados();
            toast.success('Partido finalizado correctamente');
        } catch (error) {
            console.error('Error finalizing partido:', error);
            toast.error('Error al finalizar el partido');
        }
    };

    return (
        <div>
            <div className="flex flex-row justify-between items-center w-full">
                <h2 className="text-white text-4xl my-5">Partidos</h2>
                <button
                    className="flex flex-row justify-start gap-2 items-center bg-gray-900 hover:bg-gray-600 text-white py-4 shadow-sm shadow-gray-900 px-7 rounded-lg"
                    onClick={() => setShowAddModal(true)}
                >
                    <IoAdd size={25} /> Agregar partido
                </button>
            </div>
            <Table className="text-white">
                <TableHeader className="text-white">
                    <TableRow className="hover:bg-gray-800">
                        <TableHead className="w-[20%]">Fecha</TableHead>
                        <TableHead className="w-[30%]">Equipo Local</TableHead>
                        <TableHead className="w-[30%]">Equipo Visitante</TableHead>
                        <TableHead>Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {partidos.map((partido) => (
                        <TableRow key={partido.idPartido} className="hover:bg-gray-700">
                            <TableCell className="font-medium">{new Date(partido.fechaPartido).toLocaleDateString()}</TableCell>
                            <TableCell className="font-medium">{equiposLocales.find(e => e.idEquipoLocal === partido.idEquipoLocal)?.nombreEquipoLocal}</TableCell>
                            <TableCell className="font-medium">{equiposVisitantes.find(e => e.idEquipoVisitante === partido.idEquipoVisitante)?.nombreEquipoVisitante}</TableCell>
                            <TableCell className="flex flex-row justify-start items-center gap-5">
                                <button
                                    className="bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded-lg"
                                    onClick={() => {
                                        setCurrentPartido(partido);
                                        setFechaPartido(new Date(partido.fechaPartido).toISOString().substr(0, 10));
                                        setIdEquipoLocal(partido.idEquipoLocal);
                                        setIdEquipoVisitante(partido.idEquipoVisitante);
                                        setShowEditModal(true);
                                    }}
                                >
                                    Editar
                                </button>
                                <button
                                    className="bg-red-900 hover:bg-red-700 text-white py-2 px-4 rounded-lg"
                                    onClick={() => handleDeletePartido(partido.idPartido)}
                                >
                                    Eliminar
                                </button>
                                {!finalizados.includes(partido.idPartido) && (
                                    <button
                                        className="bg-blue-900 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
                                        onClick={() => {
                                            setCurrentPartido(partido);
                                            setShowFinalizarModal(true);
                                        }}
                                    >
                                        Finalizar
                                    </button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Add Partido Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg relative">
                        <button
                            className="absolute top-2 right-2 text-gray-400 hover:text-white"
                            onClick={() => setShowAddModal(false)}
                        >
                            <FaTimes />
                        </button>
                        <h2 className="text-xl font-bold mb-4">Agregar Partido</h2>
                        <label htmlFor="fecha">Fecha del partido:</label>
                        <input
                            type="date"
                            name="fecha"
                            value={fechaPartido}
                            onChange={(e) => setFechaPartido(e.target.value)}
                            className="p-2 bg-gray-700 outline-none rounded mb-4 w-full"
                        />
                        <label htmlFor="equipoLocal">Equipo Local:</label>
                        <select
                            name="equipoLocal"
                            value={idEquipoLocal}
                            onChange={(e) => setIdEquipoLocal(e.target.value)}
                            className="p-2 bg-gray-700 outline-none rounded mb-4 w-full"
                        >
                            <option value="">Selecciona un equipo local</option>
                            {equiposLocales.map((equipo) => (
                                <option key={equipo.idEquipoLocal} value={equipo.idEquipoLocal}>
                                    {equipo.nombreEquipoLocal}
                                </option>
                            ))}
                        </select>
                        <label htmlFor="equipoVisitante">Equipo Visitante:</label>
                        <select
                            name="equipoVisitante"
                            value={idEquipoVisitante}
                            onChange={(e) => setIdEquipoVisitante(e.target.value)}
                            className="p-2 bg-gray-700 outline-none rounded mb-4 w-full"
                        >
                            <option value="">Selecciona un equipo visitante</option>
                            {equiposVisitantes.map((equipo) => (
                                <option key={equipo.idEquipoVisitante} value={equipo.idEquipoVisitante}>
                                    {equipo.nombreEquipoVisitante}
                                </option>
                            ))}
                        </select>
                        <div className="flex justify-end gap-4">
                            <button
                                className="bg-gray-500 hover:bg-gray-400 text-white py-2 px-4 rounded"
                                onClick={() => setShowAddModal(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                className="bg-blue-500 hover:bg-blue-400 text-white py-2 px-4 rounded"
                                onClick={handleAddPartido}
                            >
                                Agregar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Partido Modal */}
            {showEditModal && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg relative">
                        <button
                            className="absolute top-2 right-2 text-gray-400 hover:text-white"
                            onClick={() => setShowEditModal(false)}
                        >
                            <FaTimes />
                        </button>
                        <h2 className="text-xl font-bold mb-4">Editar Partido</h2>
                        <label htmlFor="fecha">Fecha del partido:</label>
                        <input
                            type="date"
                            name="fecha"
                            value={fechaPartido}
                            onChange={(e) => setFechaPartido(e.target.value)}
                            className="p-2 bg-gray-700 outline-none rounded mb-4 w-full"
                        />
                        <label htmlFor="equipoLocal">Equipo Local:</label>
                        <select
                            name="equipoLocal"
                            value={idEquipoLocal}
                            onChange={(e) => setIdEquipoLocal(e.target.value)}
                            className="p-2 bg-gray-700 outline-none rounded mb-4 w-full"
                        >
                            <option value="">Selecciona un equipo local</option>
                            {equiposLocales.map((equipo) => (
                                <option key={equipo.idEquipoLocal} value={equipo.idEquipoLocal}>
                                    {equipo.nombreEquipoLocal}
                                </option>
                            ))}
                        </select>
                        <label htmlFor="equipoVisitante">Equipo Visitante:</label>
                        <select
                            name="equipoVisitante"
                            value={idEquipoVisitante}
                            onChange={(e) => setIdEquipoVisitante(e.target.value)}
                            className="p-2 bg-gray-700 outline-none rounded mb-4 w-full"
                        >
                            <option value="">Selecciona un equipo visitante</option>
                            {equiposVisitantes.map((equipo) => (
                                <option key={equipo.idEquipoVisitante} value={equipo.idEquipoVisitante}>
                                    {equipo.nombreEquipoVisitante}
                                </option>
                            ))}
                        </select>
                        <div className="flex justify-end gap-4">
                            <button
                                className="bg-gray-500 hover:bg-gray-400 text-white py-2 px-4 rounded"
                                onClick={() => setShowEditModal(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                className="bg-blue-500 hover:bg-blue-400 text-white py-2 px-4 rounded"
                                onClick={handleEditPartido}
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Finalizar Partido Modal */}
            {showFinalizarModal && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg relative">
                        <button
                            className="absolute top-2 right-2 text-gray-400 hover:text-white"
                            onClick={() => setShowFinalizarModal(false)}
                        >
                            <FaTimes />
                        </button>
                        <h2 className="text-xl font-bold mb-4">Finalizar Partido</h2>
                        <label htmlFor="marcadorLocal">Marcador Local:</label>
                        <input
                            type="number"
                            name="marcadorLocal"
                            value={marcadorLocalFinal}
                            onChange={(e) => setMarcadorLocalFinal(parseInt(e.target.value, 10) || 0)}
                            className="p-2 bg-gray-700 outline-none rounded mb-4 w-full"
                        />
                        <label htmlFor="marcadorVisitante">Marcador Visitante:</label>
                        <input
                            type="number"
                            name="marcadorVisitante"
                            value={marcadorVisitanteFinal}
                            onChange={(e) => setMarcadorVisitanteFinal(parseInt(e.target.value, 10) || 0)}
                            className="p-2 bg-gray-700 outline-none rounded mb-4 w-full"
                        />
                        <div className="flex justify-end gap-4">
                            <button
                                className="bg-gray-500 hover:bg-gray-400 text-white py-2 px-4 rounded"
                                onClick={() => setShowFinalizarModal(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                className="bg-blue-500 hover:bg-blue-400 text-white py-2 px-4 rounded"
                                onClick={handleFinalizarPartido}
                            >
                                Finalizar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
