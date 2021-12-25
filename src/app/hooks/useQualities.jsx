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
        errorCatcher(e);
      }
    };
    getQualities();
  }, []);

  const getQuality = (id) => {
    return qualities && qualities.find((q) => q._id === id);
  };

  const updateQuality = async ({ _id: id, ...data }) => {
    try {
      const { content } = await qualityService.update(id, data);
      setQualities((prev) =>
        prev.map((item) => {
          if (item._id === content._id) {
            return content;
          }
          return item;
        })
      );
      return content;
    } catch (e) {
      errorCatcher(e);
    }
  };

  const addQuality = async (data) => {
    try {
      const { content } = await qualityService.create(data);
      setQualities((prev) => [...prev, content]);
      return content;
    } catch (e) {
      errorCatcher(e);
    }
  };

  const deleteQuality = async (id) => {
    try {
      const { content } = await qualityService.delete(id);
      setQualities((prev) => prev.filter((item) => item._id !== content._id));
      return content;
    } catch (e) {
      errorCatcher(e);
    }
  };

  function errorCatcher(e) {
    const { message } = e.response.data;
    setError(message);
  }

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  return (
    <QualityContext.Provider
      value={{
        qualities,
        getQuality,
        updateQuality,
        addQuality,
        deleteQuality,
      }}
    >
      {!isLoading ? children : <h1>Qualities Loading...</h1>}
    </QualityContext.Provider>
  );
};
