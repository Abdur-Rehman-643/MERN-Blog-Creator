import { useEffect, useState } from "react";
import BlogItem from "../../components/blog_item";
import { useNavigate } from "react-router-dom";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        const response = await fetch(
          "https://coconut-leather-tomato.glitch.me/getblogs"
        );
        const data = await response.json();
        console.log("Fetched data:", data); // Debug: log the fetched data
        setBlogs(sort(data));
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    getAllBlogs();
  }, []);

  const sort = (data) => {
    return data.sort((a, b) => {
      return new Date(b.published_at) - new Date(a.published_at);
    });
  };

  const handleClick = (id) => {
    navigate(`/blog/${id}`);
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("Filtered blogs:", filteredBlogs);
  return (
    <div className="relative flex flex-col w-full items-center my-20 md:my-28 justify-center">
      <div className="w-full flex justify-center mb-4">
        <input
          type="search"
          className="w-full md:w-1/2 p-2 px-5 shadow-sm border-2 rounded-full outline-none focus:border-slate-400"
          placeholder="Search Blog"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {filteredBlogs.length > 0 ? (
        <div className="flex flex-wrap justify-center items-center w-full">
          <h1 className="text-2xl font-sans font-bold my-4 w-full text-center">
            All Blogs
          </h1>
          {filteredBlogs.map((blog) => (
            <BlogItem blog={blog} key={blog.id} handleClick={handleClick} />
          ))}
        </div>
      ) : (
        <h1 className="absolute top-1/2 translate-y-80 text-2xl font-bold text-[var(--primary-color)] my-2">
          No Blogs Found
        </h1>
      )}
    </div>
  );
};

export default Blogs;
