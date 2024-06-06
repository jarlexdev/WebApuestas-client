"use client";

import { useEffect, useState } from "react";
import { getAllUsers, deleteUser, updateUser } from "@/services/user.service";
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

export default function UsersPage() {
    const [usuarios, setUsuarios] = useState([]);
    const [editUser, setEditUser] = useState(null);
    const [idRol, setIdRol] = useState("");
    const [puntosUser, setPuntosUser] = useState("");

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const fetchUsuarios = async () => {
        try {
            const response = await getAllUsers();
            if (response.status) {
                setUsuarios(response.data);
            } else {
                toast.error(response.mensaje);
            }
        } catch (error) {
            console.error("Error fetching usuarios:", error);
            toast.error("Error al obtener los usuarios");
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            const response = await deleteUser(id);
            if (response.status) {
                toast.success("Usuario eliminado correctamente");
                fetchUsuarios();
            } else {
                toast.error(response.mensaje);
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            toast.error("Error al eliminar el usuario");
        }
    };

    const handleEditUser = async () => {
        try {
            const updatedUser = {
                ...editUser,
                idRol,
                puntosUser
            };
            const response = await updateUser(editUser.idUsuario, updatedUser);
            console.log(response);
            console.log(editUser);
            if (response.status) {
                toast.success("Usuario actualizado correctamente");
                setEditUser(null);
                fetchUsuarios();
            } else {
                toast.error(response.mensaje);
            }
        } catch (error) {
            console.error("Error updating user:", error);
            toast.error("Error al actualizar el usuario");
        }
    };


    const renderRole = (role) => {
        if (role === 1) return "Jugador";
        if (role === 2) return "Administrador";
        return "Desconocido";
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold my-4">Usuarios</h1>
            <Table className="text-white">
                <TableHeader className="text-white">
                    <TableRow>
                        <TableHead className="w-[10%]">ID</TableHead>
                        <TableHead className="w-[15%]">Nombre</TableHead>
                        <TableHead className="w-[15%]">Apellido</TableHead>
                        <TableHead className="w-[20%]">Email</TableHead>
                        <TableHead className="w-[10%]">Rol</TableHead>
                        <TableHead className="w-[10%]">Puntos</TableHead>
                        <TableHead>Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {usuarios.map((usuario) => (
                        <TableRow key={usuario.idUsuario}>
                            <TableCell>{usuario.idUsuario}</TableCell>
                            <TableCell>{usuario.nombreUsuario}</TableCell>
                            <TableCell>{usuario.apellidoUsuario}</TableCell>
                            <TableCell>{usuario.email}</TableCell>
                            <TableCell>{renderRole(usuario.idRol)}</TableCell>
                            <TableCell>{usuario.puntosUser}</TableCell>
                            <TableCell>
                                <button
                                    className="bg-blue-500 text-white px-2 py-1 rounded"
                                    onClick={() => {
                                        setEditUser(usuario);
                                        setIdRol(usuario.idRol);
                                        setPuntosUser(usuario.puntosUser);
                                    }}
                                >
                                    Editar
                                </button>
                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                                    onClick={() => handleDeleteUser(usuario.idUsuario)}
                                >
                                    Eliminar
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {editUser && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-gray-800 text-white p-6 rounded shadow-md">
                        <h2 className="text-xl font-bold mb-4">Editar Usuario</h2>
                        <label className="block mb-2">Rol:</label>
                        <input
                            type="text"
                            value={idRol}
                            onChange={(e) => setIdRol(e.target.value)}
                            className="p-2 bg-gray-700 outline-none rounded mb-4 w-full"
                        />
                        <label className="block mb-2">Puntos:</label>
                        <input
                            type="number"
                            value={puntosUser}
                            onChange={(e) => setPuntosUser(e.target.value)}
                            className="p-2 bg-gray-700 outline-none rounded mb-4 w-full"
                        />
                        <div className="flex justify-end">
                            <button
                                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                                onClick={() => setEditUser(null)}
                            >
                                Cancelar
                            </button>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                onClick={handleEditUser}
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
