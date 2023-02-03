import { NavLink } from "react-router-dom";

function NavElement(props: {
  linkPath: string;
  className: string;
  classNameActive: string;
  name: string;
  clickHandler: React.MouseEventHandler;
}) {
  return (
    <NavLink
      onClick={props.clickHandler}
      to={props.linkPath}
      className={({ isActive }) =>
        isActive
          ? `${props.className} ${props.classNameActive}`
          : `${props.className}`
      }
    >
      {props.name}
    </NavLink>
  );
}

export default NavElement;
