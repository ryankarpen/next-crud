import Titulo from "./Titulo"

interface LayoutProps  {
    titulo: string
    children: React.ReactNode
}

export default function Layout(props: LayoutProps){
    return(
        <div className="
            flex-col w-screen sm:w-2/3
            bg-white text-gray-800 rounded-md
            text-md sm:text-lg
        ">
            <Titulo>{props.titulo}</Titulo>
            <div className="p-3 sm:p-6">
                {props.children}
            </div>
        </div>  
    )
}