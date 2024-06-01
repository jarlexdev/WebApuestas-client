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
import { getRoles, addRole, deleteRole, updateRole } from "@/services/roles.service";
import { FaTimes } from 'react-icons/fa';

export default function Page() {
    const [roles, setRoles] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentRole, setCurrentRole] = useState(null);
    const [newRole, setNewRole] = useState('');

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            const data = await getRoles();
            setRoles(data.data);
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    };

    const handleAddRole = async () => {
        try {
            await addRole({ tipoRol: newRole });
            setNewRole('');
            setShowAddModal(false);
            fetchRoles();
        } catch (error) {
            console.error('Error adding role:', error);
        }
    };

    const handleDeleteRole = async (id) => {
        try {
            await deleteRole(id);
            fetchRoles();
        } catch (error) {
            console.error('Error deleting role:', error);
        }
    };

    const handleEditRole = async () => {
        try {
            await updateRole(currentRole.idRol, { tipoRol: newRole });
            setCurrentRole(null);
            setNewRole('');
            setShowEditModal(false);
            fetchRoles();
        } catch (error) {
            console.error('Error updating role:', error);
        }
    };

    return (
        <div>
            <div className="flex flex-row justify-between items-center w-full">
                <h2 className="text-white text-4xl my-5">Roles</h2>
                <button
                    className="flex flex-row justify-start gap-2 items-center bg-gray-900 hover:bg-gray-600 text-white py-4 shadow-sm shadow-gray-900 px-7 rounded-lg"
                    onClick={() => setShowAddModal(true)}
                >
                    <IoAdd size={25} /> Agregar rol
                </button>
            </div>
            <Table className="text-white">
                <TableHeader className="text-white">
                    <TableRow className="hover:bg-gray-800">
                        <TableHead className="w-[70%]">Nombre del rol</TableHead>
                        <TableHead>Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {roles.map((role) => (
                        <TableRow key={role.idRol} className="hover:bg-gray-700">
                            <TableCell className="font-medium">{role.tipoRol}</TableCell>
                            <TableCell className="flex flex-row justify-start items-center gap-5">
                                <button
                                    className="bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded-lg"
                                    onClick={() => {
                                        setCurrentRole(role);
                                        setNewRole(role.tipoRol);
                                        setShowEditModal(true);
                                    }}
                                >
                                    Editar
                                </button>
                                <button
                                    className="bg-red-900 hover:bg-red-700 text-white py-2 px-4 rounded-lg"
                                    onClick={() => handleDeleteRole(role.idRol)}
                                >
                                    Eliminar
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Add Role Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg relative">
                        <button
                            className="absolute top-2 right-2 text-gray-400 hover:text-white"
                            onClick={() => setShowAddModal(false)}
                        >
                            <FaTimes />
                        </button>
                        <h2 className="text-2xl font-bold mb-4">Agregar Rol</h2>
                        <label htmlFor="role">Nombre del rol:</label>
                        <input
                            type="text"
                            name="role"
                            value={newRole}
                            placeholder="Ej: Administrador"
                            onChange={(e) => setNewRole(e.target.value)}
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
                                className="bg-gray-900 hover:bg-gray-700 text-white py-2 px-4 rounded"
                                onClick={handleAddRole}
                            >
                                Agregar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Role Modal */}
            {showEditModal && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg relative">
                        <button
                            className="absolute top-2 right-2 text-gray-400 hover:text-white"
                            onClick={() => setShowEditModal(false)}
                        >
                            <FaTimes />
                        </button>
                        <h2 className="text-xl font-bold mb-4">Editar Rol</h2>
                        <label htmlFor="role">Nombre del rol:</label>
                        <input
                            type="text"
                            name="role"
                            value={newRole}
                            onChange={(e) => setNewRole(e.target.value)}
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
                                onClick={handleEditRole}
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
