import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateServiceData, createServiceSchema } from "../schemas/createServiceSchema"
import { Button } from "./ui/button"
import { useCreateService } from "../hooks/useCreateService"

interface NewServiceFormProps {
    onSuccess: () => void
}

export function NewServiceForm({ onSuccess }: NewServiceFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(createServiceSchema),
        defaultValues: {
            transcricao: "",
            duracaoSegundos: "0",
            prioridade: "media",
        },
    })

    const { mutateAsync: createService, isPending, error } = useCreateService();

    const onSubmit = async (data: CreateServiceData) => {
        await createService({
            duracaoSegundos: data.duracaoSegundos,
            prioridade: data.prioridade,
            transcricao: data.transcricao
        })
        onSuccess();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div>
                <label htmlFor="transcricao" className="block text-sm font-medium text-gray-700">Transcrição</label>
                <input type="text" id="transcricao" {...register("transcricao")} className="mt-1 px-2 py-1 block w-full bg-zinc-100 border-zinc-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                <p>{errors.transcricao?.message}</p>
            </div>
            <div>
                <label htmlFor="duracaoSegundos" className="block text-sm font-medium text-gray-700">Duração em segundos</label>
                <input type="number" id="duracaoSegundos" {...register("duracaoSegundos")} defaultValue={0} className="mt-1 px-2 py-1 block w-full bg-zinc-100 border-zinc-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                <p>{errors.duracaoSegundos?.message}</p>
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="prioridade" className="block text-sm font-medium text-gray-700">Prioridade</label>
                <select id="prioridade" {...register("prioridade")} className="mt-1 px-2 py-1 block w-full bg-zinc-100 border-zinc-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                    <option value="baixa">Baixa</option>
                    <option value="media">Média</option>
                    <option value="alta">Alta</option>
                </select>
                <p>{errors.prioridade?.message}</p>
            </div>
            <Button variant="outline" className="bg-green-600 text-white disabled:bg-green-300 disabled:text-white" type="submit" disabled={isPending}>Criar atendimento</Button>
            {isPending && <p>Criando atendimento...</p>}
            {error && <p>Erro ao criar atendimento: {error.message}</p>}
        </form>
    )
}
