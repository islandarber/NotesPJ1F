import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";

export const DNotes = () => {
  const [newdNotes, setNewdNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const api_url = import.meta.env.VITE_BACKEND_URL;


  const { token } = useAuth();

  useEffect(() => {
    const fetchedNotes = async () => {
      setLoading(true);
      setErrors(null); 
      try {
        const response = await axios.get(`${api_url}/notes/deleted`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
        setNewdNotes(response.data);
        console.log(response.data);
      } catch (error) {
        setErrors("Failed to fetch notes. Please try again later.");
      } finally {
        setLoading(false); // Set loading to false once fetching is complete
      }
    };
    fetchedNotes();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${api_url}/notes/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      setNewdNotes(newdNotes.filter((note) => note._id !== id));
    } catch (error) {
      setErrors("Failed to delete note. Please try again.");
    }
  };

  const handleRestore = async (id) => {
    try {
      await axios.put(`${api_url}/notes/${id}`, { isDeleted: false }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      setNewdNotes(newdNotes.filter((note) => note._id !== id));
    } catch (error) {
      setErrors("Failed to restore note. Please try again.");
    }
  };

  return (
    <div>
      <div className="notes_body">
        {loading ? (
          <div className="flex justify-center h-screen mt-24">
            <div className="relative w-16 h-16">
              <div className="absolute w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
              <div className="absolute w-16 h-16 border-4 border-t-4 border-gray-300 border-solid rounded-full border-t-transparent animate-spin"></div>
            </div>
          </div>
        ) : errors ? (
          <div className="error-message text-red-500">{errors}</div>
        ) : newdNotes && newdNotes.length > 0 ? (
          newdNotes.map((note, index) => (
            <div
              key={index}
              className="notes_note"
              style={{
                background: "grey",
                color: "white",
              }}
            >
              <>
                <p style={{ fontSize: "0.8em", fontWeight: "bold" }}>{note.title}</p>
                <p>{note.content}</p>
                <button onClick={() => handleDelete(note._id)} className="deletebtn">
                  X
                </button>
                <button onClick={() => handleRestore(note._id)} className="editbtn" style={{marginLeft:"10px", fontSize:"0.8em", color:"orange"}}>
                  Restore
                </button>
              </>
            </div>
          ))
        ) : (
          <h1 className="text-lg text-gray-500 font-semibold mt-24 animate-fade-in">
           No archived notes.
        </h1>
        )}
      </div>
    </div>
  );
};
