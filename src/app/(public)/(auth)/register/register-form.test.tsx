const register = vi.fn();

vi.mock("@/api/auth/auth-context", () => ({
  useAuth: () => ({
    register,
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
import RegisterForm from "./register-form";

describe("<RegisterForm />", () => {
  let emailInput: HTMLElement;
  let passwordInputs: HTMLElement[];
  let registerButton: HTMLElement;

  const validEmail = "test@example.com";
  const invalidEmail = "test";

  const validPassword = "P@ssw0rd";
  const invalidPassword = "123";

  beforeEach(() => {
    render(<RegisterForm />);
    emailInput = screen.getByLabelText(/email/i);
    passwordInputs = screen.getAllByLabelText(/password/i);
    registerButton = screen.getByRole("button", { name: /register/i });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders", () => {
    expect(emailInput).toBeInTheDocument();
    expect(passwordInputs[0]).toBeInTheDocument();
    expect(passwordInputs[1]).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });

  it("renders validation errors on empty submission", async () => {
    await userEvent.click(registerButton);

    expect(emailInput).toHaveAttribute("aria-invalid", "true");
    expect(passwordInputs[0]).toHaveAttribute("aria-invalid", "true");
  });

  it("renders validation error on bad email", async () => {
    await userEvent.type(emailInput, invalidEmail);
    await userEvent.type(passwordInputs[0], validPassword);
    await userEvent.type(passwordInputs[1], validPassword);
    await userEvent.click(registerButton);

    expect(emailInput).toHaveAttribute("aria-invalid", "true");
  });

  it("renders validation error on bad password", async () => {
    await userEvent.type(emailInput, validEmail);
    await userEvent.type(passwordInputs[0], invalidPassword);
    await userEvent.type(passwordInputs[1], invalidPassword);
    await userEvent.click(registerButton);

    expect(passwordInputs[0]).toHaveAttribute("aria-invalid", "true");
  });

  it("renders validation error on password missmatch", async () => {
    await userEvent.type(emailInput, validEmail);
    await userEvent.type(passwordInputs[0], validPassword);
    await userEvent.type(passwordInputs[1], `another${validPassword}`);
    await userEvent.click(registerButton);

    expect(passwordInputs[1]).toHaveAttribute("aria-invalid", "true");
  });

  it("calls register() and push() on valid submission", async () => {
    register.mockResolvedValue({ success: true });

    await userEvent.type(emailInput, validEmail);
    await userEvent.type(passwordInputs[0], validPassword);
    await userEvent.type(passwordInputs[1], validPassword);
    await userEvent.click(registerButton);

    expect(register).toHaveBeenCalledWith(validEmail, validPassword);
    expect(push).toHaveBeenCalled();
  });

  it("renders error message if success is false", async () => {
    register.mockResolvedValueOnce({
      success: false,
      message: "Registration failed",
    });

    await userEvent.type(emailInput, validEmail);
    await userEvent.type(passwordInputs[0], validPassword);
    await userEvent.type(passwordInputs[1], validPassword);
    await userEvent.click(registerButton);

    expect(screen.getByText(/registration failed/i)).toBeInTheDocument();
  });
});
