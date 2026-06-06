export default function Select({ label, id, children, className = "", ...props }) {
  return (
    <label className={`field ${className}`} htmlFor={id}>
      {label && <span className="field__label">{label}</span>}
      <select id={id} className="field__control field__select" {...props}>
        {children}
      </select>
    </label>
  );
}
