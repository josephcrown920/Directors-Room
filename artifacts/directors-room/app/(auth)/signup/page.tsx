import AuthForm from "@/components/auth/AuthForm";
import Link from "next/link";

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-ink flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-3xl text-white text-center mb-8">
          Create your account
        </h1>
        <AuthForm mode="signup" />
        <p className="text-center text-sm text-muted mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-accent">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
