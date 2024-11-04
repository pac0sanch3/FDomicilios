import Header from "../layout/Header.jsx";
import { Suspense } from "react";

import { SolicitudesProvider } from "../../services/SolicitudesProvider.jsx";

const Layout = ({ children }) => {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-100 overflow-hidden">
        <SolicitudesProvider>
          <Header color="bg-white shadow-sm" />
        </SolicitudesProvider>
        <main className="flex flex-grow overflow-hidden">
          <section className="flex-grow p-4 sm:p-6 lg:p-8 overflow-auto">
            <Suspense
              fallback={
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-gray-900"></div>
                </div>
              }
            >
              <div className="bg-white shadow-lg h-full p-4 sm:p-6">
                {children}
              </div>
            </Suspense>
          </section>
        </main>
      </div>
    </>
  );
};

export default Layout;