import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/noteContext";


function AddNote(props) {
    const context = useContext(noteContext)
    const { addNote } = context;

    const [note, setNote] = useState({ Title: "", Description: "", Tag: "" })
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.Title, note.Description, note.Tag);
        setNote({ Title: "", Description: "", Tag: "" })
        props.showAlert(":  Added Notes Successfully", "success")
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <div className="container my-3">
                <h2>Add Note</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="Title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="Title" name="Title" value={note.Title} aria-describedby="emailHelp" required minLength={3} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="Tag" name="Tag" value={note.Tag} aria-describedby="emailHelp" required maxLength={15} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Description" className="form-label">Description</label>
                        <textarea className="form-control" id="Description" value={note.Description} name="Description" rows="5" required minLength={5} onChange={onChange}></textarea>
                    </div>
                    <button type="submit" className="btn btn-dark" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
