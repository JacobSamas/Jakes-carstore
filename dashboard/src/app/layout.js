import "./globals.css";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AuthWrapper from "../components/AuthWrapper";

export const metadata = {
  title: "Jake's Car Store Dashboard",
  description: "Dashboard for Jake's Car Store",
};

export default function RootLayout({ children }) {
  return (
    <AuthWrapper>
      <html lang="en">
        <body>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-grow">
              <Navbar />
              <main className="p-4">{children}</main>
            </div>
          </div>
        </body>
      </html>
    </AuthWrapper>
  );
}
