
import bcrypt from 'bcryptjs'
import User from '../../../models/User'
import ResetToken from '../../../models/ResetToken'
import signToken from '../../../utils/signToken'
import generateKey from '../../../utils/generateKey'
import dbConnect from '../../../lib/dbConnect'
import initCors from '../../../utils/initCors'

const cors = initCors(['POST'])

export default async function handler(req, res) {
	await cors(req, res)
	await dbConnect()

	if (req.method === 'POST') {
		try {
			const { userId } = req.body

			if ( !userId ) {
				return res.status(400).json({ success: false, message: 'Missing required fields.' })
			}

			const existingUser = await User.findById(userId)
			if (!existingUser) {
				return res.status(400).json({ success: false, message: 'Invalid user ID.' })
			}

			const existingToken = await ResetToken.findOne({ userId })
			if (existingToken) {
				await ResetToken.findByIdAndDelete(existingToken._id)
				console.log('Removed existing token.')
			}

			const resetToken = await generateKey(32)
			const salt = await bcrypt.genSalt()
			const hashedResetToken = await bcrypt.hash(resetToken, salt)
			const encodedToken = signToken({ userId, resetToken }, salt)
			const newResetToken = new ResetToken({
				userId,
				hashedResetToken
			})

			await newResetToken.save()
			// TODO: Put token in an email and remove from HTTP response.

			return res.status(200).json({ 
				success: true, 
				message: 'Requested password reset.',
				encodedToken
			})

		} catch (error) {
			return res.status(500).json({
				success: false
			})
		}
	} else {
		return res.status(400).json({ success: false })
	}
}