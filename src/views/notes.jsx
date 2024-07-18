import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import axios from "axios";

export const Notes = (state) => {
  const [color, setColor] = useState("#ffe922");
  const [newNotes, setNewNotes] = useState([]);
  const [add, setAdd] = useState(false);
  const [editingNote, setEditingNote] = useState({title: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  

  useEffect(() => {
    const fetchedNotes = async () => {
      setNewNotes([]);
      try {
        const response = await axios.get("http://localhost:3000/notes");
        setNewNotes(response.data);
        setLoading(false);
      } catch (error) {
        setErrors(error);
      }
    };
    fetchedNotes();
  }, []);

  const addbtn = () => {
    setAdd(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target[0].value && e.target[1].value) {
      if (e.target[0].value.length > 20) {
        alert("Title is too long, please keep it under 20 characters");
        return;
      }
      const newNote = {
        title: e.target[0].value,
        content: e.target[1].value,
        color: color,
      };
      setAdd(false);
      axios
        .post("http://localhost:3000/notes", newNote)
        .then((response) => {
          setNewNotes((prevNotes) => [...prevNotes, response.data]);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Please enter a title and a note!");
    }
  };

  const handleDelete = (id) => {

    axios
      .delete(`http://localhost:3000/notes/soft/${id}`)
      .then((response) => {
        setNewNotes(
          newNotes.map((note) =>
            note._id === id ? { ...note, isDeleted: true } : note
          )
        );        
      })
      .catch((error) => {
        console.log(error);
      });
    
  };

  const handleEdit = (id) => {
    console.log(id);
    const note = newNotes.find((note) => note._id === id);
    setEditingNote({
      id: note._id,
      title: note.title,
      content: note.content
    });
  };

  const handleUpdateNote = (id) => {
    const updatedNote = {
      title: editingNote.title,
      content: editingNote.content
    };

    axios
      .put(`http://localhost:3000/notes/${id}`, updatedNote)
      .then((response) => {
        console.log(response.data);
        setNewNotes(newNotes.map((note) => (note._id === id ? response.data : note)));
        setEditingNote("");
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const isLight = (color) => {
    if (color) {
      const hex = color.replace("#", "");
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);

      const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
      return hsp > 127.5;
    }
  };

  return (
    <div>
      <button onClick={addbtn} className="addBTN">
        +
      </button>
      <div className="notes_body">
        {add && (
          <div className="container_notes">
            <HexColorPicker color={color} onChange={setColor} className="colorpicker" />
            <div className="notes_note" style={{ background: color }}>
              <form onSubmit={(e) => handleSubmit(e)}>
                <input
                  autoFocus
                  type="text"
                  placeholder="Enter your title here"
                  style={{ color: isLight(color) ? "black" : "white" }}
                  className="title"
                />
                <textarea
                  type="text"
                  placeholder="Enter your note here"
                  style={{ color: isLight(color) ? "black" : "white" , width: '100%', padding: '8px', boxSizing: 'border-box', resize: 'none'  }}
                />
                <button type="submit" className="submitBTN">
                  ✔️
                </button>
                <button onClick={() => setAdd(false)} className="deletebtn">
                  X
                </button>
              </form>
            </div>
          </div>
        )}

        {newNotes && newNotes.filter((note) => !note.isDeleted).map((note, index) => (
          <div
            key={index}
            className="notes_note"
            style={{
              background: note.color,
              color: isLight(note.color) ? "black" : "white",
            }}
          >
            {
              editingNote.id === note._id ? (
                <form
                  style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdateNote(editingNote.id);
                  }}
                  >
                  <input
                    autoFocus
                    type="text"
                    value={editingNote.title}
                    onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
                    style={{ width: '100%', padding: '8px', boxSizing: 'border-box', fontWeight: 'bold', color: isLight(note.color) ? "black" : "white" }}
                  />
                  <textarea
                    value={editingNote.content}
                    onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })}
                    style={{ width: '100%', padding: '8px', boxSizing: 'border-box', resize: 'none',color: isLight(note.color) ? "black" : "white" }}
                  />
                  <button type="submit" className="submitBTN">✔️</button>
                </form>
              ) : (
              <>
                <p style={{fontWeight:"bold"}}>{note.title}</p>
                <p className="note_date">{new Date(note.date).toLocaleString()}</p>
                <p style={{marginBottom:"10px"}}>{note.content}</p>
                <button onClick={() => handleDelete(note._id)} className="deletebtn">
                  X
                </button>
                <button onClick={() => handleEdit(note._id)} className="editbtn">
                  ✏️
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
