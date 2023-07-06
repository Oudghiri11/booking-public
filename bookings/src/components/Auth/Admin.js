import React from "react";
import AuthForm from "./AuthForm";
import { sendAdminAuthRequest } from "../../api-helpers.js/api-helpers";
import { useDispatch } from "react-redux";
import { adminActions } from "../../store";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate(); //pour rediriger l'admin aprés l'authentiffication
  const dispatch = useDispatch();// pour mettre à jour l'etat de la fonction
  const onResReceived = (data) => {
    console.log(data);
    dispatch(adminActions.login());
    localStorage.setItem("adminId", data.id);
    localStorage.setItem("token", data.token);
    navigate("/");
  };
  const getData = (data) => {
    console.log("Admin", data);
    sendAdminAuthRequest(data.inputs)
      .then(onResReceived)
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={true} />
    </div>
  );
};

export default Admin;
