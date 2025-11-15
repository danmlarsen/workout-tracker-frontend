import RecaptchaProvider from "@/components/recaptcha-provider";

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RecaptchaProvider>{children}</RecaptchaProvider>;
}
