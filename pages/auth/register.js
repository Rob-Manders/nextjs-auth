
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Register() {
	const router = useRouter()
	const [ loggedIn, setLoggedIn ] = useState(false)
	const [ email, setEmail ] = useState('')
	const [ password, setPassword ] = useState('')
	const [ passwordVerify, setPasswordVerify ] = useState('')
	const [ message, setMessage ] = useState('')
	
	async function loginCheck() {
		const response = await fetch(`http://localhost:3000/api/auth/loggedin`, { method: 'GET' })
		const data = await response.json()
		setLoggedIn(data.loggedIn)
	}

	useEffect(() => {
		loginCheck()
		if (loggedIn === true) router.push('/')
	}, [])

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
			const data = await response.json()

			if (data.success === true) {
				router.push('/')
			} else {
				setMessage(data.message)
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
				<label>
					Password:
					<input
						type="password"
						onChange={(event) => setPassword(event.target.value)}
						value={password}
					/>
				</label>
				<label>
					Confirm Password:
					<input
						type="password"
						onChange={(event) => setPasswordVerify(event.target.value)}
						value={passwordVerify}
					/>
				</label>

				<button type="submit">Register</button>
			</form>
		</>
	)
}