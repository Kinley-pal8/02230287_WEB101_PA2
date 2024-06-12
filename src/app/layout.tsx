// Import necessary modules and components
import React from "react";
import type { Metadata } from "next"; // Import Metadata type from next for setting metadata
import { Lora } from "next/font/google"; // Import Lora font from Google Fonts
import { Toaster } from "@/components/ui/toaster"; // Import Toaster component from the project's components
import "./globals.css"; // Import global CSS styles

// Initialize the Lora font with specified subsets and weight
const lora = Lora({ subsets: ["latin"], weight: ["400", "700"] }); // Adjust weights as needed

// Set metadata for the application
export const metadata: Metadata = {
  title: "PokeDex", // Set the title of the application
  description: "CAP2", // Set the description of the application
};

// Define the RootLayout component
const RootLayout = ({
  children, // Destructure children prop to receive nested components
}: Readonly<{
  children: React.ReactNode; // Define the type for children prop
}>) => {
  return (
    <html lang="en"> {/* Set the language of the document */}
      <head>
        {/* Add any additional head elements here */}
      </head>
      <body className={lora.className}> {/* Apply the Lora font class to the body */}
        {children} {/* Render nested components */}
        <Toaster /> {/* Render the Toaster component for displaying notifications */}
      </body>
    </html>
  );
}

// Export the RootLayout component as the default export
export default RootLayout;
