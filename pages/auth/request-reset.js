
import { useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useRouter } from 'next/router'

export default function RequestReset() {
	const router = useRouter()
	const { loggedIn } = useContext(AuthContext)
	const [ email, setEmail ] = useState('')
	const [ message, setMessage ] = useState('')

	if (loggedIn) router.push('/')

	async function requestReset(event) {
		event.preventDefault()

		try {
			const response = await fetch(`http://localhost:3000/api/auth/request-reset`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email
				})
			})
			const { success, message } = await response.json()

			setMessage(message)
		} catch (error) {
			setMessage('Unable to fetch response from the server.')
		}
	}
	
	return (
		<>
			<h1>Request Password Reset</h1>

			<h3>Message {message}</h3>

			<form onSubmit={requestReset}>
				<label>
					Email:
					<input
						type="email"
						onChange={(event) => setEmail(event.target.value)}
						value={email}
					/>
				</label>
				<br />
				<button type="submit">Request Reset</button>
			</form>
		</>
	)
}
