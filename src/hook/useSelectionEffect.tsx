import { useEffect } from "react";

interface UseSelectionEffectProps {
  editorRef: React.RefObject<HTMLElement>;
  updateActiveCommands: () => void;
}

export default function useSelectionEffect({ editorRef, updateActiveCommands }: UseSelectionEffectProps) {
  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = document.getSelection();
      if (selection && editorRef.current?.contains(selection.anchorNode)) {
        updateActiveCommands();
      }
    };

    document.addEventListener("selectionchange", handleSelectionChange);
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, [editorRef, updateActiveCommands]);
}
