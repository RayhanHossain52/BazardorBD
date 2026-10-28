"use client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient, signOut, updateUser } from "@/lib/auth-client";
import {
    Button,
    FieldError,
    Form,
    Label,
    TextField,
} from "@heroui/react";

const MyProfilePage = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const [name, setName] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const [message, setMessage] = useState("");

    const initial = user?.name?.charAt(0)?.toUpperCase() || "U";

    const handleSignOut = async () => {
        await signOut();
        toast.success("সাইন আউট সফল হয়েছে!");
        router.push("/");
        router.refresh();
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (name.trim().length < 3) {
            setMessage("নাম কমপক্ষে ৩ অক্ষরের হতে হবে।");
            return;
        }

        setIsUpdating(true);
        setMessage("");

        try {
            const resData = await updateUser({
                name: name.trim(),
            });

            if (resData.error) {
                setMessage("নাম আপডেট করা যায়নি। আবার চেষ্টা করুন।");
            } else {
                setMessage("নাম সফলভাবে আপডেট হয়েছে।");
                router.refresh();
                toast.success("নাম সফলভাবে আপডেট হয়েছে।");
            }
        } catch {
            setMessage("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
        } finally {
            setIsUpdating(false);
        }
    };

    if (isPending) {
        return (
            <main className="min-h-screen bg-[#f0f5f0] px-4 py-8">
                <div className="mx-auto max-w-3xl text-sm text-gray-600">
                    প্রোফাইল লোড হচ্ছে...
                </div>
            </main>
        );
    }

    if (!user) {
        return (
            <main className="min-h-screen bg-[#f0f5f0] px-4 py-8">
                <div className="mx-auto max-w-3xl rounded-2xl border border-[#dce6de] bg-[#fbfdfb] p-6">
                    <p>প্রোফাইল দেখতে সাইন ইন করুন।</p>
                    <Button
                        className="mt-4 bg-[#078b45] text-white"
                        onPress={() => router.push("/sign-in")}
                    >
                        সাইন ইন
                    </Button>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#f0f5f0] px-4 py-8 text-[#202923]">
            <div className="mx-auto max-w-3xl">
                {/* Page heading */}
                <div className="mb-6">
                    <h1 className="text-2xl font-extrabold tracking-tight">
                        আমার প্রোফাইল
                    </h1>
                    <p className="mt-1 text-sm text-gray-600">
                        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                    </p>
                </div>

                {/* User information */}
                <section className="mb-6 flex flex-col items-start justify-between gap-4 rounded-2xl border border-[#dce6de] bg-[#fbfdfb] p-5 sm:flex-row sm:items-center sm:p-6">
                    <div className="flex min-w-0 items-center gap-4">
                        <div className="flex h-[70px] w-[70px] shrink-0 items-center justify-center rounded-2xl bg-[#edf0ed] text-2xl font-bold text-[#078b45]">
                            {initial}
                        </div>

                        <div className="min-w-0">
                            <h2 className="truncate text-xl font-semibold">
                                {user.name}
                            </h2>
                            <p className="mt-1 break-all text-sm text-gray-600 sm:text-base">
                                {user.email}
                            </p>
                        </div>
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        onPress={handleSignOut}
                        className="shrink-0 border-red-500 text-red-600 hover:bg-red-50"
                    >
                        ↪ সাইন আউট
                    </Button>
                </section>

                {/* Profile form */}
                <section className="rounded-2xl border border-[#dce6de] bg-[#fbfdfb] p-5 sm:p-6">
                    <h2 className="mb-8 text-lg font-bold">তথ্য</h2>

                    <Form onSubmit={onSubmit} className="w-full">
                        <TextField
                            name="name"
                            isRequired
                            className="w-full"
                            validate={(value) => {
                                if (value.trim().length < 3) {
                                    return "নাম কমপক্ষে ৩ অক্ষরের হতে হবে।";
                                }
                                return null;
                            }}
                        >
                            <Label className="mb-2 text-sm font-medium">
                                নাম
                            </Label>
                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder={user.name}
                                className="h-10 w-full rounded-lg border border-[#dce6de] bg-transparent px-3 outline-none focus:border-[#078b45]"
                            />
                            <FieldError />
                        </TextField>

                        {message && (
                            <p
                                className={`mt-3 text-sm ${message.includes("সফলভাবে")
                                    ? "text-[#078b45]"
                                    : "text-red-600"
                                    }`}
                            >
                                {message}
                            </p>
                        )}

                        <div className="mt-4 flex w-full flex-col gap-3 sm:flex-row">
                            <Button
                                type="submit"
                                isDisabled={isUpdating}
                                className="w-full rounded-lg bg-[#078b45] font-semibold text-white shadow-md hover:bg-[#06753b] p-2"
                            >
                                আপডেট
                            </Button>
                        </div>
                    </Form>
                </section>
            </div>
        </main>
    );
};

export default MyProfilePage;