// components/form/FormInput.tsx
import { useFormContext } from "react-hook-form";
import { Input } from "antd";
import { FormInputs } from "../../types/form.input";

const FormInput = ({ type, name, label, placeholder }: FormInputs) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div style={{ marginBottom: "16px" }}>
      <label htmlFor={name} style={{ display: "block", marginBottom: "4px" }}>
        {label}
      </label>
      <Input
        type={type}
        id={name}
        placeholder={placeholder}
        {...register(name, {
          required: `${label} is required`,
        })}
      />
      {errors[name] && (
        <p style={{ color: "red", marginTop: "4px" }}>
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default FormInput;
