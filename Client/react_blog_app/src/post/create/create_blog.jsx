import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "../../components/editor";
import Title from "./title";
import Alert from "../../utils/alert";

const Create = () => {
  const [editorValue, setEditorValue] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [title, setTitle] = useState("");
  const [isPublish, setIsPublish] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", editorValue);
    formData.append("coverImage", coverImage);

    try {
      const response = await fetch(
        "https://coconut-leather-tomato.glitch.me/blogs",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setIsPublish(true);
        console.log("Response data:", data);

        setTimeout(() => {
          navigate(data.redirectUrl);
        }, 1500);
      } else {
        console.error("Failed to create blog post:", await response.text());
      }
    } catch (error) {
      console.error("An error occurred while creating the blog post:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-3 my-28 pb-5">
      <h1 className="text-2xl font-sans font-bold text-[var(--primary-color)] my-2">
        Create Blog
      </h1>
      {isPublish && <Alert />}
      <div className="w-full flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full lg:w-1/2 flex flex-col gap-4 shadow-2xl p-3 rounded-lg"
          encType="multipart/form-data"
        >
          <Title title={title} setTitle={setTitle} />
          <Editor
            value={editorValue}
            setValue={setEditorValue}
            readOnly={false}
          />
          <div>
            <label
              htmlFor="coverImage"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Cover Photo
            </label>
            <input
              id="coverImage"
              type="file"
              onChange={(e) => setCoverImage(e.target.files[0])}
              accept="image/*"
              className="block w-full text-sm file:mr-4 file:rounded-md file:cursor-pointer cursor-pointer file:border-0 file:bg-[var(--primary-color)] file:py-2.5 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-primary-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
            />
          </div>
          <button
            type="submit"
            className="flex items-center text-center justify-center w-fit p-1 self-end px-5 rounded-full border-2 font-bold text-lg bg-[var(--primary-color)] text-white transition-colors duration-300"
          >
            Publish
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
