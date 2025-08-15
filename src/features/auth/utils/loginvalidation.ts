// ✅ Phone number must be 10 digits
export function validatePhone(phone: string): boolean {
    return /^\d{10}$/.test(phone.trim());
  }
  
  // ✅ Password must be at least 6 characters
  export function validatePassword(password: string): boolean {
    return password.trim().length >= 6;
  }
  
  // ✅ First name must be at least 2 characters, letters only
  export function validateFirstName(name: string): boolean {
    return /^[A-Za-z]{2,}$/.test(name.trim());
  }
  
  // ✅ Last name must be at least 2 characters, letters only
  export function validateLastName(name: string): boolean {
    return /^[A-Za-z]{2,}$/.test(name.trim());
  }
  
  // ✅ Agreement checkbox must be checked
  export function validateAgreement(agree: boolean): boolean {
    return agree === true;
  }
  
  // ✅ Email validation with proper format check
  export function validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.trim());
  }
  
  // ✅ Centralized field-specific error helpers (recommended)
  
  // --- LOGIN + REGISTER SHARED ---
  export function getPhoneError(phone: string): string {
    if (!phone.trim()) return 'Phone number is required.';
    if (!validatePhone(phone)) return 'Phone number must be 10 digits.';
    return '';
  }
  
  export function getPasswordError(password: string): string {
    if (!password.trim()) return 'Password is required.';
    if (!validatePassword(password)) return 'Password must be at least 6 characters.';
    return '';
  }
  
  // --- REGISTER ONLY ---
  export function getFirstNameError(name: string): string {
    if (!name.trim()) return 'First name is required.';
    if (!validateFirstName(name)) return 'First name must be at least 2 letters.';
    return '';
  }
  
  export function getLastNameError(name: string): string {
    if (!name.trim()) return 'Last name is required.';
    if (!validateLastName(name)) return 'Last name must be at least 2 letters.';
    return '';
  }
  
  export function getAgreementError(agree: boolean): string {
    return validateAgreement(agree) ? '' : 'You must agree to the terms.';
  }
  
  export function getEmailError(email: string): string {
    if (!email.trim()) return 'Email is required.';
    if (!validateEmail(email)) return 'Please enter a valid email address.';
    return '';
  }
  
  // --- LOGIN VALIDATION ---
  export interface LoginValidationResult {
    isValid: boolean;
    emailError: string;
    passwordError: string;
  }

  export function validateLoginForm(email: string, password: string): LoginValidationResult {
    const emailError = getEmailError(email);
    const passwordError = getPasswordError(password);
    
    return {
      isValid: !emailError && !passwordError,
      emailError,
      passwordError
    };
  }

  // --- LOGIN ERROR HANDLING ---
  export interface LoginErrorResponse {
    emailError?: string;
    passwordError?: string;
    generalError?: string;
  }

  export function handleLoginError(error: any): LoginErrorResponse {
    // Get the error message from the response
    const errorMessage = error?.response?.data?.message || 
                        error?.response?.data?.error || 
                        error?.response?.data?.detail ||
                        error?.message || 
                        '';

    // Check if it's an email-related error first
    if (errorMessage?.toLowerCase().includes('email') || 
        errorMessage?.toLowerCase().includes('user') ||
        errorMessage?.toLowerCase().includes('not found') ||
        errorMessage?.toLowerCase().includes('does not exist')) {
      return {
        emailError: 'Email not found. Please register to create an account.'
      };
    }

    // Check if it's a password-related error
    if (errorMessage?.toLowerCase().includes('password') ||
        errorMessage?.toLowerCase().includes('invalid credentials') ||
        errorMessage?.toLowerCase().includes('incorrect')) {
      return {
        passwordError: 'Incorrect password. Please try again.'
      };
    }

    // Handle specific HTTP status codes
    if (error?.response?.status === 401) {
      // If we have a specific error message, use it; otherwise default to password error
      if (errorMessage?.toLowerCase().includes('email') || errorMessage?.toLowerCase().includes('user')) {
        return {
          emailError: 'Email not found. Please register to create an account.'
        };
      }
      return {
        passwordError: 'Incorrect password. Please try again.'
      };
    }
    
    if (error?.response?.status === 404) {
      return {
        emailError: 'Email not found. Please register to create an account.'
      };
    }
    
    if (error?.response?.status === 400) {
      if (errorMessage?.toLowerCase().includes('password')) {
        return {
          passwordError: 'Incorrect password. Please try again.'
        };
      }
      if (errorMessage?.toLowerCase().includes('email') || errorMessage?.toLowerCase().includes('user')) {
        return {
          emailError: 'Email not found. Please register to create an account.'
        };
      }
      return {
        generalError: errorMessage || 'Invalid credentials. Please try again.'
      };
    }
    
    // Network or server errors
    if (error?.message?.includes('Network Error') || error?.code === 'NETWORK_ERROR') {
      return {
        generalError: 'Network error. Please check your internet connection and try again.'
      };
    }
    
    // Default error
    return {
      generalError: 'Login failed. Please try again later.'
    };
  }
  