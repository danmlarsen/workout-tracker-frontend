const loginWithCredentials = vi.fn();

vi.mock("@/api/auth/auth-context", () => ({
  useAuth: () => ({
    loginWithCredentials,
  }),
}));

const push = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push,
  }),
}));

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "./login-form";

describe("<LoginForm />", () => {
  let emailInput: HTMLElement;
  let passwordInput: HTMLElement;
  let loginButton: HTMLElement;

  beforeEach(() => {
    render(<LoginForm />);
    emailInput = screen.getByLabelText(/email/i);
    passwordInput = screen.getByLabelText(/password/i);
    loginButton = screen.getByRole("button", { name: /login/i });
  });

  it("renders", () => {
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it("renders validation errors on empty submission", async () => {
    await userEvent.click(loginButton);

    expect(emailInput).toHaveAttribute("aria-invalid", "true");
    expect(passwordInput).toHaveAttribute("aria-invalid", "true");
  });

  it("calls loginWithCredentials on valid submission", async () => {
    loginWithCredentials.mockResolvedValueOnce({ success: true });

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "supersecret");
    await userEvent.click(loginButton);

    expect(loginWithCredentials).toHaveBeenCalledWith(
      "test@example.com",
      "supersecret",
    );
  });

  it("renders validation error on invalid login", async () => {
    loginWithCredentials.mockResolvedValueOnce({ success: false });

    await userEvent.type(emailInput, "invalid@example.com");
    await userEvent.type(passwordInput, "supersecret");
    await userEvent.click(loginButton);

    expect(screen.getByText(/login failed/i)).toBeInTheDocument();
  });
});
