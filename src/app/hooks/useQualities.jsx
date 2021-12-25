import React, { createContext, useContext, useEffect, useState } from "react";
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
    } catch (error) {
      const { message } = error.response.data;
      setError(message);
    }
  };

  const addQuality = async (data) => {
    try {
      const { content } = await qualityService.create(data);
      setQualities((prev) => [...prev, content]);
      return content;
    } catch (e) {
      const { message } = error.response.data;
      setError(message);
    }
  };

  const deleteQuality = async (id) => {
    try {
      const { content } = await qualityService.delete(id);
      setQualities((prev) => prev.filter((item) => item._id !== content._id));
      return content;
    } catch (e) {
      const { message } = error.response.data;
      setError(message);
    }
  };
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
