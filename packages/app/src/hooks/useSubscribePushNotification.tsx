/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { CONSTANTS, NotificationEvent } from "@pushprotocol/restapi";
import { pushWalletUser } from "@/instances/push";
import { PushStream } from "@pushprotocol/restapi/src/lib/pushstream/PushStream";
import { toast } from "sonner";

export const useSubscribePushNotification = () => {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    let stream: PushStream;

    const initializeStream = async () => {
      try {
        stream = await pushWalletUser.initStream([CONSTANTS.STREAM.NOTIF]);

        stream.on(CONSTANTS.STREAM.NOTIF, (data: NotificationEvent) => {
          console.log("New notification:", data);
          toast(data.message.notification.body);

          setNotifications((prevNotifications) => [...prevNotifications, data]);
        });

        stream.connect();
      } catch (error) {
        console.error("Error initializing notification stream:", error);
      }
    };

    initializeStream();

    return () => {
      if (stream) {
        stream.disconnect();
      }
    };
  }, []);

  return notifications;
};
