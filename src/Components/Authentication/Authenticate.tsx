import React from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import App from "../../App";

const firebaseConfig = {
  apiKey: "AIzaSyCS_3LszqXvF2ozTgEqWep8rtyYA3D8c1Y",
  authDomain: "fin-serv-coveo.firebaseapp.com",
};

 const Authenticate : React.FC = () => {


  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const app = initializeApp(firebaseConfig);
  const auth = getAuth();

  const authenticateUser = () => {
    let email: string | null = "auth-admin@coveo.com";
    let password: string | null = prompt("Password");

    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setUserLoggedIn(true);
        })
        .catch((error) => {
          alert("Incorrect password");
          authenticateUser();
        });
    } else {
      alert("Incorrect password");
      authenticateUser();
    }
  };

  useEffect(() => {
    authenticateUser();
  }, []);


  return <>{userLoggedIn ? <App /> : null}</>;
};


export default Authenticate;