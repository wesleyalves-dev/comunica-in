import { Modal } from "@/components/modal";
import type { User } from "@/services/user";

interface DeleteUserModalProps {
  user?: User;
}

export function DeleteUserModal({ user }: DeleteUserModalProps) {
  return (
    <Modal id="delete-user-modal">
      <h3 className="font-bold text-lg pb-4 select-none">Excluir usuário</h3>

      <span className="block pb-4">Deseja excluir o usuário {user?.name}?</span>

      <button className="dui-btn dui-btn-error float-end">Confirmar</button>
    </Modal>
  );
}
