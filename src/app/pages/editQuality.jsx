import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditForm from "../components/ui/editForm";
axios.interceptors.response.use(
  (res) => res,
  function (error) {
    const expextedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;
    if (!expextedErrors) {
      console.log("Unexpected error");
    }
    return Promise.reject(error);
  }
);

const EditQualityPage = () => {
  const [quality, setQuality] = useState(null);
  const id = useParams().id;
  const qualityEndPoint = `http://localhost:4000/api/v1/quality/${id}`;
  const handeleSubmit = async (data) => {
    try {
      await axios
        .put(qualityEndPoint, data)
        .then((res) => console.log(res.data.content));
    } catch (error) {
      console.log("Expected error");
    }
  };

  useEffect(async () => {
    const { data } = await axios.get(qualityEndPoint);
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
