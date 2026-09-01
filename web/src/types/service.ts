export type ServiceStatus = "novo" | "pendente" | "resolvido";
export type ServicePriority = "baixa" | "media" | "alta";

export interface Service {
  id: string
  transcricao: string
  duracaoSegundos: number
  prioridade: ServicePriority
  criadoEm: Date
  tenantId: string
  status: ServiceStatus
}
