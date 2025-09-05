import { usePuterStore } from "~/lib/puter";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

export const meta = () => ([
  { title: 'Resumind | Auth' },
  { name: 'description', content: 'Log into your account' },
]);

const Auth = () => {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const next = location.search.split('next=')[1];
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) navigate(next);
  }, [auth.isAuthenticated, next, navigate]);

  return (
    <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center">
      <div className="gradient-border p-1 rounded-2xl shadow-lg">
        <section className="flex flex-col gap-8 bg-white rounded-2xl p-10 w-[350px] max-sm:w-[90%]">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-3xl font-bold text-[#FF6767]">Welcome</h1>
            <h2 className="text-lg text-[#FF6767]/80">Log In to Continue Your Job Journey</h2>
          </div>

          <div>
            {isLoading ? (
              <button className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF6767] to-[#FF9A9A] text-white font-semibold animate-pulse">
                Signing you in...
              </button>
            ) : (
              <>
                {auth.isAuthenticated ? (
                  <button
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF6767] to-[#FF9A9A] text-white font-semibold hover:opacity-90 transition"
                    onClick={auth.signOut}
                  >
                    Log Out
                  </button>
                ) : (
                  <button
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF6767] to-[#FF9A9A] text-white font-semibold hover:opacity-90 transition"
                    onClick={auth.signIn}
                  >
                    Log In
                  </button>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Auth;
