"use client"
import { apiCheckUser, apiLogin, apiRegister } from "@/app/api";
import { EmailIcon, LockIcon, PersonIcon } from "@/app/components/icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "@/stores/userSlice";
import { Loading } from "@/app/components/loading";
import { useAppSelector } from "@/stores/hooks";

export const Auth = () => {
    const router = useRouter();

    const [step, setStep] = useState("init");
    const [data, setData] = useState({
        name: "",
        email: "",
        passowrd: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const user = useAppSelector((state) => state.user.value);
    const dispatch = useDispatch();


    useEffect(() => {
        if (user.userId) {
            router.push("/");
        }
    }, [user, router])

    const handleLogin = async (event: React.FormEvent) => {
        setLoading(true);
        setError("");
        event.preventDefault();
        if (!data.passowrd) {
            setError("Please enter your password.");
            setLoading(false);
            return;
        }

        try {
            const user = await apiLogin(data.email, data.passowrd);

            if (user.token) {
                localStorage.setItem("token", user.token);
                dispatch(login({
                    userId: user.userId,
                    email: user.email,
                    name: user.name,
                }));
                router.push("/");
            }
            setLoading(false);
        } catch (error) {
            if (error.response) {
                setError(error.response.data.error);
            } else {
                setError("Unexpected error occurred!");
            }
            setLoading(false);
        }

    }

    const handleSignup = async (event: React.FormEvent) => {
        setLoading(true);
        setError("");
        event.preventDefault();

        if (!data.email || !data.name || !data.passowrd || !data.confirmPassword) {
            setError("Please fill all the required fields.");
            setLoading(false);
            return;
        }

        if (data.passowrd !== data.confirmPassword) {
            setError("Confirm password is not matching");
            setLoading(false);
            return;
        }

        try {
            const user = await apiRegister(data.name, data.email, data.passowrd);

            if (user.token) {
                localStorage.setItem("token", user.token);
                dispatch(login({
                    userId: user.userId,
                    email: user.email,
                    name: user.name,
                }));
                router.push("/");
            }
            setLoading(false);

        } catch (error) {
            if (error.response) {
                setError(error.response.data.error);
            } else {
                setError("Unexpected error occurred!");
            }
            setLoading(false);
        }
    }

    const changeStep = async (event: React.FormEvent) => {
        setLoading(true);
        setError("");
        event.preventDefault();

        if (!data.email) {
            setError("Please enter your email");
            setLoading(false);
            return;
        }
        try {
            const user = await apiCheckUser(data.email);

            if (!user) {
                setStep("signup");
            } else {
                setData({ ...data, name: user.name })
                setStep("login");
            }
            setLoading(false);

        } catch (error) {
            setError("Unexpected error occurred!");
            console.error(error);
            setLoading(false);
        }
    }

    if (loading) {
        return <Loading />
    }

    return (
        <>
            {
                step === "signup" ?
                    <>
                        <p className="text-lg">Sign up</p>
                        <form className="w-full py-8 pb-4 max-w-sm" onSubmit={handleSignup} method="POST">
                            <div className="flex items-center justify-between px-4 p-2 bg-accent rounded-xl w-full mb-2 gap-2">
                                <PersonIcon className="opacity-50" />
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    aria-label="Enter your name"
                                    className="outline-none w-full"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) => setData({ ...data, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="flex items-center justify-between px-4 p-2 bg-accent rounded-xl w-full mb-2 gap-2">
                                <LockIcon className="opacity-50" />
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    aria-label="Enter your password"
                                    className="outline-none w-full"
                                    name="password"
                                    value={data.passowrd}
                                    onChange={(e) => setData({ ...data, passowrd: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="flex items-center justify-between px-4 p-2 bg-accent rounded-xl w-full mb-4 gap-2">
                                <LockIcon className="opacity-50" />
                                <input
                                    type="password"
                                    placeholder="Confirm your password"
                                    aria-label="Confirm your password"
                                    className="outline-none w-full"
                                    name="confirm-password"
                                    value={data.confirmPassword}
                                    onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
                                    required
                                />
                            </div>
                            <button className="bg-primary px-4 py-2 w-full rounded-xl font-medium" disabled={loading}>Sign up</button>
                        </form>
                    </> : (step === "login" ?
                        <>
                            <p className="text-lg mb-4">Log in</p>
                            <p>Welcome back <span className="font-semibold">{data.name}</span></p>
                            <form className="w-full py-8 pb-4 max-w-sm" onSubmit={handleLogin} method="POST">
                                <div className="flex items-center justify-between px-4 p-2 bg-accent rounded-xl w-full mb-4 gap-2">
                                    <LockIcon className="opacity-50" />
                                    <input
                                        type="password"
                                        placeholder="Enter your password"
                                        aria-label="Enter your password"
                                        className="outline-none w-full"
                                        name="password"
                                        value={data.passowrd}
                                        onChange={(e) => setData({ ...data, passowrd: e.target.value })}
                                        required
                                    />
                                </div>
                                <button className="bg-primary px-4 py-2 w-full rounded-xl font-medium" disabled={loading}>Log in</button>
                            </form>
                        </> :
                        <>
                            <p className="text-lg">Log in or sign up</p>
                            <form className="w-full py-8 pb-4 max-w-sm" onSubmit={changeStep} method="POST">
                                <div className="flex items-center justify-between px-4 p-2 bg-accent rounded-xl w-full mb-4 gap-2">
                                    <EmailIcon className="opacity-50" />
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        aria-label="Enter your email"
                                        className="outline-none w-full"
                                        name="email"
                                        value={data.email}
                                        onChange={(e) => setData({ ...data, email: e.target.value })}
                                        required
                                    />
                                </div>
                                <button className="bg-primary px-4 py-2 w-full rounded-xl font-medium" disabled={loading}>Continue</button>
                            </form>
                        </>)
            }
            {
                error && <p className="text-red-400">{error}</p>
            }
        </>

    )
}