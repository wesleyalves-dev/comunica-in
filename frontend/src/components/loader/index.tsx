interface LoaderProps {
  active?: boolean;
}

export function Loader({ active }: LoaderProps) {
  if (!active) return null;

  return (
    <div className="absolute w-full h-full top-0 left-0 flex justify-center items-center bg-black bg-opacity-75 z-50">
      <span className="dui-loading dui-loading-spinner dui-loading-lg text-white" />
    </div>
  );
}
