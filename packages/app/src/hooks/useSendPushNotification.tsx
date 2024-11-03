import { useMutation } from "@tanstack/react-query";
import { pushWalletUser } from "../instances/push";

// TODO: Send notification with AuthSig attached.
export const useSendPushNotification = () => {
  const mutation = useMutation({
    mutationKey: ["send-push-notifcation"],
    mutationFn: async (message: string) => {
      const response = await pushWalletUser.channel.send(["*"], {
        notification: {
          title: "You awesome notification",
          body: message,
        },
      });

      return response;
    },
  });

  return mutation;
};
