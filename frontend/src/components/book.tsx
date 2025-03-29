import { TypeOfBook } from "../types"
 

type TypeOfPageProps = TypeOfBook & {
    handleDelete: (id:string) => void;
    handleEdit: (id: string) => void;
}


const Book: React.FC<TypeOfPageProps> = ({author, _id, description, title, genre,  handleDelete, handleEdit}) => {
  return (
    <div className="border-gray-300 border rounded-lg p-4 w-[300px] custom-shadow">

        <h2 className="font-bold text-center mb-2">{title}</h2>

        <p className="text-sm my-2">Genre - {genre}</p>
        
        <p>{description}</p>
        <p className="text-gray-500 text-right text-sm my-4">- {author}</p>

        <div className="flex justify-between ">

        <button className="text-white bg-purple-500 py-1 px-4 rounded-sm text-sm" onClick={()=>handleDelete(_id as string)}>Delete</button>
        <button className="text-white bg-purple-500 py-1 px-4 rounded-sm text-sm" onClick={()=> handleEdit(_id as string)}>Edit</button>

        </div>
        
       
      
    </div>
  )
}

export default Book
