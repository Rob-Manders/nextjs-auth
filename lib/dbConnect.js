
import mongoose from 'mongoose'

if (!MONGODB_URI) {
	throw new Error('Please define the MONGODB_URI envrionment cariable inside .env.local')
}

// Global us used here to maintain a cached connection across hot reloads in development.
// This prevent connections growing exponentially during API route usage.
let cached = global.mongoose

if (!cached) {
	cached = global.mongoose = {
		connection: null,
		promise: null
	}
}

export default async function dbConnect() {
	if (cached.connection) {
		return cached.connection
	}

	if (!cached.connection) {
		const options = { bufferCommands: false }

		cached.promise = mongoose
			.connect(MONGODB_URI, options)
			.then(mongoose => mongoose)
	}

	cached.connection = await cached.promise
	return cached.connection
}