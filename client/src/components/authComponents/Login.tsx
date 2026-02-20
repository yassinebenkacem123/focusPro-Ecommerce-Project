import React, { useEffect, useActionState, useRef, useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react"; // Optional: npm install lucide-react
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch } from "../../store/store";
import { login } from "../../features/authentication/authSlice";
import { toast } from "react-toastify";

type ActionState = {
  ok: boolean;
  message: string | null;
  roles: string[] | null;
};

const extractBackendMessage = (payload: unknown): string | null => {
  if (!payload) return null;
  if (typeof payload === "string") return payload;

  if (typeof payload === "object") {
    const maybeMessage = (payload as any).message;
    if (typeof maybeMessage === "string" && maybeMessage.trim()) return maybeMessage;

    const values = Object.values(payload as Record<string, unknown>);
    const firstString = values.find((v) => typeof v === "string" && v.trim());
    if (typeof firstString === "string") return firstString;

    try {
      return JSON.stringify(payload);
    } catch {
      return null;
    }
  }

  return null;
};

const initialActionState: ActionState = {
  ok: false,
  message: null,
  roles: null,
};

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const lastToastedErrorRef = useRef<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [state, formAction, pending] = useActionState(
    async (_prevState: ActionState, formDataFromSubmit: FormData): Promise<ActionState> => {
      const email = String(formDataFromSubmit.get("email") ?? "");
      const password = String(formDataFromSubmit.get("password") ?? "");

      try {
        const response = await dispatch(login({ email, password })).unwrap();
        const roles = Array.isArray(response?.roles)
          ? response.roles.map((r: unknown) => String(r))
          : [];

        return { ok: true, message: null, roles };
      } catch (err) {
        const message = extractBackendMessage(err) ?? "Login failed.";
        return { ok: false, message, roles: null };
      }
    },
    initialActionState
  );

  useEffect(() => {
    if (!state.ok || !state.roles) return;

    toast.dismiss();
    toast.success("Logged in");

    if (state.roles.includes("ROLE_SELLER")) {
      navigate("/seller/dashboard");
      return;
    } else if (state.roles.includes("ROLE_ADMIN")) {
      navigate("/admin/dashboard");
      return;
    }
    navigate("/");
  }, [state.ok, state.roles, navigate]);

  useEffect(() => {
    if (!state.ok && state.message) {
      if (lastToastedErrorRef.current !== state.message) {
        lastToastedErrorRef.current = state.message;
        toast.dismiss();
        toast.error(state.message);
      }
    }
  }, [state.ok, state.message]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form action={formAction} className="flex flex-col w-full gap-8 p-6">
      <header className="space-y-2 flex items-center flex-col w-full">
        <h1 className="text-6xl text-center w-200 text-yellow-50 font-bold">
          Welcome Back
        </h1>
        <p className="text-center text-yellow-50/60 text-sm">
          Please enter your details to sign in
        </p>
      </header>

      {state.ok === false && state.message ? (
        <div className="w-full rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {state.message}
        </div>
      ) : null}

      {/* Email Field */}
      <div className="space-y-2 w-full">
        <label htmlFor="email" className="block text-sm font-medium text-yellow-50/70 ml-1">
          Email Address
        </label>
        <div className="relative group">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-yellow-50/30 group-focus-within:text-orange-400 transition-colors" />
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-white/5 border border-yellow-50/10 border-b-2 border-b-orange-400/50 text-yellow-50 pl-10 pr-4 py-3 rounded-t-md focus:outline-none focus:bg-white/10 focus:border-b-orange-400 transition-all placeholder:text-yellow-50/20"
          />
        </div>
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <div className="flex justify-between items-center px-1">
          <label htmlFor="password" className="block text-sm font-medium text-yellow-50/70">
            Password
          </label>
          <button
            type="button"
            onClick={() => navigate("/auth?mode=forgot")}
            className="text-xs cursor-pointer text-orange-400 hover:underline"
          >
            Forgot Password ?
          </button>
        </div>
        <div className="relative group">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-yellow-50/30 group-focus-within:text-orange-400 transition-colors" />
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-white/5 border border-yellow-50/10 border-b-2 border-b-orange-400/50 text-yellow-50 pl-10 pr-12 py-3 rounded-t-md focus:outline-none focus:bg-white/10 focus:border-b-orange-400 transition-all placeholder:text-yellow-50/20"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-50/30 hover:text-yellow-50 transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-2 bg-orange-500 active:scale-[0.98] py-3 rounded-md text-white text-lg font-bold shadow-lg shadow-orange-900/20 transition-all cursor-pointer w-full disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {pending ? "Signing In..." : "Sign In"}
      </button>



    </form>
  );
};

export default Login;