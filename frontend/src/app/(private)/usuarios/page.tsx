"use client";
import { useState } from "react";

import { showModal } from "@/components/modal";
import type { User } from "@/services/user";
import { useListUsers } from "@/hooks/use-list-users";
import { Loader } from "@/components/loader";
import {
  UserTableRow,
  ViewUserModal,
  CreateUserModal,
  UpdateUserModal,
  DeleteUserModal,
} from "./components";

export default function Usuarios() {
  const [selectedUser, setSelectedUser] = useState<User>();
  const { data, isLoading } = useListUsers();
  const users = data?.items ?? [];

  function handleViewUserClick(user: User) {
    setSelectedUser(user);
    showModal("view-user-modal");
  }

  function handleUpdateUserClick(user: User) {
    setSelectedUser(user);
    showModal("update-user-modal");
  }

  function handleDeleteUserClick(user: User) {
    setSelectedUser(user);
    showModal("delete-user-modal");
  }

  return (
    <div>
      <Loader active={isLoading} />
      <div className="dui-card shadow-md">
        <div className="dui-card-body">
          <div>
            <h1 className="inline">Usuários</h1>
            <button
              className="dui-btn dui-btn-sm float-end dui-btn-primary"
              onClick={() => showModal("create-user-modal")}
            >
              Cadastrar
            </button>
          </div>
          <table className="dui-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Usuário</th>
                <th>Criado em</th>
                <th>Alterado em</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <UserTableRow
                  key={user.id}
                  user={user}
                  onViewClick={handleViewUserClick}
                  onUpdateClick={handleUpdateUserClick}
                  onDeleteClick={handleDeleteUserClick}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ViewUserModal user={selectedUser} />
      <CreateUserModal />
      <UpdateUserModal user={selectedUser} />
      <DeleteUserModal user={selectedUser} />
    </div>
  );
}
