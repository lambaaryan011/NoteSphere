// 
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { Fade } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NoteCard(props) {
    function handleNoteDelete(event) {
        event.stopPropagation();
        props.deleteNote(props.id);
    }
    function formatTitle(title) {
        if (title.length > 0) {
            return title.length > 20 ? title.substring(0, 20).concat("...") : title;
        } else {
            return "Untitled";
        }
    }

    function formatDate(updatedAtDate) {
        const options = {
            hour: "2-digit",
            minute: "2-digit",
            month: "long",
            day: "numeric",
        };
        return new Date(updatedAtDate).toLocaleDateString("en-US", options);
    }

    return (
        <Fade appear in>
            <div 
                className={`border-bottom py-2 p-3 ${props.id === props.currentNoteId ? "selected" : "note-card"}`}
                onClick={() => props.setCurrentNoteId(props.id)}
            >
                <h3 className="fw-semibold fs-5">{formatTitle(props.title)}</h3>
                <div className="d-flex justify-content-between align-items-center">
                    <p className="m-0 fs-6 fst-italic">{formatDate(props.updatedAt)}</p>
                    <FontAwesomeIcon 
                        className="icon-btn delete-btn" 
                        icon={faTrashCan} 
                        onClick={handleNoteDelete} 
                    />
                </div>
            </div>
        </Fade>
    );
}

export default NoteCard;