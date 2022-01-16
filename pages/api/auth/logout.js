
import initCors from '../../../utils/initCors'
import { removeCookies } from 'cookies-next'

const cors = initCors(['GET'])

export default async function handler(req, res) {
	await cors(req, res)

	if (req.method === 'GET') {
		try {
			removeCookies('token', {req, res})
			res.status(200).json({ message: 'Logged out.'})
		} catch (error) {
			console.error(error)
			return res.status(500)
		}
	} else {
		return res.status(400).json({ message: 'Bad request.' })
	}
}