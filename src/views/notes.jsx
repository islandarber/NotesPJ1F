import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import axios from "axios";

export const Notes = () => {
  const [color, setColor] = useState("#ffe922");
  const [newNotes, setNewNotes] = useState([]);
  const [add, setAdd] = useState(false);
  const [editingNote, setEditingNote] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [pinnedNote, setPinnedNote] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/notes");
        setNewNotes(response.data);
      } catch (error) {
        setErrors("Failed to fetch notes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const addbtn = () => setAdd(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    const content = e.target[1].value;

    if (!title || !content) {
      alert("Please enter a title and a note!");
      return;
    }

    if (title.length > 20) {
      alert("Title is too long, please keep it under 20 characters");
      return;
    }

    const newNote = { title, content, color };
    setAdd(false);

    try {
      const response = await axios.post("http://localhost:3000/notes", newNote);
      setNewNotes((prevNotes) => [...prevNotes, response.data]);
    } catch (error) {
      setErrors("Failed to add note. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/notes/soft/${id}`);
      setNewNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === id ? { ...note, isDeleted: true } : note
        )
      );
    } catch (error) {
      setErrors("Failed to delete note. Please try again.");
    }
  };

  const handleEdit = (id) => {
    const note = newNotes.find((note) => note._id === id);
    setEditingNote({
      id: note._id,
      title: note.title,
      content: note.content,
    });
  };

  const handleUpdateNote = async (id) => {
    const updatedNote = {
      title: editingNote.title,
      content: editingNote.content,
    };

    try {
      const response = await axios.put(`http://localhost:3000/notes/${id}`, updatedNote);
      setNewNotes((prevNotes) =>
        prevNotes.map((note) => (note._id === id ? response.data : note))
      );
      setEditingNote({ title: "", content: "" });
    } catch (error) {
      setErrors("Failed to update note. Please try again.");
    }
  };

  const isLight = (color) => {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
    return hsp > 127.5;
  };

  return (
    <div>
      {pinnedNote && (
          <div className="pinned_note_wrapper">
            <div
              className="notes_note"
              style={{
                background: pinnedNote.color,
                color: isLight(pinnedNote.color) ? "black" : "white",
                width: "300px",
              }}
            >
              <button onClick={() => setPinnedNote(null)} className="pinbtn">📍</button>
              <p style={{ fontWeight: "bold" }}>{pinnedNote.title}</p>
              <p>{pinnedNote.content}</p>
            </div>
          </div>
        )}
      <button onClick={addbtn} className="addBTN">+</button>
      <div className="notes_body">
        {errors ? (
          <div className="error-message text-red-500">{errors}</div>
        ) : (
          <>
            {add && (
              <div className="container_notes">
                <HexColorPicker color={color} onChange={setColor} className="colorpicker" />
                <div className="notes_note" style={{ background: color }}>
                  <form onSubmit={handleSubmit}>
                    <input
                      autoFocus
                      type="text"
                      placeholder="Enter your title here"
                      style={{ color: isLight(color) ? "black" : "white" }}
                      className="title"
                    />
                    <textarea
                      placeholder="Enter your note here"
                      style={{
                        color: isLight(color) ? "black" : "white",
                        width: "100%",
                        padding: "8px",
                        boxSizing: "border-box",
                        resize: "none",
                      }}
                    />
                    <button type="submit" className="submitBTN">✔️</button>
                    <button type="button" onClick={() => setAdd(false)} className="deletebtn">X</button>
                  </form>
                </div>
              </div>
            )}
            {loading ? (
              <div className="flex justify-center h-screen">
                <div className="relative w-16 h-16">
                  <div className="absolute w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
                  <div className="absolute w-16 h-16 border-4 border-t-4 border-gray-300 border-solid rounded-full border-t-transparent animate-spin"></div>
                </div>
              </div>
            ) : (
              newNotes.length > 0 ? (
                newNotes.filter((note) => !note.isDeleted).map((note, index) => (
                  <div
                    key={index}
                    className="notes_note"
                    style={{
                      background: note.color,
                      color: isLight(note.color) ? "black" : "white",
                    }}
                  >
                    {editingNote.id === note._id ? (
                      <form
                        style={{ display: "flex", flexDirection: "column", gap: "8px" }}
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
                          style={{
                            width: "100%",
                            padding: "8px",
                            boxSizing: "border-box",
                            fontWeight: "bold",
                            color: isLight(note.color) ? "black" : "white",
                          }}
                        />
                        <textarea
                          value={editingNote.content}
                          onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })}
                          style={{
                            width: "100%",
                            padding: "8px",
                            boxSizing: "border-box",
                            resize: "none",
                            color: isLight(note.color) ? "black" : "white",
                          }}
                        />
                        <button type="submit" className="submitBTN">✔️</button>
                      </form>
                    ) : (
                      <>
                        <button onClick={() => setPinnedNote(note)} className="pinbtn">📌</button>
                        <p style={{ fontWeight: "bold" }}>{note.title}</p>
                        <p className="note_date">{new Date(note.date).toLocaleString()}</p>
                        <p style={{ marginBottom: "10px" }}>{note.content}</p>
                        <button onClick={() => handleDelete(note._id)} className="deletebtn">X</button>
                        <button onClick={() => handleEdit(note._id)} className="editbtn">✏️</button>
                      </>
                    )}
                  </div>
                ))
              ) : (
                <h1 className="text-lg text-pink-400">
                  No Notes Found, Create some with this big plus button on your left! Yey!
                </h1>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
};
