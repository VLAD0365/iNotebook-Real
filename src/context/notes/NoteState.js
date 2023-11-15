import NoteContext from './noteContext';
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial)

  //Get all Notes
  const getNotes = async (Title, Description, Tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json()
    setNotes(json)
  }

  //Add a Note
  const addNote = async (Title, Description, Tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ Title, Description, Tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note))
  }
  //Delete a Note
  const deleteNote = async (id) => {
    //API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = response.json();
    console.log(json)

    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes);


  }
  //Edit a Note
  const editNote = async (id, Title, Description, Tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ Title, Description, Tag }), // body data type must match "Content-Type" header
    });
    const json = await response.json();
    console.log(json)

    let newNotes = JSON.parse(JSON.stringify(notes))
    //Logic to Edit in Client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].Title = Title;
        newNotes[index].Description = Description;
        newNotes[index].Tag = Tag;
        break;
      }
    }
    setNotes(newNotes)
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;