
// import initCors from '../../../utils/initCors'
import jwt from 'jsonwebtoken'
import { getCookie } from 'cookies-next'
import initCors from '../../../utils/initCors'

const cors = initCors(['GET'])

export default async function handler(req, res) {
	await cors(req, res)

	if (req.method === 'GET') {
		try {
			const token = getCookie('token', {req, res})

			if (!token) return res.json(false)

			jwt.verify(token, process.env.JWT_SECRET)

			return res.send(true)
		} catch (error) {
			console.error(error)
			return res.send(false)
		}
	} else {
		return res.status(400).json({ message: 'Bad request.' })
	}
}