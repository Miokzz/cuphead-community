import Link from "next/link";
import { Brand } from "@/components/Brand";
import { AuthCard } from "@/components/AuthCard";

export default function LoginPage() {
  return <main className="auth-page"><div className="film-layer" /><header><Brand /><Link href="/">← Back</Link></header><AuthCard mode="login" /></main>;
}
