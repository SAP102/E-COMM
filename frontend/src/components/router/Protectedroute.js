import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Protected = (props) => {
  const { isAuthenticated } = useSelector((state) => state.user)
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  });
  const navigate = useNavigate();

  const { Component } = props;
  return (
    <div>
      <Component />
    </div>
  );
};

export default Protected;