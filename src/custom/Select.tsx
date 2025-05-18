import { FaChevronDown } from "react-icons/fa";

const CustomSelect = ({ options, value, onChange }) => {
  console.log("value", value);
  return (
    <div className="relative w-fit flex items-center">
      <select
        value={value}
        onChange={onChange}
        className="w-16 text-[13px] appearance-none px-4 h-[30px] pr-10 rounded-xl bg-[#f2ecff] text-[#3d2a7b] font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-[#6e44ff] transition-all"
      >
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 top-0 right-2 flex items-center text-[#a18af5]">
        <FaChevronDown className="text-[11px]" />
      </div>
    </div>
  );
};

export default CustomSelect;
