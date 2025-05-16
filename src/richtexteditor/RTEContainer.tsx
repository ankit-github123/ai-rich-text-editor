import { useRef, useState } from "react";
import Controller from "./Controller";

function RichTextEditor() {
    const editorRef = useRef(null);
    const [content, setContent] = useState("");

    const handleInput = () => {
        if (editorRef.current) {
            setContent(editorRef.current.innerHTML);
        }
    };

    const formatText = (command) => {
        document.execCommand(command, false, null);
        // Optional: Update state if you want real-time syncing
        handleInput();
    };

    return (
        <div style={{ padding: "1rem" }}>
            {/* <div style={{ marginBottom: "10px" }}>
                <button onClick={() => formatText("bold")}>Bold</button>
                <button onClick={() => formatText("italic")}>Italic</button>
                <button onClick={() => formatText("underline")}>Underline</button>
            </div> */}
            <Controller />
            <div
                ref={editorRef}
                contentEditable
                onInput={handleInput}

                className="border-2 !font-display border-slate-400 rounded-sm h-[40vh] px-2 pt-5 pb-2 focus:outline-none focus:bg-[rgb(255,255,255)]"
            ></div>

            <p>HTML Output:</p>
            <pre>{content}</pre>
        </div>
    );
}

export default RichTextEditor;
