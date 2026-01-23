import { Outlet } from "react-router";
import { Link } from "react-router";

export const Experements = () => {
  const links = ["guide", "nga", "without-markdown", "only-md"];

  return (
    <div className="p-4">
      <div className="space-x-4">
        {links.map((link) => (
          <Link
            key={link}
            to={link}
            className="text-blue-500 hover:underline"
          >
            {link}
          </Link>
        ))}
        {/* <Link to="guide">Guide</Link>
        <Link to="nga">New anim</Link> */}
      </div>
      <Outlet />
    </div>
  );
};
