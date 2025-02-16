"use client";

import { useState } from "react";
import { ClipboardIcon } from '@heroicons/react/outline';

export default function InputForm() {
  const [inputs, setInputs] = useState({
    imageSize: "",
    cameraAngle: "",
    cameraObjectDirection: "",
    imageStyle: "",
    character: "",
    characterDetails: "",
    action: "",
    timePeriod: "",
    weather: "",
    colorTone: "",
    parameter1: "--ar 9:16",
    parameter2: "",
    parameter3: "",
  });

    const [copied, setCopied] = useState(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const combinedInput = Object.values(inputs).filter(Boolean).join(', ');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(combinedInput);
    setCopied(true);

    // Hide the alert after 2 seconds
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="items-center text-xl font-bold mb-4">Midjourney Prompt Creation</h1>
      <div className="space-y-2">
        {Object.keys(inputs).map((key) => (
          <div key={key} className="flex items-center space-x-4">
            <label className="font-medium capitalize w-1/4 text-right">
              {key.replace(/([A-Z])/g, ' $1')}
            </label>
            <input
              type="text"
              name={key}
              value={inputs[key as keyof typeof inputs]}
              onChange={handleChange}
              className="border p-2 rounded w-3/4"
            />
          </div>
        ))}
      </div>
      <div className="mt-4 p-3 border rounded bg-gray-100 flex items-center justify-between">
        <div>
          <strong>Consolidated Input:</strong>
          <p className="mt-1 text-sm text-gray-700 whitespace-pre-line">
            {combinedInput}
          </p>
        </div>
        <button
          onClick={copyToClipboard}
          className="ml-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <ClipboardIcon className="w-5 h-5" />
        </button>
      </div>

      {copied && (
        <div className="mt-2 p-2 bg-green-500 text-white rounded text-center">
          Copied to clipboard!
        </div>
      )}
    </div>
  )
}
