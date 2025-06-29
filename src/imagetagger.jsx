import React, { useRef, useState } from "react";
import './App.css'
function ImageTagger({ onSearch }) {
  const [tags, setTags] = useState([]);
  const [search, setSearch] = useState("");
  const [imageProcessed, setImageProcessed] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [showLens, setShowLens] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    setImageProcessed(false);
    const file = e.target.files[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
    setShowLens(true);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result.split(",")[1];

      try {
        const response = await fetch("http://localhost:5000/clarifai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            inputs: [
              {
                data: {
                  image: {
                    base64: base64,
                  },
                },
              },
            ],
          }),
        });

        const data = await response.json();
        const concepts = data.outputs?.[0]?.data?.concepts || [];
        const detectedNames = concepts.slice(0, 5).map(concept => concept.name);

        setTags(detectedNames);
        setSearch(detectedNames.join(", "));
        setImageProcessed(true);
      } catch (err) {
        alert("Server error: " + err.message);
        setTags([]);
        setSearch("");
        setImageProcessed(true);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    setTags(
      value
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0)
    );
  };

  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

  const handleCloseLens = () => {
    setShowLens(false);
    setImagePreview(null);
    setTags([]);
    setSearch("");
    setImageProcessed(false);
  };

  const handleSearchClick = () => {
    if (onSearch) onSearch(search);
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="relative w-full max-w-md" id="search">
        <input
          type="text"
          value={search}
          placeholder="Search or upload an image"
          onChange={handleSearchChange}
          onKeyDown={e => {
    if (e.key === "Enter") {
      if (onSearch) onSearch(search);
    }
  }}
          className="border rounded-full px-4 py-4 w-full pr-20 shadow"
        />
        {/* Camera icon */}
        <button
          type="button"
          className="absolute right-12 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full hover:bg-gray-100"
          onClick={handleCameraClick}
          tabIndex={-1}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M21.02 5H19V2.98c0-.54-.44-.98-.98-.98h-.03c-.55 0-.99.44-.99.98V5h-2.01c-.54 0-.98.44-.99.98v.03c0 .55.44.99.99.99H17v2.01c0 .54.44.99.99.98h.03c.54 0 .98-.44.98-.98V7h2.02c.54 0 .98-.44.98-.98v-.04c0-.54-.44-.98-.98-.98zM16 9.01V8h-1.01c-.53 0-1.03-.21-1.41-.58-.37-.38-.58-.88-.58-1.44 0-.36.1-.69.27-.98H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8.28c-.3.17-.64.28-1.02.28-1.09-.01-1.98-.9-1.98-1.99zM15.96 19H6c-.41 0-.65-.47-.4-.8l1.98-2.63c.21-.28.62-.26.82.02L10 18l2.61-3.48c.2-.26.59-.27.79-.01l2.95 3.68c.26.33.03.81-.39.81z"/></svg>
        </button>
        {/* Search icon */}
        <button
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full  bg-white hover:bg-gray-100 "
          onClick={handleSearchClick}
          aria-label="Search"
        >
<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>

      {/* Google Lens-like container */}
      {showLens && (
        <div className="mt-4 w-96 bg-white rounded-xl shadow-lg p-4 relative">
          <button
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
            onClick={handleCloseLens}
            aria-label="Close"
          >
            &#10005;
          </button>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mb-2 max-h-64 rounded shadow w-16 object-contain"
            />
          )}
          {imageProcessed && tags.length === 0 && (
            <div className="text-red-500">No tags detected for this image.</div>
          )}
        </div>
      )}
    </div>
  );
}

export default ImageTagger;