"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { SignUpData } from "@/lib/types/auth";
import { SignUpSchema } from "@/lib/validations/auth";
import { api } from "@/lib/axios";
import { ApiResponse } from "@/lib/types/api";
import {useState } from "react";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";
import { AxiosError } from "axios";

const SignUpForm = () => {
    const [loading , setLoading] = useState(false);

    const form = useForm<SignUpData>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    async function onSubmit(data: SignUpData) {
        try{
            setLoading(true);
            const response = await api.post<ApiResponse>("/auth/register", data);

            console.log("Sign up successful:", response);
            toast.success(response.data.message || "Account created successfully!");
           
        } catch (error: unknown) {
          if (error instanceof AxiosError) {
                const apiError = error.response?.data as ApiResponse;
                toast.error(apiError.message || "An error occurred during sign up");
          } else {
            toast.error("An error occurred during sign up");
            }
        } finally {
            setLoading(false);
        }
    }

    const features = [
  "AI-powered contract review",
  "Automated risk detection",
  "Human approval workflows",
];

    return (
       <section className="section-padding relative min-h-screen overflow-hidden pt-14 md:pt-20">
  <div className="pointer-events-none absolute inset-0 opacity-40 hero-grid" />
  <div className="pointer-events-none absolute -left-24 top-12 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
  <div className="pointer-events-none absolute right-0 top-32 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />

  <div className="section-container relative">
    <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">

      {/* LEFT */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-2xl"
      >
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground shadow-sm backdrop-blur-xl">
          Secure AI Contract Intelligence
        </div>

        <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-foreground md:text-6xl lg:text-7xl">
          Create your{" "}
          <span className="gradient-text">
            ContractIQ
          </span>{" "}
          account
        </h1>

        <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground md:text-lg">
          Join legal teams using AI to review contracts,
          identify risks, automate approvals, and generate
          compliance reports in minutes.
        </p>

        <div className="mt-10 space-y-4">
          {features.map((feature) => (
            <div
              key={feature}
              className="flex items-center gap-3"
            >
              <CheckCircle2 className="size-5 text-primary" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* RIGHT */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative"
      >
        <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-primary/20 via-transparent to-sky-500/10 blur-2xl" />

        <Card className="glass-card glow-border relative overflow-hidden rounded-[2rem] border-border/60 bg-background/75">
          <div className="hero-grid absolute inset-0 opacity-40" />

          <CardContent className="relative p-8 md:p-10">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold tracking-tight">
                Create Account
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Start reviewing contracts in minutes.
              </p>
            </div>

            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5"
            >
              <div>
                <Input
                  placeholder="Full Name"
                  className="h-12 rounded-2xl border-border/60 bg-background/70 backdrop-blur-sm"
                  {...form.register("name")}
                />

                {form.formState.errors.name && (
                  <p className="mt-2 text-xs text-destructive">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  className="h-12 rounded-2xl border-border/60 bg-background/70 backdrop-blur-sm"
                  {...form.register("email")}
                />

                {form.formState.errors.email && (
                  <p className="mt-2 text-xs text-destructive">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  className="h-12 rounded-2xl border-border/60 bg-background/70 backdrop-blur-sm"
                  {...form.register("password")}
                />

                {form.formState.errors.password && (
                  <p className="mt-2 text-xs text-destructive">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="h-12 w-full rounded-2xl"
              >
                {loading ? <Spinner /> : "Create Account"}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/signin"
                  className="font-medium text-primary hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </motion.div>

    </div>
  </div>
</section>
    );
};

export default SignUpForm;