export default function Button({ children, text, ...rest }) {
  return (
    <button {...rest}>
      {text && text}
      {children}
    </button>
  );
}
