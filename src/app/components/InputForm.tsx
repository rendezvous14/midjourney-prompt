'use client';

import { useState } from 'react';
import { ClipboardIcon } from '@heroicons/react/outline';

export default function InputForm() {
  const [inputs, setInputs] = useState({
    imageSize: '',
    cameraAngle: '',
    cameraObjectDirection: '',
    imageStyle: '',
    character: '',
    characterDetails: '',
    action: '',
    timePeriod: '',
    weather: '',
    colorTone: '',
    parameter1: '--ar 9:16',
    parameter2: '',
    parameter3: '',
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
    <div className="p-6 max-w-2xl mx-auto dark:bg-gray-800 dark:text-white" data-testid="input-form">
      <h1
        className="items-center text-xl font-bold mb-4"
        data-testid="form-title"
      >
        Midjourney Prompt Creation
      </h1>
      <div className="space-y-2" data-testid="input-fields-container">
        {Object.keys(inputs).map((key, index) => (
          <div
            key={key}
            className="flex items-center space-x-4"
            data-testid={`input-field-${index}`}
          >
            <label
              className="font-medium capitalize w-1/4 text-right"
              data-testid={`label-${key}`}
            >
              {key.replace(/([A-Z])/g, ' $1')}
            </label>
            <input
              type="text"
              name={key}
              value={inputs[key as keyof typeof inputs]}
              onChange={handleChange}
              className="border p-2 rounded w-3/4 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              data-testid={`input-${key}`}
            />
          </div>
        ))}
      </div>
      <div
        className="mt-4 p-3 border rounded bg-gray-100 dark:bg-gray-700 dark:border-gray-600 flex items-center justify-between"
        data-testid="consolidated-input-container"
      >
        <div data-testid="consolidated-input">
          <strong>Consolidated Input:</strong>
          <p
            className="mt-1 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line"
            data-testid="consolidated-input-text"
          >
            {combinedInput}
          </p>
        </div>
        <button
          onClick={copyToClipboard}
          className="ml-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
          data-testid="copy-button"
        >
          <ClipboardIcon className="w-5 h-5" />
        </button>
      </div>

      {copied && (
        <div
          className="mt-2 p-2 bg-green-500 text-white rounded text-center dark:bg-green-600"
          data-testid="copied-alert"
        >
          Copied to clipboard!
        </div>
      )}
    </div>
  );
}
