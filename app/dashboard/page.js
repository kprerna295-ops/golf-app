"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        // ✅ Stop if env missing (prevents crash)
        if (!supabaseUrl || !supabaseKey) {
          setError("Missing Supabase env variables");
          return;
        }

        // ✅ Create client ONLY on client side
        const supabase = createClient(supabaseUrl, supabaseKey);

        const { data, error } = await supabase
          .from("users") // change if needed
          .select("*");

        if (error) {
          setError(error.message);
        } else {
          setData(data);
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong");
      }
    }

    fetchData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!error && data.length === 0 && <p>Loading...</p>}

      {data.map((item, index) => (
        <div key={index}>
          <pre>{JSON.stringify(item, null, 2)}</pre>
        </div>
      ))}
    </div>
  );
}
