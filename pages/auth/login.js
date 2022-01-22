
import { useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Login() {
	const router = useRouter()
	const { loggedIn, authCheck } = useContext(AuthContext)
	const [ email, setEmail ] = useState('')
	const [ password, setPassword ] = useState('')
	const [ message, setMessage ] = useState('')

	if (loggedIn) router.push('/')

	async function login(event) {
		event.preventDefault()

		try {
			const response = await fetch(`http://localhost:3000/api/auth/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email,
					password
				})
			})
			const { success, message } = await response.json()

			if (success === true) {
				authCheck()
				router.push('/')
			} else {
				setMessage(message)
			}
		} catch (error) {
			setMessage('Unable to fetch response from server.')
		}
	}

	return (
		<>
			<h1>Login</h1>

			<h3>Message: {message}</h3>

			<form onSubmit={login}>
				<label>Email:
					<input
						type="email"
						onChange={(event) => setEmail(event.target.value)}
						value={email}
					/>
				</label>
				<br />
				<label>
					Password:
					<input
						type="password"
						onChange={(event) => setPassword(event.target.value)}
						value={password}
					/>
				</label>
				<br />
				<button type="submit">Login</button>
			</form>

			<Link href="/auth/request-reset">Forgot Password</Link>
		</>
	)
}