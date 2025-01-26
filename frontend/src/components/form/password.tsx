import { useState } from "react";
import { useFormContext } from "react-hook-form";

import { FieldError } from "./field-error";

interface TextInputProps {
  name: string;
  placeholder?: string;
}

export function Password({ name, placeholder }: TextInputProps) {
  const { register } = useFormContext();
  const [type, setType] = useState("password");

  function togglePassword() {
    if (type === "password") setType("text");
    else setType("password");
  }

  return (
    <div>
      <label className="dui-input dui-input-bordered flex items-center justify-between gap-2">
        <input
          className="flex-auto"
          placeholder={placeholder}
          type={type}
          {...register(name)}
        />
        <button type="button" onClick={togglePassword}>
          <span className="select-none">
            {type === "password" ? "Mostrar" : "Ocultar"}
          </span>
        </button>
      </label>
      <FieldError name={name} />
    </div>
  );
}
