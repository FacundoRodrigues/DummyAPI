export const hookCarriage = ( url, { body }) => {
	return fetch(url, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			value: body.carriage,
			direction: body.directionToSend,
		}),
	})
		.then((response) => response.json())
		.then((data) => {
			return { success: true, data: data }
		})
		.catch((error) => {
			return { success: false, data: error.message }
		})
}