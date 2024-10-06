import type { TTodo_Server } from "@/lib/schemas/schema-todo";
import { blockchainClient } from "../clients/blockchain-client";

const BASE_URL = "todos";

export const API_RATES = {
  // ------ QUERIES ------ //
  getAll: (): Promise<TTodo_Server[]> =>
    blockchainClient.get(BASE_URL).then((res) => res.data),
};
