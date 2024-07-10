import { useEffect, useState } from "react";
import axios from "axios";

export const DNotes = (state) => {
  const [newdNotes, setNewdNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  

  useEffect(() => {
    const fetchedNotes = async () => {
      setNewdNotes([]);
      try {
        const response = await axios.get("http://localhost:3000/notes/deleted");
        setNewdNotes(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        setErrors(error);
      }
    };
    fetchedNotes();
  }, []);


  const handleDelete = async(id) => {
    try {
      const response =await axios.delete(`http://localhost:3000/notes/${id}`);
      setNewdNotes(newdNotes.filter((note) => note._id !== id));
    } catch (error) {
      setErrors(error);
    }
    
  };

  const handleRestore = async(id) => {
      
      try {
        const response = await axios.put(`http://localhost:3000/notes/${id}`, {isDeleted: false});
        setNewdNotes(newdNotes.filter((note) => note._id !== id));
      } catch (error) {
        setErrors(error);
      }
  };



  return (
    <div>
      <div className="notes_body">
        {newdNotes && newdNotes.map((note, index) => (
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
                <button onClick={() => handleRestore(note._id)} className="editbtn">
                  Restore
                </button>
              </>
          </div>
        ))}
      </div>
    </div>
  );
};
