import { useState } from "react";
import { TenantId } from "./types/tenantId";
import { Header } from "./components/header";
import { TenantManager } from "./components/tenant-manager";
import { Services } from "./components/services";
import { useServices } from "./hooks/useServices";
import { NewServiceDialog } from "./components/new-service-dialog";
import { Footer } from "./components/footer";

export default function App() {
  const [tenantId, setTenantId] = useState<TenantId>("tenant-alfa");
  const { data: services, error } = useServices(tenantId);

  if (error) {
    return (
      <main className="bg-gray-200 min-h-screen">
        <Header />

        <div className="text-center text-red-500">
          <h1 className="text-2xl font-bold">Erro ao carregar os atendimentos</h1>
          <p className="text-sm text-gray-500">{error.message}</p>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-gray-200 min-h-screen">
      <Header />

      <TenantManager tenantId={tenantId} setTenantId={setTenantId} />

      <div className="flex px-8 py-4">
        <NewServiceDialog tenantId={tenantId} />
      </div>

      <Services services={services || []} tenantId={tenantId} />

      <Footer />
    </main>
  );
}
