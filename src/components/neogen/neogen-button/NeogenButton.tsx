import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

type NeogenButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &{
    children?: ReactNode;
}

const NeogenButton = forwardRef<HTMLButtonElement, NeogenButtonProps>(
    ({type, style, className, children, ...rest}, ref) => {
        return (
            <>
                <button
                    ref={ref}
                    type={type}
                    className={[
                        "w-full py-3 px-4 rounded-lg text-white transition-all duration-200 hover:opacity-90 active:scale-95 michroma-400",
                        className,
                    ]
                    .filter(Boolean)
                    .join(" ")}
                    style={style ?? { backgroundColor: '#007bff' } }
                    {...rest}
                >
                    {children}
                </button>    
            </>
        );
    }

);

NeogenButton.displayName = "NeogenButton";

export default NeogenButton