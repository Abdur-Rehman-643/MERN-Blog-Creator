import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Editor from "./editor";
import { FormatDate } from "./format_Date";

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [img, setImg] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(
          `https://coconut-leather-tomato.glitch.me/blog/${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBlog(data);

        // Construct the full image URL
        const imageUrl = data.coverImage
          ? `https://coconut-leather-tomato.glitch.me/images/${data.coverImage}`
          : "";
        setImg(imageUrl);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setBlog(null); // Optional: Handle the error state
      }
    };

    fetchBlog();
  }, [id]);

  useEffect(() => {
    const container = document.querySelector(".ql-container");
    const editor = document.querySelector(".ql-editor");
    const snow = document.querySelector(".ql-container.ql-snow");

    if (container) {
      container.classList.add(
        "w-full",
        "h-auto",
        "min-w-full",
        "min-h-fit",
        "max-w-full",
        "max-h-fit"
      );
    }
    if (editor) {
      editor.classList.add(
        "w-full",
        "h-auto",
        "min-w-full",
        "min-h-fit",
        "max-w-full",
        "max-h-fit",
        "p-0"
      );
      if (blog && blog.content === "<p><br></p>") {
        editor.innerHTML = "No content to show";
      }
      editor.removeAttribute("data-placeholder");
    }
    if (snow) {
      snow.setAttribute("style", "border:0 !important");
    }
  }, [blog]);

  return (
    <div className="relative flex flex-col w-full items-center justify-center bg-gray-100 min-h-screen">
      {blog ? (
        <div className="container mt-20 md:mt-32 mx-auto px-4 md:px-6 bg-white shadow-lg rounded-lg p-5">
          <section className="relative flex items-center justify-center h-[500px] mb-10">
            {img && (
              <img
                src={img}
                className="rounded-lg h-full w-full object-cover shadow-lg"
                alt="Cover Photo"
              />
            )}
          </section>

          <div className="container my-5">
            <div className="flex flex-col justify-center items-center md:items-start gap-2 border-b pb-3 w-full mb-5">
              <h1 className="font-bold text-3xl md:text-4xl text-center md:text-left">
                {blog.title}
              </h1>
              <p className="text-sm text-gray-600 text-center md:text-left">
                Published on {FormatDate(blog.published_at)}
              </p>
            </div>
            <Editor
              value={blog.content}
              toolbar={false}
              setValue={() => {}}
              readOnly={true}
            />
            <div className="mt-10 mb-20 text-center">
              <Link
                to="/"
                className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
              >
                Go Back to Home
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <h1 className="absolute top-1/2 transform -translate-y-1/2 text-2xl font-bold text-blue-500">
          No Blog Found
        </h1>
      )}
    </div>
  );
};

export default Blog;
