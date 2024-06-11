import { useEffect, useState } from "react";

export const Notes = () => {
  const [newNotes, setNewNotes] = useState([]);
  const [error, setError] = useState(null);

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


  return (
    <div>
      <h1>Notes</h1>
      <div className="notes_body">
        <div className="notes_note">
          <p>
            Note 1
          </p>
        </div>
        <div className="notes_note">
          <p>
            Note 2
          </p>
        </div>
        <div className="notes_note">
          <p>
            Note 3
          </p>
        </div>
      </div>
    </div>
  );
};