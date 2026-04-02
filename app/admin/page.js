"use client";

export default function Admin() {

  const runDraw = () => {
    let nums = [];

    for (let i = 0; i < 5; i++) {
      nums.push(Math.floor(Math.random() * 45) + 1);
    }

    alert("Draw Numbers: " + nums.join(", "));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Panel</h1>

      <button onClick={runDraw}>
        Run Monthly Draw
      </button>
    </div>
  );
}