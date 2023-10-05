
export const getTrain = ( url ) => {
	return fetch(url)
		.then(res => res.json())
		.then(data => {
			return { success: true, data: data }
		})
		.catch(error => {
			return { success: false, data: error.message }
		})
}