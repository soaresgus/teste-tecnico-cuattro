import { useQuery } from "@tanstack/react-query";
import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase";
import { Service } from "../types/service";

const listAtendimentos = httpsCallable<{ tenantId: string }, { atendimentos: Service[] }>(
  functions,
  "listAtendimentos"
);

export function useServices(tenantId: string) {
  return useQuery({
    queryKey: ["atendimentos", tenantId],
    queryFn: async () => {
      const { data } = await listAtendimentos({ tenantId });
      return data.atendimentos;
    },
  });
}
