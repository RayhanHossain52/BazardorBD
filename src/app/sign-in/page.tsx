
"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
    Button,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
} from "@heroui/react";
import Link from "next/link";
import { useState } from "react";

const SignInPage = () => {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const callbackURL =
        typeof window !== "undefined"
            ? new URLSearchParams(window.location.search).get("callbackURL") || "/"
            : "/";

    // Email and password login
    const handleLogin = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setErrorMessage("");
        setIsLoading(true);

        const { error } = await authClient.signIn.email({
            email,
            password,
            callbackURL,
        });

        setIsLoading(false);

        if (error) {
            toast.error("ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।");
            return;
        }

        toast.success("সফলভাবে সাইন ইন হয়েছে!");
        router.replace(callbackURL);
        router.refresh();
    };

    // Google login
    const handleGoogleSignIn = async () => {
        setErrorMessage("");

        const { error } = await authClient.signIn.social({
            provider: "google",
            callbackURL,
        });

        if (error) {
            setErrorMessage(
                error.message || "Google দিয়ে সাইন ইন করা যায়নি।"
            );
        }
    };

    return (
        <div className="min-h-screen bg-[#f0f5f0] px-4 py-8 sm:py-10">
            <div className="mx-auto w-full max-w-md">
                {/* Header */}
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold text-[#26352b]">
                        সাইন ইন করুন
                    </h1>

                    <p className="mt-1 text-sm text-[#6b776e]">
                        আপনার অ্যাকাউন্টে লগইন করে সব বিস্তারিত দাম দেখুন।
                    </p>
                </div>

                {/* Form Card */}
                <div className="rounded-2xl border border-[#dce6de] bg-[#fbfdfb] p-5 sm:p-6">
                    <Form
                        className="flex flex-col gap-4"
                        onSubmit={handleLogin}
                    >
                        {/* Email */}
                        <TextField
                            isRequired
                            name="email"
                            type="email"
                            value={email}
                            onChange={setEmail}
                            validate={(value) =>
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                                    ? "Please enter a valid email address"
                                    : null
                            }
                            className="flex flex-col gap-1.5"
                        >
                            <Label className="text-sm font-medium text-[#26352b]">
                                ইমেইল
                            </Label>

                            <Input
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                className="w-full rounded-lg border border-[#dce6de] bg-transparent px-3 py-2.5 text-sm outline-none focus:border-[#078b45] focus:ring-2 focus:ring-[#078b45]/10"
                            />

                            <FieldError className="text-xs text-red-600" />
                        </TextField>

                        {/* Password */}
                        <div className="flex flex-col gap-1.5">
                            <Label className="text-sm font-medium text-[#26352b]">
                                পাসওয়ার্ড
                            </Label>

                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="আপনার পাসওয়ার্ড লিখুন"
                                className="w-full rounded-lg border border-[#dce6de] bg-transparent px-3 py-2.5 text-sm"
                            />
                        </div>

                        {/* Error Message */}
                        {errorMessage && (
                            <p role="alert" className="text-sm text-red-600">
                                {errorMessage}
                            </p>
                        )}

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            isDisabled={isLoading}
                            className="mt-1 w-full rounded-lg bg-[#078b45] px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#06753b]"
                        >
                            {isLoading
                                ? "অপেক্ষা করুন..."
                                : "সাইন ইন করুন"}
                        </Button>

                        {/* Divider */}
                        <div className="flex items-center gap-3 py-1">
                            <div className="h-px flex-1 bg-[#dce6de]" />
                            <span className="text-xs text-[#6b776e]">
                                অথবা
                            </span>
                            <div className="h-px flex-1 bg-[#dce6de]" />
                        </div>

                        {/* Google Sign In */}
                        <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            className="btn w-full border border-[#e5e5e5] bg-white text-sm text-black shadow-none hover:bg-gray-50"
                        >
                            <svg
                                aria-label="Google logo"
                                width="18"
                                height="18"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 48 48"
                            >
                                <path
                                    fill="#4285F4"
                                    d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.8 6.1-15Z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.6-5.1c-1.8 1.2-4.1 2-6.9 2-5.3 0-9.8-3.6-11.4-8.4H5.8v5.3A20 20 0 0 0 24 44Z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M12.6 27.6a12 12 0 0 1 0-7.2v-5.3H5.8a20 20 0 0 0 0 17.8l6.8-5.3Z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M24 12.1c3 0 5.7 1 7.8 3.1l5.8-5.8A19.4 19.4 0 0 0 24 4 20 20 0 0 0 5.8 15.1l6.8 5.3c1.6-4.8 6.1-8.3 11.4-8.3Z"
                                />
                            </svg>

                            Google দিয়ে চালিয়ে যান
                        </button>

                        {/* Sign Up Link */}
                        <p className="pt-1 text-center text-sm text-[#26352b]">
                            অ্যাকাউন্ট নেই?{" "}
                            <Link
                                href="/sign-up"
                                className="font-medium text-[#078b45] transition hover:underline"
                            >
                                সাইন আপ করুন
                            </Link>
                        </p>
                    </Form>
                </div>

                {/* Back to Home */}
                <div className="mt-5 text-center">
                    <Link
                        href="/"
                        className="text-sm text-[#7a8980] transition hover:text-[#078b45]"
                    >
                        ← হোম পেজে ফিরে যান
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;
