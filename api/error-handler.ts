import { toast } from "@/components/ui/use-toast";
import { Storages } from "@/lib/storages";
import type { AxiosError, AxiosResponse } from "axios";

const StorageKeys = {
  // USER_TOKEN: "bt_token",
  USER_TOKEN: "token",
};

export const handleHttpError = (error: AxiosError<AxiosResponse<unknown>>) => {
  if (!error.response) {
    toast({
      id: "no-response",
      title: "Impossible de contacter le serveur distant",
      variant: "error",
    });
  } else {
    switch (error.response.status) {
      case 401:
        toast({
          id: "expired-session",
          title: "La session a expirée, veuillez vous reconnecter",
          variant: "error",
        });

        Storages.removeItem(StorageKeys.USER_TOKEN, { type: "session" });
        Storages.removeItem(StorageKeys.USER_TOKEN, { type: "local" });
        // useUserStore.setState({ isTokenExpired: true });
        break;
      case 403:
        toast({
          id: "unauthorized",
          title: "Vous n'êtes pas autorisé à accéder à cette ressource",
          variant: "error",
        });
        break;
      default:
        toast({
          id: "unspecified",
          title:
            "Une erreur est survenue. Contactez votre administrateur si le problème persiste",
          variant: "error",
        });
        break;
    }
  }
};
