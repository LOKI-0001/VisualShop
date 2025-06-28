import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import ImageTagger from "./imagetagger";
import HomePage from "./homepage.";

export default function App() {
  return (
   <>
      {/* <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">VisualShop</h1>
        <div className="flex gap-2">
          <input type="file" className="w-32 bg-white text-black px-2 py-1 rounded" />
          <input type="text" placeholder="Enter text" className="w-40 bg-white text-black px-2 py-1 rounded" />
          <button className="bg-white text-black px-4 py-2 rounded border">Search</button>
          <div className="rounded-full border px-4 py-2 text-sm">User Profile</div>
        </div>
      </header> */}
      {/* <div>
        <Navbar />
       
      </div> */}

      <main className="mgx-20px">
 {/* <ImageTagger /> */}
 <HomePage />
      </main>
<div>
  {/* <Footer/> */}
</div>
 <div className=" w-full text-center py-top-8 text-2xl font-handwriting border-t">
              <Footer />
            </div>
    </>
    
  );
}
