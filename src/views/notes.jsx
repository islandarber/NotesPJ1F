import { useEffect, useState } from "react";

export const Notes = () => {
  const [newNotes, setNewNotes] = useState(["note1", "note2", "note3", "note4", "note5", "note6", "note7", "note8", "note9"]);
  const [error, setError] = useState(null);
  const [add, setAdd] = useState(false);

  // useEffect(async() => {
  //   try {
  //     const response = await axios.post('http://localhost:3000/notes', newNotes, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //   } catch (error) {
  //     setError(error.response.data.message);
  //   }
  // }, []);

  const addbtn = () => {
    setAdd(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNewNotes([...newNotes, e.target[0].value]);
    setAdd(false);
  };



  return (
    <div>
      <h1>Notes</h1>
      <button onClick={addbtn}>+</button>
      <div className="notes_body">

        {add && 
        <div>
          <div className="notes_note">
          <form onSubmit={(e)=>handleSubmit(e)}>
            <input type="text" />
            <button type="submit">Save</button>
          </form>
          </div>
        </div>}

        {newNotes.map((note, index) =>
        <div key={index} className="notes_note">
          <p>{note}</p>
          <button onClick={(note)=>handleDelete(note)}>Delete Note</button>
        </div>)}
      </div>
    </div>
  );
};