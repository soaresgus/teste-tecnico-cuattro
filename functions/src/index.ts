import { onCall, HttpsError } from "firebase-functions/v2/https";
import { db } from "./admin";
import { createAtendimentoSchema } from "./schemas/createAtendimentoSchema";
import { updateAtendimentoStatusSchema } from "./schemas/updateAtendimentoStatusSchema";

/**
 * Function de exemplo — só para você confirmar que o ambiente está rodando.
 */
export const ping = onCall(() => {
  return { ok: true, message: "pong" };
});

/**
 * Lista os atendimentos de UM tenant.
 *
 * ATENÇÃO: esta função hoje recebe o tenantId diretamente no payload da
 * chamada, sem validar se quem está chamando de fato pertence a esse tenant.
 * Isso é proposital — faz parte do que os testes técnicos pedem para revisar,
 * dependendo do nível do teste que você recebeu.
 */
export const listAtendimentos = onCall(async (request) => {
  if (!request.auth || !request.auth.token.tenantId) {
    throw new HttpsError("unauthenticated", "Usuário não autenticado ou token inválido");
  }

  const { tenantId } = request.auth.token;

  const snapshot = await db
    .collection("atendimentos")
    .where("tenantId", "==", tenantId)
    .get();

  return {
    atendimentos: snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
  };
});

/**
 * Cria um novo registro de atendimento para um tenant.
 * Implementação mínima — sem validação de schema.
 */
export const createAtendimento = onCall(async (request) => {
  if (!request.auth || !request.auth.token.tenantId) {
    throw new HttpsError("unauthenticated", "Usuário não autenticado ou token inválido");
  }

  const parsed = createAtendimentoSchema.safeParse(request.data ?? {})

  if (!parsed.success) {
    throw new HttpsError("invalid-argument", parsed.error.issues[0]?.message ?? "Erro ao validar os dados do atendimento");
  }

  const { tenantId } = request.auth.token;
  const { transcricao, duracaoSegundos, prioridade } = parsed.data;

  const doc = await db.collection("atendimentos").add({
    tenantId,
    transcricao,
    duracaoSegundos,
    status: "novo",
    prioridade,
    criadoEm: new Date().toISOString(),
  });

  return { id: doc.id };
});

export const updateAtendimentoStatus = onCall(async (request) => {
  if (!request.auth || !request.auth.token.tenantId) {
    throw new HttpsError("unauthenticated", "Usuário não autenticado ou token inválido");
  }

  const parsed = updateAtendimentoStatusSchema.safeParse(request.data ?? {})

  if (!parsed.success) {
    throw new HttpsError("invalid-argument", parsed.error.issues[0]?.message ?? "Erro ao validar os dados do atendimento");
  }

  const { atendimentoId, novoStatus } = parsed.data;
  const { tenantId } = request.auth.token;

  const doc = await db.collection("atendimentos").doc(atendimentoId).get()

  if (!doc.exists) {
    throw new HttpsError("not-found", "Atendimento não encontrado");
  }

  const atendimento = doc.data();

  if (atendimento?.tenantId !== tenantId) {
    throw new HttpsError("permission-denied", "Você não tem permissão para atualizar este atendimento, pois o tenantId autenticado não corresponde ao tenantId do atendimento");
  }

  await doc.ref.update({ status: novoStatus });

  return { id: doc.id, message: "Status do atendimento atualizado com sucesso" };
})

export const resumoPorTenant = onCall(async (request) => {
  if (!request.auth || !request.auth.token.tenantId) {
    throw new HttpsError("unauthenticated", "Usuário não autenticado ou token inválido");
  }

  const { tenantId } = request.auth.token;

  const snapshot = await db.collection("atendimentos").where("tenantId", "==", tenantId).get();

  const resumo = {
    totalAtendimentos: snapshot.docs.length,
    totalAtendimentosNovo: snapshot.docs.filter((doc) => doc.data().status === "novo").length,
    totalAtendimentosPendente: snapshot.docs.filter((doc) => doc.data().status === "pendente").length,
    totalAtendimentosResolvido: snapshot.docs.filter((doc) => doc.data().status === "resolvido").length,
  }

  return { resumo };
})
