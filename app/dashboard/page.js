return (
  <div className="container">
    <h1>Dashboard</h1>

    <p>Subscription: {profile?.subscription_status}</p>

    <button onClick={subscribe}>
      Activate Subscription
    </button>

    <h2>Add Score</h2>

    <input onChange={(e)=>setScore(e.target.value)} />
    <button onClick={addScore}>Add Score</button>

    <h2>Last Scores</h2>

    {scores.map((s)=>(
      <div key={s.id}>{s.score}</div>
    ))}
  </div>
);