import { useState } from "react";
import Entrada from "./Entrada";
import Cliente from "@/core/Cliente";
import Botao from "./Botao";

interface FormularioProps {
    cliente: Cliente
    cancelado?: () => void
    clienteMudou?: (cliente: Cliente) => void
}

export default function Formulario(props: FormularioProps){

    // verifica se o cliente tem id
    const id = props.cliente?.id

    const [nome, setNome] = useState(props.cliente.nome ?? '')
    const [idade, setIdade] = useState(props.cliente.idade ?? '')

    return(
        <div>
            {id ? (
                <Entrada 
                    texto="Código" 
                    valor={id}
                    somenteLeitura 
                    className="mb-5"  
                />
            ): false}
            <Entrada
                texto="Nome" 
                valor={nome}
                valorMudou={setNome}
                className="mb-5"
            />
            <Entrada
                 texto="Idade" 
                 tipo="number" 
                 valor={idade}
                 valorMudou={setIdade}
            />
            <div className="flex justify-end mt-7">
                <Botao cor="blue" className="mr-2" onClick={() => props.clienteMudou?.(new Cliente(nome, idade, id))}>
                    {id ? 'Alterar' : 'Salvar'}
                </Botao>
                <Botao onClick={props.cancelado}>
                    Cancelar
                </Botao>
            </div>
        </div>
    )
}