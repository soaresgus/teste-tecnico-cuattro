import { useMutation, useQueryClient } from "@tanstack/react-query";
import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase";
import { ServiceStatus } from "../types/service";

const updateAtendimentoStatus = httpsCallable<{ atendimentoId: string; tenantId: string; novoStatus: ServiceStatus }, { id: string, message: string}>(functions, "updateAtendimentoStatus");

export function useUpdateServiceStatus(tenantId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: { serviceId: string; status: ServiceStatus }) =>
      updateAtendimentoStatus({
        atendimentoId: vars.serviceId,
        tenantId,
        novoStatus: vars.status,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["atendimentos", tenantId] });
    },
  });
}
