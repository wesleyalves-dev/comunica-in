interface TextInputProps {
  name: string;
  placeholder?: string;
}

export function Password({ name, placeholder }: TextInputProps) {
  return (
    <input
      name={name}
      placeholder={placeholder}
      type="password"
      className="dui-input dui-input-bordered w-full"
    />
  );
}
