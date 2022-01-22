
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  const { loggedIn } = useContext(AuthContext)

  async function logOut() {
    console.log('Do a thing.')
  }

  return (
    <>
      <h1>Next.js Auth Test App</h1>

      <h2>{loggedIn ? 'Logged In' : 'Logged Out'}</h2>

      {
        !loggedIn
        ?
        <>
          <Link href="/auth/login">Login</Link>
          <br />
          <Link href="/auth/register">Register</Link>
        </>
        :
        <button onClick={logOut}>Log Out</button>
      }
    </>
  )
}
