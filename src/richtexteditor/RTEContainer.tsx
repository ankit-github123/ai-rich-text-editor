import { useRef, useState, useEffect } from "react";
import Controller from "./Controller";

function RichTextEditor() {
  const editorRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState("");
  const [query, setQuery] = useState("");
  const [activeCommands, setActiveCommands] = useState<string[]>([]);

  const handleInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;

      if (html.includes("!!!")) {
        insertPromptInput();
      } else {
        setContent(html);
      }
    }
  };

  const insertItalicDiv = () => {
    if (!editorRef.current) return;

    const editor = editorRef.current;
    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);
    if (!range) return;

    // Delete "!!!" before inserting
    const text = editor.innerText;
    const updatedText = text.replace("!!!", "");
    editor.innerText = updatedText;

    // Move cursor to end
    const newRange = document.createRange();
    newRange.selectNodeContents(editor);
    newRange.collapse(false);
    selection?.removeAllRanges();
    selection?.addRange(newRange);

    // Create italic div
    const italicDiv = document.createElement("div");
    italicDiv.innerHTML = "<em>Generate:&nbsp;</em>";

    // Insert it
    newRange.insertNode(italicDiv);

    // Place cursor after the inserted div
    newRange.setStartAfter(italicDiv);
    newRange.collapse(true);
    selection?.removeAllRanges();
    selection?.addRange(newRange);

    setContent(editor.innerHTML); // update content state
    updateActiveCommands(); // update formatting
  };
  //   console.log("query", query);
  const handleKeyDown = async (event: { key: string }) => {
    if (event.key === "Enter") {
      alert(query);
      console.log("query11", query);
    }
  };
  const insertPromptInput = () => {
    if (!editorRef.current) return;

    const editor = editorRef.current;
    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);
    if (!range) return;

    // Remove "!!!" from text
    const text = editor.innerText;
    const updatedText = text.replace("!!!", "");
    editor.innerText = updatedText;

    // Move cursor to end
    const newRange = document.createRange();
    newRange.selectNodeContents(editor);
    newRange.collapse(false);
    selection?.removeAllRanges();
    selection?.addRange(newRange);

    // Create an input element
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Type a prompt...";
    input.className = "border focus:outline-none italic w-full";
    input.onkeydown = async (e) => {
      if (e.key === "Enter") {
        e.preventDefault(); // avoid newline
        const value = input.value;
        console.log("Prompt entered:", value);
        const promise = new Promise((resolve) => {
          setTimeout(() => {
            resolve(
              "Good morning, sunshine! 🌞 Hope your day is as bright and lovely as you are—don’t forget to sprinkle a little magic everywhere you go! ✨"
            );
          }, 5000);
        });
        // document.removeChild(input);
        const apiResponse = await promise;
        insertApiResponse(apiResponse);
      }
    };
    // input.onkeydown = handleKeyDown;
    // input.onchange = (e) => {
    //   if (e.target) {
    //     console.log("e.target", e.target.value);
    //     setQuery((e.target as HTMLInputElement).value);
    //   }
    // };
    // input.style.padding = "4px 8px";
    // input.style.margin = "4px 0";
    // input.style.border = "1px solid #ccc";
    // input.style.borderRadius = "4px";
    // input.style.fontStyle = "italic";

    // Insert it into the editor
    newRange.insertNode(input);

    // Set cursor after the input
    newRange.setStartAfter(input);
    newRange.collapse(true);
    selection?.removeAllRanges();
    selection?.addRange(newRange);

    // Focus the input
    setTimeout(() => input.focus(), 0);

    setContent(editor.innerHTML);
    updateActiveCommands();
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
        className="border-2 mx-5 font-sans border-[#d5d5d3] rounded-sm h-[40vh] px-2 pt-3 pb-2  overflow-y-auto focus:outline-none focus:bg-white overflow-x-hidden break-words"
      ></div>
      <p className="overflow-auto break-words">HTML Output:</p>
      <pre>{content}</pre>
    </div>
  );
}

export default RichTextEditor;
