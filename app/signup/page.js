"use client"
import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password
    })

    if (error) alert(error.message)
    else alert("Signup successful")
  }

  return (
    <div className="flex flex-col items-center p-10 gap-4">
      <h1 className="text-2xl font-bold">Signup</h1>

      <input className="border p-2" placeholder="Email"
        onChange={(e)=>setEmail(e.target.value)} />

      <input className="border p-2" type="password"
        placeholder="Password"
        onChange={(e)=>setPassword(e.target.value)} />

      <button className="bg-blue-500 text-white px-4 py-2"
        onClick={handleSignup}>
        Signup
      </button>
    </div>
  )
}
