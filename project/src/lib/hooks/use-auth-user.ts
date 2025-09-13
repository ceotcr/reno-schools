import { useState } from "react";
import { toast } from "sonner";

export function useAuthApi() {
    const [processing, setProcessing] = useState(false);
    const [step, setStep] = useState(1);
    const [done, setDone] = useState(false);
    const [email, setEmail] = useState("");

    const requestOtp = async (email: string) => {
        setProcessing(true);
        try {
            const response = await fetch("/api/auth/otp-request", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            if (response.ok) {
                toast.success("OTP sent to your email.");
                setStep(2);
            } else {
                toast.error("Failed to send OTP. Please try again.");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setProcessing(false);
        }
    };

    return {
        processing,
        step,
        done,
        email,
        setEmail,
        setStep,
        setDone,
        requestOtp,
    };
}

export function useUserApi() {
    const [processing, setProcessing] = useState(false);

    const updateUser = async (name: string) => {
        setProcessing(true);
        try {
            const response = await fetch("/api/user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name }),
            });
            setProcessing(false);
            return response.ok;
        } catch (error) {
            setProcessing(false);
            return false;
        }
    };

    return {
        processing,
        updateUser,
    };
}
