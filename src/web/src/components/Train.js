import React, { useEffect, useState } from 'react'
import { URLS_API } from './Urls'

const DIRECTIONS = {
	Left: 0,
	Right: 1
}

const ACTION = {
	Hook: 'Enganchar',
	Unhook: 'Desenganchar'
}

export const Train = () => {
	const [train, setTrain] = useState([])
	const [direction, setDirection] = useState('')
	const [value, setValue] = useState('')

	useEffect( () => {
		fetch(URLS_API.GET_URL)
			.then(res => res.json())
			.then(data => setTrain(data))
	},[])

	const { carriage } = train

	const handleInputChange = ({ target }) => {
		setValue({
			[target.name] : target.value
		})
	}

	const handleHook = (e) => {
		e.preventDefault()

		const directionToSend = direction == DIRECTIONS.Right ? DIRECTIONS.Right : DIRECTIONS.Left
		const { carriage } = value

		try {
			fetch(URLS_API.HOOK_URL, {
				method: 'PUT',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					value: carriage,
					direction: directionToSend,
				}),
			})
				.then((response) => response.json())
				.then((data) => setTrain(data))
		} catch (err) {
			console.log(err)
		}
	}

	const handleUnhook = (e) => {
		e.preventDefault()

		const directionToSend = direction == DIRECTIONS.Right ? DIRECTIONS.Right : DIRECTIONS.Left
		const { carriage } = value

		try {
			fetch(URLS_API.UNHOOK_URL, {
				method: 'PUT',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					value: carriage,
					direction: directionToSend,
				}),
			})
				.then((response) => response.json())
				.then((data) => setTrain(data))
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<>
			<h1>Mi tren</h1>
			<hr />
			{JSON.stringify(carriage)}
			
			<input
				type='text'
				onChange={ handleInputChange }
				name='carriage'
				placeholder='Valor del vagón'
			/>

			<div>
				<div>
					<input onClick={() => setDirection(DIRECTIONS.Right)} name='right' type='checkbox' /> Derecha
				</div>
				<div>
					<input onClick={() => setDirection(DIRECTIONS.Left)} name='left' type='checkbox' /> Izquierda
				</div>
			</div>

			<button onClick={ handleHook }> {ACTION.Hook} </button>
			<button onClick={ handleUnhook }> {ACTION.Unhook} </button>
		</>
	)
}