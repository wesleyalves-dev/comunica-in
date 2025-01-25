interface FormProps {
  children?: React.ReactNode;
  onSubmit?: (data: any) => void;
}

export function Form({ children, onSubmit }: FormProps) {
  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      {children}
    </form>
  );
}
