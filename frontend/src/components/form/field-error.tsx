import { useFormContext } from "react-hook-form";

interface FieldErrorProps {
  name: string;
}

export function FieldError({ name }: FieldErrorProps) {
  const {
    formState: { errors },
  } = useFormContext();
  const message = errors[name]?.message as string | undefined;

  return message ? <span className="text-red-500">{message}</span> : null;
}
