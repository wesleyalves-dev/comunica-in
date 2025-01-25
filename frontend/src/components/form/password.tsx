import { useFormContext } from "react-hook-form";

interface TextInputProps {
  name: string;
  placeholder?: string;
}

export function Password({ name, placeholder }: TextInputProps) {
  const { register } = useFormContext();

  return (
    <input
      placeholder={placeholder}
      type="password"
      className="dui-input dui-input-bordered w-full"
      {...register(name)}
    />
  );
}
