import {
  AiOutlineApi,
  AiOutlineBold,
  AiOutlineLink,
  AiOutlineOrderedList,
  AiOutlineRedo,
  AiOutlineUndo,
  AiOutlineItalic,
  AiOutlineUnderline,
  AiOutlineUnorderedList,
  AiOutlineAlignLeft,
  AiOutlineAlignCenter,
  AiOutlineAlignRight,
} from "react-icons/ai";
import { FiAlignJustify } from "react-icons/fi";

interface ControllerProps {
  formatText: (command: string, value?: string) => void;
  activeCommands: string[];
  apiTrigger: () => void;
}

const Controller = ({ formatText, activeCommands, apiTrigger }: ControllerProps) => {
  const isActive = (command: string) => activeCommands.includes(command);

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const size = e.target.value;
    if (size) formatText("fontSize", size);
  };

  const handleFontNameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const font = e.target.value;
    if (font) formatText("fontName", font);
  };
  const buttonStyle = `bg-[#ede9fe] border border-[#dcd4f7] shadow-sm rounded-full w-[34px] h-[34px] flex items-center justify-center cursor-pointer transition-all duration-200 ease-in-out hover:bg-[#ddd6fe] hover:scale-[1.08]`;

  return (
    <div className="flex justify-between items-center mx-[22px] px-3 py-2 rounded-xl">
      <div>
        <div className="flex gap-2.5 mt-3 mb-3">
          <select onChange={handleFontSizeChange} defaultValue={3} className="border rounded p-1">
            <option value="1">h1</option>
            <option value="2">h2</option>
            <option value="3">normal</option>
            <option value="4">h4</option>
            <option value="5">h5</option>
            <option value="6">h6</option>
            <option value="7">h7</option>
          </select>

          {/* <select onChange={() => {}} className="border rounded p-1">
            <option value="">Font Family</option>
            <option value="Arial">Arial</option>
            <option value="Georgia">Georgia</option>
            <option value="Tahoma">Tahoma</option>
            <option value="Times New Roman">Times Roman</option>
            <option value="Verdana">Verdana</option>
            <option value="Courier New">Courier New</option>
          </select> */}
          <button
            onClick={() => formatText("bold")}
            className={`${buttonStyle} ${isActive("bold") ? "bg-[#f9e1b7] w-[35px] h-[35px]" : ""}`}
          >
            <AiOutlineBold />
          </button>
          <button
            onClick={() => formatText("italic")}
            className={`${buttonStyle} ${isActive("italic") ? "bg-[#f9e1b7] w-[35px] h-[35px]" : ""}`}
          >
            <AiOutlineItalic />
          </button>
          <button
            onClick={() => formatText("underline")}
            className={`${buttonStyle} ${isActive("underline") ? "bg-[#f9e1b7] w-[35px] h-[35px]" : ""}`}
          >
            <AiOutlineUnderline className="text-[17px] relative top-0.5" />
          </button>

          <div className="border border-l border-[#e6e5e3]" />

          <button
            onClick={() => formatText("insertUnorderedList")}
            className={`${buttonStyle} ${isActive("insertUnorderedList") ? "bg-[#f9e1b7] w-[35px] h-[35px]" : ""}`}
          >
            <AiOutlineUnorderedList />
          </button>
          <button
            onClick={() => formatText("insertOrderedList")}
            className={`${buttonStyle} ${isActive("insertOrderedList") ? "bg-[#f9e1b7] w-[35px] h-[35px]" : ""}`}
          >
            <AiOutlineOrderedList />
          </button>

          {/* <div className="border border-l border-[#e6e5e3]" />

          <button
            onClick={() => formatText("undo")}
            className={`${buttonStyle} ${isActive("undo") ? "bg-[#f9e1b7] w-[35px] h-[35px]" : ""}`}
          >
            <AiOutlineUndo />
          </button>
          <button
            onClick={() => formatText("redo")}
            className={`${buttonStyle} ${isActive("redo") ? "bg-[#f9e1b7] w-[35px] h-[35px]" : ""}`}
          >
            <AiOutlineRedo />
          </button> */}
          <div className="border border-l border-[#e6e5e3]" />
          <button
            onClick={() => formatText("justifyLeft")}
            className={`${buttonStyle} ${isActive("justifyLeft") ? "bg-[#f9e1b7] w-[35px] h-[35px]" : ""}`}
          >
            <AiOutlineAlignLeft />
          </button>
          <button
            onClick={() => formatText("justifyCenter")}
            className={`${buttonStyle} ${isActive("justifyCenter") ? "bg-[#f9e1b7] w-[35px] h-[35px]" : ""}`}
          >
            <AiOutlineAlignCenter />
          </button>
          <button
            onClick={() => formatText("justifyRight")}
            className={`${buttonStyle} ${isActive("justifyRight") ? "bg-[#f9e1b7] w-[35px] h-[35px]" : ""}`}
          >
            <AiOutlineAlignRight />
          </button>
          <button
            onClick={() => formatText("justifyFull")}
            className={`${buttonStyle} ${isActive("justifyFull") ? "bg-[#f9e1b7] w-[35px] h-[35px]" : ""}`}
          >
            <FiAlignJustify />
          </button>

          {/* <button
          onClick={apiTrigger}
          className={`${buttonStyle} bg-gradient-to-tr from-[#fde2ff] to-[#e9d2fc] hover:from-[#f9c2ff] hover:to-[#dcbaf9]`}
        >
          <AiOutlineApi />
        </button> */}
        </div>
      </div>

      <div>
        <button className="shiny-button bg-amber-400 flex items-center gap-2 text-white font-medium border-2 border-[#f5b039] px-2 py-1.5 rounded-full drop-shadow-xl hover:brightness-105 transition-all duration-200">
          <img src="/ai.png" className="w-6" />
          Generate
        </button>
      </div>
    </div>
  );
};

export default Controller;
