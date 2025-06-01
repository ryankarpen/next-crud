import ClienteRepositorio from "@/core/ClienteRepositorio";
import Cliente from "@/core/Cliente";
import { doc, setDoc, addDoc, getDoc, QueryDocumentSnapshot, SnapshotOptions, FirestoreDataConverter, getFirestore, collection, deleteDoc, getDocs } from "firebase/firestore";
import { app } from "@/backend/config"


const db = getFirestore(app)

export default class ColecaoCliente implements ClienteRepositorio{

    // converte nosso objeto para ficar compatível com o Firestore (db do firebase)
    #conversor: FirestoreDataConverter<Cliente> = {
        toFirestore(cliente: Cliente){
            return {
                nome: cliente.nome,
                idade: cliente.idade,
            }
        },
        fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Cliente{
            const dados = snapshot.data(options)
            return new Cliente(dados.nome, dados.idade, snapshot.id)
        }
    }

    async salvar(cliente: Cliente): Promise<Cliente> {
        if(cliente?.id){
            const docRef = doc(db, 'clientes', cliente.id).withConverter(this.#conversor)
            await setDoc(docRef, cliente)
            return cliente
        } else{
            const collRef = collection(db, 'clientes').withConverter(this.#conversor)
            const docRef = await addDoc(collRef, cliente)

            const docSnap = await getDoc(docRef)
            const dados = docSnap.data()

            // verificação se o doc.data não retorna undefined
            if(!dados) throw new Error("Erro ao obter dados")
            return dados
        }
    }

    async excluir(cliente: Cliente): Promise<void> {
        const docRef = doc(db, 'clientes', cliente.id)
        await deleteDoc(docRef)
    }

    async obterTodos(): Promise<Cliente[]> {
        const querySnapshot = await getDocs(this.#colecao())
        return querySnapshot.docs.map(doc => doc.data())
    }
    
    #colecao(){
        const dataBase = getFirestore(app)
        return collection(dataBase, 'clientes').withConverter(this.#conversor)
    }
}