import React, { useContext } from 'react'
import noteContext from "../context/notes/noteContext";


const NoteItems = (props) => {
    const context = useContext(noteContext)
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex">
                        <h5 className="card-title">{note.Title}</h5>
                        <i className="fa-solid fa-trash mx-2" style={{ cursor: "pointer" }} onClick={() => {
                            deleteNote(note._id);
                            props.showAlert(":  Deleted Notes Successfully", "success")
                        }}></i>
                        <i className="fa-solid fa-pen-to-square mx-1" style={{ cursor: "pointer" }} onClick={() => {
                            updateNote(note)
                        }}></i>
                    </div>
                    <h6><span className="badge bg-dark" style={{ boxSizing: "border-box" }}>{note.Tag}</span></h6>
                    <p className="card-text">{note.Description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItems
