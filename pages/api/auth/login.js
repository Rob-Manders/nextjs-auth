
import bcrypt from 'bcryptjs'
import { setCookies } from 'cookies-next'
import initCors from '../../../utils/initCors'
import signToken from '../../../utils/signToken'
import dbConnect from '../../../lib/dbConnect'
import User from '../../../models/User'

const cors = initCors(['POST'])

export default async function handler(req, res) {
	await cors(req, res)
	await dbConnect()

	if (req.method === 'POST') {
		try {
			const { email, password } = req.body

			// Validate inputs.
			if (!email || !password) {
				return res.status(400).json({ success: false, message: 'Missing required fields.' })
			}

			const user = await User.findOne({ email })
			if (!user) {
				return res.status(401).json({ success: false, message: 'Incorrect email or password.' })
			}

			const correctPassword = await bcrypt.compare(password, user.hashedPassword)
			if (!correctPassword) {
				return res.status(401).json({ success: false, message: 'Incorrect email or password.' })
			}

			// Sign token.
			const token = signToken({ userId: user._id })

			setCookies('token', token, {req, res})

			return res.status(200).json({ success: true, message: "Logged in successfully." })

		} catch (error) {
			console.log(error)
			return res.status(500)
		}
	} else {
		return res.status(400).json({ success: false, message: 'Bad request.' })
	}
}
