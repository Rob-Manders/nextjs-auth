
import User from '../../../models/User'
import ResetToken from '../../../models/ResetToken'
import dbConnect from '../../../lib/dbConnect'
import initCors from '../../../utils/initCors'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const cors = initCors(['GET', 'POST'])

export default async function handler(req, res) {
	await cors(req, res)
	await dbConnect()

	if (req.method === 'POST') {
		try {
			const { encodedToken, password, passwordVerify } = req.body

			if (!encodedToken || !password || !passwordVerify) res.status(400).json({ message: 'Invalid token' })

			const { userId, resetToken } = await jwt.verify(encodedToken, process.env.JWT_SECRET)
			const token = await ResetToken.findOne({ userId })

			if (!token) return res.status(400).json({ message: 'Invalid token.' })
			const validToken = await bcrypt.compare(resetToken, token.hashedResetToken)

			if (!validToken) return req.status(400).json({ message: 'Invalid token' })

			if (password !== passwordVerify) res.status(400).json({ message: 'Passwords do not match.' })

			const salt = await bcrypt.genSalt()
			const hashedPassword = await bcrypt.hash(password, salt)

			await User.findByIdAndUpdate({ _id: userId }, { hashedPassword })

			await ResetToken.findByIdAndDelete(token._id)

			return res.status(200).json({ message: 'Password updated.' })

		} catch (error) {
			return res.status(500)
		}
	} else {
		return res.status(400)
	}
}