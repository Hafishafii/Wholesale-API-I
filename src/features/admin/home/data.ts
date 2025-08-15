export const analytics = [
    {
        label: "Total Orders Today",
        value: 115
    },
    {
        label: "New Users Registered",
        value: 24
    },
    {
        label: "Sales This Week",
        value: 15450
    },
    {
        label: "Pending Orders",
        value: 12
    },
]


export const userActivities = {
    currentPage: 1,
    totalPages: 1,
    data: [
        {
            title: "User 1 registered",
            time: "15 minutes ago"
        },
        {
            title: "User 2 placed an order",
            time: "15 minutes ago"
        },
        {
            title: "User 1 registered",
            time: "15 minutes ago"
        },
        {
            title: "User 2 placed an order",
            time: "15 minutes ago"
        },
    ]
}

export interface CustomiseOrderRequestType {
    currentPage: number;
    totalPages: number;
    data: CustomizeOrderDataType[]
}

export interface CustomizeOrderDataType {
    id: string;
    name: string;
    email: string;
    phone: string;
    productType: string;
    colorPreferences: string;
    colorReferenceImages: string[];
    styleOrPattern: string;
    styleOrPatternSampleImage: string[];
    size: string[];
    isBranding: boolean;
    quantity: number;
    isUrgent: boolean;
    expectedDate: Date;
    instructions: string;
    status: 'Pending' | 'Accepted' | 'Declined' | 'Product Added';
    createdAt: Date;
    isUpdating?: boolean;
    productId?: string;
}
export const orderRequest: CustomiseOrderRequestType = {
    currentPage: 1,
    totalPages: 5,
    data: [
        {


            id: "1",
            name: "John Doe",
            email: "john@example.com",
            phone: "1234567890",
            productType: "T-Shirt",
            colorPreferences: "Red and Black",
            colorReferenceImages: ["https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg", "https://images.pexels.com/photos/991509/pexels-photo-991509.jpeg", "https://images.pexels.com/photos/1304647/pexels-photo-1304647.jpeg"],
            styleOrPattern: "Striped",
            styleOrPatternSampleImage: ["https://images.pexels.com/photos/2294342/pexels-photo-2294342.jpeg", "https://images.pexels.com/photos/581339/pexels-photo-581339.jpeg"],
            size: ["M", "L"],
            isBranding: true,
            quantity: 50,
            isUrgent: false,
            expectedDate: new Date("2025-08-10"),
            instructions: "Add logo on the sleeve.",
            status: "Pending",
            createdAt: new Date()
        },
        {

            id: "2",
            name: "Jane Smith",
            email: "jane@example.com",
            phone: "9876543210",
            productType: "Hoodie",
            colorPreferences: "Pastel Blue",
            colorReferenceImages: ["https://images.pexels.com/photos/220139/pexels-photo-220139.jpeg"],
            styleOrPattern: "Minimalist",
            styleOrPatternSampleImage: ["https://images.pexels.com/photos/6069087/pexels-photo-6069087.jpeg"],
            size: ["S", "M"],
            isBranding: false,
            quantity: 20,
            isUrgent: true,
            expectedDate: new Date("2025-08-05"),
            instructions: "No branding. Use eco-friendly material.",
            status: "Pending",
            createdAt: new Date()
        },
        {

            id: "3",
            name: "Carlos Rivera",
            email: "carlos@example.com",
            phone: "5554433221",
            productType: "Tote Bag",
            colorPreferences: "Beige with custom artwork",
            colorReferenceImages: ["https://images.pexels.com/photos/1868566/pexels-photo-1868566.jpeg"],
            styleOrPattern: "Boho",
            styleOrPatternSampleImage: ["https://images.pexels.com/photos/2062324/pexels-photo-2062324.jpeg"],
            size: ["One Size"],
            isBranding: true,
            quantity: 100,
            isUrgent: false,
            expectedDate: new Date("2025-08-20"),
            instructions: "Use natural jute material.",
            status: "Accepted",
            createdAt: new Date()
        },
        {

            id: "4",
            name: "Aisha Khan",
            email: "aisha@example.com",
            phone: "8080808080",
            productType: "Cap",
            colorPreferences: "White and Gold",
            colorReferenceImages: ["https://images.pexels.com/photos/2560894/pexels-photo-2560894.jpeg"],
            styleOrPattern: "Embroidered Logo",
            styleOrPatternSampleImage: ["https://images.pexels.com/photos/1018911/pexels-photo-1018911.jpeg"],
            size: ["Adjustable"],
            isBranding: true,
            quantity: 75,
            isUrgent: true,
            expectedDate: new Date("2025-08-07"),
            instructions: "Logo on front, initials on the side.",
            status: "Product Added",
            productId:"1",
            createdAt: new Date()
        },
        {

            id: "5",
            name: "Ravi Kumar",
            email: "ravi@example.com",
            phone: "9090909090",
            productType: "Sweatshirt",
            colorPreferences: "Grey and Maroon",
            colorReferenceImages: ["https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg"],
            styleOrPattern: "Colorblock",
            styleOrPatternSampleImage: ["https://images.pexels.com/photos/1007864/pexels-photo-1007864.jpeg"],
            size: ["L", "XL"],
            isBranding: false,
            quantity: 40,
            isUrgent: false,
            expectedDate: new Date("2025-08-25"),
            instructions: "Keep it warm and comfy.",
            status: "Declined",
            createdAt: new Date()
        }
    ]
};

