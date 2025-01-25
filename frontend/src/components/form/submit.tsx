interface SubmitProps {
  label: string;
  loading?: boolean;
  disabled?: boolean;
}

export function Submit({ label, loading, disabled }: SubmitProps) {
  return (
    <div>
      <button
        type="submit"
        className="dui-btn dui-btn-primary float-end"
        disabled={disabled}
      >
        {label}
        {loading ? <span className="dui-loading dui-loading-spinner" /> : null}
      </button>
    </div>
  );
}
