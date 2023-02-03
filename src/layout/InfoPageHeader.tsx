import { Link } from "react-router-dom";

function InfoPageHeader(props: { classMainName: string; title: string }) {
  return (
    <div className={`${props.classMainName}-main__header`}>
      <div className="header__title">{props.title}</div>
      <div className="header__options">
        <Link to="/" className="options__button">
          Back to Home Page
        </Link>
      </div>
    </div>
  );
}

export default InfoPageHeader;
