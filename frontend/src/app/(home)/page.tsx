"use client";
import { redirect } from "next/navigation";

export default function Home() {
  function handleSubmit(event: any) {
    event.preventDefault();
    redirect("/usuarios");
  }

  return (
    <main className="h-full flex justify-center items-center">
      <div className="dui-card shadow-xl w-96">
        <div className="dui-card-body">
          <h1 className="text-center text-2xl mb-4">Login</h1>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              className="dui-input dui-input-bordered w-full"
              type="text"
              placeholder="Usuário"
            />
            <input
              className="dui-input dui-input-bordered w-full"
              type="password"
              placeholder="Senha"
            />
            <button type="submit" className="dui-btn dui-btn-primary">
              Acessar
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
