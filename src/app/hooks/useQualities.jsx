import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import qualityService from "../services/qualityService";

const QualityContext = createContext();

export const useQualities = () => {
  return useContext(QualityContext);
};

export const QualityProvider = ({ children }) => {
  const [qualities, setQualities] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getQualities = async () => {
      try {
        const { content } = await qualityService.fetchAll();
        setQualities(content);
        setLoading(false);
      } catch (e) {
        const { message } = e.response.data;
        setError(message);
        toast.error(error);
      }
    };
    getQualities();
  }, []);
  return (
    <QualityContext.Provider value={{ qualities, isLoading }}>
      {!isLoading ? children : <h1>Qualities Loading...</h1>}
    </QualityContext.Provider>
  );
};
