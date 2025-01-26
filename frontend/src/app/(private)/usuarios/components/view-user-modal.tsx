// import { Loader } from "@/components/loader";
import { Modal } from "@/components/modal";
import { useGetUser } from "@/hooks/use-get-user";

interface ViewUserModalProps {
  id?: string;
}

export function ViewUserModal({ id }: ViewUserModalProps) {
  const { data: user, isLoading } = useGetUser(id);

  return (
    <Modal id="view-user-modal">
      {isLoading ? (
        <div className="flex w-52 flex-col gap-4">
          <div className="dui-skeleton h-4 w-28"></div>
          <div className="dui-skeleton h-4 w-full"></div>
          <div className="dui-skeleton h-4 w-full"></div>
          <div className="dui-skeleton h-4 w-full"></div>
        </div>
      ) : null}

      {!isLoading ? (
        <>
          <h3 className="font-bold text-lg pb-4 select-none">{user?.name}</h3>

          <p>Nome de usuário: {user?.username}</p>
          <p>Cadastrado em: {user?.createdAtFormatted}</p>
          <p>Última alteração: {user?.updatedAtFormatted}</p>
        </>
      ) : null}
    </Modal>
  );
}
