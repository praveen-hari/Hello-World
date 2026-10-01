import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 text-center">
      <div>
        <div className="text-8xl mb-6">😕</div>
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">Page Not Found</h2>
        <p className="text-gray-500 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <Link
          to="/"
          className="bg-primary text-black px-8 py-3 rounded-xl font-bold hover:bg-yellow-500 transition-colors inline-block"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
