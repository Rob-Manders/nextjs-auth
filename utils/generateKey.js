
import bcrypt from 'bcryptjs'

export default async function generateKey(length = 32) {
	return new Promise((resolve, reject) => {
		try {
			const key = bcrypt.genSalt(length)
			resolve(key)
		} catch (error) {
			reject(error)
		}
	}
	)
}