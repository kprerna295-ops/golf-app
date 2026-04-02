return (
  <div className="container">
    <h1>Select Charity</h1>

    {charities.map((c)=>(
      <div key={c.id}>
        <p>{c.name}</p>
        <button onClick={()=>selectCharity(c.id)}>
         Select Charity
        </button>
      </div>
    ))}
  </div>
);