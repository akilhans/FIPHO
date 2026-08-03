"use client";

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

import { useAuth } from "@/hooks/use-auth";
import { BrandLockup } from "@/components/admin/brand-lockup";
import { getAdminContext, getDefaultAdminRoute } from "@/lib/admin-route";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginValues = z.infer<typeof loginSchema>;

type ValidatedNext =
  | { kind: "relative"; value: string }
  | { kind: "absolute"; value: string }
  | null;

function validateNext(value: string | null): ValidatedNext {
  if (!value) return null;
  if (value.startsWith("/") && !value.startsWith("//")) {
    return { kind: "relative", value };
  }
  try {
    const parsed = new URL(value);
    const allowedOrigins = new Set<string>();
    if (typeof window !== "undefined") {
      allowedOrigins.add(window.location.origin);
    }
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (apiUrl) {
      try {
        allowedOrigins.add(new URL(apiUrl).origin);
      } catch {
        // ignore malformed env
      }
    }
    if (allowedOrigins.has(parsed.origin)) {
      return { kind: "absolute", value: parsed.toString() };
    }
  } catch {
    // not a valid URL
  }
  return null;
}

function LoginPageBody() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [hostname, setHostname] = useState<string>();

  useEffect(() => {
    setHostname(window.location.hostname);
  }, []);

  const context = getAdminContext(hostname);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = async (values: LoginValues) => {
    setError("");
    try {
      const success = await login(values.username, values.password);
      if (success) {
        const next = validateNext(searchParams.get("next"));
        if (next?.kind === "absolute") {
          window.location.href = next.value;
          return;
        }
        if (next?.kind === "relative") {
          router.push(next.value);
          return;
        }
        router.push(getDefaultAdminRoute(window.location.hostname));
      } else {
        setError("Invalid username or password");
      }
    } catch {
      setError("Network error. Please check your connection.");
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.22),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(2,132,199,0.14),_transparent_30%),linear-gradient(180deg,_#eff6ff_0%,_#e0f2fe_100%)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative overflow-hidden rounded-[2.25rem] bg-[#122030] p-8 text-white shadow-[0_26px_80px_rgba(18,32,48,0.28)] sm:p-10 lg:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.24),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.20),transparent_30%)]" />
          <Image
            src="/logo/fipho-logo-transparent.png"
            alt=""
            aria-hidden="true"
            width={3756}
            height={3148}
            className="pointer-events-none absolute -right-28 top-8 h-64 w-80 object-contain opacity-10"
            sizes="320px"
            priority
          />
          <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#38bdf8]/40 bg-[#0ea5e9]/15 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#bae6fd]">
            <ShieldCheck className="h-4 w-4" />
            {context.accentLabel}
          </div>
          <BrandLockup
            className="mt-6 border-[#7dd3fc]/50 bg-white/96"
            priority
          />

          <div className="mt-8 space-y-5">
            <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              {context.title}
            </h1>
            <p className="max-w-xl text-base leading-7 text-[#a7bacd]">
              {context.subtitle}
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#7dd3fc]">
                Access
              </div>
              <p className="mt-3 text-sm leading-6 text-[#c7d2dd]">
                Secure access for operations staff, reviewers, and content
                managers.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#7dd3fc]">
                Workflow
              </div>
              <p className="mt-3 text-sm leading-6 text-[#c7d2dd]">
                Manage submissions, inspect delegation details, publish content,
                and export operational data.
              </p>
            </div>
          </div>

          <div className="mt-10 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-[#d8e2ec]">
            <Sparkles className="h-4 w-4 text-[#7dd3fc]" />
            FIPHO operations dashboard
          </div>
          </div>
        </div>

        <Card className="w-full rounded-[2.25rem] border-[#bae6fd] bg-white/88 shadow-[0_24px_70px_rgba(28,40,56,0.12)] backdrop-blur">
          <CardHeader className="space-y-4 p-8 pb-4 sm:p-10 sm:pb-4">
            <BrandLockup className="w-fit bg-white" />
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#7dd3fc] bg-[#e0f2fe] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#0369a1]">
              Admin Sign In
            </div>
            <div>
              <CardTitle className="text-3xl tracking-tight text-[#1b2939]">
                Welcome back
              </CardTitle>
              <CardDescription className="mt-2 text-sm leading-6 text-[#667282]">
                Sign in to continue to the FIPHO administration workspace.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-8 pt-2 sm:p-10 sm:pt-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#314254]">Username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="admin"
                          className="h-12 rounded-xl border-[#bae6fd] bg-[#f0f9ff]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#314254]">Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          className="h-12 rounded-xl border-[#bae6fd] bg-[#f0f9ff]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {error ? (
                  <p className="rounded-xl border border-[#efc5c1] bg-[#fff1f0] px-4 py-3 text-sm text-[#9a3d34]">
                    {error}
                  </p>
                ) : null}
                <Button
                  type="submit"
                  className="h-12 w-full rounded-full bg-[#0284c7] text-white hover:bg-[#0369a1]"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Signing in..." : "Sign in"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginPageBody />
    </Suspense>
  );
}
