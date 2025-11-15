import { cn } from "@/lib/utils";

export default function RecaptchaNotice({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "text-muted-foreground mt-2 text-center text-xs",
        className,
      )}
      {...props}
    >
      This demo is protected by reCAPTCHA <br />
      Google{" "}
      <a
        href="https://policies.google.com/privacy"
        className="underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        Privacy Policy
      </a>{" "}
      and{" "}
      <a
        href="https://policies.google.com/terms"
        className="underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        Terms of Service
      </a>{" "}
      apply.
    </p>
  );
}
