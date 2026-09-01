import { z } from "zod";

export const createAtendimentoSchema = z.object({
  transcricao: z.string("transcricao deve ser um texto").optional().default(""),
  duracaoSegundos: z.number("duracaoSegundos deve ser um número").optional().default(0),
  prioridade: z.enum(["baixa", "media", "alta"], "prioridade deve ser uma das seguintes opções: baixa, media, alta").optional().default("media"),
});
