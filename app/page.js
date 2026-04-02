export default function Home() {
  return (
    <div className="container">
      <h1>Golf Charity Platform</h1>

      <p>
        Track your golf scores, win rewards, and support meaningful charities.
      </p>

      <a className="link" href="/signup">Signup</a>
      <a className="link" href="/login">Login</a>
      <a className="link" href="/dashboard">Dashboard</a>
      <a className="link" href="/charity">Charity</a>
      <a className="link" href="/admin">Admin</a>
    </div>
  );
}