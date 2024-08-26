import PropTypes from "prop-types";
import { FormatDate } from "./format_Date";

const BlogItem = ({ blog, handleClick }) => {
  const imageUrl = blog.coverImage
    ? `https://coconut-leather-tomato.glitch.me/images/${blog.coverImage}`
    : null;

  return (
    <div className="w-full sm:w-1/2 lg:w-1/3 p-4">
      <div
        className="group flex flex-col items-center justify-between p-4 rounded-md border border-slate-400/30 hover:shadow-md transition-shadow duration-300 cursor-pointer"
        onClick={() => handleClick(blog.id)}
      >
        {imageUrl && (
          <img
            src={imageUrl}
            alt={blog.title}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
        )}
        <div className="flex flex-col items-center text-center">
          <h1 className="text-lg md:text-xl font-medium mb-2">{blog.title}</h1>
          <p className="text-xs md:text-sm text-slate-600 mb-4">
            Published {"."} {FormatDate(blog.published_at)}
          </p>
          <button
            className="px-4 py-2 bg-[var(--primary-color)] text-white rounded-full transition-colors duration-300 hover:bg-[var(--primary-color-dark)]"
            onClick={() => handleClick(blog.id)}
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

BlogItem.propTypes = {
  blog: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default BlogItem;
