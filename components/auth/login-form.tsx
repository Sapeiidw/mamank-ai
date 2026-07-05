"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { signIn } from "@/lib/auth-client";
import { loginSchema, type LoginInput } from "@/lib/auth-schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleIcon } from "@/components/auth/google-icon";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") ?? "/dashboard";
  const [googleLoading, setGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  async function onSubmit(values: LoginInput) {
    const { error } = await signIn.email({
      email: values.email,
      password: values.password,
      callbackURL: redirectTo,
    });

    if (error) {
      toast.error(error.message ?? "Unable to sign in.");
      return;
    }

    router.push(redirectTo);
  }

  async function onGoogle() {
    setGoogleLoading(true);
    const { error } = await signIn.social({
      provider: "google",
      callbackURL: redirectTo,
    });
    if (error) {
      toast.error(error.message ?? "Unable to sign in with Google.");
      setGoogleLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            aria-invalid={!!errors.password}
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-destructive">{errors.password.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
        <span className="relative z-10 bg-background px-2 text-muted-foreground">
          or
        </span>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={onGoogle}
        disabled={googleLoading}
      >
        <GoogleIcon className="size-4" />
        {googleLoading ? "Redirecting..." : "Continue with Google"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-foreground underline underline-offset-4">
          Sign up
        </Link>
      </p>
    </div>
  );
}
