import "./Button.css";

export default function Button({
  children = "Submit",
  variant = "dark",
  onClick,
  disabled = false,
  type = "button",
}) {
  return (
    <button
      type={type}
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
