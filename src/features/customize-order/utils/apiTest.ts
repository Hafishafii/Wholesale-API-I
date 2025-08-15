// src/features/orders/utils/debugCustomOrder.ts
import api from "../../../lib/api";

// Test API connectivity
export const testApiConnection = async () => {
  try {
    await api.get("/");
    return true;
  } catch (error: any) {
    return false;
  }
};

// Test if custom order endpoint exists
export const testCustomOrderEndpoint = async () => {
  try {
    await api.get("/orders/custom-orders/");
    return true;
  } catch (error: any) {
    if (error.response?.status === 405) {
      return true;
    }
    return false;
  }
};

// Main debugging function
export const debugCustomOrderSubmission = async () => {
  if (!(await testApiConnection())) return false;
  if (!(await testCustomOrderEndpoint())) return false;

  try {
    const testFormData = new FormData();

    // Required text fields
    testFormData.append("name", "Test User");
    testFormData.append("email", "test@example.com");
    testFormData.append("phone", "1234567890");
    testFormData.append("product_type", "formals");
    testFormData.append("fabric_type", "cotton");
    testFormData.append(
      "color_preferences",
      JSON.stringify({ primary: "#ff0000", secondary: "" })
    );
    testFormData.append("style_pattern", "solid");

    // Sizes
    ["M"].forEach(size => testFormData.append("size", size));

    // Quantity
    testFormData.append("quantity", "100");

    // Delivery date
    testFormData.append("preferred_delivery_date", "2024-12-31");

    // Optional budget
    testFormData.append("budget", "1000");

    // Extra instructions
    testFormData.append("additional_instructions", "Test order");

    // User ID
    testFormData.append("user", "2");

    // Test files
    const testFile = new File(["test content"], "test.txt", { type: "text/plain" });
    testFormData.append("sample_designs", testFile);
    testFormData.append("color_reference_images", testFile);

    await api.post("/orders/custom-orders/", testFormData, { timeout: 10000 });
    return true;
  } catch {
    return false;
  }
};

// Test authentication status
export const testAuthentication = async () => {
  const token = localStorage.getItem("accessToken");
  if (!token) return false;

  try {
    await api.get("/auth/me/");
    return true;
  } catch (error: any) {
    if (error.response?.status === 401) return false;
    return false;
  }
};
