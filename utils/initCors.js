
import Cors from 'cors'
import initMiddleware from '../lib/initMiddleware'

export default function initCors(methods = []) {
	return initMiddleware(
		Cors({
			origin: [
				'http://localhost:3000'
			],
			credentials: true,
			methods
		})
	)
}