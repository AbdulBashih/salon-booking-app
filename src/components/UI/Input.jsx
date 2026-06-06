export default function Input({ label, id, error, className = "", ...props }) {
  return (
    <label className={`field ${className}`} htmlFor={id}>
      {label && <span className="field__label">{label}</span>}
      <input id={id} className={`field__control ${error ? "field__control--error" : ""}`} {...props} />
      {error && <span className="field__error">{error}</span>}
    </label>
  );
}
