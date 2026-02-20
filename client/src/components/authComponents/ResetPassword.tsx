import React, { useActionState, useEffect, useMemo, useRef, useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import type { AppDispatch } from "../../store/store";
import { resetPassword } from "../../features/authentication/authSlice";

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

const ResetPassword = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const lastToastedRef = useRef<string | null>(null);

    const tokenFromUrl = useMemo(() => {
        const raw = searchParams.get("token");
        return raw ? String(raw) : "";
    }, [searchParams]);

    const [formData, setFormData] = useState({
        token: tokenFromUrl,
        newPassword: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        setFormData((prev) => ({ ...prev, token: tokenFromUrl }));
    }, [tokenFromUrl]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const [state, formAction, pending] = useActionState(
        async (_prev: ActionState, submitData: FormData): Promise<ActionState> => {
            const token = String(submitData.get("token") ?? tokenFromUrl ?? "").trim();
            const newPassword = String(submitData.get("newPassword") ?? "");
            const confirmPassword = String(submitData.get("confirmPassword") ?? "");

            if (!token) return { ok: false, message: "Token is required." };
            if (!newPassword.trim()) return { ok: false, message: "Password is required." };
            if (newPassword !== confirmPassword) return { ok: false, message: "Passwords do not match." };

            try {
                const response = await dispatch(resetPassword({ token, newPassword })).unwrap();
                const message = extractBackendMessage(response) ?? "Password reset successfully.";
                return { ok: true, message };
            } catch (err: any) {
                const message = extractBackendMessage(err) ?? "Reset password failed.";
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
        if (state.ok) {
            setFormData((prev) => ({ ...prev, newPassword: "", confirmPassword: "" }));
            setShowPassword(false);
            setShowConfirmPassword(false);
            navigate("/auth?mode=login");
        }
    }, [state.ok, navigate]);


    return (
        <form action={formAction} className="flex flex-col w-full gap-8 p-6">
            <header className="space-y-2 flex items-center flex-col w-full">
                <h1 className="text-6xl text-center w-200 text-yellow-50 font-bold">Reset Password</h1>
                <p className="text-center text-yellow-50/60 text-sm">Set a new password for your account</p>
            </header>

            {state.ok === false && state.message ? (
                <div className="w-full rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {state.message}
                </div>
            ) : null}

            <div className="space-y-2">
                <label htmlFor="newPassword" className="block text-sm font-medium text-yellow-50/70 ml-1">
                    New Password
                </label>
                <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-yellow-50/30 group-focus-within:text-orange-400 transition-colors" />
                    <input
                        type={showPassword ? "text" : "password"}
                        id="newPassword"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-yellow-50/10 border-b-2 border-b-orange-400/50 text-yellow-50 pl-10 pr-12 py-3 rounded-t-md focus:outline-none focus:bg-white/10 focus:border-b-orange-400 transition-all placeholder:text-yellow-50/20"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-50/30 hover:text-yellow-50 transition-colors"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-yellow-50/70 ml-1">
                    Confirm Password
                </label>
                <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-yellow-50/30 group-focus-within:text-orange-400 transition-colors" />
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-yellow-50/10 border-b-2 border-b-orange-400/50 text-yellow-50 pl-10 pr-12 py-3 rounded-t-md focus:outline-none focus:bg-white/10 focus:border-b-orange-400 transition-all placeholder:text-yellow-50/20"
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-50/30 hover:text-yellow-50 transition-colors"
                    >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
            </div>

            <button
                type="submit"
                disabled={pending}
                className="mt-2 bg-orange-500 active:scale-[0.98] py-3 rounded-md text-white text-lg font-bold shadow-lg shadow-orange-900/20 transition-all cursor-pointer w-full disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {pending ? "Resetting..." : "Reset Password"}
            </button>
        </form>
    );
};

export default ResetPassword;