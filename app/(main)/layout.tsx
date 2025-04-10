import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Sidebar from "@/components/Sidebar";

const MainLayout = ({children}: {children:React.ReactNode}) => {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <div className="flex">
                <Sidebar />
                <main className="flex-1 p-5">{children}</main>
            </div>
        </ThemeProvider>
    );
};
 
export default MainLayout;