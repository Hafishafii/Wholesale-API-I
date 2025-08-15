import React, { useState, useEffect } from "react";
import {
  getNameError,
  getEmailError,
  getPhoneError,
  getProductTypeError,
  getCustomizationOptionError,
  getColorError,
  getPatternError,
  getQuantityError,
  getDateError,
  getInstructionsError,
  getMultipleFilesError,
 

} from "../utils/validations";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
import { useCustomOrder } from "../hooks/useCustomOrder";
import { testApiConnection, testCustomOrderEndpoint, testAuthentication } from "../utils/apiTest";

const colorOptions = [
  "#f00",
  "#ffa500",
  "#ff0",
  "#008000",
  "#00f",
  "#ffb6eb",
  "#000",
  "#fff",
];

const sizeOptions = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'freesize'];

const CustomizeOrder = () => {
  // Custom hook for API integration
  const { isLoading, error, success, orderData, submitOrder, resetState } = useCustomOrder();
  
  // Debug: Check API configuration and test connectivity
  useEffect(() => {
   
    // Test API connectivity
    const testApi = async () => {
      const isConnected = await testApiConnection();
      if (isConnected) {
        await testCustomOrderEndpoint();
        await testAuthentication();
      }
    };
    
    testApi();
  }, []);
  
  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [productType, setProductType] = useState("");
  const [customizationOption, setCustomizationOption] = useState("");
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [pattern, setPattern] = useState("");
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState("");
  const [instructions, setInstructions] = useState("");
  const [customColor, setCustomColor] = useState<string>("#000000");
  const [customColorActive, setCustomColorActive] = useState(false);
  const [isUsingCustomColor, setIsUsingCustomColor] = useState(false);
  const [budget, setBudget] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isColorUploading, setIsColorUploading] = useState(false);
  const [isSampleUploading] = useState(false);
  const [isUrgent, setIsUrgent] = useState(false);
  const [brandLabel, setBrandLabel] = useState(false);


  // Error state
  const [errors, setErrors] = useState<any>({});
  const [colorImagePreviews, setColorImagePreviews] = useState<string[]>([]);
  const [sampleImagePreviews, setSampleImagePreviews] = useState<string[]>([]);
  // Temporarily disabled for JSON submission
  const [colorImageFiles, setColorImageFiles] = useState<File[]>([]);
