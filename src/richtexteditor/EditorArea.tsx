import React from "react";

const EditorArea = ({
  editorRef,
  handleInput,
  updateActiveCommands,
}: {
  editorRef: React.RefObject<HTMLDivElement>;
  handleInput: () => void;
  updateActiveCommands: () => void;
}) => (
  <div
    id="editor"
    ref={editorRef}
    contentEditable
    onInput={() => {
      handleInput();
      updateActiveCommands();
    }}
    className="editor-input mx-7 h-[40vh] overflow-x-hidden break-words px-2 py-2 font-display overflow-y-auto"
    // className="border mx-5 font-sans border-[#d5d5d3] rounded-sm h-[40vh] px-2 pt-3 pb-2 overflow-y-auto focus:outline-none focus:bg-white overflow-x-hidden break-words"
  />
);

export default EditorArea;
