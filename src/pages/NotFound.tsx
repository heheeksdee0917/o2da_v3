import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <p className="text-black/30 text-sm uppercase tracking-widest mb-4">404</p>
      <h1 className="text-4xl font-light mb-8">Page not found</h1>
      <Link to="/" className="text-sm underline text-black/50 hover:text-black">
        Back to home
      </Link>
    </div>
  );
}