interface ButtonProps {
  label: string;
  loading?: boolean;
  className?: string;
  onClick?: VoidFunction;
}

export function Button({ label, loading, className, onClick }: ButtonProps) {
  return (
    <button
      className={`dui-btn${className ? ` ${className}` : ``}`}
      disabled={loading}
      onClick={onClick}
    >
      {label}
      {loading ? <span className="dui-loading dui-loading-spinner" /> : null}
    </button>
  );
}
