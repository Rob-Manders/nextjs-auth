
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'


export default function Home() {
  const { loggedIn } = useContext(AuthContext)
  return (
    <>
      <h1>Next.js Auth Test App</h1>

      <h2>{loggedIn ? 'Logged In' : 'Logged Out'}</h2>
    </>
  )
}
