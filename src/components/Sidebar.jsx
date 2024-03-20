import React, { useState } from "react";

import { faFileCirclePlus} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoteCard from "./NoteCard";
import './Sidebar.css'

function Sidebar(props) {
    const [searchQuery, setSearchQuery] = useState("");
    function sortNotes(notes) {
        return notes.sort((a, b) => b.updatedAt - a.updatedAt);
    }
   

     const filteredNotes = props.notes.filter(note =>
         note.title.includes(searchQuery.toLowerCase())
    );

    return (
        <div className="sidebar border-end">
        <h1 className="not">NOTES</h1>
            <div className="akn">

            
            <div className="grid-container p-3 border-bottom">
    <div className="search-bar">
        <input type="text" className="sear" placeholder="Search notes..." value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
        />
        {/* <FontAwesomeIcon icon={faSearch} /> */}
    </div>
    <FontAwesomeIcon className="icon-btn add-btn addbtn" icon={faFileCirclePlus} onClick={props.addNote} />
</div>

            </div>
            <div>
                {sortNotes(filteredNotes).map((note) => {
                    return (
                        <NoteCard
                        className="not"
                            key={note.id}
                            id={note.id}
                            title={note.title}
                            updatedAt={note.updatedAt}
                            deleteNote={props.deleteNote}
                            currentNoteId={props.currentNoteId}
                            setCurrentNoteId={props.setCurrentNoteId}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default Sidebar;
