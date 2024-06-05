"use client";
import { useState, useEffect } from 'react';
import { FaTimes } from "react-icons/fa";
import { getUserById } from "@/services/user.service";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createApuesta } from '@/services/bet.service';
import { validateBet } from '@/validators/betvalidator';
import Link from 'next/link';

export function BetPopUp({ team1, team2, onClose, partido }) {

	const [user, setUser] = useState({});
	const [betQuantity, setBetQuantity] = useState("");
	const [predictionLocal, setPredictionLocal] = useState("");
	const [predictionVisitante, setPredictionVisitante] = useState("");
	const router = useRouter();

	const handlePredictionLocal = (event) => {
		let value = event.target.value.replace(/^0+/, '');
		value = Math.max(0, Math.min(99, value || 0));
		setPredictionLocal(value);
	};

	const handlePredictionVisitante = (event) => {
		let value = event.target.value.replace(/^0+/, '');
		value = Math.max(0, Math.min(99, value || 0));
		setPredictionVisitante(value);
	};

	const handleBetQuantity = (e) => {
		let value = e.target.value.replace(/^0+/, '');
		value = Math.max(0, value || 0);
		if (value > user.puntosUser) {
			toast.error("No tienes suficientes puntos para realizar esta apuesta");
		} else {
			setBetQuantity(value);
		}
	};

	const handleBet = () => {
		const { isValid, message } = validateBet(predictionLocal, predictionVisitante, betQuantity, user.puntosUser);
		if (!isValid) {
			toast.error(message);
			return;
		}

		const bet = {
			idPartido: partido.idPartido,
			idUsuario: user.idUsuario,
			CantidadApostada: betQuantity,
			idEstadoApuesta: 2,
			prediccionEquipoLocal: predictionLocal,
			prediccionEquipoVisitante: predictionVisitante,
		};

		try {
			createApuesta(bet).then((response) => {
				if (response.status) {
					toast.success(
						<div className='flex flex-col items-center justify-center'>
							<p>Apuesta realizada correctamente</p>
							<Link href={"/dashboard/bets"} className='bg-green-800 px-5 py-2 rounded-lg text-white'>Ver apuestas</Link>
						</div>
					);
					onClose();
				} else {
					toast.error("Error al realizar la apuesta");
				}
			});
		} catch (error) {
			toast.error("Error al realizar la apuesta");
		}
	};

	useEffect(() => {
		const userId = localStorage.getItem("userId");
		const userRole = localStorage.getItem("userRole");
		async function getUser() {
			const user = await getUserById(userId);
			if (user.status) {
				setUser(user.data);
			} else {
				router.push("/");
			}
		}

		if (userId && userRole) {
			getUser();
		}
	}, []);

	return (
		<div className="bg-slate-900 p-10 rounded-xl shadow-xl w-full mx-auto">
			<p className="text-center text-lg">Predice el resultado del partido</p>

			<div className="">
				<div className="flex flex-row justify-around items-center mt-5">
					<div className="flex flex-col justify-center items-center">
						<img className="w-14 h-14 object-cover" src="https://seth.usonsonate.edu.sv/img/universidad.png" alt="" />
						<p className="font-bold">{team1}</p>
						<div className="bg-slate-700 mt-5 h-14 w-14 border-4 rounded-xl border-slate-500 flex items-center justify-center">
							<input type="number" value={predictionLocal} onChange={handlePredictionLocal} className="text-center font-bold text-[25px] bg-transparent text-white w-full h-full outline-none appearance-none" />
						</div>
					</div>
					<h2 className="font-bold">VS</h2>
					<div className="flex flex-col justify-center items-center">
						<img className="w-14 h-14 object-cover" src="https://seth.usonsonate.edu.sv/img/universidad.png" alt="" />
						<p className="font-bold">{team2}</p>
						<div className="bg-slate-700 mt-5 h-14 w-14 border-4 rounded-xl border-slate-500 flex items-center justify-center">
							<input value={predictionVisitante} type="number" onChange={handlePredictionVisitante} className="text-center font-bold text-[25px] bg-transparent text-white w-full h-full outline-none appearance-none" />
						</div>
					</div>
				</div>

				<div className="flex flex-col items-start gap-1  mx-5 mt-5">
					<h2 className="font-bold">Cantidad a apostar:</h2>
					<div className="bg-slate-700 border-4 rounded-xl border-slate-500 flex items-center justify-center">
						<input value={betQuantity} onChange={handleBetQuantity} type="number" className="px-4 font-bold text-[25px] bg-transparent text-white w-full h-full outline-none appearance-none" />
					</div>
				</div>

				<div className="flex flex-row w-full mt-5">
					<button onClick={handleBet} className="bg-slate-700 w-full py-3 hover:bg-slate-600 transition-colors duration-200 rounded-xl">Apostar</button>
				</div>
			</div>

			{/* close popup */}
			<div className="absolute top-2 right-2">
				<button onClick={onClose}><FaTimes size={20} /></button>
			</div>

		</div>
	);
}
