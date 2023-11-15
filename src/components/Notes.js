import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from "../context/notes/noteContext";
import NoteItems from './NoteItems';
import AddNote from './AddNote';

const Notes = (props) => {
    const context = useContext(noteContext);
    const navigate = useNavigate();
    const { notes, getNotes, editNote } = context;

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
        } else {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, []);

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, eTitle: currentNote.Title, eDescription: currentNote.Description, eTag: currentNote.Tag });
    }

    const ref = useRef(null);
    const refcLOSE = useRef(null);
    const [note, setNote] = useState({ id: "", eTitle: "", eDescription: "", eTag: "" });

    const handleClick = (e) => {
        editNote(note.id, note.eTitle, note.eDescription, note.eTag);
        refcLOSE.current.click();
        props.showAlert(":  Updated Notes Successfully", "success");
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    return (
        <>
            <AddNote showAlert={props.showAlert} />
            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel"><b>Edit Note Information</b></h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="eTitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="eTitle" name="eTitle" aria-describedby="emailHelp" required minLength={3} value={note.eTitle} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="eTag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="eTag" name="eTag" aria-describedby="emailHelp" required maxLength={15} value={note.eTag} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="eDescription" className="form-label">Description</label>
                                    <textarea className="form-control" id="eDescription" name="eDescription" rows="5" required minLength={5} value={note.eDescription} onChange={onChange}></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refcLOSE} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={handleClick} className="btn btn-dark">Save Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2>Your Notes</h2>
                <div className="container">
                    {Array.isArray(notes) && notes.length === 0 ? 'No Notes to Display.' : null}
                </div>
                {Array.isArray(notes) && notes.map((note) => (
                    <NoteItems key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note} />
                ))}
            </div>
        </>
    );
}

export default Notes;
