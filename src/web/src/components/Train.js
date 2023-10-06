import React, { useEffect, useState } from 'react'
import { getTrain } from '../helpers/getTrain'
import { hookCarriage } from '../helpers/hookCarriage'
import { unhookCarriage } from '../helpers/unhookCarriage'

const DIRECTIONS = {
	Left: 0,
	Right: 1
}

const ACTION = {
	Hook: 'Enganchar',
	Unhook: 'Desenganchar'
}

const PORT = '44318'
const GET_URL = `https://localhost:${PORT}/api/Train`
const HOOK_URL = `https://localhost:${PORT}/api/train/hook`
const UNHOOK_URL = `https://localhost:${PORT}/api/train/unhook`

export const Train = () => {
	const [ train, setTrain] = useState([])
	const [value, setValue] = useState('')
	const [isCheckedLeft, setIsCheckedLeft] = useState(true)
	const [isCheckedRight, setIsCheckedRight] = useState(false)
	const [ error, setError] = useState('')

	useEffect( () => {
		getTrain(GET_URL)
			.then(response => {
				if(response.success) setTrain(response.data)
				else setError(response.data)
			})
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
		if(value === '' || value.carriage === '')
		{
			setError('Input vacio')
			return
		}
		const { carriage } = value

		const body = {
			carriage: carriage,
			directionToSend: isCheckedRight ? DIRECTIONS.Right : DIRECTIONS.Left
		}

		hookCarriage( HOOK_URL, { body })
			.then(response => {
				if(response.success){
					setTrain(response.data)
					setError('')
				}
				else{
					setError(response.data)
				}
			})
	}

	const handleUnhook = () => {
		const directionToSend = isCheckedRight ? DIRECTIONS.Right : DIRECTIONS.Left

		unhookCarriage( UNHOOK_URL, { directionToSend })
			.then(response => {
				if(response.success){
					setTrain(response.data)
					setError('')
				}
				else{
					setError(response.data)
				}
			})
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