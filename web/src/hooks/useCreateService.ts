import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const createAtendimento = httpsCallable<{ transcricao: string, duracaoSegundos: number, prioridade: string }, { id: string }>(functions, "createAtendimento")

export function useCreateService() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createAtendimento,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["atendimentos"] });
            queryClient.invalidateQueries({ queryKey: ["services-summary"] });
        },
    })
}
