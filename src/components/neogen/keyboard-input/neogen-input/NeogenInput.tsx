import type { CSSProperties } from "react";

interface neogenInputProps {
    label: string;
    type:"number" | "search" | "color" | (string & {}) | "text"  | "email" | "password"| "tel" | "url" | undefined;
    id: string;
    name: string;
    placeholder: string;
    labelClassName?: string;
    labelStyle?: CSSProperties;
    inputStyle?: CSSProperties;
}

function NeogenInput({...props}: neogenInputProps) {
  return (
    <>
          <div>
            <label
              htmlFor={props.id}
              className={`block text-sm mb-2 oxanium-700 ${props.labelClassName ?? ""}`}
              style={{ color: '#1a1a1a', ...props.labelStyle }}
            >
              {props.label}
            </label>
            <input
              type={props.type}
              id={props.id}
              name={props.name}
              className="w-full px-4 py-2 rounded-lg border outline-none focus:ring-2 transition-all oxanium-400"
              style={{
                borderColor: '#e0e0e0',
                backgroundColor: '#ffffff',
                color: '#1a1a1a',
                ...props.inputStyle,
              }}
              onFocus={(e) => (e.target.style.borderColor = '#007bff')}
              onBlur={(e) => (e.target.style.borderColor = '#e0e0e0')}
              placeholder={props.placeholder}
            />
          </div>
    </>
  )
}

export default NeogenInput
