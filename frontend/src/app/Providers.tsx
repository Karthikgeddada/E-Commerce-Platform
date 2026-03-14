"use client";

import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Toaster
                position="bottom-right"
                toastOptions={{
                    duration: 4000,
                    style: {
                        background: "#232f3e",
                        color: "#fff",
                        fontSize: "15px",
                        borderRadius: "8px",
                        padding: "12px 20px",
                        boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                        border: "1px solid #37475a",
                        fontWeight: "500",
                        maxWidth: "400px",
                    },
                    success: {
                        iconTheme: {
                            primary: "#ffd814",
                            secondary: "#232f3e",
                        },
                        duration: 4000,
                    }
                }}
            />
            {children}
        </>
    );
}
