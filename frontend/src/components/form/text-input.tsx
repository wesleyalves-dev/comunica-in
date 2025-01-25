interface TextInputProps {
  name: string;
  placeholder?: string;
}

export function TextInput({ name, placeholder }: TextInputProps) {
  return (
    <input
      name={name}
      placeholder={placeholder}
      type="text"
      className="dui-input dui-input-bordered w-full"
    />
  );
}
