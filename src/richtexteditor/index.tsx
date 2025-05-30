import { useState } from "react";
import RichTextEditor from "./RTEContainer";
import { FaHeart } from "react-icons/fa";

const RTEIndex = () => {
  const [loading, setLoading] = useState(false);
  return (
    <div className="w-full">
      <div
        className={`w-[92%] md:w-[70%] lg:w-[55%] container ${
          loading ? "generating" : ""
        } mx-auto shadow-2xl rounded-lg border-2 border-[rgba(0,0,0,0.1)] relative -top-3.5`}
      >
        <div className="title font-display text-lg font-bold px-0 pt-3 pb-2  w-[95%] mx-auto flex items-center gap-2">
          <img src="/text.png" className="w-7" />
          Rich Text Editor
        </div>
        <div className="divider"></div>
        <RichTextEditor loading={loading} setLoading={setLoading} />
        <div className="flex justify-end gap-3 mt-4 mb-3 mx-2 md:mx-8  text-[13px]">
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
      <footer className="w-full flex justify-center mx-auto absolute bottom-0  py-3 mt-6 text-center text-[13px] text-[#a58bd1d2]  ">
        <div className="flex gap-1.5 items-center border-none border-[#d7c8f1d2] pt-1 w-fit px-5">
          Made with <FaHeart className="text-[13px]" /> by Ankit Kumar
        </div>
      </footer>
    </div>
  );
};

export default RTEIndex;
