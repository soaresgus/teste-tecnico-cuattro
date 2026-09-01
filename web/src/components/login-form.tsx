import { useForm } from "react-hook-form";
import { LoginData, loginSchema } from "../schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@base-ui/react/input";
import { Button } from "./ui/button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";

export function LoginForm() {
    const [loginError, setLoginError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const handleTestLogin = async () => {
        setValue("email", "admin@tenant-alfa.com")
        setValue("password", "123456")
    }

    const onSubmit = async (data: LoginData) => {
        try {
            setIsLoading(true);
            await signInWithEmailAndPassword(auth, data.email, data.password)
        } catch (error) {
            setLoginError("Email ou senha inválidos");
        } finally {
            setIsLoading(false);
            setLoginError(null);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 bg-white p-8 rounded-lg shadow-md min-w-108">
            <h2 className="text-2xl font-bold">Login</h2>
            <p className="text-sm text-gray-500">Faça login para continuar</p>

            <Button type="button" className="w-full bg-sky-800 text-white rounded-md p-2" onClick={handleTestLogin}>Usar usuário de teste (Alfa)</Button>

            <fieldset className="flex flex-col gap-2">
                <label htmlFor="email">Email</label>
                <Input type="email" placeholder="usuario@email.com" {...register("email")} id="email" className="w-full bg-zinc-100 rounded-md p-2" />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </fieldset>
            <fieldset className="flex flex-col gap-2">
                <label htmlFor="password">Senha</label>
                <Input type="password" placeholder="Digite sua senha" {...register("password")} id="password" className="w-full bg-zinc-100 rounded-md p-2" />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </fieldset>
            <Button
                type="submit"
                className="w-full bg-zinc-800 text-white rounded-md p-2"
                disabled={isLoading}
            >
                {isLoading ? "Carregando..." : "Entrar"}
            </Button>
            {loginError && <p className="text-red-500">{loginError}</p>}
        </form>
    )
}
