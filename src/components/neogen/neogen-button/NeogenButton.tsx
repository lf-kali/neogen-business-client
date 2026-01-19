import type { ReactNode } from "react";

interface neogenButtonProps {
    type?: "submit" | "reset" | "button" | undefined;
    style?: React.CSSProperties | undefined
    children?: ReactNode;
}

function NeogenButton({...props}: neogenButtonProps) {
  return (
    <>
        <button
            type="submit"
            className="w-full py-3 px-4 rounded-lg text-white transition-all duration-200 hover:opacity-90 active:scale-95 michroma-400"
            style={props.style !== undefined ? props.style : { backgroundColor: '#007bff' } }
        >
            {props.children}
        </button>    
    </>
  )
}

export default NeogenButton