import "./button.scss";

function Button({ children, outline, normal, small, onclick, classname }) {
  return (
    <button
      className={`btn ${outline ? "outline" : ""} ${normal ? "normal" : ""} ${
        small ? "small" : ""
      }`}
      onClick={onclick ? onclick : null}
    >
      {children}
    </button>
  );
}

export default Button;
