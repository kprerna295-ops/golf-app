"use client"
import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) alert(error.message)
    else alert("Login successful")
  }

  return (
    <div className="flex flex-col items-center p-10 gap-4">
      <h1 className="text-2xl font-bold">Login</h1>

      <input className="border p-2"
        onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/>

      <input className="border p-2" type="password"
        onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>

      <button className="bg-green-500 text-white px-4 py-2"
        onClick={handleLogin}>
        Login
      </button>
    </div>
  )
}
