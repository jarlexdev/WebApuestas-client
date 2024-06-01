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
import { getAllEquipoVisitante, addEquipoVisitante, deleteEquipoVisitante, updateEquipoVisitante } from "@/services/equipovisitante.service";
import { FaTimes } from 'react-icons/fa';

export default function Page() {
    const [equipos, setEquipos] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentEquipo, setCurrentEquipo] = useState(null);
    const [nombreEquipo, setNombreEquipo] = useState('');
    const [representanteEquipo, setRepresentanteEquipo] = useState('');
    const [fechaFundacion, setFechaFundacion] = useState('');

    useEffect(() => {
        fetchEquipos();
    }, []);

    const fetchEquipos = async () => {
        try {
            const data = await getAllEquipoVisitante();
            setEquipos(data.data);
        } catch (error) {
            console.error('Error fetching equipos:', error);
        }
    };

    const handleAddEquipo = async () => {
        try {
            await addEquipoVisitante({
                nombreEquipoVisitante: nombreEquipo,
                representanteEquipoVisitante: representanteEquipo,
                fechaFundacionVisitante: fechaFundacion,
            });
            setNombreEquipo('');
            setRepresentanteEquipo('');
            setFechaFundacion('');
            setShowAddModal(false);
            fetchEquipos();
        } catch (error) {
            console.error('Error adding equipo:', error);
        }
    };

    const handleDeleteEquipo = async (id) => {
        try {
            await deleteEquipoVisitante(id);
            fetchEquipos();
        } catch (error) {
            console.error('Error deleting equipo:', error);
        }
    };

    const handleEditEquipo = async () => {
        try {
            await updateEquipoVisitante(currentEquipo.idEquipoVisitante, {
                nombreEquipoVisitante: nombreEquipo,
                representanteEquipoVisitante: representanteEquipo,
                fechaFundacionVisitante: fechaFundacion,
            });
            setCurrentEquipo(null);
            setNombreEquipo('');
            setRepresentanteEquipo('');
            setFechaFundacion('');
            setShowEditModal(false);
            fetchEquipos();
        } catch (error) {
            console.error('Error updating equipo:', error);
        }
    };

    return (
        <div>
            <div className="flex flex-row justify-between items-center w-full">
                <h2 className="text-white text-4xl my-5">Equipos Visitantes</h2>
                <button
                    className="flex flex-row justify-start gap-2 items-center bg-gray-900 hover:bg-gray-600 text-white py-4 shadow-sm shadow-gray-900 px-7 rounded-lg"
                    onClick={() => setShowAddModal(true)}
                >
                    <IoAdd size={25} /> Agregar equipo
                </button>
            </div>
            <Table className="text-white">
                <TableHeader className="text-white">
                    <TableRow className="hover:bg-gray-800">
                        <TableHead className="w-[30%]">Nombre del equipo</TableHead>
                        <TableHead className="w-[30%]">Representante</TableHead>
                        <TableHead className="w-[30%]">Fecha de fundación</TableHead>
                        <TableHead>Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {equipos.map((equipo) => (
                        <TableRow key={equipo.idEquipoVisitante} className="hover:bg-gray-700">
                            <TableCell className="font-medium">{equipo.nombreEquipoVisitante}</TableCell>
                            <TableCell className="font-medium">{equipo.representanteEquipoVisitante}</TableCell>
                            <TableCell className="font-medium">{new Date(equipo.fechaFundacionVisitante).toLocaleDateString()}</TableCell>
                            <TableCell className="flex flex-row justify-start items-center gap-5">
                                <button
                                    className="bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded-lg"
                                    onClick={() => {
                                        setCurrentEquipo(equipo);
                                        setNombreEquipo(equipo.nombreEquipoVisitante);
                                        setRepresentanteEquipo(equipo.representanteEquipoVisitante);
                                        setFechaFundacion(equipo.fechaFundacionVisitante.split('T')[0]);
                                        setShowEditModal(true);
                                    }}
                                >
                                    Editar
                                </button>
                                <button
                                    className="bg-red-900 hover:bg-red-700 text-white py-2 px-4 rounded-lg"
                                    onClick={() => handleDeleteEquipo(equipo.idEquipoVisitante)}
                                >
                                    Eliminar
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Add Equipo Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg relative">
                        <button
                            className="absolute top-2 right-2 text-gray-400 hover:text-white"
                            onClick={() => setShowAddModal(false)}
                        >
                            <FaTimes />
                        </button>
                        <h2 className="text-xl font-bold mb-4">Agregar Equipo</h2>
                        <label htmlFor="nombre">Nombre del equipo:</label>
                        <input
                            type="text"
                            name="nombre"
                            value={nombreEquipo}
                            placeholder="Ej: Real Madrid"
                            onChange={(e) => setNombreEquipo(e.target.value)}
                            className="p-2 bg-gray-700 outline-none rounded mb-4 w-full"
                        />
                        <label htmlFor="representante">Representante:</label>
                        <input
                            type="text"
                            name="representante"
                            value={representanteEquipo}
                            placeholder="Ej: Florentino Pérez"
                            onChange={(e) => setRepresentanteEquipo(e.target.value)}
                            className="p-2 bg-gray-700 outline-none rounded mb-4 w-full"
                        />
                        <label htmlFor="fechaFundacion">Fecha de fundación:</label>
                        <input
                            type="date"
                            name="fechaFundacion"
                            value={fechaFundacion}
                            onChange={(e) => setFechaFundacion(e.target.value)}
                            className="p-2 bg-gray-700 outline-none rounded mb-4 w-full"
                        />
                        <div className="flex justify-end gap-4">
                            <button
                                className="bg-gray-500 hover:bg-gray-400 text-white py-2 px-4 rounded"
                                onClick={() => setShowAddModal(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                className="bg-blue-500 hover:bg-blue-400 text-white py-2 px-4 rounded"
                                onClick={handleAddEquipo}
                            >
                                Agregar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Equipo Modal */}
            {showEditModal && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg relative">
                        <button
                            className="absolute top-2 right-2 text-gray-400 hover:text-white"
                            onClick={() => setShowEditModal(false)}
                        >
                            <FaTimes />
                        </button>
                        <h2 className="text-xl font-bold mb-4">Editar Equipo</h2>
                        <label htmlFor="nombre">Nombre del equipo:</label>
                        <input
                            type="text"
                            name="nombre"
                            value={nombreEquipo}
                            placeholder="Ej: Real Madrid"
                            onChange={(e) => setNombreEquipo(e.target.value)}
                            className="p-2 bg-gray-700 outline-none rounded mb-4 w-full"
                        />
                        <label htmlFor="representante">Representante:</label>
                        <input
                            type="text"
                            name="representante"
                            value={representanteEquipo}
                            placeholder="Ej: Florentino Pérez"
                            onChange={(e) => setRepresentanteEquipo(e.target.value)}
                            className="p-2 bg-gray-700 outline-none rounded mb-4 w-full"
                        />
                        <label htmlFor="fechaFundacion">Fecha de fundación:</label>
                        <input
                            type="date"
                            name="fechaFundacion"
                            value={fechaFundacion}
                            onChange={(e) => setFechaFundacion(e.target.value)}
                            className="p-2 bg-gray-700 outline-none rounded mb-4 w-full"
                        />
                        <div className="flex justify-end gap-4">
                            <button
                                className="bg-gray-500 hover:bg-gray-400 text-white py-2 px-4 rounded"
                                onClick={() => setShowEditModal(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                className="bg-blue-500 hover:bg-blue-400 text-white py-2 px-4 rounded"
                                onClick={handleEditEquipo}
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
