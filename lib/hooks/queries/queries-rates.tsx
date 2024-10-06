import { API_RATES } from "@/api/api-calls/api-rates";
import { rateQKey } from "@/lib/stores/query-keys";
import { useQuery } from "@tanstack/react-query";

export const useGetAllRates = () =>
  useQuery({
    queryKey: rateQKey.rates(),
    queryFn: () => API_RATES.getAll(),
  });
