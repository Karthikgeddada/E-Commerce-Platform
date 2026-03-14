"use client";

import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Toaster
                position="top-center"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: "#333",
                        color: "#fff",
                        fontSize: "14px",
                        borderRadius: "8px",
                    },
                    success: {
                        iconTheme: {
                            primary: "#ffd814",
                            secondary: "#333",
                        },
                    }
                }}
            />
            {children}
        </>
    );
}
