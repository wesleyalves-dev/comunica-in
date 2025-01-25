interface SubmitProps {
  label: string;
}

export function Submit({ label }: SubmitProps) {
  return (
    <button type="submit" className="dui-btn dui-btn-primary">
      {label}
    </button>
  );
}
