import { Controller, useFormContext } from "react-hook-form";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { FormInputs } from "../../types/form.input";
import { Input } from "antd";

const FormInput = ({ type, name, label, placeholder }: FormInputs) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div style={{ marginBottom: "16px" }}>
      <label
        htmlFor={name}
        style={{
          display: "inline-block",
          fontWeight: "bold",
          fontSize: "18px",
          color: "#333",
          textAlign: "left",
          width: "100%",
          marginBottom: "4px",
        }}
      >
        {label}
      </label>

      <div style={{ position: "relative" }}>
        <Controller
          name={name}
          control={control}
          defaultValue=""
          rules={{ required: `${label} is required` }}
          render={({ field }) => (
            <Input
              {...field}
              id={name}
              placeholder={placeholder}
              type={
                type === "password"
                  ? isPasswordVisible
                    ? "text"
                    : "password"
                  : type
              }
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ddd",
                boxSizing: "border-box",
              }}
            />
          )}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            style={{
              position: "absolute",
              right: "8px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
          </button>
        )}
      </div>

      {errors[name] && (
        <p style={{ color: "red", marginTop: "4px" }}>
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default FormInput;
