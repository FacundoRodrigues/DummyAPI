import React from 'react'
import PropTypes from 'prop-types'

export const HookCarriage = ({ action, direction }) => {
	return (
		<>
			<button> {action} a la { direction == 0 ? 'Izquierda' : 'Derecha' }</button>
		</>
	)
}

HookCarriage.propTypes = {
	direction: PropTypes.number.isRequired,
	action: PropTypes.string.isRequired
}