import {
  AiOutlineApi,
  AiOutlineBold,
  AiOutlineLink,
  AiOutlineOrderedList,
  AiOutlineRedo,
  AiOutlineUndo,
} from "react-icons/ai";
import { AiOutlineItalic } from "react-icons/ai";
import { AiOutlineUnderline } from "react-icons/ai";
import { AiOutlineUnorderedList } from "react-icons/ai";

interface ControllerProps {
  formatText: (command: string) => void;
  activeCommands: string[];
  apiTrigger: () => void;
}

const Controller = ({ formatText, activeCommands, apiTrigger }: ControllerProps) => {
  const isActive = (command: string) => activeCommands.includes(command);

  return (
    <div className="flex gap-3.5 mt-3 mb-3 mx-5">
      <button
        onClick={() => formatText("bold")}
        className={`w-8 h-8 shadow-sm cursor-pointer flex items-center justify-center rounded-full ${
          isActive("bold") ? "bg-blue-500 text-white" : "bg-[#e6e5e3]"
        }`}
      >
        <AiOutlineBold />
      </button>
      <button
        onClick={() => formatText("italic")}
        className={`w-8 h-8 shadow-sm cursor-pointer flex items-center justify-center rounded-full ${
          isActive("italic") ? "bg-blue-500 text-white" : "bg-[#e6e5e3]"
        }`}
      >
        <AiOutlineItalic />
      </button>
      <button
        onClick={() => formatText("underline")}
        className={`w-8 h-8 shadow-sm cursor-pointer flex items-center justify-center rounded-full ${
          isActive("underline") ? "bg-blue-500 text-white" : "bg-[#e6e5e3]"
        }`}
      >
        <AiOutlineUnderline className="text-base relative top-0.5" />
      </button>
      <button className="border border-l border-[#e6e5e3]"></button>
      <button
        onClick={() => formatText("insertUnorderedList")}
        className={`w-8 h-8 shadow-sm cursor-pointer flex items-center justify-center rounded-full ${
          isActive("insertUnorderedList") ? "bg-blue-500 text-white" : "bg-[#e6e5e3]"
        }`}
      >
        <AiOutlineUnorderedList />
      </button>
      <button
        onClick={() => formatText("insertOrderedList")}
        className={`w-8 h-8 shadow-sm cursor-pointer flex items-center justify-center rounded-full ${
          isActive("insertOrderedList") ? "bg-blue-500 text-white" : "bg-[#e6e5e3]"
        }`}
      >
        <AiOutlineOrderedList />
      </button>
      <button className="border border-l border-[#e6e5e3]"></button>
      <button
        onClick={() => formatText("createLink")}
        className={`w-8 h-8 shadow-sm cursor-pointer flex items-center justify-center rounded-full ${
          isActive("createLink") ? "bg-blue-500 text-white" : "bg-[#e6e5e3]"
        }`}
      >
        <AiOutlineLink />
      </button>
      <button
        onClick={() => formatText("undo")}
        className={`w-8 h-8 shadow-sm cursor-pointer flex items-center justify-center rounded-full ${
          isActive("undo") ? "bg-blue-500 text-white" : "bg-[#e6e5e3]"
        }`}
      >
        <AiOutlineUndo />
      </button>
      <button
        onClick={() => formatText("redo")}
        className={`w-8 h-8 shadow-sm cursor-pointer flex items-center justify-center rounded-full ${
          isActive("redo") ? "bg-blue-500 text-white" : "bg-[#e6e5e3]"
        }`}
      >
        <AiOutlineRedo />
      </button>

      <button
        onClick={() => apiTrigger()}
        className={`w-8 h-8 shadow-sm cursor-pointer flex items-center justify-center rounded-full ${
          isActive("redo") ? "bg-blue-500 text-white" : "bg-[#e6e5e3]"
        }`}
      >
        <AiOutlineApi />
      </button>
    </div>
  );
};

export default Controller;
