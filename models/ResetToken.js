
import mongoose from 'mongoose'

const ResetTokenSchema = new mongoose.Schema({
	createdAt: {
		type: Date,
		expires: 3600,
		default: Date.now()
	},
	userId: {
		type: String,
		required: true
	},
	hashedResetToken: {
			type: String,
			required: true
	}
})

export default mongoose.models.ResetToken || mongoose.model('ResetToken', ResetTokenSchema)