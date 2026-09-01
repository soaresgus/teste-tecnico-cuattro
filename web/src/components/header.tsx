import { signOut } from "firebase/auth"
import { Button } from "./ui/button"
import { auth } from "../firebase"

interface HeaderProps {
    username: string | null
    isAuthenticated: boolean
}

export function Header({ username, isAuthenticated }: HeaderProps) {
    const handleLogout = async () => {
        await signOut(auth)
    }

    return (
        <header className="flex flex-col justify-center items-center bg-white py-4">
            <h1 className="text-2xl font-bold">AtendeAI — Teste técnico — Cuattro</h1>
            <div className="flex flex-row gap-2 items-center">
                {isAuthenticated && <p className="text-lg text-gray-500">Olá, {username || "Desconhecido"}!</p>}
                {isAuthenticated && (
                    <Button variant="outline" className="bg-red-600 text-white" onClick={handleLogout}>Sair</Button>
                )}
            </div>
        </header>
    )
}
