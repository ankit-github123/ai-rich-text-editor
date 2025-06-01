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
