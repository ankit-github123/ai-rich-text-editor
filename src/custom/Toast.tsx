// components/Toast.js
import { useEffect } from "react";

export default function Toast({
  message,
  type = "success",
  onClose,
}: {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Auto-hide after 3 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-5 right-5 z-50`}>
      <div
        className={`px-4 py-3 rounded-md shadow-lg text-white transition-all duration-300
          ${type === "success" ? "bg-[#9b6fe8]" : "bg-red-500"}
        `}
      >
        {message}
      </div>
    </div>
  );
}
