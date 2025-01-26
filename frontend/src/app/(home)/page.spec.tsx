import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { act } from "react";

jest.mock("next/navigation", () => ({ useRouter: jest.fn() }));
jest.mock("../../hooks/use-sign-in", () => ({
  useSignIn: jest.fn(() => ({ mutate: jest.fn() })),
}));
import { useRouter } from "next/navigation";
import { useSignIn } from "@/hooks/use-sign-in";

import Page from "./page";

const createQueryClient = () => new QueryClient();

export function renderWithProviders(ui: React.ReactElement) {
  const queryClient = createQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      {ui}
    </QueryClientProvider>
  );
}

describe("Login", () => {
  it("espera renderizar o formulário de login", () => {
    renderWithProviders(<Page />);

    expect(screen.getByPlaceholderText("Usuário")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Senha")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("espera mostrar mensagens de erro do formulário", async () => {
    renderWithProviders(<Page />);

    act(() => {
      fireEvent.blur(screen.getByPlaceholderText("Usuário"));
      fireEvent.blur(screen.getByPlaceholderText("Senha"));
    });

    await waitFor(() => {
      expect(screen.getByText("Usuário é obrigatório")).toBeInTheDocument();
      expect(screen.getByText("Senha é obrigatória")).toBeInTheDocument();
    });
  });

  it("espera mostrar um toast de erro quando o login falhar", async () => {
    (useSignIn as jest.Mock).mockImplementationOnce(({ onError }: any) => ({
      mutate: () => onError(new Error()),
    }));
    renderWithProviders(<Page />);

    act(() => {
      fireEvent.change(screen.getByPlaceholderText("Usuário"), {
        target: { value: "invalid-username" },
      });
      fireEvent.change(screen.getByPlaceholderText("Senha"), {
        target: { value: "invalid-password" },
      });
      fireEvent.click(screen.getByRole("button"));
    });

    await waitFor(() => {
      expect(screen.getByText("Erro ao efetuar login")).toBeInTheDocument();
    });
  });

  it('espera redirecionar para "/users" quando o login for bem-sucedido', async () => {
    (useSignIn as jest.Mock).mockImplementationOnce(({ onSuccess }: any) => ({
      mutate: () => onSuccess(),
    }));
    const push = jest.fn();
    (useRouter as jest.Mock).mockImplementation(() => ({ push }));
    renderWithProviders(<Page />);

    act(() => {
      fireEvent.change(screen.getByPlaceholderText("Usuário"), {
        target: { value: "valid-username" },
      });
      fireEvent.change(screen.getByPlaceholderText("Senha"), {
        target: { value: "valid-password" },
      });
      fireEvent.click(screen.getByRole("button"));
    });

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith("/usuarios");
    });
  });
});
