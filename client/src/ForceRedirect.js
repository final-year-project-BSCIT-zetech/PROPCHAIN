import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "./AppContext";

const ForceRedirect = () => {
  const { isConnected } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isConnected) navigate("/wallet-connect");
  }, [isConnected, navigate]);

  return null;
};

export default ForceRedirect;
