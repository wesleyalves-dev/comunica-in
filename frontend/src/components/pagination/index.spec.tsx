import { render, screen, fireEvent } from "@testing-library/react";

import { Pagination } from ".";

describe("Pagination", () => {
  const onPageChange = jest.fn();

  beforeEach(() => {
    onPageChange.mockClear();
  });

  it("espera renderizar a página 1", () => {
    render(
      <Pagination page={1} total={100} limit={10} onPageChange={onPageChange} />
    );

    expect(screen.getByText("Página 1")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "«" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "»" })).toBeEnabled();
  });

  it("espera renderizar a última página", () => {
    render(
      <Pagination
        page={10}
        total={100}
        limit={10}
        onPageChange={onPageChange}
      />
    );

    expect(screen.getByText("Página 10")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "«" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "»" })).toBeDisabled();
  });

  it("espera avançar de página", () => {
    render(
      <Pagination page={1} total={100} limit={10} onPageChange={onPageChange} />
    );

    const nextButton = screen.getByRole("button", { name: "»" });
    fireEvent.click(nextButton);

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("espera voltar de página", () => {
    render(
      <Pagination
        page={10}
        total={100}
        limit={10}
        onPageChange={onPageChange}
      />
    );

    const previousButton = screen.getByRole("button", { name: "«" });
    fireEvent.click(previousButton);

    expect(onPageChange).toHaveBeenCalledWith(9);
  });
});
