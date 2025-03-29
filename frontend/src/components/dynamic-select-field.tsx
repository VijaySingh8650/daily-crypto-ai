import { TypeOfGenreBooks } from "../types";

type SelectFieldProps = {
    labelText?: string;
  name: string;
  options: TypeOfGenreBooks[];
  required: boolean;
  placeholder?: string;
  inputName: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: boolean;
  label: boolean;
  errorText: string;
};

const SelectField: React.FC<SelectFieldProps> = ({
    labelText,
  name,
  options,
  required,
  placeholder = "Select an option",
  value,
  onChange,
  label,
  error,
  inputName,

  errorText
}) => {
  return (
    <div
     className="flex flex-col"
    >
      {label && <label
        className={`${
         (error) ? "text-red-500 " : "text-black"
        }  text-[14px] font-medium text-left`}
        htmlFor={inputName}
      >
        {labelText} {required && <span className="text-red-500">*</span>}
      </label>}

      <div className="mt-1 w-[300px]  md:w-[400px] h-[36px] relative">
     

      <select
        id={inputName}
        name={name}
        value={value}
        onChange={onChange}
        className={`border outline-none ${(error) ? "border-red-500" : "border-gray-300"}  w-full h-full px-4 pl-4 py-2 text-sm font-normal  rounded-md`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      </div>

      {error && <div className="text-red-500 text-[12px] h-[10px] text-left">{errorText}</div>}

      
    </div>
  );
};

export default SelectField;
