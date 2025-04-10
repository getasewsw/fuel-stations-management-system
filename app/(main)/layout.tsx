import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
const MainLayout = ({children}: {children:React.ReactNode}) => {
    return (
        <>
<Navbar />
        <div className="flex">
          <div className="hidden md:block h-[100vh] w-[300px] ">
          <Sidebar />
          </div>
         <main className=" p-5 w-full md:max-w-[1440px]">{children}</main>
        
        </div>
        </>
      );
};
 
export default MainLayout;