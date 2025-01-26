import { FormProvider, useForm } from "react-hook-form";
import type { ZodEffects, ZodObject } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export interface FormOnSubmitOptions {
  reset: VoidFunction;
}

interface FormProps {
  children?: React.ReactNode;
  schema?: ZodObject<any> | ZodEffects<any>;
  values?: any;
  onSubmit: (data: any, options: FormOnSubmitOptions) => void;
}

export function Form({ children, schema, values, onSubmit }: FormProps) {
  const methods = useForm({
    resolver: schema ? zodResolver(schema) : undefined,
    mode: "onBlur",
    values,
  });

  function handleSubmit(values: any) {
    onSubmit(values, {
      reset: methods.reset,
    });
  }

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col gap-4"
        onSubmit={methods.handleSubmit(handleSubmit)}
      >
        {children}
      </form>
    </FormProvider>
  );
}
