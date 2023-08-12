import loader from "../../assets/svg/loader.svg";
import loaderDark from "../../assets/svg/loader-dark.svg";
import { ButtonProps } from "./types";

const Button = ({
  children,
  type,
  className,
  onClick,
  disabled,
  isLoading,
  text,
  variant,
}: ButtonProps) => {
  const variants = {
    primary:
      "flex items-center justify-center outline-none focus:ring-4 focus:ring-blue-400 bg-fb w-full rounded-lg text-white hover:bg-blue-600",
    secondary:
      "flex justify-center items-center focus:ring-4 focus:ring-gray-400 bg-gray-200 hover:bg-gray-300 w-full rounded-lg outline-none",
    default: "font-semibold hover:bg-gray-200",
  };

  const variantStyle = variant ? variants[variant] : "";

  return (
    <button
      disabled={disabled}
      type={type}
      className={`${variantStyle} ${className}`}
      onClick={onClick}
    >
      {isLoading ? (
        <img
          src={
            variant === "secondary" || variant == "default"
              ? loaderDark
              : loader
          }
        />
      ) : text ? (
        text
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
