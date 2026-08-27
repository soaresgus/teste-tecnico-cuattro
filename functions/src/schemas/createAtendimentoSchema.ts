import { z } from "zod";

export const createAtendimentoSchema = z.object({
  tenantId: z.string("tenantId é obrigatório").min(1, "tenantId deve ser uma string não vazia"),
  transcricao: z.string("transcricao deve ser um texto").optional().default(""),
  duracaoSegundos: z.number("duracaoSegundos deve ser um número").optional().default(0),
  prioridade: z.enum(["baixa", "media", "alta"], "prioridade deve ser uma das seguintes opções: baixa, media, alta").optional().default("media"),
});
