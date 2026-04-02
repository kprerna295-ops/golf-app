"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

export default function Dashboard() {
  const [score, setScore] = useState("");
  const [scores, setScores] = useState([]);
  const [profile, setProfile] = useState(null);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  // Load profile
  const loadProfile = async () => {
    const user = (await supabase.auth.getUser()).data.user;

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    setProfile(data);
  };

  // Add score (5-limit logic)
  const addScore = async () => {
    const user = (await supabase.auth.getUser()).data.user;

    const { data } = await supabase
      .from("scores")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true });

    if (data.length >= 5) {
      await supabase.from("scores").delete().eq("id", data[0].id);
    }

    await supabase.from("scores").insert({
      user_id: user.id,
      score: Number(score),
      created_at: new Date()
    });

    loadScores();
  };

  const loadScores = async () => {
    const user = (await supabase.auth.getUser()).data.user;

    const { data } = await supabase
      .from("scores")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    setScores(data || []);
  };

  const subscribe = async () => {
    const user = (await supabase.auth.getUser()).data.user;

    await supabase
      .from("profiles")
      .update({ subscription_status: "active" })
      .eq("id", user.id);

    loadProfile();
  };

  useEffect(() => {
    loadScores();
    loadProfile();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      <p>Subscription: {profile?.subscription_status}</p>

      <button onClick={subscribe}>
        Activate Subscription
      </button>

      <br /><br />

      <input
        placeholder="Enter score"
        onChange={(e)=>setScore(e.target.value)}
      />

      <button onClick={addScore}>
        Add Score
      </button>

      <h2>Last Scores</h2>

      {scores.map((s) => (
        <div key={s.id}>{s.score}</div>
      ))}
    </div>
  );
}