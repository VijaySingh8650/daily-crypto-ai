import Cookies from "js-cookie";

export const setUserCookies = (token: string, name: string, email: string) => {

    Cookies.set("authToken", token, { expires: 1, secure: true, sameSite: "Strict" });
    Cookies.set("userName", name, { expires: 1, secure: true, sameSite: "Strict" });
    Cookies.set("userEmail", email, { expires: 1, secure: true, sameSite: "Strict" });
 
};

export const getUserFromCookies = () => {
    return {
      token: Cookies.get("authToken"),
      name: Cookies.get("userName"),
      email: Cookies.get("userEmail"),
    };
  };

  export const deleteUserCookies = () => {
    Cookies.remove("authToken");
    Cookies.remove("userName");
    Cookies.remove("userEmail");
};