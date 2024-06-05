export function validateBet(predictionLocal, predictionVisitante, betQuantity, userPoints) {
    if (betQuantity <= 0) {
        return { isValid: false, message: "No puedes apostar 0 puntos o una cantidad negativa" };
    }
    if (betQuantity > userPoints) {
        return { isValid: false, message: "No puedes apostar esa cantidad de puntos" };
    }
    if (predictionLocal < 0 || predictionVisitante < 0) {
        return { isValid: false, message: "Las predicciones no pueden ser negativas" };
    }
    if (/^0\d+$/.test(predictionLocal) || /^0\d+$/.test(predictionVisitante)) {
        return { isValid: false, message: "Las predicciones no pueden tener ceros a la izquierda" };
    }
    return { isValid: true, message: "" };
}
