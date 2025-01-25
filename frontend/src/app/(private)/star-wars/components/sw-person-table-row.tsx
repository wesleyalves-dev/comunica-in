import { FaEye } from "react-icons/fa6";

import type { SwPerson } from "@/services/sw-person";

interface SwPersonTableRow {
  person: SwPerson;
  onViewClick: (person: SwPerson) => void;
}

export function SwPersonTableRow({ person, onViewClick }: SwPersonTableRow) {
  function handleViewClick() {
    onViewClick(person);
  }

  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.birthYear}</td>
      <td>{person.createdFormatted}</td>
      <td>{person.editedFormatted}</td>
      <td>
        <div className="dui-tooltip" data-tip="Ver">
          <button onClick={handleViewClick}>
            <FaEye />
          </button>
        </div>
      </td>
    </tr>
  );
}
