interface SubmitProps {
  label: string;
}

export function Submit({ label }: SubmitProps) {
  return (
    <div>
      <button type="submit" className="dui-btn dui-btn-primary float-end">
        {label}
      </button>
    </div>
  );
}
