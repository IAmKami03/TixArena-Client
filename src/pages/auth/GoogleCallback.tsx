import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import VerifyEmailModal from "../../components/auth/VerifyEmailModal";
import { useAuth } from "../../contexts/AuthContext";
import * as authService from "../../services/authService";
import { getErrorMessage } from "../../lib/api";
import { GOOGLE_REDIRECT_URI } from "../../lib/googleAuth";

const GoogleCallback = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState("");
  const hasRunRef = useRef(false);

  useEffect(() => {
    const run = async () => {
      if (hasRunRef.current) return;
      hasRunRef.current = true;

      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const oauthError = params.get("error");
      const rawState = params.get("state");
      const fallbackPath = rawState ? decodeURIComponent(rawState) : "/";

      if (oauthError) {
        setError("Google sign-in was cancelled or failed.");
        return;
      }
      if (!code) {
        setError("Missing authorization code from Google.");
        return;
      }

      try {
        const result = await authService.googleAuth(code, GOOGLE_REDIRECT_URI);
        if ("email" in result) {
          setVerifyEmail(result.email);
          setShowVerifyModal(true);
          return;
        }
        const { user, token } = result;
        login(user, token);
        navigate(
          user.role === "user" && user.interests.length === 0
            ? "/onboarding/step1"
            : fallbackPath,
          { replace: true },
        );
      } catch (err) {
        setError(getErrorMessage(err));
      }
    };

    run();
  }, [login, navigate]);

  return (
    <AuthLayout>
      <div className="flex flex-col items-center gap-4 w-full max-w-[540px] py-20 text-center">
        {error ? (
          <>
            <p className="text-[#FF7466] font-[Manrope] text-[16px]">{error}</p>
            <button
              type="button"
              onClick={() => navigate("/signin", { replace: true })}
              className="text-[#995DFF] font-[Manrope] font-medium text-[16px]"
            >
              Back to Sign In
            </button>
          </>
        ) : (
          <p className="text-[#CECECE] font-[Manrope] text-[16px]">
            Finishing sign-in with Google...
          </p>
        )}
      </div>

      {showVerifyModal && (
        <VerifyEmailModal
          email={verifyEmail}
          onSuccess={(user, token) => {
            login(user, token);
            navigate(
              user.role === "user" && user.interests.length === 0
                ? "/onboarding/step1"
                : "/",
              { replace: true },
            );
          }}
          onClose={() => navigate("/signin", { replace: true })}
        />
      )}
    </AuthLayout>
  );
};

export default GoogleCallback;
