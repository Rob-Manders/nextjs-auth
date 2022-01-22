
import { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { AuthContext } from '../../context/AuthContext'

export default function Register() {
	const router = useRouter()
	const { loggedIn, authCheck } = useContext(AuthContext)
	const [ email, setEmail ] = useState('')
	const [ password, setPassword ] = useState('')
	const [ passwordVerify, setPasswordVerify ] = useState('')
	const [ message, setMessage ] = useState('')
	const [ pageLoaded, setPageLoaded ] = useState(false)
	
	if (loggedIn) router.push('/')

	async function register(event) {
		event.preventDefault()

		try {
			const response = await fetch(`http://localhost:3000/api/auth/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email,
					password,
					passwordVerify
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
			<h1>Register</h1>

			<h3>Message: {message}</h3>

			<form onSubmit={register}>
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
				<label>
					Confirm Password:
					<input
						type="password"
						onChange={(event) => setPasswordVerify(event.target.value)}
						value={passwordVerify}
					/>
				</label>
				<br />
				<button type="submit">Register</button>
			</form>
		</>
	)
}