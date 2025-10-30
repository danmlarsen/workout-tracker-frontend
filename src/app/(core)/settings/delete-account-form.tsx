"use client";

import { useAuth } from "@/api/auth/auth-context";
import { useDeleteAccount } from "@/api/user/mutations";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { passwordSchema } from "@/validation/passwordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const schema = z.object({
  password: passwordSchema,
});

export default function DeleteAccountForm() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
    },
  });

  const { logout } = useAuth();
  const deleteAccount = useDeleteAccount();

  async function handleSubmit(data: z.infer<typeof schema>) {
    deleteAccount.mutate(data.password, {
      onSuccess: () => {
        logout();
      },
      onError: (error) => {
        form.setError("root", {
          type: "custom",
          message: error.message || "Unable to delete account",
        });
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <fieldset className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.formState.errors.root?.message && (
            <FormMessage>{form.formState.errors.root.message}</FormMessage>
          )}

          <Button type="submit" variant="destructive">
            Delete Account
          </Button>
        </fieldset>
      </form>
    </Form>
  );
}
