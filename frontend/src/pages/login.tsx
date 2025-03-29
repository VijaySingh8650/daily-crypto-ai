import { useState } from "react";
import InputField from "../components/dynamic-input-field";
import { TypeOfFormData } from "../types";
import axios from "axios";
import { API_BASE_POINT } from "../config/config";

const LoginPage = () => {
  const [text, setText] = useState("Login");
  const [formData, setFormData] =  useState<TypeOfFormData>({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);



  
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const {value, name} = event.target;

    setFormData({...formData, [name]: value});

  }

  const formValidation = () => {
    const {email, password} = formData;

    if(!email || !password){
      setError(true);
      return false;
    }

    setError(false);
    return true;
  }

  const handleSubmit = async() => {

    if(formValidation()){
        const response = await axios.post(`${API_BASE_POINT}/auth/${text==="Signup"? "register" : "login"}`, {

            email: formData?.email,
            password: formData?.password,
            name: text==="Signup"? formData?.name : undefined,

        });

        console.log(response);
    }

  }






  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="border-gray-300 border-1 p-4 rounded-lg flex flex-col items-center gap-4">
        <h1 className="text-purple-500 text-2xl">{text}</h1>
        
        {text==="Signup" ? <InputField
          inputType="text"
          label={true}
          labelText="Name"
          required
          error={error && !formData?.name}
          errorText=""
          handleChange={handleChange}
          value={formData?.name ? formData?.name : ""}
          inputName="name"
          placeholder={"Please enter your name"}
        /> : null}

        <InputField
          inputType="text"
          label={true}
          labelText="Email"
          required
          error={error && !formData?.email}
          errorText="Please Enter your email address"
          handleChange={handleChange}
          value={formData?.email ? formData?.email : ""}
          inputName="email"
          placeholder={"Please enter your email"}
        />
        <InputField
         inputType="password"
          label={true}
          labelText="Password"
          required
          error={error && !formData?.password}
          errorText="Please enter your password"
          handleChange={handleChange}
          value={formData?.password ? formData?.password : ""}
          inputName="password"
          placeholder={"Please enter the password"}
        />

        <button onClick={handleSubmit} className="text-white px-4 py-2 shadow-lg rounded-lg bg-purple-500 w-full">Submit</button>

        <p>{`${text==="Login" ? "Don't " : "Already "} have an account ?`} {" "}
            <button className="text-purple-500 underline" onClick={() => text==="Signup" ?  setText("Login") :  setText("Signup")}>{text==="Login" ? "Signup" : "Login"}</button>  
        </p>
        

      </div>
    </div>
  );
};

export default LoginPage;
