import { initializeApp } from "firebase/app";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { getAuth, connectAuthEmulator } from "firebase/auth";

const app = initializeApp({
  projectId: "atendeai-teste-local",
  apiKey: "fake-api-key",
  authDomain: "atendeai-teste-local.firebaseapp.com",
});

export const functions = getFunctions(app);
export const auth = getAuth(app);

// Sempre conecta no emulador local — este projeto nunca fala com Firebase de produção.
connectFunctionsEmulator(functions, "localhost", 5001);
connectAuthEmulator(auth, "http://127.0.0.1:9099");
