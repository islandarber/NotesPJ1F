import { useEffect, useState, useCallback } from "react";
import { HexColorPicker } from "react-colorful";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";

export const Notes = () => {
  const [color, setColor] = useState("#ffe922");
  const [newNotes, setNewNotes] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingNote, setEditingNote] = useState({ id: null, title: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [pinnedNote, setPinnedNote] = useState(null);
  const [noNotesMessageVisible, setNoNotesMessageVisible] = useState(true);
  const api_url = import.meta.env.VITE_BACKEND_URL;

  const { token } = useAuth();

  const fetchNotes = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${api_url}/notes`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setNewNotes(data);

      // Hide the no notes message if there are notes
      if (data.length > 0) {
        setNoNotesMessageVisible(false);
      }
    } catch (error) {
      setErrors("Failed to fetch notes. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleAddToggle = () => {
    setIsAdding((prev) => {
      if (!prev) setNoNotesMessageVisible(false); // Hide message when adding starts
      return !prev;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    const content = e.target[1].value;

    if (!content) {
      alert("Please enter a note content");
      return;
    }

    if (title.length > 20) {
      alert("Title is too long, please keep it under 20 characters");
      return;
    }

    const newNote = { title, content, color };
    setIsAdding(false);

    try {
      const response = await axios.post(`${api_url}/notes`, newNote, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      setNewNotes((prevNotes) => [...prevNotes, response.data]);
      e.target.reset(); // Reset form fields

      // Hide the no notes message after adding a note
      setNoNotesMessageVisible(false);
    } catch (error) {
      setErrors("Failed to add note. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${api_url}/notes/soft/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      setNewNotes((prevNotes) => {
        const updatedNotes = prevNotes.filter((note) => note._id !== id);
        // Check if there are any notes left after deletion
        if (updatedNotes.length === 0) {
          setNoNotesMessageVisible(true); // Show message if no notes left
        }
        return updatedNotes;
      });

    } catch (error) {
      setErrors("Failed to archive note. Please try again.");
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

  const handleUpdateNote = async () => {
    const updatedNote = {
      title: editingNote.title,
      content: editingNote.content,
    };

    try {
      const response = await axios.put(`${api_url}/notes/${editingNote.id}`, updatedNote, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      setNewNotes((prevNotes) =>
        prevNotes.map((note) => (note._id === editingNote.id ? response.data : note))
      );
      setEditingNote({ id: null, title: "", content: "" });
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
      <button onClick={handleAddToggle} className="addBTN">+</button>
      <div className="notes_body">
        {errors ? (
          <div className="error-message text-red-500">{errors}</div>
        ) : (
          <>
            {isAdding && (
              <div className="container_notes">
                <HexColorPicker color={color} onChange={setColor} className="colorpicker" />
                <div className="notes_note" style={{ background: color }}>
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      placeholder="Title"
                      style={{ color: isLight(color) ? "black" : "white" }}
                      className="title"
                      name="title"
                    />
                    <textarea
                      autoFocus
                      placeholder="Enter your note here"
                      style={{
                        color: isLight(color) ? "black" : "white",
                        width: "100%",
                        height: "100%",
                        padding: "8px",
                        boxSizing: "border-box",
                        resize: "none",
                      }}
                      name="content"
                    />
                    <button type="submit" className="submitBTN">✔️</button>
                    <button type="button" onClick={() => setIsAdding(false)} className="deletebtn">X</button>
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
                          handleUpdateNote();
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
                        <button onClick={() => setPinnedNote(note)} className="pinbtn" title="Pin me">📌</button>
                        <p style={{ fontWeight: "bold" }}>{note.title}</p>
                        <p className="note_date">{new Date(note.date).toLocaleString()}</p>
                        <p className="text-lg" style={{ marginBottom: "10px" }}>{note.content}</p>
                        <button onClick={() => handleDelete(note._id)} className="deletebtn" title="Archive">📁</button>
                        <button onClick={() => handleEdit(note._id)} className="editbtn">✏️</button>
                      </>
                    )}
                  </div>
                ))
              ) : (
                noNotesMessageVisible && (
                  <h1 className="text-lg text-gray-500 font-semibold mt-4 animate-fade-in">
                    No notes available. Press the + button to create your first one.
                  </h1>
                )
              )
            )}
          </>
        )}
      </div>
    </div>
  );
};
