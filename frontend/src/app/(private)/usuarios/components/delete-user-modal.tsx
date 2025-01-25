import { toast } from "react-toastify";

import { closeModal, Modal } from "@/components/modal";
import { Button } from "@/components/button";
import type { User } from "@/services/user";
import { useDeleteUser } from "@/hooks/use-delete-user";

interface DeleteUserModalProps {
  user?: User;
}

export function DeleteUserModal({ user }: DeleteUserModalProps) {
  const { mutate: deleteUser, isPending } = useDeleteUser({
    onSuccess: () => {
      toast.success("Usuário excluído com sucesso");
      closeModal("delete-user-modal");
    },
    onError: (error: any) => {
      toast.error(error.response?.data.message || "Erro ao excluir usuário");
    },
  });

  function handleConfig() {
    if (!user) return;
    deleteUser(user.id);
  }

  return (
    <Modal id="delete-user-modal">
      <h3 className="font-bold text-lg pb-4 select-none">Excluir usuário</h3>

      <span className="block pb-4">Deseja excluir o usuário {user?.name}?</span>

      <Button
        label="Confirmar"
        className="dui-btn-error float-end"
        loading={isPending}
        onClick={handleConfig}
      />
    </Modal>
  );
}
