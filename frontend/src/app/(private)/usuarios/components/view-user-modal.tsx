import { Modal } from "@/components/modal";
import type { User } from "@/services/user";

interface ViewUserModalProps {
  user?: User;
}

export function ViewUserModal({ user }: ViewUserModalProps) {
  return (
    <Modal id="view-user-modal">
      <h3 className="font-bold text-lg pb-4 select-none">{user?.name}</h3>

      <p>Nome de usuário: {user?.username}</p>
      <p>Cadastrado em: {user?.createdAtFormatted}</p>
      <p>Última alteração: {user?.updatedAtFormatted}</p>
    </Modal>
  );
}
