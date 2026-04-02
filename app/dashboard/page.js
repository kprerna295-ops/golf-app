"use client"
import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function Dashboard() {
  const [score, setScore] = useState("")

  const addScore = async () => {
    const user = (await supabase.auth.getUser()).data.user

    const { data } = await supabase
      .from("scores")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true })

    if (data.length >= 5) {
      await supabase
        .from("scores")
        .delete()
        .eq("id", data[0].id)
    }

    await supabase.from("scores").insert({
      user_id: user.id,
      score: Number(score),
      date: new Date()
    })

    alert("Score added")
  }

  return (
    <div className="p-10">
      <h1 className="text-xl font-bold">Dashboard</h1>

      <input className="border p-2"
        placeholder="Enter score"
        onChange={(e)=>setScore(e.target.value)} />

      <button className="bg-purple-500 text-white px-4 py-2 ml-2"
        onClick={addScore}>
        Add Score
      </button>
    </div>
  )
}
