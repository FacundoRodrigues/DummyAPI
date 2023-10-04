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
	const [value, setValue] = useState('')
	const [isCheckedLeft, setIsCheckedLeft] = useState(true)
	const [isCheckedRight, setIsCheckedRight] = useState(false)
	const [error, setError] = useState('')

	useEffect( () => {
		fetch(URLS_API.GET_URL)
			.then(res => res.json())
			.then(data => setTrain(data))
	},[])

	const { carriage } = train

	const handleChangeLeft = () => {
		setIsCheckedLeft(!isCheckedLeft)
		if (isCheckedRight) setIsCheckedRight(!isCheckedRight)
	}

	const handleChangeRight = () => {
		setIsCheckedRight(!isCheckedRight)
		if (isCheckedLeft) setIsCheckedLeft(!isCheckedLeft)
	}

	const handleInputChange = ({ target }) => {
		if(!target.validity.valid) return

		setValue({
			[target.name] : target.value
		})
	}

	const handleHook = () => {
		if(value === '')
		{
			setError('Input vacio')
			return
		}

		const directionToSend = isCheckedRight ? DIRECTIONS.Right : DIRECTIONS.Left
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
				.then((data) => {
					setTrain(data)
					setError('')
				})
				.catch((err) => setError(err.message))
		} catch (err) {
			setError(err)
		}
	}

	const handleUnhook = () => {

		const directionToSend = isCheckedRight ? DIRECTIONS.Right : DIRECTIONS.Left
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
				.then((data) => {
					setTrain(data)
					setError('')
				})
				.catch((err) => setError(err.message))
		} catch (err) {
			setError(err)
		}
	}

	return (
		<>
			<h1>Mi tren</h1>
			<hr />

			<header>
				<strong>{JSON.stringify(carriage)}</strong>
			</header>
			
			
			<input
				type='text'
				onChange={ handleInputChange }
				name='carriage'
				placeholder='Valor del vagón'
				pattern="[0-9]*"
				autoComplete='off'
			/>

			<div>
				<div>
					<input 
						onChange={ handleChangeLeft } 
						name='left' 
						type='checkbox'
						checked={isCheckedLeft}
					/> Izquierda
				</div>
				<div>
					<input
						onChange={ handleChangeRight } 
						name='right' 
						type='checkbox'
						checked={isCheckedRight} 
					/> Derecha
				</div>
			</div>

			<button onClick={ handleHook }> {ACTION.Hook} </button>
			<button onClick={ handleUnhook }> {ACTION.Unhook} </button>

			
			{!!error && <p style={{color:'red'}}>{error}</p>}
		</>
	)
}