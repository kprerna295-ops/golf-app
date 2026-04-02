"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

export default function Charity() {

  const [charities, setCharities] = useState([]);
  const [selected, setSelected] = useState(null);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  useEffect(() => {
    const loadCharities = async () => {
      const { data, error } = await supabase
        .from("charities")
        .select("*");

      if (!error) {
        setCharities(data);
      }
    };

    loadCharities();
  }, []);

  const selectCharity = async (id) => {
    const user = (await supabase.auth.getUser()).data.user;

    if (!user) {
      alert("Please login first");
      return;
    }

    await supabase
      .from("profiles")
      .update({ charity_id: id })
      .eq("id", user.id);

    setSelected(id);
  };

  return (
    <div className="container">

      <h1>Select Charity</h1>

      <p>10% of your subscription goes to charity ❤️</p>

      {charities.length === 0 ? (
        <p>Loading...</p>
      ) : (
        charities.map((c) => (
          <div key={c.id} style={{
            marginTop: "15px",
            padding: "10px",
            borderRadius: "10px",
            background: "rgba(255,255,255,0.05)"
          }}>
            <h3>{c.name}</h3>
            <p>{c.description}</p>

            <button onClick={() => selectCharity(c.id)}>
              {selected === c.id ? "Selected ✅" : "Select"}
            </button>
          </div>
        ))
      )}

    </div>
  );
}