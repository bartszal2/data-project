import { Link } from "react-router-dom";

function ListPageHeader(props: {
  classMainName: string;
  title: string;
  dataLength: number;
}) {
  return (
    <div className={`${props.classMainName}-main__header`}>
      <div className="header__title">
        {props.title}{" "}
        {typeof props.dataLength === "number" && props.dataLength > 0
          ? `(${props.dataLength})`
          : null}
      </div>
      <div className="header__options">
        <Link to="/" className="options__button">
          Back to Home Page
        </Link>
      </div>
    </div>
  );
}

export default ListPageHeader;
