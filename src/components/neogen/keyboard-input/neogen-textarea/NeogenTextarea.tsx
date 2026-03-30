import { forwardRef, type CSSProperties, type TextareaHTMLAttributes } from "react";

type neogenTextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label: string;
    labelClassName?: string;
    labelStyle?: CSSProperties;
    inputStyle?: CSSProperties;
}

const NeogenTextarea = forwardRef<HTMLTextAreaElement, neogenTextAreaProps>(
  ({id, labelClassName, labelStyle, label, name, inputStyle, ...rest}, ref) => {
    return (
    <>
      <div>
        <label
          htmlFor={id}
          className={`block text-sm mb-2 oxanium-700 ${labelClassName ?? ""}`}
          style={{ color: '#1a1a1a', ...labelStyle }}
        >
            {label}
        </label>
        <textarea
            ref={ref}
            id={id}
            name={name}
            className="w-full px-4 py-2 rounded-lg border outline-none focus:ring-2 transition-all resize-none oxanium-400"
            style={{
            borderColor: '#e0e0e0',
            backgroundColor: '#ffffff',
            color: '#1a1a1a',
            ...inputStyle,
            }}
            onFocus={(e) => (e.target.style.borderColor = '#007bff')}
            onBlur={(e) => (e.target.style.borderColor = '#e0e0e0')}
            {...rest}
        />
      </div>
    </>
  )
  }
) 

export default NeogenTextarea
