import { useEffect, useRef, useState } from "react";
import Controller from "./Controller";
import EditorArea from "./EditorArea";
import useEditorCommands from "../hook/useEditorCommands";
import useSelectionEffect from "../hook/useSelectionEffect";
import { getAIResponse } from "../api";
import Toast from "../custom/Toast";

function RichTextEditor({ loading, setLoading }: { loading: boolean; setLoading: (loading: boolean) => void }) {
  const editorRef: any = useRef<HTMLDivElement>(null);
  const [, setContent] = useState("");
  const [activeCommands, setActiveCommands] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [hasContent, setHasContent] = useState(false);
  const [promptInputValue, setPromptInputValue] = useState("");
  const [showToast, setShowToast] = useState(false);

  const { insertPromptInput, insertApiResponse, simulateApiInsert, formatText, updateActiveCommands } =
    useEditorCommands({
      editorRef,
      setContent,
      setActiveCommands,
      loading,
      setLoading,
      setPromptInputValue,
    });

  useSelectionEffect({ editorRef, updateActiveCommands });

  const handlePromptSubmit = async () => {
    if (!promptInputValue.trim()) return;

    const editor = editorRef.current;
    if (!editor) return;
    const inputEl = editor.querySelector("input");
    setLoading(true);
    inputEl.disabled = true;
    try {
      const response = await getAIResponse(promptInputValue);
      console.log("API response:", response);
      setPromptInputValue("");
      insertApiResponse(response as string);
    } finally {
      inputEl.remove();
      setLoading(false);
    }
  };

  const handleInput = () => {
    if (!editorRef.current) return;
    const content = editorRef.current?.innerText.trim();
    setHasContent(!!content);
    const html = editorRef.current.innerHTML;
    if (html.includes("#prompt")) {
      setIsFocused(true);
      insertPromptInput();
    } else {
      setContent(html);
    }
  };

  const handleClear = () => {
    setShowToast(true);
    if (editorRef.current) {
      editorRef.current.innerHTML = "";
    }
    setContent("");
    setHasContent(false);
    setPromptInputValue("");
    setIsFocused(false);
    setActiveCommands([]);
    // setShowToast(false);
  };
  useEffect(() => {
    handleInput(); // Set initial content state
  }, []);

  const handleGenerateClick = () => {
    setIsFocused(true);
    editorRef.current.focus();
    insertPromptInput();
  };
  return (
    <div className="relative">
      {/* <button onClick={simulateApiInsert}>Insert API Response</button> */}
      <Controller
        formatText={formatText}
        activeCommands={activeCommands}
        apiTrigger={simulateApiInsert}
        insertPromptInput={handleGenerateClick}
        generatePrompt={handlePromptSubmit}
        loading={loading}
        promptInputValue={promptInputValue}
      />
      <div className="relative">
        {!isFocused && !hasContent && !promptInputValue.length && (
          <div className="absolute w-[90%] md:w-[75%] lg:w-[82%] z-20 left-5 sm:left-8 md:left-11 top-3.5 text-gray-400 pointer-events-none select-none">
            For AI results, type #prompt, enter your prompt, and press Enter for a smart AI response.
          </div>
        )}
        <EditorArea editorRef={editorRef} handleInput={handleInput} updateActiveCommands={updateActiveCommands} />
      </div>
      <div className="flex justify-end gap-3 mt-4 mb-3 mx-2 md:mx-8  text-[13px]">
        <button
          type="button"
          className="text-[13px] shadow-lg border px-3 py-1 rounded-md text-[#333] border-[#ccc] bg-[#f0f0f0] "
        >
          Cancel
        </button>
        <button
          onClick={handleClear}
          className="bg-[#ddd2ef] border border-[#c9adf8] shadow-lg font-medium  px-5 py-1 rounded-md text-[#7434e3]"
        >
          Send
        </button>
      </div>
      {showToast && <Toast message="Message send successfully!" type="success" onClose={() => setShowToast(false)} />}
      {/* {loading ? <div className="loader">Thinking...</div> : <div>Not loading</div>} */}
      {/* <p className="overflow-auto break-words">HTML Output:</p>
      <pre>{content}</pre> */}
    </div>
  );
}

export default RichTextEditor;
