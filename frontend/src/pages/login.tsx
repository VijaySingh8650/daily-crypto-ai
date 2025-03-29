import { useState } from "react";
import InputField from "../components/dynamic-input-field";
import { TypeOfFormData } from "../types";
import axios from "axios";
import { API_BASE_POINT } from "../config/config";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateAuth } from "../store/auth-slice";
import { setUserCookies } from "../utils/storage";

const LoginPage = () => {
  const [text, setText] = useState("Login");
  const [formData, setFormData] =  useState<TypeOfFormData>({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();



  console.log("12345Loginn")
  
  
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

        const toastId = toast.loading("loading...");

        try{

            const response = await axios.post(`${API_BASE_POINT}/auth/${text==="Signup"? "register" : "login"}`, {

                email: formData?.email,
                password: formData?.password,
                name: text==="Signup"? formData?.name : undefined,
    
            });

            if(response?.data?.status === 401 || response?.data?.status === 400){
                
                toast.error(response?.data?.message, {id: toastId})
           
            }else if(response?.data?.status===200 || response?.data?.status===201){
                
                toast.success(response?.data?.message, {id: toastId});

                dispatch(updateAuth({

                    token: response?.data?.token,
                    name: response?.data?.user?.name,
                    email: response?.data?.user?.email,
                    
                }));


                //storing in cookies
                setUserCookies(response?.data?.token, response?.data?.user?.name, response?.data?.user?.email);

                navigate("/");
            

            }else{
                toast.error("Something went wrong!", {id: toastId})
            }

        }
        catch(err){
            console.log(err);
            toast.error("Something went wrong!", {id: toastId})
        }

        
    }

  }

  const handleLoginSignup = () => {

    setText(text==="Login"? "Signup" : "Login");
    setFormData({...formData, name: ""});
    setError(false);

  }






  return (
    <>
      <Toaster position="top-center" duration={3000} />
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
            <button className="text-purple-500 underline" onClick={handleLoginSignup}>{text==="Login" ? "Signup" : "Login"}</button>  
        </p>
        

      </div>
    </div>
    </>
    
  );
};

export default LoginPage;
