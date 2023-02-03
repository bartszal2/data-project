import { useEffect, useState } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import InformationFieldBlock from "../../components/InformationFieldBlock";
import LoadingSpinner from "../../components/LoadingSpinner";
import { initialAPIData } from "../../data/initialAPIData";
import InfoPageHeader from "../../layout/InfoPageHeader";
import "../../styles/pages/PhotoInfoPage.scss";
import { initialAPIDataType } from "../../types/initialAPIDataType";
import { photoType } from "../../types/photoType";

function PhotoInfoPage() {
  const { id } = useParams<string>();

  const navigate: NavigateFunction = useNavigate();

  const [photoDataAPI, setPhotoDataAPI] = useState<
    initialAPIDataType & { data: photoType | null }
  >(initialAPIData);

  useEffect((): void => {
    fetch(`https://jsonplaceholder.typicode.com/photos/${id}`)
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) {
            navigate("/error-page", { replace: true });
          } else {
            throw new Error("HTTP status " + response.status);
          }
        } else {
          return response.json();
        }
      })
      .then((json) =>
        setPhotoDataAPI({ ...photoDataAPI, data: json, loading: false })
      )
      .catch((error) =>
        setPhotoDataAPI({
          ...photoDataAPI,
          error: error.message,
          loading: false,
        })
      );
  }, []);

  return (
    <main className="photoinfo-main">
      <InfoPageHeader
        classMainName="photoinfo"
        title={`Photo ${
          photoDataAPI.data ? `'${photoDataAPI.data.title}'` : ""
        }`}
      />
      <div className="photoinfo-main__description">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius modi odit
        repellendus obcaecati nostrum sunt, inventore odio quis saepe
        accusantium laboriosam hic commodi exercitationem dicta ea delectus
        harum alias consequatur culpa recusandae sequi non beatae tenetur optio.
        Eius facere exercitationem veniam, totam, eveniet dolore reiciendis
        minus aut eum molestiae quidem enim inventore, dicta suscipit dolor
        voluptas eos voluptatibus ex hic iure animi deserunt ipsum voluptatum!
      </div>
      <div
        className={
          photoDataAPI.loading || photoDataAPI.error
            ? "photoinfo-main__container photoinfo-main__container--content-center"
            : "photoinfo-main__container"
        }
      >
        {photoDataAPI.loading ? (
          <LoadingSpinner />
        ) : !photoDataAPI.error ? (
          <>
            <InformationFieldBlock
              styleType="two-column-row-size"
              name="Preview"
              value={
                <img
                  src={photoDataAPI.data!.url}
                  className="card__image"
                  loading="lazy"
                />
              }
            />
            <InformationFieldBlock
              styleType="default"
              name="Name"
              value={photoDataAPI.data!.title}
            />
            <InformationFieldBlock
              styleType="default"
              name="Thumbnail"
              value={photoDataAPI.data!.thumbnailUrl}
            />
          </>
        ) : (
          <div className="container__error">{photoDataAPI.error}</div>
        )}
      </div>
    </main>
  );
}

export default PhotoInfoPage;
