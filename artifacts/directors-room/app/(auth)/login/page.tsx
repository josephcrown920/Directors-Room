import AuthForm from "@/components/auth/AuthForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-ink flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-3xl text-white text-center mb-8">
          Welcome back
        </h1>
        <AuthForm mode="login" />
        <p className="text-center text-sm text-muted mt-6">
          No account?{" "}
          <Link href="/signup" className="text-accent">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
