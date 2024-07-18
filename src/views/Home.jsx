import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-200">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center mx-4">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">Welcome to NotesKite</h1>
        <p className="text-gray-600 mb-6">Your ultimate simple note-taking app.</p>
        <img 
          src="https://www.pngall.com/wp-content/uploads/5/Kite-PNG-High-Quality-Image.png" 
          alt="kite" 
          className="mx-auto mb-6 w-40 h-60"
        />
        <div className="flex justify-center space-x-4">
          <button 
            onClick={() => navigate('/login')} 
            className="px-6 py-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition duration-300"
          >
            Log In
          </button>
          <button 
            onClick={() => navigate('/signup')} 
            className="px-6 py-3 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 transition duration-300"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};
