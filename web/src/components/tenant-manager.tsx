import { TenantId } from "../types/tenantId";

interface TenantManagerProps {
    tenantId: TenantId;
    setTenantId: (tenantId: TenantId) => void;
}

export function TenantManager({ tenantId, setTenantId }: TenantManagerProps) {
    return (
        <section className="flex flex-col p-8">
            <div className="flex items-center gap-2 text-lg">
                <span>Tenant selecionado:</span>
                <span className="font-bold">{tenantId}</span>
            </div>
            <div className="flex items-center gap-2">
                <span>Selecione um novo tenant:</span>
                <select value={tenantId} onChange={(e) => setTenantId(e.target.value as TenantId)} className="border border-gray-300 bg-white rounded-md p-2">
                    <option value="tenant-alfa">Tenant Alfa</option>
                    <option value="tenant-beta">Tenant Beta</option>
                    <option value="tenant-gamma">Tenant Gamma</option>
                </select>
            </div>
        </section>
    )
}
