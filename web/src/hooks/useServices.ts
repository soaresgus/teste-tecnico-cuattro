import { useQuery } from "@tanstack/react-query";
import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase";
import { Service } from "../types/service";

const listAtendimentos = httpsCallable<undefined, { atendimentos: Service[] }>(
  functions,
  "listAtendimentos"
);

export function useServices() {
  return useQuery({
    queryKey: ["atendimentos"],
    queryFn: async () => {
      const { data } = await listAtendimentos();
      return data.atendimentos;
    },
  });
}
