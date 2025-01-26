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
      <label className="dui-input dui-input-bordered grid grid-cols-7 items-center justify-between gap-2">
        <input
          className="col-span-6"
          placeholder={placeholder}
          type={type}
          {...register(name)}
        />
        <button className="col-span-1" type="button" onClick={togglePassword}>
          <span className="select-none">
            {type === "password" ? "Mostrar" : "Ocultar"}
          </span>
        </button>
      </label>
      <FieldError name={name} />
    </div>
  );
}
