// Validation and error helpers for CustomizeOrder form

// Name: required, at least 2 characters
export function validateName(name: string): boolean {
    return /^[A-Za-z ]{2,}$/.test(name.trim());
}
export function getNameError(name: string): string {
    if (!name.trim()) return 'Name is required.';
    if (!validateName(name)) return 'Name must be at least 2 letters.';
    return '';
}

// Email: required, valid format
export function validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.trim());
}
export function getEmailError(email: string): string {
    if (!email.trim()) return 'Email is required.';
    if (!validateEmail(email)) return 'Invalid email address.';
    return '';
}

// Phone: required, 10 digits
export function validatePhone(phone: string): boolean {
    return /^\d{10}$/.test(phone.trim());
}
export function getPhoneError(phone: string): string {
    if (!phone.trim()) return 'Phone number is required.';
    if (!validatePhone(phone)) return 'Phone number must be 10 digits.';
    return '';
}

// Product type: required
export function validateProductType(type: string): boolean {
    return !!type && type.trim().length > 0;
}
export function getProductTypeError(type: string): string {
    if (!validateProductType(type)) return 'Product type is required.';
    return '';
}

// Fabric type: required
export function validateCustomizationOption(option: string): boolean {
    return !!option && option.trim().length > 0 && option !== 'Select Fabric Type';
}
export function getCustomizationOptionError(option: string): string {
    if (!validateCustomizationOption(option)) return 'Fabric type is required.';
    return '';
}

// Color: required
export function validateColor(color: string): boolean {
    return !!color && color.trim().length > 0;
}
export function getColorError(color: string): string {
    if (!validateColor(color)) return 'Color selection is required.';
    return '';
}

// Pattern: required
export function validatePattern(pattern: string): boolean {
    return !!pattern && pattern.trim().length > 0 && pattern !== 'Select Pattern';
}
export function getPatternError(pattern: string): string {
    if (!validatePattern(pattern)) return 'Style/Pattern selection is required.';
    return '';
}

// Size: required
export function validateSize(size: string): boolean {
    return !!size && size.trim().length > 0;
}
export function getSizeError(size: string): string {
    if (!validateSize(size)) return 'Size selection is required.';
    return '';
}

// Quantity: required, minimum 1
export function validateQuantity(quantity: number): boolean {
    return !isNaN(quantity) && quantity >= 1;
}
export function getQuantityError(quantity: number): string {
    if (!quantity) return 'Quantity is required.';
    if (!validateQuantity(quantity)) return 'Quantity must be at least 1.';
    return '';
}

// Date: required, valid MM/DD/YYYY and valid calendar date
export function validateDate(date: string): boolean {
    if (!/^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/.test(date.trim())) return false;
    const [month, day, year] = date.split('/').map(Number);
    const d = new Date(year, month - 1, day);
    return d.getFullYear() === year && d.getMonth() === month - 1 && d.getDate() === day;
}
export function getDateError(date: string): string {
    if (!date.trim()) return 'Date is required.';
    if (!validateDate(date)) return 'Date must be a valid date in MM/DD/YYYY format.';
    return '';
}

// Additional instructions: optional, max 500 chars
export function validateInstructions(instr: string): boolean {
    return instr.length <= 500;
}
export function getInstructionsError(instr: string): string {
    if (!validateInstructions(instr)) return 'Instructions must be 500 characters or less.';
    return '';
}

// File validation (for image uploads)
export function validateFile(file: File | null, options?: { required?: boolean, maxSizeMB?: number, allowedTypes?: string[] }): boolean {
    if (!file) return !(options && options.required);
    if (options?.maxSizeMB && file.size > options.maxSizeMB * 1024 * 1024) return false;
    if (options?.allowedTypes && !options.allowedTypes.includes(file.type)) return false;
    return true;
}
export function getFileError(file: File | null, options?: { required?: boolean, maxSizeMB?: number, allowedTypes?: string[] }): string {
    if (!file) return options?.required ? 'File is required.' : '';
    if (options?.maxSizeMB && file.size > options.maxSizeMB * 1024 * 1024) return `File must be less than ${options.maxSizeMB}MB.`;
    if (options?.allowedTypes && !options.allowedTypes.includes(file.type)) return 'Invalid file type.';
    return '';
}

// Multiple files validation (for image uploads requiring minimum count)
export function validateMultipleFiles(files: File[], options?: { required?: boolean, minCount?: number, maxSizeMB?: number, allowedTypes?: string[] }): boolean {
    if (!files || files.length === 0) return !(options && options.required);
    if (options?.minCount && files.length < options.minCount) return false;

    // Check each file for size and type
    for (const file of files) {
        if (options?.maxSizeMB && file.size > options.maxSizeMB * 1024 * 1024) return false;
        if (options?.allowedTypes && !options.allowedTypes.includes(file.type)) return false;
    }
    return true;
}
export function getMultipleFilesError(files: File[], options?: { required?: boolean, minCount?: number, maxSizeMB?: number, allowedTypes?: string[] }): string {
    if (!files || files.length === 0) return options?.required ? 'Files are required.' : '';
    if (options?.minCount && files.length < options.minCount) return `At least ${options.minCount} images are required.`;

    // Check each file for size and type
    for (const file of files) {
        if (options?.maxSizeMB && file.size > options.maxSizeMB * 1024 * 1024) return `File must be less than ${options.maxSizeMB}MB.`;
        if (options?.allowedTypes && !options.allowedTypes.includes(file.type)) return 'Invalid file type.';
    }
    return '';
}

// Checkbox validation (for branding/urgent)
export function validateCheckbox(checked: boolean, required = false): boolean {
    return required ? checked : true;
}
export function getCheckboxError(checked: boolean, required = false): string {
    return required && !checked ? 'This field is required.' : '';
}

// All-in-one form validation utility
export function validateCustomizeOrderForm(fields: {
    name: string,
    email: string,
    phone: string,
    productType: string,
    customizationOption: string,
    selectedColor: string,
    pattern: string,
    selectedSize: string,
    quantity: number,
    date: string,
    instructions: string,
    colorImage?: File | null,
    sampleImage?: File | null,
    sizeChart?: File | null,
    branding?: boolean,
    urgent?: boolean
}) {
    return {
        name: getNameError(fields.name),
        email: getEmailError(fields.email),
        phone: getPhoneError(fields.phone),
        productType: getProductTypeError(fields.productType),
        customizationOption: getCustomizationOptionError(fields.customizationOption),
        selectedColor: getColorError(fields.selectedColor),
        pattern: getPatternError(fields.pattern),
        selectedSize: getSizeError(fields.selectedSize),
        quantity: getQuantityError(fields.quantity),
        date: getDateError(fields.date),
        instructions: getInstructionsError(fields.instructions),
        colorImage: getFileError(fields.colorImage || null, { allowedTypes: ['image/png', 'image/jpeg', 'image/jpg'], maxSizeMB: 5 }),
        sampleImage: getFileError(fields.sampleImage || null, { allowedTypes: ['image/png', 'image/jpeg', 'image/jpg'], maxSizeMB: 5 }),
        sizeChart: getFileError(fields.sizeChart || null, { allowedTypes: ['image/png', 'image/jpeg', 'image/jpg'], maxSizeMB: 5 }),
        branding: getCheckboxError(fields.branding ?? false, false),
        urgent: getCheckboxError(fields.urgent ?? false, false)
    };
} 