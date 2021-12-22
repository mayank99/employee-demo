import { Outlet } from "react-router-dom";

export default function Employees() {
  return (
    <>
       <div>Employees list</div>
       <Outlet />
    </>
  );
}
