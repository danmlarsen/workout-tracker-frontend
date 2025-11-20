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

  const validEmail = "test@example.com";
  const invalidEmail = "user@not-registered.com";

  const password = "password";

  beforeEach(() => {
    render(<LoginForm />);
    emailInput = screen.getByLabelText(/email/i);
    passwordInput = screen.getByLabelText(/password/i);
    loginButton = screen.getByRole("button", { name: /login/i });
  });

  afterEach(() => {
    vi.clearAllMocks();
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

  it("calls loginWithCredentials and push on valid submission", async () => {
    loginWithCredentials.mockResolvedValueOnce({ success: true });

    await userEvent.type(emailInput, validEmail);
    await userEvent.type(passwordInput, password);
    await userEvent.click(loginButton);

    expect(loginWithCredentials).toHaveBeenCalledWith(validEmail, password);
    expect(push).toHaveBeenCalled();
  });

  it("renders validation error on invalid login", async () => {
    loginWithCredentials.mockResolvedValueOnce({ success: false });

    await userEvent.type(emailInput, invalidEmail);
    await userEvent.type(passwordInput, password);
    await userEvent.click(loginButton);

    expect(screen.getByText(/login failed/i)).toBeInTheDocument();
  });
});
