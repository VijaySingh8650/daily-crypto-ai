
type typeOfPageProps = {
    error: boolean;
    value: string | number;
    handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    label: boolean;
    labelText?: string;
    required?: boolean;
    inputName: string;
    placeholder?: string;
    errorText?: string;
  }
  
  
  
    const TextAreaField: React.FC<typeOfPageProps> = ({error, value, handleChange, label, labelText, required, inputName, placeholder, errorText}) => {
  
  
    return (
      <div className="flex flex-col">
        {label && <label
          className={`${
           (error) ? "text-red-500 " : "text-black"
          }  text-[14px] font-medium text-left`}
          htmlFor={inputName}
        >
          {labelText} {required && <span className="text-red-500">*</span>}
        </label>}
  
        <div className="mt-1 w-[300px]  md:w-[400px] relative">
         
        <textarea
          id={inputName}
          name={inputName}
          value={value}
          onChange={handleChange}
          className={`border outline-none ${
           (error) ? "border-red-500" : "border-gray-300"
          } rounded-md text-sm px-4 ${inputName==="contactNumber" ? "pl-10" : "pl-4"} py-2 w-full h-full  font-normal`}
          placeholder={placeholder}
        />
  
        </div>
  
        {error && <div className="text-red-500 text-[12px] h-[10px] text-left">{errorText}</div>}
  
        
  
      </div>
    );
  };
  
  export default TextAreaField;
  