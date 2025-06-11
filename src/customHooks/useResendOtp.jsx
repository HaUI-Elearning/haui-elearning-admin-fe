import { useState, useCallback, useEffect } from "react";
import { resendOtpSignUp } from "../apis/resendOtp";

export default function useResendOtp() {
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);

  const resend = useCallback(async (email, notify) => {
    try {
      setResendLoading(true);
      await resendOtpSignUp({ email });
      notify("OTP resend successful!", "success");
      setCountdown(60);
    } catch (err) {
      const msg =
        err?.error === "Bạn đã gửi quá số lần OTP cho REGISTER trong ngày."
          ? "You have sent too many OTPs for REGISTER today!"
          : "Failed to resend OTP!";
      notify(msg, "error");
    } finally {
      setResendLoading(false);
    }
  }, []);

  useEffect(() => {
    if (countdown === 0) return;
    const t = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(t);
  }, [countdown]);

  return { resend, resendLoading, countdown };
}
