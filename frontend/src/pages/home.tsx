import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { logOut } from "../store/auth-slice";
import { TypeOfBook } from "../types";
import Book from "../components/book";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_POINT } from "../config/config";
import { toast, Toaster } from "sonner";
import AddEditModal from "../components/add-edit-modal";

const HomePage = () => {
  const { name, token } = useSelector(
    (state: RootState) => state.authentication
  );
  const dispatch = useDispatch();
  const [books, setbooks] = useState<TypeOfBook[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<TypeOfBook>({
    author: "",
    title: "",
    genre: "",
    description: "",
  });
  const [errorOfForm, setErrorOfForm] = useState(false);
  const [editableId, setEditableId] = useState<string | null>(null);

  useEffect(() => {
    callTheAPI();
  }, []);

  const callTheAPI = async () => {
    try {
      const response = await axios.get(API_BASE_POINT + "/books", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setLoading(false);
        setError(null);
        setbooks(response?.data);

        return;
      }

      setError("Something went wrong!");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError("Something went wrong!");
      setLoading(false);
    }
  };

  const handleLogOut = () => {
    dispatch(logOut());
  };

  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Deleting...");

    try {
      const response = await axios.delete(
        API_BASE_POINT + `/books/book/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.status === 200) {
        toast.success("Book deleted successfully", { id: toastId });
        callTheAPI();
      } else {
        toast.error("Failed to delete book", { id: toastId });
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!", { id: toastId });
    }
  };

  const openModal = () => {
    setModalOpen(true);
    
  };

  const closeModal = () => {
    setModalOpen(false);
    setErrorOfForm(false);
    resetForm();
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement >
  ) => {
    const { value, name } = event.target;
   console.log(value, name, "sdlhkfhf");
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = (id: string) => {

    setEditableId(id);
    openModal();

    const bookDetail = books.find((book) => book._id === id);

    if(bookDetail){
        setFormData({...bookDetail});
    }


  }


  const formValidation = () => {
    const {author, description, genre, title} = formData;

    if(!author || !description || !genre || !title){
      setErrorOfForm(true);
      return false;
    }

    setErrorOfForm(false);
    return true;
  }

  const resetForm = () => {
    setFormData({
        author: "",
        title: "",
        genre: "",
        description: "",
    })

  }

  const handleSubmit = async() =>{

    if(formValidation()){
        const toastId = toast.loading("Loading...");

        try{
            const response = await axios({

                method: editableId ? "PATCH" : "POST",
                url:  API_BASE_POINT + `/books${editableId ? "/book/"+editableId : ""}`,
                data: {...formData},
                headers: {

                    Authorization: `Bearer ${token}`,

                }
            
            
            });

            if(response?.status === 200 || response?.status ===201){
                toast.success(response?.data?.message, { id: toastId });
                setEditableId(null);
                resetForm();
                closeModal();
                callTheAPI();
            }else{
                toast.error("Failed to update book", { id: toastId });
            }

        }catch(err){
            console.log(err);
            toast.error("Failed to update book", { id: toastId });
        }
    }

  }

  return (
    <div className="p-4">
      <Toaster position="top-center" duration={3000} />
      <div className="flex justify-end">
        <button className="text-purple-500" onClick={handleLogOut}>
          Logout
        </button>
      </div>

      <div className="flex flex-col justify-center items-center gap-2">
        <h1 className="text-3xl"> Welcome, {name}</h1>
        <p className="text-gray-500">Make your own collection of books</p>
        <button
          className="bg-purple-500 px-4 py-2 text-white rounded-lg shadow-lg"
          onClick={openModal}
        >
          Add New Book
        </button>
      </div>

      <h1 className="text-center mt-20 text-2xl text-purple-500">
        Your Collections
      </h1>

      <div className="mt-12">
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center">{error}</p>}

        {!loading && !error && books?.length === 0 ? (
          <p className="text-center">No books found</p>
        ) : (
          <div className="flex flex-wrap gap-4">
            {books?.map((el: TypeOfBook) => {
              return <Book key={el?._id} {...el} handleDelete={handleDelete}  handleEdit={handleEdit}/>;
            })}
          </div>
        )}
      </div>

      <AddEditModal
        modalOpen={modalOpen}
        editableId={editableId}
        closeModal={closeModal}
        errorOfForm={errorOfForm}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default HomePage;
