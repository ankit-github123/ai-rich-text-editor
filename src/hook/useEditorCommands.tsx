import { useCallback } from "react";
import { removeQuotes } from "../utils";
import { getAIResponse } from "../api";

export default function useEditorCommands({
  editorRef,
  setContent,
  setActiveCommands,
  loading,
  setLoading,
}: {
  editorRef: any;
  setContent: (content: string) => void;
  setActiveCommands: (commands: string[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
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
    const fontSize = document.queryCommandValue("fontSize");
    const fontName = removeQuotes(document.queryCommandValue("fontName"));
    console.log("Font size:", fontSize);
    console.log("Font name:", fontName);
    if (fontSize) active.push(`fontSize-${fontSize}`);
    if (fontName) active.push(`fontName-${fontName.toString()}`);

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

    editor.innerText = editor.innerText.replace("#prompt", "");

    const newRange = document.createRange();
    newRange.selectNodeContents(editor);
    newRange.collapse(false);
    selection?.removeAllRanges();
    selection?.addRange(newRange);

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Type a prompt...";
    input.className =
      "bg-transparent border-b border-[rgba(0,0,0,0.01)] outline-none text-sm placeholder:text-gray-400 w-[92%] px-1 py-0.5";
    input.onkeydown = async (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const value = input.value;
        setLoading(true);
        input.disabled = true;
        try {
          const response = await getAIResponse(value);
          console.log("API response:", response);
          insertApiResponse(response as string);
        } finally {
          input.remove();
          setLoading(false);
        }
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
  }, [editorRef, setContent, updateActiveCommands, setLoading]);

  const insertApiResponse = useCallback(
    (htmlString: string) => {
      const editor = editorRef.current;
      if (!editor) return;
      editor.focus();

      const selection = window.getSelection();
      const range = selection?.getRangeAt(0)?.cloneRange() || document.createRange();

      range.collapse(false); // collapse to the end of the editor
      const fragment = range.createContextualFragment(htmlString);
      const lastNode = fragment.lastChild;

      range.insertNode(fragment);

      if (lastNode) {
        // Move cursor after the inserted content
        const newRange = document.createRange();
        newRange.setStartAfter(lastNode);
        newRange.collapse(true);

        selection?.removeAllRanges();
        selection?.addRange(newRange);
      } else {
        selection?.removeAllRanges();
      }

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
    insertApiResponse(
      "<div>🌤 <b>Good morning, sunshine!</b> <br><i>Hope your day is as bright as your smile</i> 🌟<br>Can’t wait to hear all about it later! ☕💛<br>P.S. You’ve got this! 🐾✨</div>"
    );
  };

  return { insertPromptInput, insertApiResponse, simulateApiInsert, formatText, updateActiveCommands };
}
