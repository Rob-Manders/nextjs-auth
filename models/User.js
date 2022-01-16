
import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true
	},
	hashedPassword: {
		type: String,
		required: true
	},
	verified: {
		type: Boolean,
		default: false
	},
	verificationKey: {
		type: String,
		required: true
	}
})

export default mongoose.models.User || mongoose.model('User', UserSchema)