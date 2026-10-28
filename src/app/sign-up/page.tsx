
"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
    Button,
    Description,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
} from "@heroui/react";
import Link from "next/link";
import { useState } from "react";

const SignUpPage = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setErrorMessage("");
        setSuccessMessage("");

        if (password !== confirmPassword) {
            setPasswordMismatch(true);
            toast.error("দুটি পাসওয়ার্ড মিলছে না।");
            return;
        }

        setPasswordMismatch(false);
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);

        const name = formData.get("name") as string;
        const email = formData.get("email") as string;

        const { data, error } = await authClient.signUp.email({
            name,
            email,
            password,
            callbackURL: "/",
        });

        setIsLoading(false);

        if (error) {
            const message = error.message || "সাইন আপ করা যায়নি।";

            setErrorMessage(message);
            toast.error(message);
            return;
        }

        if (data) {
            setSuccessMessage("অ্যাকাউন্ট তৈরি হয়েছে!");
            toast.success("অ্যাকাউন্ট তৈরি হয়েছে!");

            router.push("/");
            router.refresh();
        }
    };

    const handleGoogleSignUp = async () => {
        setErrorMessage("");

        const { error } = await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });

        if (error) {
            const message =
                error.message || "Google দিয়ে সাইন আপ করা যায়নি।";

            setErrorMessage(message);
            toast.error(message);
        }
    };

    return (
        <div className="min-h-screen bg-[#f0f5f0] px-4 py-8 sm:py-10">
            <div className="mx-auto w-full max-w-md">
                {/* Header */}
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold text-[#26352b]">
                        অ্যাকাউন্ট তৈরি করুন
                    </h1>

                    <p className="mt-1 text-sm text-[#6b776e]">
                        বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
                    </p>
                </div>

                {/* Form Card */}
                <div className="rounded-2xl border border-[#dce6de] bg-[#fbfdfb] p-5 sm:p-6">
                    <Form
                        className="flex flex-col gap-4"
                        onSubmit={onSubmit}
                    >
                        {/* Name */}
                        <TextField
                            isRequired
                            name="name"
                            validate={(value) =>
                                value.length < 3
                                    ? "Name must be at least 3 characters"
                                    : null
                            }
                            className="flex flex-col gap-1.5"
                        >
                            <Label className="text-sm font-medium text-[#26352b]">
                                নাম
                            </Label>

                            <Input
                                name="name"
                                placeholder="যেমন: রহিম উদ্দিন"
                                className="w-full rounded-lg border border-[#dce6de] bg-transparent px-3 py-2.5 text-sm outline-none focus:border-[#078b45] focus:ring-2 focus:ring-[#078b45]/10"
                            />

                            <FieldError className="text-xs text-red-600" />
                        </TextField>

                        {/* Email */}
                        <TextField
                            isRequired
                            name="email"
                            type="email"
                            validate={(value) =>
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                    value
                                )
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
                        <TextField
                            isRequired
                            name="password"
                            validate={(value) => {
                                if (value.length < 8) {
                                    return "Password must be at least 8 characters";
                                }

                                if (!/[A-Z]/.test(value)) {
                                    return "Password must contain an uppercase letter";
                                }

                                if (!/[0-9]/.test(value)) {
                                    return "Password must contain a number";
                                }

                                return null;
                            }}
                            className="flex flex-col gap-1.5"
                        >
                            <Label className="text-sm font-medium text-[#26352b]">
                                পাসওয়ার্ড
                            </Label>

                            <Input
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    const value = e.target.value;

                                    setPassword(value);
                                    setPasswordMismatch(
                                        confirmPassword.length > 0 &&
                                            value !== confirmPassword
                                    );
                                }}
                                placeholder="কমপক্ষে ৮ অক্ষর"
                                className="w-full rounded-lg border border-[#dce6de] bg-transparent px-3 py-2.5 text-sm outline-none focus:border-[#078b45] focus:ring-2 focus:ring-[#078b45]/10"
                            />

                            <Description className="text-xs text-[#7a8980]">
                                কমপক্ষে ৮ অক্ষর, ১টি বড় হাতের অক্ষর ও ১টি সংখ্যা থাকতে হবে।
                            </Description>

                            <FieldError className="text-xs text-red-600" />
                        </TextField>

                        {/* Confirm Password */}
                        <TextField
                            isRequired
                            name="confirmPassword"
                            isInvalid={passwordMismatch}
                            validate={(value) => {
                                if (!value) {
                                    return "পাসওয়ার্ড নিশ্চিত করুন";
                                }

                                if (value !== password) {
                                    return "দুটি পাসওয়ার্ড মিলছে না।";
                                }

                                return null;
                            }}
                            className="flex flex-col gap-1.5"
                        >
                            <Label className="text-sm font-medium text-[#26352b]">
                                পাসওয়ার্ড নিশ্চিত করুন
                            </Label>

                            <Input
                                name="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => {
                                    const value = e.target.value;

                                    setConfirmPassword(value);
                                    setPasswordMismatch(
                                        value.length > 0 && value !== password
                                    );
                                }}
                                placeholder="আবার লিখুন"
                                className={`w-full rounded-lg border ${
                                    passwordMismatch
                                        ? "!border-red-500"
                                        : "border-[#dce6de]"
                                } bg-transparent px-3 py-2.5 text-sm outline-none focus:border-[#078b45] focus:ring-2 focus:ring-[#078b45]/10`}
                            />

                            {passwordMismatch && (
                                <FieldError className="text-xs text-red-600">
                                    দুটি পাসওয়ার্ড মিলছে না।
                                </FieldError>
                            )}
                        </TextField>

                        {/* Error / Success Messages */}
                        {errorMessage && (
                            <p role="alert" className="text-sm text-red-600">
                                {errorMessage}
                            </p>
                        )}

                        {successMessage && (
                            <p role="status" className="text-sm text-green-700">
                                {successMessage}
                            </p>
                        )}

                        {/* Submit */}
                        <Button
                            type="submit"
                            isDisabled={isLoading}
                            className="mt-1 w-full rounded-lg bg-[#078b45] px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#06753b]"
                        >
                            {isLoading
                                ? "অপেক্ষা করুন..."
                                : "অ্যাকাউন্ট তৈরি করুন"}
                        </Button>

                        {/* Divider */}
                        <div className="flex items-center gap-3 py-1">
                            <div className="h-px flex-1 bg-[#dce6de]" />
                            <span className="text-xs text-[#6b776e]">
                                অথবা
                            </span>
                            <div className="h-px flex-1 bg-[#dce6de]" />
                        </div>

                        {/* Google Sign Up */}
                        <button
                            type="button"
                            onClick={handleGoogleSignUp}
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

                        {/* Sign In Link */}
                        <p className="pt-1 text-center text-sm text-[#26352b]">
                            অ্যাকাউন্ট আছে?{" "}
                            <Link
                                href="/sign-in"
                                className="font-medium text-[#078b45] transition hover:underline"
                            >
                                সাইন ইন করুন
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

export default SignUpPage;
