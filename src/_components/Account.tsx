import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import avatar from "../assets/avatar.png"
type FormData = {
  fullName: string;
  shopName: string;
  role: string;
  purpose: string;
  mobile: string;
  altMobile: string;
  email: string;
  building: string;
  street: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
};

type ValidationErrors = {
  [key in keyof FormData]?: string;
};

const schema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  shopName: yup.string().required("Shop name is required"),
  role: yup.string().required("Please select your role"),
  purpose: yup.string().required("Please select purpose"),
  mobile: yup.string().required("Mobile number is required").min(10),
  altMobile: yup.string().nullable(),
  email: yup.string().required("Email is required").email("Please enter a valid email address"),
  building: yup.string().required("Building number is required"),
  street: yup.string().required("Street is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  country: yup.string().required("Country is required"),
  pincode: yup.string().required("Pincode is required"),
});

export function Account() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    shopName: "",
    role: "",
    purpose: "",
    mobile: "",
    altMobile: "",
    email: "",
    building: "",
    street: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateForm = async (data: FormData) => {
    try {
      await schema.validate(data, { abortEarly: false });
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
    
    const isValid = await validateForm(formData);
    
    if (!isValid) return;

    console.log("Form Data", formData);
    // Navigate back to login after successful submission
    navigate('/login');
  };
    
    return(
        <>
    <div className="min-h-screen py-4 flex items-center justify-center bg-white px-4">

      <div className="absolute top-4 right-4">
        <Button 
          type="button" 
          variant="outline"
          onClick={() => navigate('/login')}
          className="text-sm"
        >
          Logout
        </Button>
      </div>
      
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl space-y-5"
      >
        {/* Header Section */}
        <div className="flex flex-col items-center col-span-2">
          <img
            src={avatar}
            alt="Avatar"
            className="w-24 h-24 rounded-full"
          />
          <h2 className="font-semibold mt-2 text-lg">Basic Details</h2>
        </div>

        {/* Form Fields in 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Column 1 */}
          <div className="space-y-5">
            <div>
              <Label className="mb-2 block">Full name</Label>
              <Input 
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
              />
              {errors.fullName && <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>}
            </div>

            <div>
              <Label className="mb-2 block">Shop Name</Label>
              <Input 
                value={formData.shopName}
                onChange={(e) => handleInputChange("shopName", e.target.value)}
              />
              {errors.shopName && <p className="text-red-600 text-sm mt-1">{errors.shopName}</p>}
            </div>

            <div>
              <Label className="mb-2 block">Are you a?</Label>
              <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)} >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="retailer">Retailer</SelectItem>
                  <SelectItem value="wholesaler">Wholesaler</SelectItem>
                  <SelectItem value="distributor">Distributor</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && <p className="text-red-600 text-sm mt-1">{errors.role}</p>}
            </div>

            <div>
              <Label className="mb-2 block">Purpose of use</Label>
              <Select value={formData.purpose} onValueChange={(value) => handleInputChange("purpose", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select purpose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                </SelectContent>
              </Select>
              {errors.purpose && <p className="text-red-600 text-sm mt-1">{errors.purpose}</p>}
            </div>

            <div>
              <Label className="mb-2 block">Mobile Number</Label>
              <Input 
                type="tel"
                placeholder="Enter mobile number"
                value={formData.mobile}
                onChange={(e) => handleInputChange("mobile", e.target.value)}
              />
              {errors.mobile && <p className="text-red-600 text-sm mt-1">{errors.mobile}</p>}
            </div>

            <div>
              <Label className="mb-2 block">Alternate Mobile Number</Label>
              <Input 
                type="tel"
                placeholder="Enter alternate mobile number"
                value={formData.altMobile}
                onChange={(e) => handleInputChange("altMobile", e.target.value)}
              />
            </div>

            <div>
              <Label className="mb-2 block">Email ID</Label>
              <Input 
                type="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-5">
            <div>
              <Label className="mb-2 block">Shop / Building no</Label>
              <Input 
                value={formData.building}
                onChange={(e) => handleInputChange("building", e.target.value)}
              />
              {errors.building && <p className="text-red-600 text-sm mt-1">{errors.building}</p>}
            </div>

            <div>
              <Label className="mb-2 block">Street</Label>
              <Input 
                value={formData.street}
                onChange={(e) => handleInputChange("street", e.target.value)}
              />
              {errors.street && <p className="text-red-600 text-sm mt-1">{errors.street}</p>}
            </div>

            <div>
              <Label className="mb-2 block">City / Town</Label>
              <Input 
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
              />
              {errors.city && <p className="text-red-600 text-sm mt-1">{errors.city}</p>}
            </div>

            <div>
              <Label className="mb-2 block">State</Label>
              <Input 
                value={formData.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
              />
              {errors.state && <p className="text-red-600 text-sm mt-1">{errors.state}</p>}
            </div>

            <div>
              <Label className="mb-2 block">Country</Label>
              <Input 
                value={formData.country}
                onChange={(e) => handleInputChange("country", e.target.value)}
              />
              {errors.country && <p className="text-red-600 text-sm mt-1">{errors.country}</p>}
            </div>

            <div>
              <Label className="mb-2 block">Pincode</Label>
              <Input 
                value={formData.pincode}
                onChange={(e) => handleInputChange("pincode", e.target.value)}
              />
              {errors.pincode && <p className="text-red-600 text-sm mt-1">{errors.pincode}</p>}
            </div>
          </div>
        </div>

        {/* Submit Button - Full Width */}
        <div className="col-span-2">
          <Button type="submit" className="w-full bg-[#001845] hover:bg-[#001845]/90">
            Submit
          </Button>
        </div>
      </form>
    </div>

        </>
    )
}