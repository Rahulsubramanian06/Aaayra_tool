import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import * as yup from "yup";

type FormData = {
  mobile: string;
  otp?: string;
};

type ValidationErrors = {
  mobile?: string;
  otp?: string;
};

const mobileSchema = yup.object().shape({
  mobile: yup
    .string()
    .required("Mobile number is required")
    .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits"),
});

const otpSchema = yup.object().shape({
  mobile: yup
    .string()
    .required("Mobile number is required")
    .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits"),
  otp: yup
    .string()
    .required("OTP is required")
    .matches(/^\d{6}$/, "OTP must be exactly 6 digits"),
});

export function Login() {
  const navigate = useNavigate();
  const [otpStage, setOtpStage] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    mobile: "",
    otp: "",
  });
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateForm = async (data: FormData, isOtpStage: boolean) => {
    try {
      if (isOtpStage) {
        await otpSchema.validate(data, { abortEarly: false });
      } else {
        await mobileSchema.validate(data, { abortEarly: false });
      }
      setErrors({});
      return true;
    } catch (validationError: any) {
      const newErrors: ValidationErrors = {};
      validationError.inner.forEach((error: any) => {
        newErrors[error.path as keyof ValidationErrors] = error.message;
      });
      setErrors(newErrors);
      return false;
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const isValid = await validateForm(formData, otpStage);
    
    if (!isValid) return;

    if (!otpStage) {
      console.log("Sending OTP to:", formData.mobile);
      setOtpStage(true);
    } else {
      console.log("Verifying OTP:", formData);
      // Submit OTP and login logic here
      // Navigation will be handled by button click
    }
  };

  const handleResendOtp = async () => {
    const isValid = await validateForm(formData, false);
    if (isValid) {
      console.log("Resending OTP...");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      
      <form
        className="w-full max-w-sm space-y-6"
        onSubmit={handleSubmit}
      >
        <div className="w-32 h-32 mx-auto rounded-lg bg-gray-200" />
        <div>
          <h2 className="text-lg font-semibold">Welcome!</h2>
          <p className="text-sm text-muted-foreground">
            Login with your credentials
          </p>
        </div> 
        <div className="space-y-4">
          <div>
            <Label htmlFor="mobile">Login With OTP</Label>
            <Input
              id="mobile"
              placeholder="Enter Mobile no"
              value={formData.mobile}
              onChange={(e) => handleInputChange("mobile", e.target.value)}
            />
            {errors.mobile && (
              <p className="text-sm text-red-600 mt-1">
                {errors.mobile}
              </p>
            )}
          </div>

          {otpStage && (
            <div>
              <Input
                id="otp"
                placeholder="Enter OTP"
                value={formData.otp || ""}
                onChange={(e) => handleInputChange("otp", e.target.value)}
              />
              {errors.otp && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.otp}
                </p>
              )}
              <div className="text-right mt-1">
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:underline"
                  onClick={handleResendOtp}
                >
                  Resend OTP
                </button>
              </div>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-[#001845] hover:bg-[#001845]/90"
            onClick={async () => {
              if (otpStage) {
                const isValid = await validateForm(formData, otpStage);
                if (isValid) {
                  navigate('/account');
                }
              }
            }}
          >
            {otpStage ? "Login" : "Login with OTP"}
          </Button>
        </div>
      </form>
    </div>
  );
}

