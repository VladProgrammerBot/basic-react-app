import { Outlet } from "react-router";
import { Link } from "react-router";

export const Experements = () => {
  

  return (
    <div className="p-4">
      <div className="space-x-4">
        <Link to="guide">Guide</Link>
        <Link to="nga">New anim</Link>
      </div>
      <Outlet />
    </div>
  );
};
