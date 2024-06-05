export function validateUser(user) {
    if (!user.nombreUsuario || user.nombreUsuario.trim() === "") {
        return { isValid: false, message: "El nombre no puede estar vacío." };
    }
    if (!user.apellidoUsuario || user.apellidoUsuario.trim() === "") {
        return { isValid: false, message: "El apellido no puede estar vacío." };
    }
    if (!user.userName || user.userName.trim() === "") {
        return { isValid: false, message: "El nombre de usuario no puede estar vacío." };
    }
    if (!user.email || user.email.trim() === "") {
        return { isValid: false, message: "El correo no puede estar vacío." };
    }
    if (!user.clave || user.clave.trim() === "") {
        return { isValid: false, message: "La contraseña no puede estar vacía." };
    }
    return { isValid: true, message: "" };
}

export function validateLogin(user) {
    if (!user.userName || user.userName.trim() === "") {
        return { isValid: false, message: "El nombre de usuario no puede estar vacío." };
    }
    if (!user.clave || user.clave.trim() === "") {
        return { isValid: false, message: "La contraseña no puede estar vacía." };
    }
    return { isValid: true, message: "" };
}
