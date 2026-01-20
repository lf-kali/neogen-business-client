import type { CSSProperties } from "react";

interface neogenTextAreaProps {
    label: string;
    id: string;
    name: string;
    placeholder: string;
    rows?: number;
    cols?: number;
    labelClassName?: string;
    labelStyle?: CSSProperties;
    inputStyle?: CSSProperties;
}

function NeogenTextarea({...props}: neogenTextAreaProps) {
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
        <textarea
            id={props.id}
            name={props.name}
            className="w-full px-4 py-2 rounded-lg border outline-none focus:ring-2 transition-all resize-none oxanium-400"
            style={{
            borderColor: '#e0e0e0',
            backgroundColor: '#ffffff',
            color: '#1a1a1a',
            ...props.inputStyle,
            }}
            onFocus={(e) => (e.target.style.borderColor = '#007bff')}
            onBlur={(e) => (e.target.style.borderColor = '#e0e0e0')}
            placeholder={props.placeholder}
            rows={props.rows}
            cols={props.cols}
        />
      </div>
    </>
  )
}

export default NeogenTextarea
