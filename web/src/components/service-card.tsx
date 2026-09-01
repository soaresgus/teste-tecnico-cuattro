import { Service, ServiceStatus } from "../types/service"

interface ServiceCardProps {
    service: Service
    onChangeStatus: (serviceId: string, status: ServiceStatus, tenantId: string) => void
}

export function ServiceCard({ service, onChangeStatus }: ServiceCardProps) {
    const priorityColor = {
        "baixa": "bg-green-500",
        "media": "bg-yellow-500",
        "alta": "bg-red-500"
    }
    return (
        <div className="bg-zinc-200 rounded-xl p-4 shadow-md w-full gap-2 flex flex-col">
            <h3 className="text-lg font-bold">{service.transcricao}</h3>
            <p className="text-sm text-zinc-800">Duração: {service.duracaoSegundos} segundos</p>
            <p className={`text-sm text-white px-2 py-1 rounded-md ${priorityColor[service.prioridade]}`}>Prioridade: {service.prioridade || "N/A"}</p>
            <p className="text-sm text-zinc-800">Status: {service.status}</p>
            <span className="text-sm text-zinc-800">Alterar status:</span>
            <select className="border border-zinc-300 rounded-md p-1 bg-zinc-100" onChange={(e) => onChangeStatus(service.id, e.target.value as ServiceStatus, service.tenantId)}>
                <option value="novo" selected={service.status === "novo"}>Novo</option>
                <option value="pendente" selected={service.status === "pendente"}>Pendente</option>
                <option value="resolvido" selected={service.status === "resolvido"}>Resolvido</option>
            </select>
        </div>
    )
}
