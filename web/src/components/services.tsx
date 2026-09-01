import { Service, ServiceStatus } from "../types/service"
import { ServiceCard } from "./service-card";
import { useUpdateServiceStatus } from "../hooks/useUpdateServiceStatus";

interface ServicesProps {
    services: Service[]
}

export function Services({ services }: ServicesProps) {
    const { mutate: updateServiceStatus } = useUpdateServiceStatus();

    const novoServices = services.filter((service) => service.status === "novo");
    const pendenteServices = services.filter((service) => service.status === "pendente");
    const resolvidoServices = services.filter((service) => service.status === "resolvido");

    const handleChangeStatus = (serviceId: string, status: ServiceStatus) => {
        updateServiceStatus({ serviceId, status });
    }

    return (
        <section className="grid grid-cols-3 px-8 gap-4 pb-8">
            <div className="flex flex-col items-center h-120 overflow-y-auto bg-white rounded-xl p-4 gap-4">
                <span className="text-lg font-bold bg-gray-200 px-2 py-1 rounded-md">Status: Novo</span>
                {novoServices.map((service) => (
                    <ServiceCard key={service.id} service={service} onChangeStatus={handleChangeStatus} />
                ))}
            </div>
            <div className="flex flex-col items-center h-120 overflow-y-auto bg-white rounded-xl p-4 gap-4">
                <span className="text-lg font-bold bg-gray-200 px-2 py-1 rounded-md">Status: Pendente</span>
                {pendenteServices.map((service) => (
                    <ServiceCard key={service.id} service={service} onChangeStatus={handleChangeStatus} />
                ))}
            </div>
            <div className="flex flex-col items-center h-120 overflow-y-auto bg-white rounded-xl p-4 gap-4">
                <span className="text-lg font-bold bg-gray-200 px-2 py-1 rounded-md">Status: Resolvido</span>
                {resolvidoServices.map((service) => (
                    <ServiceCard key={service.id} service={service} onChangeStatus={handleChangeStatus} />
                ))}
            </div>
        </section>
    )
}
