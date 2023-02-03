import { useEffect, useState } from "react";
import { Link, NavigateFunction, useNavigate, useParams } from "react-router-dom";
import InformationFieldBlock from "../../components/InformationFieldBlock";
import LoadingSpinner from "../../components/LoadingSpinner";
import { initialAPIData } from "../../data/initialAPIData";
import InfoPageHeader from "../../layout/InfoPageHeader";
import "../../styles/pages/AlbumInfoPage.scss";
import { albumType } from "../../types/albumType";
import { initialAPIDataType } from "../../types/initialAPIDataType";
import { photoType } from "../../types/photoType";
import { userType } from "../../types/userType";

function AlbumInfoPage() {
  const { id } = useParams<string>();

  const navigate: NavigateFunction = useNavigate()

  const [albumDataAPI, setAlbumDataAPI] = useState<
    initialAPIDataType & { data: albumType | null }
  >(initialAPIData);

  const [userListDataAPI, setUserListDataAPI] = useState<
    initialAPIDataType & { data: userType[] | null }
  >(initialAPIData);

  const [photoListDataAPI, setPhotoListDataAPI] = useState<
    initialAPIDataType & { data: photoType[] | null }
  >(initialAPIData);

  useEffect((): void => {
    fetch(`https://jsonplaceholder.typicode.com/albums/${id}`)
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) {
            navigate('/error-page', {replace: true})
          } else {
            throw new Error('HTTP status ' + response.status)
          }
        } else {
          return response.json()
        }
      }
      )
      .then((json) =>
        setAlbumDataAPI({ ...albumDataAPI, data: json, loading: false })
      )
      .catch((error) =>
        setAlbumDataAPI({
          ...albumDataAPI,
          error: error.message,
          loading: false,
        })
      );
  }, []);

  useEffect((): void => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) {
            navigate('/error-page', {replace: true})
          } else {
            throw new Error('HTTP status ' + response.status)
          }
        } else {
          return response.json()
        }
      })
      .then((json) =>
        setUserListDataAPI({ ...userListDataAPI, data: json, loading: false })
      )
      .catch((error) =>
        setUserListDataAPI({
          ...userListDataAPI,
          error: error.message,
          loading: false,
        })
      );
  }, []);

  useEffect((): void => {
    fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`)
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) {
            navigate('/error-page', {replace: true})
          } else {
            throw new Error('HTTP status ' + response.status)
          }
        } else {
          return response.json()
        }
      })
      .then((json) =>
        setPhotoListDataAPI({ ...photoListDataAPI, data: json, loading: false })
      )
      .catch((error) =>
        setPhotoListDataAPI({
          ...photoListDataAPI,
          error: error.message,
          loading: false,
        })
      );
  }, []);

  return (
    <main className="albuminfo-main">
      <InfoPageHeader
        classMainName="albuminfo"
        title={`Album ${
          albumDataAPI.data ? `'${albumDataAPI.data.title}'` : ""
        }`}
      />
      <div className="albuminfo-main__description">
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
          albumDataAPI.loading ||
          userListDataAPI.loading ||
          photoListDataAPI.loading ||
          albumDataAPI.error ||
          userListDataAPI.error ||
          photoListDataAPI.error
            ? "albuminfo-main__container albuminfo-main__container--content-center"
            : "albuminfo-main__container"
        }
      >
        {albumDataAPI.loading ||
        userListDataAPI.loading ||
        photoListDataAPI.loading ? (
          <LoadingSpinner />
        ) : !albumDataAPI.error &&
          !userListDataAPI.error &&
          !photoListDataAPI.error ? (
          <>
            <InformationFieldBlock
              styleType="two-size"
              name="Name"
              value={albumDataAPI.data!.title}
            />
            <InformationFieldBlock
              styleType="two-size"
              name="Author"
              value={
                userListDataAPI.data!.filter(
                  (user: userType) => user.id === albumDataAPI.data!.userId
                )[0].name
              }
            />
            <div className="container__card container__card--full-size">
              <div className="card__title">Photos</div>
              <div className="card__table-container">
                <table className="table-container__table">
                  <thead className="table__head">
                    <tr className="table__tr">
                      <th className="table__th">ID</th>
                      <th className="table__th">Photo</th>
                      <th className="table__th">Title</th>
                      <th className="table__th">Url</th>
                      <th className="table__th table__th--options">Options</th>
                    </tr>
                  </thead>
                  <tbody className="table__body">
                    {photoListDataAPI.data!.length > 0 &&
                    Object.values(albumDataAPI.data!).length > 0 ? (
                      photoListDataAPI.data!.map((photo: photoType) => (
                        <tr className="table__tr" key={photo.id}>
                          <td className="table__td">{photo.id}</td>
                          <td className="table__td table__td--image">
                            <img
                              className="table__image"
                              src={photo.thumbnailUrl}
                              loading="lazy"
                            />
                          </td>
                          <td className="table__td">{photo.title}</td>
                          <td className="table__td">{photo.url}</td>
                          <td className="table__td table__td--options">
                            <Link to={`/photo/${photo.id}`}>
                              <button className="table__button">
                                View Photo
                              </button>
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr className="table__tr">
                        <td className="table__td table__td--error">
                          Data loading error. There is no data to display on the
                          screen
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="container__error">{albumDataAPI.error}</div>
            <div className="container__error">{userListDataAPI.error}</div>
            <div className="container__error">{photoListDataAPI.error}</div>
          </>
        )}
      </div>
    </main>
  );
}

export default AlbumInfoPage;
