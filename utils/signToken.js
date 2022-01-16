
import jwt from 'jsonwebtoken'

export default function signToken(payload) {
	return jwt.sign(payload, process.env.JWT_SECRET)
}