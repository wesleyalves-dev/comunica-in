import { FaPen, FaTrash } from "react-icons/fa6";

import type { User } from "@/services/user";

interface UserTableRow {
  user: User;
  onUpdateClick: (user: User) => void;
  onDeleteClick: (user: User) => void;
}

export function UserTableRow({
  user,
  onUpdateClick,
  onDeleteClick,
}: UserTableRow) {
  function handleUpdateClick() {
    onUpdateClick(user);
  }

  function handleDeleteClick() {
    onDeleteClick(user);
  }

  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.username}</td>
      <td>{user.createdAtFormatted}</td>
      <td>{user.updatedAtFormatted}</td>
      <td className="flex flex-row gap-4">
        <div className="dui-tooltip" data-tip="Editar">
          <button onClick={handleUpdateClick}>
            <FaPen />
          </button>
        </div>
        <div className="dui-tooltip" data-tip="Excluir">
          <button onClick={handleDeleteClick}>
            <FaTrash />
          </button>
        </div>
      </td>
    </tr>
  );
}
