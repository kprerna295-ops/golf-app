"use client";
import { createClient } from "@supabase/supabase-js";

export default function Admin() {

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const runDraw = async () => {

    let nums = [];

    for (let i = 0; i < 5; i++) {
      nums.push(Math.floor(Math.random() * 45) + 1);
    }

    // Save draw
    const { data } = await supabase.from("draws").insert({
      numbers: nums.join(","),
      created_at: new Date(),
      status: "published"
    }).select();

    const drawNumbers = nums;

    // Get users
    const { data: users } = await supabase.from("scores").select("*");

    // Simple match logic
    users.forEach(async (u) => {

      const userScores = [u.score];

      let match = userScores.filter(n => drawNumbers.includes(n)).length;

      if(match >= 3){
        await supabase.from("winners").insert({
          user_id: u.user_id,
          draw_id: data[0].id,
          match_type: match.toString(),
          prize: 100,
          status: "pending"
        });
      }
    });

    alert("Draw executed: " + nums.join(", "));
  };

  return (
    <div className="container">
      <h1>Admin Panel</h1>

      <button onClick={runDraw}>
        Run Monthly Draw
      </button>
    </div>
  );
}