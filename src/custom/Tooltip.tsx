import { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";

interface Rect {
  top: number;
  left: number;
  bottom: number;
  right: number;
  width: number;
  height: number;
}

interface TooltipSize {
  width: number;
  height: number;
}

const getTooltipPosition = (
  rect: Rect,
  position: "top" | "bottom" | "left" | "right",
  spacing: number = 8,
  tooltipSize: TooltipSize = { width: 0, height: 0 }
): { top: number; left: number; transform: string } => {
  const scrollY = window.scrollY;
  const scrollX = window.scrollX;

  switch (position) {
    case "top":
      return {
        top: rect.top + scrollY - tooltipSize.height - spacing,
        left: rect.left + scrollX + rect.width / 2,
        transform: "translateX(-50%)",
      };
    case "bottom":
      return {
        top: rect.bottom + scrollY + spacing,
        left: rect.left + scrollX + rect.width / 2,
        transform: "translateX(-50%)",
      };
    case "left":
      return {
        top: rect.top + scrollY + rect.height / 2,
        left: rect.left + scrollX - tooltipSize.width - spacing,
        transform: "translateY(-50%)",
      };
    case "right":
      return {
        top: rect.top + scrollY + rect.height / 2,
        left: rect.right + scrollX + spacing,
        transform: "translateY(-50%)",
      };
    default:
      return { top: 0, left: 0, transform: "" };
  }
};

export default function Tooltip({
  children,
  content,
  position = "top",
}: {
  children: React.ReactNode;
  content: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}) {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, transform: "" });

  useEffect(() => {
    if (visible && targetRef.current && tooltipRef.current) {
      const rect = targetRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      const pos = getTooltipPosition(rect, position, 8, {
        width: tooltipRect.width,
        height: tooltipRect.height,
      });

      setCoords(pos);
    }
  }, [visible, position]);

  return (
    <>
      <div
        ref={targetRef}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
        tabIndex={0}
        className="inline-block"
      >
        {children}
      </div>

      {visible &&
        ReactDOM.createPortal(
          <div
            ref={tooltipRef}
            className="absolute z-[9999] px-2 py-1 rounded bg-gray-800 text-white text-[12.5px] whitespace-nowrap shadow-md transition-opacity duration-200 opacity-100"
            style={{
              top: coords.top,
              left: coords.left,
              transform: coords.transform,
            }}
          >
            {content}
          </div>,
          document.body
        )}
    </>
  );
}
