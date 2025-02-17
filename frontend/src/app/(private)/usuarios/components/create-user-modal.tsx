import { z } from "zod";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, TextInput, Password, Submit } from "@/components/form";
import { closeModal, Modal } from "@/components/modal";
import { useCreateUser } from "@/hooks/use-create-user";
import { createUserSchema } from "./schemas";

export function CreateUserModal() {
  const { mutate: createUser, isPending } = useCreateUser({
    onSuccess: () => {
      toast.success("Usuário cadastrado com sucesso");
      closeModal("create-user-modal");
    },
    onError: (error: any) =>
      toast.error(error.response?.data.message || "Erro ao efetuar cadastro"),
  });
  const methods = useForm({
    resolver: zodResolver(createUserSchema),
    mode: "onBlur",
  });

  function handleClose() {
    methods.reset();
  }

  function handleSubmit(values: z.infer<typeof createUserSchema>) {
    const { name, username, password } = values;
    createUser({ name, username, password });
  }

  return (
    <Modal id="create-user-modal" onClose={handleClose}>
      <h3 className="font-bold text-lg pb-4 select-none">Cadastrar usuário</h3>

      <Form
        schema={createUserSchema}
        customMethods={methods}
        onSubmit={handleSubmit}
      >
        <TextInput placeholder="Nome" name="name" />
        <TextInput placeholder="Usuário" name="username" />
        <Password placeholder="Senha" name="password" />
        <Password placeholder="Confirmar Senha" name="passwordConfirmation" />
        <Submit label="Salvar" loading={isPending} disabled={isPending} />
      </Form>
    </Modal>
  );
}
