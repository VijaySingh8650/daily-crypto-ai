
import { genreOptions } from '../constant/constant';
import { TypeOfBook } from '../types';
import InputField from './dynamic-input-field'
import SelectField from './dynamic-select-field';
import TextAreaField from './dynamic-text-area'
import Modal from './modal'

type TypeOfPageProps = {
    modalOpen: boolean;
    closeModal: () => void;
    editableId: string | null;
    errorOfForm: boolean;
    formData: TypeOfBook;
    handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleSubmit: () => void;
}

const AddEditModal: React.FC<TypeOfPageProps> = ({modalOpen, editableId, closeModal, errorOfForm, formData, handleChange, handleSubmit}) => {
  return (
   <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title={editableId ? "Update The Book" : "Add New Book"}
      >
        <div className=" flex flex-col justify-center items-center gap-4">
          <InputField
            inputType="text"
            label={true}
            labelText="Title of the book"
            required
            error={errorOfForm && !formData?.author}
            errorText="Please Enter the title of the book"
            handleChange={handleChange}
            value={formData?.title ? formData?.title : ""}
            inputName="title"
            placeholder={"Please enter the title of the book"}
          />

          <InputField
            inputType="text"
            label={true}
            labelText="Author of the book"
            required
            error={errorOfForm && !formData?.author}
            errorText="Please Enter the author of the book"
            handleChange={handleChange}
            value={formData?.author ? formData?.author : ""}
            inputName="author"
            placeholder={"Please enter the author of the book"}
          />

         <SelectField
             label={true}
             labelText = {"Genre"}
            name="genre"
            inputName = "genre"
            options={genreOptions}
            errorText="Please select the genre of the book"
            required
            error={errorOfForm &&!formData?.genre}
            value={formData?.genre? formData?.genre : ""}
            onChange={handleChange}
            placeholder={"Select a genre"}
         />
        
          <TextAreaField
            label={true}
            labelText="Description"
            required
            error={errorOfForm && !formData?.description}
            errorText="Please Enter the description of the book"
            handleChange={handleChange}
            value={formData?.description ? formData?.description : ""}
            inputName="description"
            placeholder={"Please enter the description of the book"}
          />
          <button onClick={handleSubmit} className="bg-purple-500 text-white py-2 px-4 rounded-lg mt-2">{editableId ? "Update Book" :  "Add Book"}</button>
        </div>
      </Modal>
  )
}

export default AddEditModal
