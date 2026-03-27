import { forwardRef, type CSSProperties, type InputHTMLAttributes } from "react";

type neogenInputProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    labelClassName?: string;
    labelStyle?: CSSProperties;
    inputStyle?: CSSProperties;
}

const NeogenInput = forwardRef<HTMLInputElement, neogenInputProps>(
  ({type, value, id, labelClassName, label, inputStyle, labelStyle, ...rest}, ref) => {
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
            <input
              value={value}
              type={type}
              id={id}
              className="w-full px-4 py-2 rounded-lg border outline-none focus:ring-2 transition-all oxanium-400"
              style={{
                borderColor: inputStyle?.borderColor ? inputStyle.borderColor : '#e0e0e0' ,
                backgroundColor: inputStyle?.backgroundColor ? inputStyle.backgroundColor : '#ffffff',
                color: inputStyle?.color ? inputStyle.color : '#1a1a1a',
                ...inputStyle,
              }}
              onFocus={(e) => (e.target.style.borderColor = '#007bff')}
              onBlur={(e) => (e.target.style.borderColor = inputStyle?.borderColor ? inputStyle.borderColor: '#e0e0e0')}
              {...rest}
            />
          </div>
    </>
  )
  }
)
export default NeogenInput
