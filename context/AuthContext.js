
import { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

export default function AuthContextProvider({ children }) {
	const [ loggedIn, setLoggedIn ] = useState(undefined)

	async function authCheck() {
		const response = await fetch(`http://localhost:3000/api/auth/loggedin`, {
			method: 'GET',
			credentials: 'same-origin'
		})
		const { loggedIn } = await response.json()
		setLoggedIn(loggedIn)
	}

	useEffect(() => {
		authCheck()
	}, [])

	return (
		<AuthContext.Provider value={{ loggedIn, authCheck }}>
			{children}
		</AuthContext.Provider>
	)
}