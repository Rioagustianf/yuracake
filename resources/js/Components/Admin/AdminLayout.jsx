import React from "react";
import Sidebar from "./Sidebar";

export default function AdminLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
            <Sidebar />
            <main className="flex-1 p-4 md:p-8 overflow-x-auto mt-20 md:mt-0">
                {children}
            </main>
        </div>
    );
}
