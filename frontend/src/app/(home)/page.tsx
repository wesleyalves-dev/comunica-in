"use client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { z } from "zod";

import { Form, TextInput, Password, Submit } from "@/components/form";
import { useSignIn } from "@/hooks/use-sign-in";
import { signInSchema } from "./schemas";

export default function Home() {
  const router = useRouter();
  const signIn = useSignIn({
    onSuccess: () => router.push("/usuarios"),
    onError: (error: any) =>
      toast.error(error.response?.data.message || "Erro ao efetuar login"),
  });

  function handleSubmit(values: z.infer<typeof signInSchema>) {
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

          <Form schema={signInSchema} onSubmit={handleSubmit}>
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
