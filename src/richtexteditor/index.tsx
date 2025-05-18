import { useState } from "react";
import RichTextEditor from "./RTEContainer";
import { AiTwotoneMessage } from "react-icons/ai";

const RTEIndex = () => {
  const [loading, setLoading] = useState(false);
  return (
    <div className="w-full">
      <div
        className={`w-[55%] container ${
          !loading ? "generating" : ""
        } mx-auto shadow-2xl rounded-lg border-2 border-[rgba(0,0,0,0.1)] relative -top-3.5`}
      >
        <div className="title font-display text-lg font-bold px-0 pt-3 pb-2  w-[95%] mx-auto flex items-center gap-2">
          <AiTwotoneMessage />
          Rich Text Editor
        </div>
        <div className="divider"></div>
        <RichTextEditor loading={loading} setLoading={setLoading} />
        <div className="flex justify-end gap-3 mt-4 mb-3 mx-8  text-[13px]">
          <button
            type="button"
            className="text-[13px] shadow-lg border px-3 py-1 rounded-md text-[#333] border-[#ccc] bg-[#f0f0f0] "
          >
            Cancel
          </button>
          <button className="bg-[#ddd2ef] border border-[#c9adf8] shadow-lg font-medium  px-5 py-1 rounded-md text-[#7434e3]">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default RTEIndex;
