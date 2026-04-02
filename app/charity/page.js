"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

export default function Charity() {
  const [charities, setCharities] = useState([]);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const selectCharity = async (id) => {
    const user = (await supabase.auth.getUser()).data.user;

    await supabase
      .from("profiles")
      .update({ charity_id: id })
      .eq("id", user.id);

    alert("Charity selected");
  };

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("charities").select("*");
      setCharities(data);
    };
    load();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Select Charity</h1>

      {charities.map((c) => (
        <div key={c.id}>
          {c.name}
          <button onClick={()=>selectCharity(c.id)}>Select</button>
        </div>
      ))}
    </div>
  );
}