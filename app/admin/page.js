"use client"

export default function Admin() {

  const generateDraw = () => {
    let numbers = []
    for (let i = 0; i < 5; i++) {
      numbers.push(Math.floor(Math.random() * 45) + 1)
    }

    alert("Draw Numbers: " + numbers.join(", "))
  }

  return (
    <div className="p-10">
      <h1 className="text-xl font-bold">Admin Panel</h1>

      <button className="bg-red-500 text-white px-4 py-2"
        onClick={generateDraw}>
        Run Draw
      </button>
    </div>
  )
}
