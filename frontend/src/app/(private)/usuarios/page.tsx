import { UserTableRow } from "./components";

export default function Usuarios() {
  const users = [
    {
      id: "1",
      name: "John Doe",
      username: "john.doe",
      createdAt: new Date("2022-01-01").toISOString(),
      updatedAt: new Date("2022-01-01").toISOString(),
      createdAtFormatted: "2022-01-01",
      updatedAtFormatted: "2022-01-01",
    },
  ];

  return (
    <div>
      <div className="dui-card shadow-md">
        <div className="dui-card-body">
          <div>
            <h1 className="inline">Usuários</h1>
            <button className="dui-btn dui-btn-sm float-end dui-btn-primary">
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
                <UserTableRow key={user.id} user={user} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
