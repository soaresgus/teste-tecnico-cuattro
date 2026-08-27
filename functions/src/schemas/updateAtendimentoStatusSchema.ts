import { z } from "zod";

export const updateAtendimentoStatusSchema = z.object({
    atendimentoId: z.string("atendimentoId é obrigatório").min(1, "atendimentoId deve ser uma string não vazia"),
    tenantId: z.string("tenantId é obrigatório").min(1, "tenantId deve ser uma string não vazia"),
    novoStatus: z.enum(["novo", "pendente", "resolvido"], "novoStatus deve ser uma das seguintes opções: novo, pendente, resolvido")
})
