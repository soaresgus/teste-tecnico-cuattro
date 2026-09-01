import { z } from "zod";

export const createServiceSchema = z.object({
  transcricao: z.string("Transcrição deve ser um texto").optional().default(""),
  duracaoSegundos: z.string().optional().default("0").transform((value) => Number(value)),
  prioridade: z.enum(["baixa", "media", "alta"], "Prioridade deve ser uma das seguintes opções: baixa, media, alta").optional().default("media"),
});

export type CreateServiceData = z.infer<typeof createServiceSchema>;
