import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-2xl mt-4">Oops! Page not found.</p>
      <p className="text-lg mt-2">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-transparent border border-primary text-primary rounded-lg shadow hover:bg-primary hover:text-white"
      >
        Go Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
