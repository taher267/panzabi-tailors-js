import styled from "styled-components";
const Input = styled.input`
  width: 100%;
  padding: 5px 10px;
`;
/**
 *
 * @property {object} label:classname, text
 * @returns
 */

export default function CustomInput({
  label,
  required,
  errorField,
  error,
  ...rest
}) {
  return (
    <div>
      {label && <label className={label?.className}>{label?.text}</label>}
      <Input {...rest} required={!required} />
      {errorField && (
        <div className={errorField?.className}>{error && error}</div>
      )}
    </div>
  );
}
