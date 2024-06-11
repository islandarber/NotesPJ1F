import { useEffect, useState } from "react";
import {axios} from 'axios';

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
      <div>
        <div>
          <p>
            Note 1
          </p>
        </div>
      </div>
    </div>
  );
};