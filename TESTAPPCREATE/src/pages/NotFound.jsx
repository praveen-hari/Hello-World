import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="mb-4">The page you are looking for does not exist.</p>
      <Link to="/" className="text-brand underline">Go home</Link>
    </div>
  );
}
