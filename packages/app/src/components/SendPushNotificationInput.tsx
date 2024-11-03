import { ChangeEvent, ReactElement, useState } from "react";
import { useSendPushNotification } from "../hooks/useSendPushNotification";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
      <Input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter text"
      />
      <Button onClick={handleButtonClick}>Submit</Button>
    </div>
  );
};
