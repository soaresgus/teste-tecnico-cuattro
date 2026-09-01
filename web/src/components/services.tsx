import { Service, ServiceStatus } from "../types/service"
import { ServiceCard } from "./service-card";
import { useUpdateServiceStatus } from "../hooks/useUpdateServiceStatus";
import { useServicesSummary } from "../hooks/useServicesSummary";
import { Loader2Icon } from "lucide-react";

interface ServicesProps {
    services: Service[]
}

export function Services({ services }: ServicesProps) {
    const { mutate: updateServiceStatus } = useUpdateServiceStatus();
    const { data: servicesSummary, isLoading: isLoadingSummary } = useServicesSummary();

    const novoServices = services.filter((service) => service.status === "novo");
    const pendenteServices = services.filter((service) => service.status === "pendente");
    const resolvidoServices = services.filter((service) => service.status === "resolvido");

    const handleChangeStatus = (serviceId: string, status: ServiceStatus) => {
        updateServiceStatus({ serviceId, status });
    }

    return (
        <section className="grid grid-cols-3 px-8 gap-4 pb-8">
            <div className="flex flex-col items-center h-120 overflow-y-auto bg-white rounded-xl p-4 gap-4">
                <div className="flex flex-row gap-2 items-center">
                    <span className="text-lg font-bold bg-gray-200 px-2 py-1 rounded-md">Status: Novo</span>
                    <span className="text-lg bg-sky-500 text-white px-2 py-1 rounded-md">
                        {isLoadingSummary ? <Loader2Icon className="w-4 h-4 animate-spin" /> : (
                            servicesSummary?.totalAtendimentosNovo
                        )}
                    </span>
                </div>
                {novoServices.map((service) => (
                    <ServiceCard key={service.id} service={service} onChangeStatus={handleChangeStatus} />
                ))}
            </div>
            <div className="flex flex-col items-center h-120 overflow-y-auto bg-white rounded-xl p-4 gap-4">
                <div className="flex flex-row gap-2 items-center">
                    <span className="text-lg font-bold bg-gray-200 px-2 py-1 rounded-md">Status: Pendente</span>
                    <span className="text-lg bg-sky-500 text-white px-2 py-1 rounded-md">
                        {isLoadingSummary ? <Loader2Icon className="w-4 h-4 animate-spin" /> : (
                            servicesSummary?.totalAtendimentosPendente
                        )}
                    </span>
                </div>
                {pendenteServices.map((service) => (
                    <ServiceCard key={service.id} service={service} onChangeStatus={handleChangeStatus} />
                ))}
            </div>
            <div className="flex flex-col items-center h-120 overflow-y-auto bg-white rounded-xl p-4 gap-4">
                <div className="flex flex-row gap-2 items-center">
                    <span className="text-lg font-bold bg-gray-200 px-2 py-1 rounded-md">Status: Resolvido</span>
                    <span className="text-lg bg-sky-500 text-white px-2 py-1 rounded-md">
                        {isLoadingSummary ? <Loader2Icon className="w-4 h-4 animate-spin" /> : (
                            servicesSummary?.totalAtendimentosResolvido
                        )}
                    </span>
                </div>
                {resolvidoServices.map((service) => (
                    <ServiceCard key={service.id} service={service} onChangeStatus={handleChangeStatus} />
                ))}
            </div>
        </section>
    )
}
