import { useState } from "react";
import { TenantId } from "./types/tenantId";
import { Header } from "./components/header";
import { TenantManager } from "./components/tenant-manager";
import { Services } from "./components/services";
import { useServices } from "./hooks/useServices";

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

      <Services services={services || []} tenantId={tenantId} />
    </main>
  );
}
