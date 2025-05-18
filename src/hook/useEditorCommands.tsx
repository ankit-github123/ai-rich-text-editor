import { useCallback } from "react";

export default function useEditorCommands({
  editorRef,
  setContent,
  setActiveCommands,
}: {
  editorRef: any;
  setContent: (content: string) => void;
  setActiveCommands: (commands: string[]) => void;
}) {
  const updateActiveCommands = useCallback(() => {
    const commands = [
      "bold",
      "italic",
      "underline",
      "insertUnorderedList",
      "insertOrderedList",
      //   "justifyLeft",
      "justifyCenter",
      "justifyRight",
      "justifyFull",
      "undo",
      "redo",
    ];
    const active = commands.filter((cmd) => document.queryCommandState(cmd));
    console.log("Active commands:", active);
    const selection = document.getSelection();
    const anchorNode = selection?.anchorNode;
    if (anchorNode) {
      const parentElement = anchorNode.nodeType === 3 ? anchorNode.parentElement : (anchorNode as HTMLElement);
      const computedStyle = parentElement ? window.getComputedStyle(parentElement) : null;
      const textAlign = computedStyle?.textAlign;
      //   alert(textAlign);
      if (textAlign === "start") {
        // active.push("");
      }
      if (textAlign === "left") {
        // active.push("justifyLeft");
      } else if (textAlign === "right") {
        active.push("justifyRight");
      } else if (textAlign === "center") {
        active.push("justifyCenter");
      } else if (textAlign === "justify") {
        active.push("justifyFull");
      }

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
  }, [setActiveCommands]);

  const insertPromptInput = useCallback(() => {
    const editor = editorRef.current;
    if (!editor) return;

    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);
    if (!range) return;

    editor.innerText = editor.innerText.replace("!!!", "");

    const newRange = document.createRange();
    newRange.selectNodeContents(editor);
    newRange.collapse(false);
    selection?.removeAllRanges();
    selection?.addRange(newRange);

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Type a prompt...";
    input.className = "border focus:outline-none italic w-full";
    input.onkeydown = async (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const value = input.value;
        const response = await new Promise((resolve) =>
          setTimeout(() => resolve("🌟 API response for: " + value), 1000)
        );
        insertApiResponse(response as string);
      }
    };

    newRange.insertNode(input);
    newRange.setStartAfter(input);
    newRange.collapse(true);
    selection?.removeAllRanges();
    selection?.addRange(newRange);
    setTimeout(() => input.focus(), 0);

    setContent(editor.innerHTML);
    updateActiveCommands();
  }, [editorRef, setContent, updateActiveCommands]);

  const insertApiResponse = useCallback(
    (htmlString: string) => {
      const editor = editorRef.current;
      if (!editor) return;
      editor.focus();

      const range = document.createRange();
      range.selectNodeContents(editor);
      range.collapse(false);

      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);

      const fragment = range.createContextualFragment(htmlString);
      range.insertNode(fragment);

      range.setStartAfter(fragment.lastChild!);
      range.collapse(true);
      selection?.removeAllRanges();
      selection?.addRange(range);

      setContent(editor.innerHTML);
      updateActiveCommands();
    },
    [editorRef, setContent, updateActiveCommands]
  );

  const formatText = useCallback(
    (command: string, value?: string) => {
      if (editorRef.current) {
        editorRef.current.focus();
        //@ts-ignore
        document.execCommand(command, false, value ?? null);
        updateActiveCommands();
      }
    },
    [editorRef, updateActiveCommands]
  );

  const simulateApiInsert = () => {
    insertApiResponse("<div><ul><li>Item 1</li><li>Item 2</li></ul>This is text from API</div>");
  };

  return { insertPromptInput, insertApiResponse, simulateApiInsert, formatText, updateActiveCommands };
}
