import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Login from "../../components/authComponents/Login";
import Register from "../../components/authComponents/Register";
import { useNavigate, useSearchParams } from "react-router-dom";
import FogetPassword from "../../components/authComponents/FogetPassword";
import ResetPassword from "../../components/authComponents/ResetPassword";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { fetchCurrentUser } from "../../features/authentication/authSlice";
import api from "../../api/api";

const Authentication = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mode, setMode] = useState<"login" | "register" | "forgot" | "reset">("login");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);
  const hasMountedRef = useRef(false);

  const resolveModeFromQuery = (): "login" | "register" | "forgot" | "reset" => {
    const fromQuery = searchParams.get("mode");
    if (fromQuery === "forgot") return "forgot";
    if (fromQuery === "reset") return "reset";
    if (fromQuery === "register") return "register";
    return "login";
  };

  const animateToMode = (nextMode: "login" | "register" | "forgot" | "reset") => {
    if (containerRef.current) {
      isAnimatingRef.current = true;
      gsap.to(containerRef.current, {
        opacity: 0,
        x: mode === "login" ? -50 : 50,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setMode(nextMode);
          gsap.fromTo(
            containerRef.current,
            { opacity: 0, x: mode === "login" ? 50 : -50 },
            { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" }
          );
          isAnimatingRef.current = false;
        },
      });
      return;
    }
    setMode(nextMode);
  };

  useEffect(() => {
    const oauth2 = searchParams.get("oauth2");
    if (oauth2 === "success") {
      // Cookie was set by backend; leave /auth immediately, hydrate auth state in background.
      navigate("/", { replace: true });
      void dispatch(fetchCurrentUser());
      return;
    }

    const targetMode = resolveModeFromQuery();

    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      setMode(targetMode);
      return;
    }

    if (isAnimatingRef.current) return;
    if (targetMode === mode) return;

    animateToMode(targetMode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleGoogleSignIn = async () => {
    const res = await api.get("/auth/oauth2/google/url");
    const url = res?.data?.url as string | undefined;
    if (url) {
      window.location.href = url;
    }
  };

  const handleSwitch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (mode === "login") {
      setSearchParams({ mode: "register" });
      animateToMode("register");
      return;
    }

    setSearchParams({ mode: "login" });
    animateToMode("login");
  };

  const handleBackToLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSearchParams({ mode: "login" });
    animateToMode("login");
  };

  const isLogin = mode === "login";
  const isForgot = mode === "forgot";
  const isReset = mode === "reset";
  const hideSocial = isForgot || isReset;

  return (
    // <Template>
    <section className="relative  bg-stone-900 flex items-center justify-center h-screen w-full overflow-hidden">


      <div className="relative w-140 mx-4 p-8  flex flex-col">

        <div ref={containerRef} className="min-h-75 flex flex-col justify-center">
          {mode === "login" ? (
            <Login />
          ) : mode === "register" ? (
            <Register />
          ) : mode === "forgot" ? (
            <FogetPassword />
          ) : (
            <ResetPassword />
          )}
        </div>


        {hideSocial ? null : (
          <>
            <div className="flex items-center mb-3 gap-4">
              <div className="flex-1 h-px bg-yellow-50/10" />
              <span className="text-xs font-semibold text-yellow-50/30 uppercase tracking-widest">OR</span>
              <div className="flex-1 h-px bg-yellow-50/10" />
            </div>

            <div className="flex mb-3 justify-center">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-[75%] cursor-pointer flex items-center justify-center rounded-full border border-yellow-50/20 px-4 py-3 text-sm font-semibold text-yellow-50/80 hover:bg-yellow-50/5 transition-colors"
              >
                <img
                   
                  src="/icons/google.png" alt="Google logo" className="inline-block w-10 mr-3" />
                <span className="text-lg">
                  Sign in with Google
                </span>
              </button>
            </div>
          </>
        )}
        <div className="text-center mt-2">
          <p className="text-gray-300 text-sm">
            {isForgot || isReset ? (
              <>
                Remember your password?{" "}
                <button
                  className="text-orange-400 cursor-pointer font-semibold  transition-colors underline underline-offset-4"
                  onClick={handleBackToLogin}
                >
                  Login
                </button>
              </>
            ) : (
              <>
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                  className="text-orange-400 cursor-pointer font-semibold  transition-colors underline underline-offset-4"
                  onClick={handleSwitch}
                >
                  {isLogin ? "Register now" : "Login"}
                </button>
              </>
            )}
          </p>
        </div>

      </div>


      <div className="h-full w-full bg-center bg-cover bg-[url('/1.jpg')] relative flex items-center justify-center">
        <div className="absolute inset-0 bg-linear-to-br from-stone-800 via-transparent to-stone-900" />

        {/* Centered content */}
        <div className="relative  text-center px-8">
          <h1 className="text-6xl md:text-[5rem] font-bold text-stroke-login mb-4 drop-shadow-2xl">
            FOCUSPRO
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-light tracking-wide drop-shadow-lg">
            Discover Amazing Products
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="h-1 w-16 bg-white/60 rounded-full" />
            <div className="h-1 w-8 bg-white/40 rounded-full" />
          </div>
        </div>
      </div>
    </section>
    // </Template>
  );
};

export default Authentication;