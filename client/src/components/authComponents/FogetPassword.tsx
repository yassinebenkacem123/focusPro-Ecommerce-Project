import React, { useActionState, useEffect, useRef, useState } from "react";
import { Mail } from "lucide-react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch } from "../../store/store";
import { forgetPassword } from "../../features/authentication/authSlice";

type ActionState = {
    ok: boolean;
    message: string | null;
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
};

const FogetPassword = () => {
    const [formData, setFormData] = useState({ email: "" });
    const lastToastedRef = useRef<string | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const [state, formAction, pending] = useActionState(
        async (_prev: ActionState, submitData: FormData): Promise<ActionState> => {
            const email = String(submitData.get("email") ?? "").trim();

            try {
                const response = await dispatch(forgetPassword({ email })).unwrap();
                const message = extractBackendMessage(response) ?? "Password reset link sent.";
                return { ok: true, message };
            } catch (err: any) {
                const message =
                    extractBackendMessage(err) ??
                    "Request failed.";
                return { ok: false, message };
            }
        },
        initialActionState
    );

    useEffect(() => {
        if (!state.message) return;
        if (lastToastedRef.current === state.message) return;

        lastToastedRef.current = state.message;
        toast.dismiss();
        if (state.ok) toast.success(state.message);
        else toast.error(state.message);
    }, [state.ok, state.message]);

    useEffect(() => {
        if (state.ok) setFormData({ email: "" });
    }, [state.ok]);

    useEffect(() => {
        if (state.ok) {
            navigate("/auth?mode=reset");
        }
    }, [state.ok, navigate]);

    return (
        <form action={formAction} className="flex flex-col w-full gap-8 p-6">
            <header className="space-y-2 flex items-center flex-col w-full">
                <h1 className="text-6xl text-center w-200 text-yellow-50 font-bold">Forgot Password</h1>
                <p className="text-center text-yellow-50/60 text-sm">
                    Enter your email to receive a reset link
                </p>
            </header>

            {state.ok === false && state.message ? (
                <div className="w-full rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {state.message}
                </div>
            ) : null}

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

            <button
                type="submit"
                disabled={pending}
                className="mt-2 bg-orange-500 active:scale-[0.98] py-3 rounded-md text-white text-lg font-bold shadow-lg shadow-orange-900/20 transition-all cursor-pointer w-full disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {pending ? "Sending..." : "Send Reset Link"}
            </button>
        </form>
    );
};

export default FogetPassword;
