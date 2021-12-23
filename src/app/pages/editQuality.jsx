import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditForm from "../components/ui/editForm";
import { toast } from "react-toastify";
import qualityService from "../services/qualityService";

const EditQualityPage = () => {
  const [quality, setQuality] = useState(null);
  const id = useParams().id;

  const updateQuality = async (content) => {
    try {
      const data = await qualityService.update(id, content);
      return data.content;
    } catch (error) {
      const { message, code } = error.response.data;
      toast.error(message);
    }
  };

  const getQuality = async () => {
    try {
      const data = await qualityService.get(id);
      return data;
    } catch (error) {
      const { message, code } = error.response.data;
      toast.error(message);
    }
  };

  const handeleSubmit = (data) => {
    updateQuality(data);
  };

  useEffect(() => {
    getQuality(id).then((data) => setQuality(data.content));
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
