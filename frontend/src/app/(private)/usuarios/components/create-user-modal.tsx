import { Form, TextInput, Password, Submit } from "@/components/form";
import { Modal } from "@/components/modal";

export function CreateUserModal() {
  function handleSubmit() {}

  return (
    <Modal id="create-user-modal">
      <h3 className="font-bold text-lg pb-4 select-none">Cadastrar usuário</h3>

      <Form onSubmit={handleSubmit}>
        <TextInput placeholder="Nome" name="name" />
        <TextInput placeholder="Usuário" name="username" />
        <Password placeholder="Senha" name="password" />
        <Password placeholder="Confirmar Senha" name="passwordConfirmation" />
        <Submit label="Salvar" />
      </Form>
    </Modal>
  );
}
