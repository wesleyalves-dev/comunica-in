import { z } from "zod";
import { toast } from "react-toastify";

import { Form, TextInput, Password, Submit } from "@/components/form";
import { closeModal, Modal } from "@/components/modal";
import type { User } from "@/services/user";
import { useUpdateUser } from "@/hooks/use-update-user";
import { removeEmptyProps } from "@/utils/form";
import { updateUserSchema } from "./schemas";

interface UpdateUserModalProps {
  user?: User;
}

export function UpdateUserModal({ user }: UpdateUserModalProps) {
  const { mutate: updateUser, isPending } = useUpdateUser({
    onSuccess: () => {
      toast.success("Usuário atualizado com sucesso");
      closeModal("update-user-modal");
    },
    onError: (error: any) =>
      toast.error(
        error.response?.data.message || "Erro ao efetuar atualização"
      ),
  });

  function handleSubmit(values: z.infer<typeof updateUserSchema>) {
    if (!user) return;
    const { name, username, password } = removeEmptyProps(values);
    updateUser({ id: user.id, input: { name, username, password } });
  }

  return (
    <Modal id="update-user-modal">
      <h3 className="font-bold text-lg pb-4 select-none">Editar usuário</h3>

      <Form values={user} schema={updateUserSchema} onSubmit={handleSubmit}>
        <TextInput placeholder="Nome" name="name" />
        <TextInput placeholder="Usuário" name="username" />
        <Password placeholder="Senha" name="password" />
        <Password placeholder="Confirmar Senha" name="passwordConfirmation" />
        <Submit label="Salvar" loading={isPending} disabled={isPending} />
      </Form>
    </Modal>
  );
}
