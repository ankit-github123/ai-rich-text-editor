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
import CustomSelect from "../custom/Select";
import { useState } from "react";
import { fontNames, fontSizes } from "../constants";
import { extractFontNameFromArray, extractFontSizeFromArray } from "../utils";
import Tooltip from "../custom/Tooltip";

interface ControllerProps {
  formatText: (command: string, value?: string) => void;
  activeCommands: string[];
  apiTrigger: () => void;
  insertPromptInput: () => void;
  loading: boolean;
}

const Controller = ({ formatText, activeCommands, apiTrigger, insertPromptInput, loading }: ControllerProps) => {
  const isActive = (command: string) => activeCommands.includes(command);
  const fontSize = extractFontSizeFromArray(activeCommands);
  const fontName = extractFontNameFromArray(activeCommands);
  const handleFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const size = e.target.value;
    if (size) formatText("fontSize", size);
  };

  const handleFontNameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const font = e.target.value;
    if (font) formatText("fontName", font);
  };
  const buttonStyle = `bg-[#ede9fe] border border-[#dcd4f7] shadow-sm rounded-full w-[34px] h-[34px] flex items-center justify-center cursor-pointer transition-all duration-200 ease-in-out hover:bg-[#ddd6fe] hover:scale-[1.08]`;
  console.log("activeCommands", activeCommands);
  const [selected, setSelected] = useState("one");
  return (
    <div className="flex justify-between items-center mx-[0px] sm:mx-[5px] md:mx-[15px] lg:mx-[22px] px-3 py-2 rounded-xl">
      <div className="flex-1 overflow-x-auto whitespace-nowrap pr-3 no-scrollbar  scrollbar-hide">
        <div id="controller" className="flex gap-2.5 mt-3 mb-3 w-max">
          <CustomSelect options={fontSizes} value={fontSize} onChange={handleFontSizeChange} />
          <CustomSelect options={fontNames} value={fontName} onChange={handleFontNameChange} />
          <div className="border border-l my-1 border-[#e6e5e3]" />
          <Tooltip content="Bold" position="bottom">
            <button
              onClick={() => formatText("bold")}
              className={`${buttonStyle} ${isActive("bold") ? "bg-[#f9e1b7] w-[35px] h-[35px]" : ""}`}
            >
              <AiOutlineBold />
            </button>
          </Tooltip>
          <Tooltip content="Italic" position="bottom">
            <button
              onClick={() => formatText("italic")}
              className={`${buttonStyle} ${isActive("italic") ? "bg-[#f9e1b7] w-[35px] h-[35px]" : ""}`}
            >
              <AiOutlineItalic />
            </button>
          </Tooltip>
          <Tooltip content="Underline" position="bottom">
            <button
              onClick={() => formatText("underline")}
              className={`${buttonStyle} ${isActive("underline") ? "bg-[#f9e1b7] w-[35px] h-[35px]" : ""}`}
            >
              <AiOutlineUnderline className="text-[17px] relative top-0.5" />
            </button>
          </Tooltip>
          <div className="border border-l my-1 border-[#e6e5e3]" />
          <Tooltip content={"Unordered List"} position="bottom">
            <button
              onClick={() => formatText("insertUnorderedList")}
              className={`${buttonStyle} ${isActive("insertUnorderedList") ? "bg-[#f9e1b7] w-[35px] h-[35px]" : ""}`}
            >
              <AiOutlineUnorderedList />
            </button>
          </Tooltip>
          <Tooltip content={"Ordered List"} position="bottom">
            <button
              onClick={() => formatText("insertOrderedList")}
              className={`${buttonStyle} ${isActive("insertOrderedList") ? "bg-[#f9e1b7] w-[35px] h-[35px]" : ""}`}
            >
              <AiOutlineOrderedList />
            </button>
          </Tooltip>
          <div className="border border-l my-1 border-[#e6e5e3]" />
          <Tooltip content={"Align Left"} position="bottom">
            <button
              onClick={() => formatText("justifyLeft")}
              className={`${buttonStyle} ${isActive("justifyLeft") ? "bg-[#f9e1b7] w-[35px] h-[35px]" : ""}`}
            >
              <AiOutlineAlignLeft />
            </button>
          </Tooltip>
          <Tooltip content={"Align Center"} position="bottom">
            <button
              onClick={() => formatText("justifyCenter")}
              className={`${buttonStyle} ${isActive("justifyCenter") ? "bg-[#f9e1b7] w-[35px] h-[35px]" : ""}`}
            >
              <AiOutlineAlignCenter />
            </button>
          </Tooltip>
          <Tooltip content={"Align Right"} position="bottom">
            <button
              onClick={() => formatText("justifyRight")}
              className={`${buttonStyle} ${isActive("justifyRight") ? "bg-[#f9e1b7] w-[35px] h-[35px]" : ""}`}
            >
              <AiOutlineAlignRight />
            </button>
          </Tooltip>
          <Tooltip content={"Align Justify"} position="bottom">
            <button
              onClick={() => formatText("justifyFull")}
              className={`${buttonStyle} ${isActive("justifyFull") ? "bg-[#f9e1b7] w-[35px] h-[35px]" : ""}`}
            >
              <FiAlignJustify />
            </button>
          </Tooltip>
        </div>
      </div>

      <div id="generative" className="flex-shrink-0 ml-4 mt-3 mb-3">
        <button
          disabled={loading}
          onClick={insertPromptInput}
          className="shiny-button bg-amber-400 flex items-center gap-1.5 text-white font-bold border-2 border-[#f5b039] py-1.5 pl-2.5 font-mono pr-3 rounded-full drop-shadow-xl hover:brightness-105 transition-all duration-200"
        >
          <img src="/ai.png" className="w-6" />
          {loading ? "Generating" : "Generate"}
        </button>
      </div>
    </div>
  );
};

export default Controller;
