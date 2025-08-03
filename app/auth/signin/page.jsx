"use client";
import { useEffect, useState } from "react";
import { signIn, getCsrfToken } from "next-auth/react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import ButtonLoader from "@/components/Button-Loading";
import axios from "axios";

const SignInPage = () => {
  const [error, setError] = useState(null);
  const [csrfToken, setCsrfToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      window.location.href = "/";
    }
  }, [session, status]);

  useEffect(() => {
    const getCsrf = async () => {
      const csrf = await getCsrfToken();
      setCsrfToken(csrf);
    };
    getCsrf();
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!e.target.email || !e.target.password ) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    const signInRes = await signIn("credentials", {
      email: e.target.email.value,
      password: e.target.password.value,
      redirect: false,
    });
    if (signInRes.error) {
      setError(JSON.parse(signInRes.error).error);
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-[90vh] items-start justify-center bg-[url('/images/others/map.svg')] bg-cover bg-center dark:bg-[url('/images/others/map-dark.svg')] -mx-8 -my-5 md:-mx-10">
      <div className="glassmorphism m-5 w-full max-w-xl sm:w-[600px] lg:w-[800px]">
        <h2 className="mb-5 text-3xl font-extrabold text-center text-shades-4 dark:text-shades-2">
          Sign In
        </h2>
        <form className="space-y-5" onSubmit={submitForm}>
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="mail@domain.com"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="Enter Password"
            />
          </div>

          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="relative flex items-center justify-center rounded-md border px-5 py-2 text-sm font-semibold shadow-[0_10px_20px_-10px] outline-none transition duration-300 hover:shadow-none border-primary bg-primary text-white shadow-primary/60 min-w-47.5"
            >
              {loading ? <ButtonLoader isProcessing={loading} /> : "SIGN IN"}
            </button>
          </div>
        </form>
        {error && (
          <div className="text-center text-red-500 text-sm mt-3">{error}</div>
        )}
        <p className="text-center my-5">
          Dont&apos;t have an account?&nbsp; Send us a mail at{" "} 
          <Link href="mailto:info@codemarshal.com" className="font-bold text-primary dark:text-blue-400 hover:underline ltr:ml-1 rtl:mr-1">
            info@codemarshal.com
          </Link>
          {/* <Link
            href="/auth/boxed-signup"
            className="font-bold text-primary hover:underline ltr:ml-1 rtl:mr-1"
          >
            Sign Up
          </Link> */}
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
