"use client";

import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function AuthCard({ mode }: { mode: "login" | "register" }) {
  const [message, setMessage] = useState("");
  const isRegister = mode === "register";

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") || "");
    const password = String(data.get("password") || "");
    const username = String(data.get("username") || "");
    const supabase = createClient();

    if (!supabase) {
      setMessage("Demo mode: Supabase will be connected after the dedicated project is created.");
      return;
    }

    const result = isRegister
      ? await supabase.auth.signUp({ email, password, options: { data: { username, display_name: username } } })
      : await supabase.auth.signInWithPassword({ email, password });

    if (result.error) {
      setMessage(result.error.message);
      return;
    }

    window.location.href = isRegister ? "/onboarding" : "/home";
  }

  return (
    <div className="auth-card">
      <span className="eyebrow">{isRegister ? "New member" : "Welcome back"}</span>
      <h1>{isRegister ? "SIGN THE BOOK." : "BACK TO THE SHOW."}</h1>
      <p>{isRegister ? "Create a profile and step into the community." : "Your friends are probably already arguing about a boss pattern."}</p>
      <form onSubmit={submit}>
        {isRegister && <label>Username<input name="username" placeholder="inkrunner" minLength={3} required /></label>}
        <label>Email<input type="email" name="email" placeholder="you@example.com" required /></label>
        <label>Password<input type="password" name="password" placeholder="••••••••" minLength={8} required /></label>
        <button className="primary-button large" type="submit">{isRegister ? "Create profile" : "Sign in"}</button>
      </form>
      {message && <div className="auth-message">{message}</div>}
      <small>{isRegister ? "Already a member?" : "New around here?"} <Link href={isRegister ? "/login" : "/register"}>{isRegister ? "Sign in" : "Create account"}</Link></small>
    </div>
  );
}