import Sidebar from "./components/Sidebar";
import Note from "./components/Note";
import { useEffect, useState } from "react";
// nanoid is a library function used for generating unique IDs
// we need unique identifiers for each note in our application.
import { nanoid } from "nanoid";
import './App.css';

const App = () => {
    const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem("notes")) || []);
    // const [currentNoteId, setCurrentNoteId] = useState(() => notes[0]?.id || "");
   const [currentNoteId, setCurrentNoteId] = useState(() => {
        const firstNoteId = notes[0]?.id;
        return firstNoteId !== undefined ? firstNoteId : "";

    });
    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
        // The setItem method of localStorage allows you to store data in the browser's local storage. In this case, it's storing the notes array.
    }, [notes]);
    // it will run whenever the notes array changes.

    function addNote() {
        const newNote = {id: nanoid(), title: "Untitled", content: "",
            
        };
        setNotes(prevNotes => [...prevNotes, newNote]);
        setCurrentNoteId(newNote.id);
    }

    function updateNote(updatedNote) {
      // This line uses the setNotes function to update the state of some notes.
      //  It takes a function as an argument, which receives the previous state (prevNotes) as its parameter. 
      // It then uses the map method to iterate over each note in the previous state.
        setNotes(prevNotes => prevNotes.map(note => {
          //If they match, it means we've found the note that needs to be updated.
            if (note.id === updatedNote.id) {
                return updatedNote;
            } else {
                return note;
            }
        }));
    }
// searching  notes 
    function getCurrentNote() {
        return notes.find(note => note.id === currentNoteId) || notes[0];
    }

    function deleteNote(noteToDeleteId) {
        setNotes(prevNotes => prevNotes.filter(note => note.id !== noteToDeleteId));

        // this is the condition is used for the delet the slected notes .
        if (noteToDeleteId === currentNoteId && notes.length > 0) {
            setCurrentNoteId(notes[0].id);

        }
    }

    return (
        <>
        {/*  here we are passes the props of the function  and props are in the curely brackets because of the javascript */}
            <Sidebar  notes={notes} addNote={addNote} deleteNote={deleteNote} currentNoteId={currentNoteId} setCurrentNoteId={setCurrentNoteId}
            />
            <Note  
            //  its work is to update the note  and allowing it to update the note's content when necessary.
            updateNote={updateNote} 
            //  we get the value of currentNote  by The value for this prop is obtained by calling the getCurrentNote() function 
            currentNote={getCurrentNote()}
            />
        </>
    );
};

export default App;