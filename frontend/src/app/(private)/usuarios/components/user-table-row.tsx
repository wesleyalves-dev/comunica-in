import { FaPen, FaTrash } from "react-icons/fa6";

import type { User } from "@/services/user";

interface UserTableRow {
  user: User;
}

export function UserTableRow({ user }: UserTableRow) {
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.username}</td>
      <td>{user.createdAtFormatted}</td>
      <td>{user.updatedAtFormatted}</td>
      <td className="flex flex-row gap-4">
        <div className="dui-tooltip" data-tip="Editar">
          <button>
            <FaPen />
          </button>
        </div>
        <div className="dui-tooltip" data-tip="Excluir">
          <button>
            <FaTrash />
          </button>
        </div>
      </td>
    </tr>
  );
}
