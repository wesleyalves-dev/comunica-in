"use client";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

import { Form, TextInput, Password, Submit } from "@/components/form";
import { useSignIn } from "@/hooks/use-sign-in";

export default function Home() {
  const signIn = useSignIn({
    onSuccess: () => redirect("/usuarios"),
    onError: (error: any) =>
      toast.error(error.response?.data.message || "Erro ao efetuar login"),
  });

  function handleSubmit(values: any) {
    const { username, password } = values;
    signIn.mutate({ username, password });
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
            <Submit
              label="Entrar"
              loading={signIn.isPending}
              disabled={signIn.isPending}
            />
          </Form>
        </div>
      </div>
    </main>
  );
}
