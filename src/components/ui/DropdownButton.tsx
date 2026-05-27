import { useState, useRef, useEffect } from "react";
import type { ReactNode } from "react";

interface DropdownButtonProps {
  label?: string;

  icon?: ReactNode;

  options: {
    label: string;
    onClick: () => void;
    danger?: boolean;
  }[];
}

export default function DropdownButton({
  label,
  icon,
  options,
}: DropdownButtonProps) {
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  // Close outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      {/* BUTTON */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="
          flex items-center justify-center
          rounded-lg
          hover:bg-gray-100
          transition
          p-2
        "
      >
        {icon ? icon : label}
      </button>

      {/* MENU */}
      {open && (
        <div
          className="
            absolute right-0 mt-2
            min-w-45
            bg-white
            border
            rounded-xl
            shadow-lg
            overflow-hidden
            z-50
          "
        >
          {options.map((opt, index) => (
            <button
              key={index}
              onClick={() => {
                opt.onClick();
                setOpen(false);
              }}
              className={`
                w-full
                text-left
                px-4 py-3
                hover:bg-gray-100
                transition
                text-sm

                ${opt.danger ? "text-red-600" : "text-gray-700"}
              `}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
