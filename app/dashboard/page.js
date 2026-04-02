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
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    if (!user) return;

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    setProfile(data);
  };

  // Subscribe
  const subscribe = async (planType) => {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    if (!user) return;

    await supabase.from("profiles").update({
      subscription_status: "active",
      plan: planType
    }).eq("id", user.id);

    loadProfile();
  };

  // Add score (PRD correct)
  const addScore = async () => {

    if (!score) {
      alert("Enter a score");
      return;
    }

    if (score < 1 || score > 45) {
      alert("Score must be between 1 and 45");
      return;
    }

    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    if (!user) {
      alert("Please login first");
      return;
    }

    const { data } = await supabase
      .from("scores")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true });

    // Keep only last 5 scores
    if (data.length >= 5) {
      await supabase
        .from("scores")
        .delete()
        .eq("id", data[0].id);
    }

    await supabase.from("scores").insert({
      user_id: user.id,
      score: Number(score),
      created_at: new Date()
    });

    setScore("");
    loadScores();
  };

  // Load scores
  const loadScores = async () => {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    if (!user) return;

    const { data } = await supabase
      .from("scores")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    setScores(data || []);
  };

  useEffect(() => {
    loadProfile();
    loadScores();
  }, []);

  return (
    <div className="container">

      <h1>Dashboard</h1>

      <p><b>Subscription:</b> {profile?.subscription_status || "inactive"}</p>

      <button onClick={() => subscribe("monthly")}>
        Monthly Plan
      </button>

      <button onClick={() => subscribe("yearly")}>
        Yearly Plan
      </button>

      {profile?.subscription_status !== "active" && (
        <p style={{ color: "red" }}>
          Please subscribe to unlock features
        </p>
      )}

      <h2>Add Score</h2>

      <input
        type="number"
        placeholder="Enter score (1-45)"
        value={score}
        onChange={(e) => setScore(e.target.value)}
      />

      <button onClick={addScore}>
        Add Score
      </button>

      <h2>Last 5 Scores</h2>

      {scores.length === 0 && <p>No scores yet</p>}

      {scores.map((s) => (
        <div key={s.id}>
          {s.score}
        </div>
      ))}

    </div>
  );
}