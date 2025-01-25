import { FormProvider, useForm } from "react-hook-form";
import type { ZodEffects, ZodObject } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface FormProps {
  children?: React.ReactNode;
  schema?: ZodObject<any> | ZodEffects<any>;
  onSubmit: (data: any) => void;
}

export function Form({ children, schema, onSubmit }: FormProps) {
  const methods = useForm({
    resolver: schema ? zodResolver(schema) : undefined,
    mode: "onBlur",
  });

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
