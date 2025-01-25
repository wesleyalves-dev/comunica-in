"use client";
import { redirect } from "next/navigation";

import { Form, TextInput, Password, Submit } from "@/components/form";

export default function Home() {
  function handleSubmit(event: any) {
    event.preventDefault();
    redirect("/usuarios");
  }

  return (
    <main className="h-full flex justify-center items-center">
      <div className="dui-card shadow-xl w-96">
        <div className="dui-card-body">
          <h1 className="text-center text-2xl mb-4 select-none font-bold">
            Login
          </h1>

          <Form onSubmit={handleSubmit}>
            <TextInput name="username" placeholder="Usuário" />
            <Password name="password" placeholder="Senha" />
            <Submit label="Entrar" />
          </Form>
        </div>
      </div>
    </main>
  );
}
