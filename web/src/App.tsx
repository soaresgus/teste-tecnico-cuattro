import { useEffect, useState } from "react";
import { Header } from "./components/header";
import { Services } from "./components/services";
import { useServices } from "./hooks/useServices";
import { NewServiceDialog } from "./components/new-service-dialog";
import { Footer } from "./components/footer";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebase";
import { LoginForm } from "./components/login-form";

export default function App() {
  const [user, setUser] = useState<User | null>(null)
  const [ready, setReady] = useState(false)
  const { data: services, error, refetch } = useServices();

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      refetch();
      setReady(true);
    })
  }, [])

  if (!ready) {
    return (
      <main className="bg-gray-200 min-h-screen">
        <Header username={null} isAuthenticated={false} />

        <div className="text-center">
          <h1 className="text-2xl font-bold">Carregando...</h1>
        </div>
      </main>
    )
  }

  if (!user) {
    return (
      <main className="bg-gray-200 min-h-screen flex flex-col">
        <Header username={null} isAuthenticated={false} />
        <div className="flex flex-1 justify-center items-center h-full">
          <LoginForm />
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="bg-gray-200 min-h-screen">
        <Header username={null} isAuthenticated={false} />

        <div className="text-center text-red-500">
          <h1 className="text-2xl font-bold">Erro ao carregar os atendimentos</h1>
          <p className="text-sm text-gray-500">{error.message}</p>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-gray-200 min-h-screen">
      <Header username={user.displayName} isAuthenticated />

      <div className="flex px-8 py-4">
        <NewServiceDialog />
      </div>

      <Services services={services || []} />

      <Footer />
    </main>
  );
}
