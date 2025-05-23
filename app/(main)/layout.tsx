import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";

const MainLayout = ({children}: {children:React.ReactNode}) => {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <div className="flex h-screen">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                    <Navbar />
                    <main className="flex-1 p-5 overflow-auto">{children}</main>
                </div>
            </div>
            <Toaster />
        </ThemeProvider>
    );
};
 
export default MainLayout;