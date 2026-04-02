"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
  );

  const signup = async () => {
    console.log("Signup clicked");

    if (!email || !password) {
      alert("Enter email and password");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    console.log(data, error);

    if (error) {
      alert(error.message);
      return;
    }

    if (data?.user) {
      await supabase.from("profiles").insert({
        id: data.user.id,
        email: email,
        subscription_status: "inactive",
        plan: "monthly",
      });

      alert("Signup successful!");
    }
  };

  return (
    <div className="container">
      <h1>Signup</h1>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={signup}>Signup</button>
    </div>
  );
}