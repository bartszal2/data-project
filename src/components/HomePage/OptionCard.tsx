import { Link } from "react-router-dom";

function OptionCard(props: {
  linkPath: string;
  cardTitle: string;
  cardText: string;
}) {
  return (
    <Link to={props.linkPath} className="container__card">
      <div className="card__title">{props.cardTitle}</div>
      <div className="card__text">{props.cardText}</div>
    </Link>
  );
}

export default OptionCard;
