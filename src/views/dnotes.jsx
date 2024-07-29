import { useEffect, useState } from "react";
import axios from "axios";

export const DNotes = () => {
  const [newdNotes, setNewdNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const fetchedNotes = async () => {
      setLoading(true); // Ensure loading state is true when fetching starts
      setErrors(null);  // Clear previous errors
      try {
        const response = await axios.get("http://localhost:3000/notes/deleted");
        setNewdNotes(response.data);
        console.log(response.data);
      } catch (error) {
        setErrors("Failed to fetch notes. Please try again later.");
      } finally {
        setLoading(false); // Set loading to false once fetching is complete
      }
    };
    fetchedNotes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/notes/${id}`);
      setNewdNotes(newdNotes.filter((note) => note._id !== id));
    } catch (error) {
      setErrors("Failed to delete note. Please try again.");
    }
  };

  const handleRestore = async (id) => {
    try {
      await axios.put(`http://localhost:3000/notes/${id}`, { isDeleted: false });
      setNewdNotes(newdNotes.filter((note) => note._id !== id));
    } catch (error) {
      setErrors("Failed to restore note. Please try again.");
    }
  };

  return (
    <div>
      <div className="notes_body">
        {loading ? (
          <div className="flex justify-center h-screen">
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
          <h1 className="mt-10 text-lg text-pink-400">No Deleted Notes Found.</h1>
        )}
      </div>
    </div>
  );
};
