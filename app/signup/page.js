"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const handleSignup = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (!error) {
      await supabase.from("profiles").insert({
        id: data.user.id,
        email,
        subscription_status: "inactive"
      });

      alert("Signup success");
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <input onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/>
      <input onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}