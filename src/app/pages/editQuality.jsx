import React from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import QualityForm from "../components/ui/qualityForm";
import { useQualities } from "../hooks/useQualities";

const EditQualityPage = () => {
  const history = useHistory();
  const id = useParams().id;
  const { getQuality, updateQuality } = useQualities();
  const quality = getQuality(id);

  const handeleSubmit = (data) => {
    updateQuality(data).then((data) => {
      if (data) history.push("/");
    });
  };

  return (
    <>
      <h1>Edit Quality Page</h1>
      <QualityForm data={quality} onSubmit={handeleSubmit} />
    </>
  );
};

export default EditQualityPage;
