function InformationFieldBlock(props: {
  styleType:
    | "default"
    | "two-size"
    | "three-size"
    | "full-size"
    | "two-column-row-size";
  name: string;
  value: string | number | JSX.Element;
}) {
  return (
    <div
      className={
        props.styleType === "default"
          ? "container__card"
          : `container__card container__card--${props.styleType}`
      }
    >
      <div className="card__title">{props.name}</div>
      <div className="card__text">{props.value}</div>
    </div>
  );
}

export default InformationFieldBlock;
