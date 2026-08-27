import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const createAtendimento = httpsCallable<{ tenantId: string, transcricao: string, duracaoSegundos: number, prioridade: string }, { id: string }>(functions, "createAtendimento")

export function useCreateService(tenantId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createAtendimento,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["atendimentos", tenantId] });
        },
    })
}
