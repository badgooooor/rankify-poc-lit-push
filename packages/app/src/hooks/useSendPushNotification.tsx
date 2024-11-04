import { useMutation } from "@tanstack/react-query";
import { pushWalletUser } from "../instances/push";
// import { encryptString } from "@lit-protocol/lit-node-client";
import { litNodeClient } from "@/instances/lit";

// TODO: Send notification with AuthSig attached.
export const useSendPushNotification = () => {
  const mutation = useMutation({
    mutationKey: ["send-push-notifcation"],
    mutationFn: async ({ message }: { message: string }) => {
      await litNodeClient.connect();

      // Can use plain text for now.
      const response = await pushWalletUser.channel.send(["*"], {
        notification: {
          title: "You awesome notification",
          body: message,
        },
      });

      await litNodeClient.disconnect();

      return response;
    },
    onError: (error) => {
      console.log("error");
      console.error(error);
    },
  });

  return mutation;
};
