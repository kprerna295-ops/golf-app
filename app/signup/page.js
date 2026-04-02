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

  const signup = async () => {
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

      alert("Signup successful");
    }
  };

  return (
    <div className="container">
      <h1>Create Account</h1>

      <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
      <input placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />

      <button onClick={signup}>Signup</button>
    </div>
  );
}