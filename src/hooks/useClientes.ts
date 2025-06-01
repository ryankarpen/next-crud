import Cliente from "@/core/Cliente"
import { useEffect, useState } from "react"
import ClienteRepositorio from "@/core/ClienteRepositorio"
import ColecaoCliente from "@/backend/db/ColecaoCliente"
import useTabelaouForm from "./useTabelaouForm"

export default function useClientes(){
    const repo: ClienteRepositorio = new ColecaoCliente()

    const { tabelaVisivel, exibirTabela, exibirFormulario} = useTabelaouForm()
    
      const [cliente, setCliente] = useState<Cliente>(Cliente.vazio())
      const [clientes, setClientes] = useState<Cliente[]>([])
    
    
      useEffect(() => {
        obterTodos()
      }, [])
    
    
      function selecionarCliente(cliente: Cliente){
        setCliente(cliente)
        exibirFormulario()
      } 
    
      async function excluirCliente(cliente: Cliente){
        await repo.excluir(cliente)
        obterTodos()
      } 
    
      function obterTodos(){
        repo.obterTodos().then(clientes => {
          setClientes(clientes)
          exibirTabela()
        })
      }
    
      function novoCliente(){
        setCliente(Cliente.vazio())
        exibirFormulario()
      }
    
      async function salvarCliente(cliente: Cliente){
        await repo.salvar(cliente)
        obterTodos()
      }

      return {
        tabelaVisivel,
        cliente,
        clientes,
        novoCliente, 
        salvarCliente,
        excluirCliente,
        selecionarCliente,
        exibirTabela,
      }
    
}