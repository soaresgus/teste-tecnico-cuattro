import { Button } from "./ui/button";
import { Dialog, DialogDescription, DialogTitle, DialogContent, DialogHeader, DialogTrigger } from "./ui/dialog";
import { NewServiceForm } from "./new-service-form";
import { useState } from "react";

export function NewServiceDialog() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger render={<Button variant="outline" className="bg-green-600 text-white">Novo atendimento</Button>} />
            <DialogContent className="bg-white">
                <DialogHeader>
                    <DialogTitle>Novo atendimento</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Preencha os campos abaixo para criar um novo atendimento.
                </DialogDescription>
                <NewServiceForm onSuccess={() => setIsOpen(false)} />
            </DialogContent>
        </Dialog>
    )
}
