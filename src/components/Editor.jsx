import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faItalic, faBold, faDownload, faUnderline, faSave } from "@fortawesome/free-solid-svg-icons";
import './Editor.css';

function Editor(props) {
    const [isItalic, setIsItalic] = useState(false);
    const [isBold, setIsBold] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);

    function handleFormChange(event) {
        const { name, value } = event.target;
        props.updateNote({ ...props.currentNote, updatedAt: Date.now(), [name]: value });
    }

    function handleItalicClick() {
        setIsItalic(!isItalic);
    }

    function handleBoldClick() {
        setIsBold(!isBold);
    }

    function handleUnderlineClick() {
        setIsUnderline(!isUnderline);
    }

    function handleDownloadClick() {
        const { title, content } = props.currentNote;
        const filename = `${title}.txt`;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    async function handleSaveClick() {
        try {
            const response = await fetch("your-save-endpoint", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(props.currentNote),
            });
            if (!response.ok) {
                throw new Error("Failed to save note");
            }
            console.log("Note saved successfully");
        } catch (error) {
            console.error("Error saving note:", error.message);
        }
    }

    return (
        <>
        <div className="mt-3">
                    <Button variant="secondary" onClick={handleItalicClick}>
                        <FontAwesomeIcon icon={faItalic} />
                    </Button>{' '}
                    <Button variant="secondary" onClick={handleBoldClick}>
                        <FontAwesomeIcon icon={faBold} />
                    </Button>{' '}
                    <Button variant="secondary" onClick={handleUnderlineClick}>
                        <FontAwesomeIcon icon={faUnderline} />
                    </Button>{' '}
                    <Button variant="secondary" onClick={handleDownloadClick}>
                        <FontAwesomeIcon icon={faDownload} />
                    </Button>{' '}
                    {/* <Button variant="primary" onClick={handleSaveClick}>
                        <FontAwesomeIcon icon={faSave} /> Save
                    </Button>{' '} */}
                </div>
       
            <Form>
                <label><h3>TITLE : </h3></label>
                <Form.Control
                    name="title"
                    type="text"
                    placeholder="Title..."
                    className="mb-4 p-3"
                    value={props.currentNote.title}
                    onChange={handleFormChange}
                    style={{ fontStyle: isItalic ? "italic" : "normal", fontWeight: isBold ? "bold" : "normal", textDecoration: isUnderline ? "underline" : "none" }}
                />

                <label><h3>CONTENT : </h3></label>
                <Form.Control
                    name="content"
                    type="text"
                    placeholder="Content..."
                    as="textarea"
                    className="p-3"
                    value={props.currentNote.content}
                    onChange={handleFormChange}
                    rows={15}
                    style={{ fontStyle: isItalic ? "italic" : "normal", fontWeight: isBold ? "bold" : "normal", textDecoration: isUnderline ? "underline" : "none" }}
                    
                />
                <div className="sav">
                <Button variant="primary" onClick={handleSaveClick}>
                        <FontAwesomeIcon icon={faSave}  /> Save
                    </Button>{' '}
                    </div>
                
            </Form>
        
        </>
    );
}

export default Editor;


