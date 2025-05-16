import { useRef, useState, useEffect } from "react";
import Controller from "./Controller";

function RichTextEditor() {
  const editorRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState("");
  const [activeCommands, setActiveCommands] = useState<string[]>([]);

  const handleInput = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };

  const insertApiResponse = (htmlString: string) => {
    if (editorRef.current) {
      const editor = editorRef.current;
      editor.focus();

      // Move the cursor to the end
      const range = document.createRange();
      range.selectNodeContents(editor);
      range.collapse(false); // Move cursor to end

      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }

      // Create and insert the HTML fragment
      const fragment = range.createContextualFragment(htmlString);
      range.insertNode(fragment);

      // Move the cursor after the inserted content
      range.setStartAfter(fragment.lastChild!);
      range.collapse(true);
      selection?.removeAllRanges();
      selection?.addRange(range);

      handleInput(); // Update state
      updateActiveCommands(); // Update formatting UI
    }
  };

  const simulateApiInsert = () => {
    const apiResponse = "<div><ul><li>Item 1</li><li>Item 2</li></ul>This is text from API</div>";
    insertApiResponse(apiResponse);
  };
  const formatText = (command: string) => {
    if (editorRef.current) {
      editorRef.current.focus();
      // @ts-ignore
      document.execCommand(command, false, null);
      updateActiveCommands();
    }
  };

  const updateActiveCommands = () => {
    const commands = ["bold", "italic", "underline", "insertUnorderedList", "insertOrderedList"];
    const active = commands.filter((cmd) => document.queryCommandState(cmd));

    const selection = document.getSelection();
    const anchorNode = selection?.anchorNode;

    if (anchorNode) {
      const parentElement = anchorNode.nodeType === 3 ? anchorNode.parentElement : (anchorNode as HTMLElement);
      const ulAncestor = parentElement?.closest("ul");
      const olAncestor = parentElement?.closest("ol");

      if (ulAncestor && !active.includes("insertUnorderedList")) {
        active.push("insertUnorderedList");
      }
      if (olAncestor && !active.includes("insertOrderedList")) {
        active.push("insertOrderedList");
      }
    }

    setActiveCommands(active);
  };

  // 👉 Listen to selection changes
  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = document.getSelection();
      if (selection && editorRef.current && editorRef.current.contains(selection.anchorNode)) {
        updateActiveCommands();
      }
    };

    document.addEventListener("selectionchange", handleSelectionChange);
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, []);

  return (
    <div>
      <button onClick={simulateApiInsert}>Insert API Response</button>

      <Controller formatText={formatText} activeCommands={activeCommands} apiTrigger={simulateApiInsert} />
      <div
        id="editor"
        ref={editorRef}
        contentEditable
        onInput={() => {
          handleInput();
          updateActiveCommands();
        }}
        className="border-2 mx-5 font-sans border-[#d5d5d3] rounded-sm h-[40vh] px-2 pt-3 pb-2  overflow-y-auto focus:outline-none focus:bg-white"
      ></div>
      <p>HTML Output:</p>
      <pre>{content}</pre>
    </div>
  );
}

export default RichTextEditor;
