import { FormProvider, useForm } from "react-hook-form";

interface FormProps {
  children?: React.ReactNode;
  onSubmit: <FormValues>(data: FormValues) => void;
}

export function Form({ children, onSubmit }: FormProps) {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col gap-4"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        {children}
      </form>
    </FormProvider>
  );
}
