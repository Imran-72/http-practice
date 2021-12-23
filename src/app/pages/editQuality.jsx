import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditForm from "../components/ui/editForm";
import httpServise from "../services/httpService";
import config from "../config.json";

const EditQualityPage = () => {
  const [quality, setQuality] = useState(null);
  const id = useParams().id;
  const qualityEndPoint = `quality/${id}`;
  const handeleSubmit = async (data) => {
    try {
      await httpServise
        .put(qualityEndPoint, data)
        .then((res) => console.log(res.data.content));
    } catch (error) {
      console.log("Expected error");
    }
  };

  useEffect(async () => {
    const { data } = await httpServise.get(qualityEndPoint);
    setQuality(data.content);
  }, []);

  return (
    <>
      <h1>Edit Quality Page</h1>
      {quality !== null ? (
        <EditForm data={quality} onSubmit={handeleSubmit} />
      ) : (
        "Loading..."
      )}
    </>
  );
};

export default EditQualityPage;
