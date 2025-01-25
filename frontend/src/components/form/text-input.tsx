import { useFormContext } from "react-hook-form";

import { FieldError } from "./field-error";

interface TextInputProps {
  name: string;
  placeholder?: string;
}

export function TextInput({ name, placeholder }: TextInputProps) {
  const { register } = useFormContext();

  return (
    <div>
      <input
        placeholder={placeholder}
        type="text"
        className="dui-input dui-input-bordered w-full"
        {...register(name)}
      />
      <FieldError name={name} />
    </div>
  );
}
