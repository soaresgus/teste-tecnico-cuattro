import { z } from "zod";

export const createServiceSchema = z.object({
  tenantId: z.string("tenantId é obrigatório").min(1, "tenantId deve ser uma string não vazia"),
  transcricao: z.string("Transcrição deve ser um texto").optional().default(""),
  duracaoSegundos: z.string().optional().default("0").transform((value) => Number(value)),
  prioridade: z.enum(["baixa", "media", "alta"], "Prioridade deve ser uma das seguintes opções: baixa, media, alta").optional().default("media"),
});

export type CreateServiceData = z.infer<typeof createServiceSchema>;