const [sampleImageFiles, setSampleImageFiles] = useState<File[]>([]);



  useEffect(() => {
}, [sampleImageFiles]);


  // Handle success and error states
  useEffect(() => {
    if (success && orderData) {
      setShowSuccess(true);
    }
  }, [success, orderData]);

  // Handle API errors
  useEffect(() => {
    if (error) {
      console.error("❌ API Error in component:", error);
      // You can replace this with a more elegant error display
    }
  }, [error]);

 const handleSampleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files) return;

  const selectedFiles = Array.from(e.target.files).slice(0, 3);
  
  setSampleImageFiles(prev => [...prev, ...selectedFiles]);
  setSampleImagePreviews(prev => [
    ...prev,
    ...selectedFiles.map(file => URL.createObjectURL(file))
  ]);

  // Allow reselecting same file later
  e.target.value = "";
};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate all fields
    const newErrors: any = {};
    newErrors.name = getNameError(name);
    newErrors.email = getEmailError(email);
    newErrors.phone = getPhoneError(phone);
    newErrors.productType = getProductTypeError(productType);
    newErrors.customizationOption =
      getCustomizationOptionError(customizationOption);
    newErrors.selectedColor = getColorError(selectedColor || "");
    newErrors.pattern = getPatternError(pattern);
    newErrors.selectedSizes =
    selectedSizes.length === 0 ? "At least one size must be selected." : "";
    newErrors.quantity = getQuantityError(Number(quantity));
    newErrors.date = getDateError(date);
    newErrors.instructions = getInstructionsError(instructions);
    // Temporarily disable file validation since we're sending JSON
    newErrors.colorImage = getMultipleFilesError(colorImageFiles, {
      required: true,
      minCount: 3,
      allowedTypes: ["image/png", "image/jpeg", "image/jpg"],
      maxSizeMB: 5,
    });
    newErrors.sampleImage = getMultipleFilesError(sampleImageFiles, {
      required: true,
      minCount: 3,
      allowedTypes: ["image/png", "image/jpeg", "image/jpg"],
      maxSizeMB: 5,
    });
    setErrors(newErrors);
    // If any error exists, do not submit
    if (Object.values(newErrors).some((err) => err)) return;
    
    try {
      await submitOrder({
        name,
        email,
        phone,
        productType,
        customizationOption,
        selectedColor,
        customColor,
        isUsingCustomColor,
        pattern,
        selectedSizes,
        quantity,
        date,
        instructions,
        colorImageFiles,
        sampleImageFiles,
        isUrgent,
        brandLabel,
        budget: budget ? parseFloat(budget) : undefined,
      });
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col items-center py-4 sm:py-6 md:py-8 lg:py-10 relative px-2 sm:px-4 md:px-6 lg:px-8">
      <h1 className="w-full text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#06194A] mb-4 sm:mb-6 md:mb-8 px-2 text-center">
        Customize Your Order
      </h1>
      <form
        className={`bg-gray-200 shadow-lg rounded-lg p-4 sm:p-6 md:p-8 lg:p-10 w-full max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-6xl flex flex-col gap-4 sm:gap-6 transition-all duration-300 ${
          showSuccess ? "blur-sm pointer-events-none select-none" : ""
        }`}
        onSubmit={handleSubmit}
        noValidate
      >
        <h2 className="font-bold text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4 text-[#06194A]">
          Customer Info
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              placeholder="Name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:border-[#06194A] focus:ring-2 focus:ring-[#06194A]/20 transition-all duration-200 text-sm sm:text-base"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <div className="text-red-500 text-xs sm:text-sm mt-1">{errors.name}</div>
            )}
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:border-[#06194A] focus:ring-2 focus:ring-[#06194A]/20 transition-all duration-200 text-sm sm:text-base"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <div className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</div>
            )}
          </div>
        </div>
        <div>
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:border-[#06194A] focus:ring-2 focus:ring-[#06194A]/20 transition-all duration-200 text-sm sm:text-base"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.phone && (
            <div className="text-red-500 text-xs sm:text-sm mt-1">{errors.phone}</div>
          )}
        </div>

        <h2 className="font-bold text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4 text-[#06194A]">
          Product Type
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4">
          {["Formals", "Casuals",  "Funky "].map((type) => (
            <label key={type} className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <input
                type="radio"
                name="productType"
                className="accent-[#06194A] w-4 h-4"
                checked={productType === type}
                onChange={() => setProductType(type)}
              />
              <span className="font-medium text-sm sm:text-base capitalize">{type}</span>
            </label>
          ))}
        </div>
        {errors.productType && (
          <div className="text-red-500 text-xs sm:text-sm mb-2">{errors.productType}</div>
        )}

        <h2 className="font-bold text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4 text-[#06194A]">
          Fabric Type
        </h2>
        <select
          className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:border-[#06194A] focus:ring-2 focus:ring-[#06194A]/20 transition-all duration-200 text-sm sm:text-base cursor-pointer"
          value={customizationOption}
          onChange={(e) => setCustomizationOption(e.target.value)}
        >
          <option value="">Select Fabric Type</option>
          <option value="silk">Silk</option>
          <option value="cotton">Cotton</option>
          <option value="linen">Linen</option>
          <option value="polyester">Polyester</option>
        </select>
        {errors.customizationOption && (
          <div className="text-red-500 text-xs sm:text-sm mt-1">
            {errors.customizationOption}
          </div>
        )}

        <h2 className="font-bold text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4 text-[#06194A]">
          Color Preferences
        </h2>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3 sm:gap-4 items-center justify-center sm:justify-start">
            {colorOptions.map((color) => (
              <button
                key={color}
                type="button"
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg shadow-md hover:scale-110 transition-transform ${
                  color === "#fff" ? "border-2 border-gray-300" : ""
                } ${selectedColor === color ? "ring-4 ring-[#06194A] ring-offset-2" : ""}`}
                style={{ backgroundColor: color }}
                aria-label={color}
                onClick={() => {
                  setSelectedColor(color);
                  setCustomColorActive(false);
                  setIsUsingCustomColor(false);
                }}
              >
                {selectedColor === color && (
                  <span className="block w-full h-full border-2 border-white rounded-lg"></span>
                )}
              </button>
            ))}
            {/* Custom color button */}
            <button
  type="button"
  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg border-2 border-gray-300 flex items-center justify-center bg-white shadow-md hover:scale-110 transition-transform ${
    customColorActive ? "ring-4 ring-[#06194A] ring-offset-2" : ""
  }`}
  aria-label="Custom color"
  onClick={() => {
    setSelectedColor(customColor); // ✅ use customColor state here
    setCustomColorActive(true);    // ✅ activate custom color
    setIsUsingCustomColor(true);   // ✅ mark as custom color
  }}
>
  <span className="text-lg font-bold text-gray-600">+</span>
</button>

            {/* Color picker input, shown only if custom color is active */}
            {customColorActive && (
              <input
                type="color"
                value={customColor}
                onChange={(e) => {
                  setCustomColor(e.target.value);
                  setSelectedColor(e.target.value);
                  setIsUsingCustomColor(true);
                }}
                className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-gray-300 rounded-lg cursor-pointer shadow-md"
                aria-label="Pick custom color"
              />
            )}
          </div>
          
          <div className="w-full">
            <label
              htmlFor="colorImage"
              className="block cursor-pointer border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center py-6 px-4 sm:px-8 w-full hover:bg-gray-50 hover:border-[#06194A] transition-all duration-200"
            >
              <svg
                className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400 mb-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M12 16V4m0 0l-4 4m4-4l4 4" />
                <rect x="4" y="16" width="16" height="4" rx="2" />
              </svg>
              <span className="font-semibold text-sm sm:text-base text-gray-700 mb-1">
                Upload color reference images
              </span>
              <span className="text-xs sm:text-sm text-gray-500 text-center">
                Optional: Upload color reference images
              </span>
              <input
                id="colorImage"
                type="file"
                accept="image/*"
                className="hidden"
                multiple
                onChange={async (e) => {
                  setIsColorUploading(true);
                  try {
                    const files = Array.from(e.target.files || []).slice(0, 3);
                    setColorImageFiles(files); // Temporarily disabled
                    // Simulate file processing time
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    setColorImagePreviews(
                      files.map((file) => URL.createObjectURL(file))
                    );
                  } finally {
                    setIsColorUploading(false);
                  }
                }}
              />
            </label>
            {isColorUploading && (
              <div className="flex items-center justify-center gap-2 mt-2 text-blue-600 text-sm">
                <LoadingSpinner size="sm" />
                <span>Processing images...</span>
              </div>
            )}
            {errors.colorImage && (
              <div className="text-red-500 text-xs sm:text-sm mt-2 text-center">
                {errors.colorImage}
              </div>
            )}
            {colorImagePreviews.length > 0 && (
              <div className="flex gap-3 mt-4 flex-wrap justify-center">
                {colorImagePreviews.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`Color Reference Preview ${idx + 1}`}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        {errors.selectedColor && (
          <div className="text-red-500 text-xs sm:text-sm mb-2">
            {errors.selectedColor}
          </div>
        )}

        <h2 className="font-bold text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4 text-[#06194A]">
          Style/ Pattern Preferences
        </h2>
        <select
          className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:border-[#06194A] focus:ring-2 focus:ring-[#06194A]/20 transition-all duration-200 text-sm sm:text-base cursor-pointer"
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
        >
          <option value="">Select Pattern</option>
          <option value="floral">Floral</option>
          <option value="geometric">Geometric</option>
          <option value="abstract">Abstract</option>
          <option value="traditional">Traditional</option>
          <option value="modern">Modern</option>
          <option value="ethnic">Ethnic</option>
        </select>
        {errors.pattern && (
          <div className="text-red-500 text-xs sm:text-sm mt-1">{errors.pattern}</div>
        )}
        
        <div className="w-full">
          <label
            htmlFor="sampleImage"
            className="block cursor-pointer border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center py-6 px-4 sm:px-8 w-full hover:bg-gray-50 hover:border-[#06194A] transition-all duration-200"
          >
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400 mb-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M12 16V4m0 0l-4 4m4-4l4 4" />
              <rect x="4" y="16" width="16" height="4" rx="2" />
            </svg>
            <span className="font-semibold text-sm sm:text-base text-gray-700 mb-1">
              Upload Sample Images/ Designs
            </span>
                          <span className="text-xs sm:text-sm text-gray-500 text-center">
                Optional: Upload sample design images
              </span>
           <input
  type="file"
  id="sampleImage"
  accept="image/*"
  multiple
  onChange={handleSampleImageChange}
/>
            
          </label>
          {isSampleUploading && (
            <div className="flex items-center justify-center gap-2 mt-2 text-blue-600 text-sm">
              <LoadingSpinner size="sm" />
              <span>Processing images...</span>
            </div>
          )}
          {errors.sampleImage && (
            <div className="text-red-500 text-xs sm:text-sm mt-2 text-center">
              {errors.sampleImage}
            </div>
          )}
          {sampleImagePreviews.length > 0 && (
            <div className="flex gap-3 mt-4 flex-wrap justify-center">
              {sampleImagePreviews.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Sample Design Preview ${idx + 1}`}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
                />
              ))}
            </div>
          )}
        </div>

        <h2 className="font-bold text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4 text-[#06194A]">
          Size/ Measurement Options
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4 mb-4">
          {sizeOptions.map((size) => (
            <label key={size} className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                className="accent-[#06194A] w-4 h-4"
                checked={selectedSizes.includes(size)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedSizes([...selectedSizes, size]);
                  } else {
                    setSelectedSizes(selectedSizes.filter((s) => s !== size));
                  }
                }}
              />
              <span className="font-medium text-sm sm:text-base">{size}</span>
            </label>
          ))}
        </div>

        {errors.selectedSizes && (
          <div className="text-red-500 text-xs sm:text-sm mb-2">{errors.selectedSizes}</div>
        )}
        

        {/* Branding/ Labeling */}
        <h2 className="font-bold text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4 text-[#06194A]">
          Branding/ Labeling
        </h2>
        <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
  <input
    type="checkbox"
    className="accent-[#06194A] w-4 h-4"
    checked={brandLabel}
    onChange={(e) => setBrandLabel(e.target.checked)}
  />
  <span className="font-medium text-sm sm:text-base">Include Brand Label?</span>
</label>


        {/* Quantity & Order Details */}
        <h2 className="font-bold text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4 text-[#06194A]">
          Quantity & Order Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <input
              type="number"
              placeholder="Quantity Required"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:border-[#06194A] focus:ring-2 focus:ring-[#06194A]/20 transition-all duration-200 text-sm sm:text-base"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            {errors.quantity && (
              <div className="text-red-500 text-xs sm:text-sm mt-1">{errors.quantity}</div>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="MM/DD/YYYY"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:border-[#06194A] focus:ring-2 focus:ring-[#06194A]/20 transition-all duration-200 text-sm sm:text-base"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            {errors.date && (
              <div className="text-red-500 text-xs sm:text-sm mt-1">{errors.date}</div>
            )}
          </div>
          <div>
            <input
              type="number"
              placeholder="Budget (₹)"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:border-[#06194A] focus:ring-2 focus:ring-[#06194A]/20 transition-all duration-200 text-sm sm:text-base"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
          </div>
        </div>
        <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
  <input
    type="checkbox"
    className="accent-[#06194A] w-4 h-4"
    checked={isUrgent}
    onChange={(e) => setIsUrgent(e.target.checked)}
  />
  <span className="font-medium text-sm sm:text-base">Urgent Order?</span>
</label>


        <h2 className="font-bold text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4 text-[#06194A]">
          Additional Instructions
        </h2>
        <textarea
          className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:border-[#06194A] focus:ring-2 focus:ring-[#06194A]/20 transition-all duration-200 text-sm sm:text-base resize-none"
          rows={4}
          placeholder="Describe any specific requirements or notes"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />
        {errors.instructions && (
          <div className="text-red-500 text-xs sm:text-sm mt-1">{errors.instructions}</div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-red-800 text-sm font-medium">{error}</span>
            </div>
          </div>
        )}
        
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-[#06194A] text-white font-bold py-3 sm:py-4 rounded-lg mt-6 transition-all duration-200 text-sm sm:text-base md:text-lg shadow-lg transform hover:scale-[1.02] flex items-center justify-center gap-2 ${
            isLoading 
              ? "bg-gray-500 cursor-not-allowed hover:scale-100" 
              : "hover:bg-blue-900 hover:shadow-xl"
          }`}
        >
          {isLoading && <LoadingSpinner size="sm" className="text-white" />}
          {isLoading ? "Submitting Order..." : "Submit Order"}
        </button>
      </form>
      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4 sm:px-6">
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 flex flex-col items-center max-w-sm sm:max-w-md md:max-w-lg w-full mx-2 animate-fadeIn">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-green-100 rounded-full flex items-center justify-center mb-4 sm:mb-6">
              <svg
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div className="text-center">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                Order Submitted Successfully!
              </h3>
              {orderData && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-800">
                    
                  </p>
                  
                </div>
              )}
              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                {orderData?.message || "Your customization request has been submitted successfully. Our team will review your requirements and get back to you within 24 hours."}
              </p>
              <button
                onClick={() => {
                  setShowSuccess(false);
                  resetState();
                  // Reset form
                  setName("");
                  setEmail("");
                  setPhone("");
                  setProductType("");
                  setCustomizationOption("");
                  setSelectedColor(null);
                  setSelectedSizes([]);
                  setPattern("");
                  setQuantity("");
                  setDate("");
                  setBudget("");
                  setInstructions("");
                  setCustomColor("#000000");
                  setCustomColorActive(false);
                  setIsUsingCustomColor(false);
                  setColorImagePreviews([]);
                  setSampleImagePreviews([]);
                  // setColorImageFiles([]); // Temporarily disabled
                  // setSampleImageFiles([]); // Temporarily disabled
                  setErrors({});
                }}
                className="mt-6 bg-[#06194A] text-white px-6 py-2 rounded-lg hover:bg-blue-900 transition-colors"
              >
                Submit Another Order
              </button>
            </div>
          </div>
        </div>
      )}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease;
        }
      `}</style>
    </div>
  );
};

export default CustomizeOrder;
