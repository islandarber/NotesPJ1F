import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";

export const Notes = (state) => {
  const [color, setColor] = useState("#ffe922");
  const [newNotes, setNewNotes] = useState([]);
  const [deletedNotes, setDeletedNotes] = useState([]);
  const [add, setAdd] = useState(false);
  // Updated state to track editing status and value
  const [editingNote, setEditingNote] = useState({ index: -1, value: "" });

  const addbtn = () => {
    setAdd(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!e.target[0].value) {
      alert("Please enter a note");
      return;
    }
    setNewNotes([...newNotes, { note: e.target[0].value, color: color }]);
    setAdd(false);
  };

  const handleDelete = (index) => {
    const newNoteArr = [...newNotes.slice(0, index), ...newNotes.slice(index + 1)];
    setNewNotes(newNoteArr);
    setDeletedNotes([...deletedNotes, newNotes[index]]);
  };

  const handleClear = (index) => {
    const newNoteArr = [...deletedNotes.slice(0, index), ...deletedNotes.slice(index + 1)];
    setDeletedNotes(newNoteArr);
  };

  const handleEdit = (index) => {
    setEditingNote({ index, value: newNotes[index].note });
  };

  const handleUpdateNote = (index, value) => {
    const updatedNotes = [...newNotes];
    updatedNotes[index] = { ...updatedNotes[index], note: value };
    setNewNotes(updatedNotes);
    // Reset editing state
    setEditingNote({ index: -1, value: "" });
  };

  const isLight = (color) => {
    // Convert hex color to RGB
    if (color) {
      const hex = color.replace("#", "");
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);

      // Using the HSP formula to determine lightness
      const hsp = Math.sqrt(
        0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b)
      );

      // If HSP value is greater than 127.5, the color is light
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
            <HexColorPicker
              color={color}
              onChange={setColor}
              className="colorpicker"
            />
            <div className="notes_note" style={{ background: color }}>
              <form onSubmit={(e) => handleSubmit(e)}>
                <input
                  autoFocus
                  type="text"
                  placeholder="Enter your note here"
                  style={{ color: isLight(color) ? "black" : "white" }}
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

        {newNotes.map((note, index) => (
          <div
            key={index}
            className="notes_note"
            style={{
              background: note.color,
              color: isLight(note.color) ? "black" : "white",
            }}
          >
            {editingNote.index === index ? (
              <textarea
                autoFocus
                style={{ textAlign: "left", verticalAlign: "top" }}
                value={editingNote.value}
                onChange={(e) =>
                  setEditingNote({ ...editingNote, value: e.target.value })
                }
                onBlur={() => handleUpdateNote(index, editingNote.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleUpdateNote(index, editingNote.value)
                }
              />
            ) : (
              <>
                <p>{note.note}</p>
                <button onClick={() => handleDelete(index)} className="deletebtn">
                  X
                </button>
                <button onClick={() => handleEdit(index)} className="editbtn">
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
