/**
 *
 * @property {object} label:classname, text
 * @returns
 */

export default function Input({ label, errorField, error, ...rest }) {
  return (
    <div>
      <label className={label?.className}>{label?.text}</label>
      <input {...rest} />
      {errorField && (
        <div className={errorField?.className}>{error && error}</div>
      )}
    </div>
  );
}
