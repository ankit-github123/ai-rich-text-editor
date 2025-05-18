import { useRef, useState } from "react";
import Controller from "./Controller";
import EditorArea from "./EditorArea";
import useEditorCommands from "../hook/useEditorCommands";
import useSelectionEffect from "../hook/useSelectionEffect";

function RichTextEditor() {
  const editorRef: any = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState("");
  const [activeCommands, setActiveCommands] = useState<string[]>([]);

  const { insertPromptInput, insertApiResponse, simulateApiInsert, formatText, updateActiveCommands } =
    useEditorCommands({ editorRef, setContent, setActiveCommands });

  useSelectionEffect({ editorRef, updateActiveCommands });

  const handleInput = () => {
    if (!editorRef.current) return;
    const html = editorRef.current.innerHTML;
    if (html.includes("#prompt")) {
      insertPromptInput();
    } else {
      setContent(html);
    }
  };

  const handleGenerateClick = () => {
    editorRef.current.focus();
    insertPromptInput();
  };
  return (
    <div className="">
      <button onClick={simulateApiInsert}>Insert API Response</button>
      <Controller
        formatText={formatText}
        activeCommands={activeCommands}
        apiTrigger={simulateApiInsert}
        insertPromptInput={handleGenerateClick}
      />
      <EditorArea editorRef={editorRef} handleInput={handleInput} updateActiveCommands={updateActiveCommands} />
      {/* <p className="overflow-auto break-words">HTML Output:</p>
      <pre>{content}</pre> */}
    </div>
  );
}

export default RichTextEditor;
