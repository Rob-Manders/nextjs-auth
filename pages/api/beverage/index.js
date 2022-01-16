
import initCors from '../../../utils/initCors'

const cors = initCors(['GET'])

export default async function handler(req, res) {
	await cors(req, res)

	try {
		const { beverage } = req.body

		switch(beverage.toLowerCase()) {
			case 'tea':
				res.status(200).json({ message: 'Earl Grey, hot.'})
				break
			default:
				res.status(418).json({ message: 'I\'m a teapot, short and stout.' })
		}
	} catch (error) {
		res.status(500)
	}
}