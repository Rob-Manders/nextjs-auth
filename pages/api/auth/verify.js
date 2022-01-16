
import jwt from 'jsonwebtoken'
import initCors from '../../../utils/initCors'
import dbConnect from '../../../lib/dbConnect'
import User from '../../../models/User'

const cors = initCors(['POST'])

export default async function handler(req, res) {
	await cors(req, res)
	await dbConnect()

	try {
		const { token } = req.body
	
		if (!token) return res.status(400)
		
		const { id, verificationKey } = await jwt.verify(token, process.env.JWT_SECRET)
		const user = await User.findOne({ _id: id })

		if ( user.verified ) return res.status(202).json({ message: 'Already verified.' })

		if (user.verificationKey === verificationKey) {
			await User.findByIdAndUpdate(
				{ _id: id },
				{
					verified: true,
					verificationKey: ''
				}
			)
		} else {
			return res.status(202).json({ message: 'Incorrect verification key.'})
		}

		return res.status(200).json({ message: 'Email verified.' })

	} catch (error) {
		return res.status(500)
	}
}