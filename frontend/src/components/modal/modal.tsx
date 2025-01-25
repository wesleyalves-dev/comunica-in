import { ReactNode } from "react";

interface ModalProps {
  id: string;
  children: ReactNode;
}

export function Modal({ id, children }: ModalProps) {
  return (
    <dialog id={id} className="dui-modal">
      <div className="dui-modal-box">
        <form method="dialog">
          <button className="dui-btn dui-btn-sm dui-btn-circle dui-btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>

        {children}
      </div>
    </dialog>
  );
}
