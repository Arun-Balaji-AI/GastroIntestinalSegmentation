import { useRef, useState } from "react";
import { GrCloudUpload } from "react-icons/gr";
import axios from "axios";
function UploadScan() {
  const [image, setImage] = useState(null);
  const [filename, setFilename] = useState("Not Selected File");
  const [result, setResult] = useState();
  const fileInput = useRef();

  const handleClick = () => {
    document.querySelector(".image-upload").click();
  };

  const handleChange = () => {
    setImage(fileInput.current.files[0]);
    setFilename(fileInput.current.files[0].name);
  };

  const uploadImage = async () => {
    console.log("Uploading image");
    const formData = {
      file: image,
      filename: filename,
    };

    try {
      const res = await axios.post("http://localhost:5000/segment", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const segmented_image = res.data.result;
      setResult(`data:image/*;base64,${segmented_image}`);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <main>
      <form onClick={handleClick}>
        <input
          type="file"
          accept="image/*"
          className="image-upload"
          ref={fileInput}
          hidden
          onChange={handleChange}
        />
        <>
          <GrCloudUpload size={"5rem"} />
          <p>Browse Images to Upload</p>
        </>
      </form>
      {filename !== "Not Selected File" ? (
        <h4 className="uploaded-proof">{filename}</h4>
      ) : (
        <h4 className="uploaded-proof">Not Selected File</h4>
      )}

      <div className="image-button">
        <button type="submit" onClick={uploadImage}>
          Upload Scan
        </button>
      </div>
      {result && (
        <div className="result-image">
          <img src={result} alt="Result" className="result" />
        </div>
      )}
    </main>
  );
}

export default UploadScan;
