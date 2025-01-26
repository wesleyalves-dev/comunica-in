import { ReactNode } from "react";

interface ModalProps {
  id: string;
  children: ReactNode;
  onClose?: VoidFunction;
}

export function Modal({ id, children, onClose }: ModalProps) {
  return (
    <dialog id={id} className="dui-modal" onClose={onClose}>
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
