import { describe, it, expect, afterEach, afterAll } from "@jest/globals";
import * as admin from "firebase-admin";
import { createAtendimento, updateAtendimentoStatus } from "../src/index";

// Garante um único app inicializado apontando para o emulador
// (FIRESTORE_EMULATOR_HOST é definido no script "npm test").
if (admin.apps.length === 0) {
  admin.initializeApp({ projectId: "atendeai-teste-local" });
}

const db = admin.firestore();

/* describe("modelo de dados básico", () => {
  afterAll(async () => {
    await admin.app().delete();
  });

  it("permite gravar e ler um atendimento de um tenant", async () => {
    const ref = await db.collection("atendimentos").add({
      tenantId: "tenant-teste",
      transcricao: "teste automatizado",
      status: "novo",
    });

    const snapshot = await ref.get();
    expect(snapshot.exists).toBe(true);
    expect(snapshot.data()?.tenantId).toBe("tenant-teste");
  });

  // Este arquivo é só um exemplo de que o ambiente de testes está funcionando.
  // Testes adicionais (inclusive para o que você implementar) devem ser
  // adicionados por você, conforme pedido no enunciado do seu nível de teste.
}); */

describe("criar atendimento", () => {
  it("não permite criar atendimento quando o campo prioridade não é uma das opções válidas", async () => {
    const before = await db.collection("atendimentos").get();

    await expect(
      createAtendimento.run({
        data: {
          tenantId: "tenant-teste",
          transcricao: "teste automatizado",
          duracaoSegundos: 10,
          prioridade: "urgente",
        },
      } as Parameters<typeof createAtendimento.run>[0])
    ).rejects.toMatchObject({
      code: "invalid-argument",
      message: expect.stringMatching(/prioridade/i)
    })

    const after = await db.collection("atendimentos").get();
    expect(after.size).toBe(before.size);
  })
})

describe("atualizar status de atendimento", () => {
  let ref: FirebaseFirestore.DocumentReference;

  afterEach(async () => {
    if(ref) await ref.delete();
  });

  it("não permite atualizar status de atendimento quando o tenantId não corresponde ao tenantId do atendimento", async () => {
    ref = await db.collection("atendimentos").add({
      tenantId: "tenant-teste",
      transcricao: "teste automatizado",
      status: "novo",
    });

    await expect(
      updateAtendimentoStatus.run({
        data: {
          atendimentoId: ref.id,
          tenantId: "tenant-teste-diferente",
          novoStatus: "resolvido",
        },
      } as Parameters<typeof updateAtendimentoStatus.run>[0])
    ).rejects.toMatchObject({
      code: "permission-denied",
      message: expect.stringMatching(/tenantId não corresponde ao tenantId do atendimento/i)
    })

    const after = await ref.get();
    expect(after.data()?.status).toBe("novo");
  })
})

afterAll(async () => {
  await admin.app().delete();
});
