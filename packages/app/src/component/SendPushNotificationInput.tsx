import { ChangeEvent, ReactElement, useState } from "react";
import { useSendPushNotification } from "../hooks/useSendPushNotification";

export const SendPushNotificationInput = (): ReactElement => {
  const [inputText, setInputText] = useState<string>("");

  const mutation = useSendPushNotification();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputText(e.target.value);
  };

  const handleButtonClick = () => {
    mutation.mutate(inputText);
  };

  return (
    <div className="flex flex-row gap-4">
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter text"
      />
      <button
        onClick={handleButtonClick}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </div>
  );
};
