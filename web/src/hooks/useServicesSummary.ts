import { httpsCallable } from "firebase/functions"
import { functions } from "../firebase"
import { useQuery } from "@tanstack/react-query"

interface ServicesSummaryResponse {
    totalAtendimentos: number
    totalAtendimentosNovo: number
    totalAtendimentosPendente: number
    totalAtendimentosResolvido: number
}

const resumoPorTenant = httpsCallable<undefined, { resumo: ServicesSummaryResponse }>(functions, "resumoPorTenant")

export function useServicesSummary() {
    return useQuery({
        queryKey: ["services-summary"],
        queryFn: async () => {
            const { data } = await resumoPorTenant();
            return data.resumo;
        },
    })
}
