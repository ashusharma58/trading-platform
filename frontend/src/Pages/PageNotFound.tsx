import React from "react";
import { useNavigate } from "react-router-dom";
const PageNotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="content-center">
      <h1 className="">404</h1>
      <p className="">
        Oops! Page not found
      </p>
      <p className="">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <button
        onClick={() => navigate("/")}
        className=""
      >
        Go Home
      </button>
    </div>
  );
};
export default PageNotFound;
