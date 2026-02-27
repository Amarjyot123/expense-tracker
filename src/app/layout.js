import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Expense Tracker",
  description: "Track your expenses easily",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="p-6">
          {children}
        </div>
      </body>
    </html>
  );
}