import { useEffect, useState } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { albumType } from "../../types/albumType";
import "../../styles/pages/AlbumListPage.scss";
import { userType } from "../../types/userType";
import { initialAPIDataType } from "../../types/initialAPIDataType";
import { initialAPIData } from "../../data/initialAPIData";
import ListPageHeader from "../../layout/ListPageHeader";
import LoadingSpinner from "../../components/LoadingSpinner";

function AlbumListPage() {
  const navigate: NavigateFunction = useNavigate();

  const [albumListDataAPI, setAlbumListDataAPI] = useState<
    initialAPIDataType & { data: albumType[] | null }
  >(initialAPIData);

  const [userListDataAPI, setUserListDataAPI] = useState<
    initialAPIDataType & { data: userType[] | null }
  >(initialAPIData);

  const getUserData = (userId: number): userType => {
    const [data] = userListDataAPI.data!.filter(
      (user: userType) => user.id === userId
    );
    return data;
  };

  useEffect((): void => {
    fetch("https://jsonplaceholder.typicode.com/albums")
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
        setAlbumListDataAPI({ ...albumListDataAPI, data: json, loading: false })
      )
      .catch((error) =>
        setAlbumListDataAPI({
          ...albumListDataAPI,
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
            navigate("/error-page", { replace: true });
          } else {
            throw new Error("HTTP status " + response.status);
          }
        } else {
          return response.json();
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

  return (
    <>
      <div>
        <main className="albumlist-main">
          <ListPageHeader
            classMainName="albumlist"
            title="Album List"
            dataLength={
              albumListDataAPI.data || albumListDataAPI.error
                ? albumListDataAPI.data!.length
                : 0
            }
          />
          <div className="albumlist-main__description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius modi
            odit repellendus obcaecati nostrum sunt, inventore odio quis saepe
            accusantium laboriosam hic commodi exercitationem dicta ea delectus
            harum alias consequatur culpa recusandae sequi non beatae tenetur
            optio. Eius facere exercitationem veniam, totam, eveniet dolore
            reiciendis minus aut eum molestiae quidem enim inventore, dicta
            suscipit dolor voluptas eos voluptatibus ex hic iure animi deserunt
            ipsum voluptatum!
          </div>
          <div
            className={
              albumListDataAPI.loading ||
              albumListDataAPI.error ||
              userListDataAPI.loading ||
              userListDataAPI.error
                ? "albumlist-main__table-container albumlist-main__table-container--content-center"
                : "albumlist-main__table-container"
            }
          >
            {albumListDataAPI.loading || userListDataAPI.loading ? (
              <LoadingSpinner />
            ) : !albumListDataAPI.error && !userListDataAPI.error ? (
              <table className="table-container__table">
                <thead className="table__head">
                  <tr className="table__tr">
                    <th className="table__th">ID</th>
                    <th className="table__th">Author</th>
                    <th className="table__th">Email</th>
                    <th className="table__th">Company</th>
                    <th className="table__th">Album name</th>
                    <th className="table__th table__th--options">Options</th>
                  </tr>
                </thead>
                <tbody className="table__body">
                  {albumListDataAPI.data!.length > 0 ? (
                    albumListDataAPI.data!.map((album: albumType) => (
                      <tr className="table__tr" key={album.id}>
                        <td className="table__td">{album.id}</td>
                        <td className="table__td">
                          {getUserData(album.userId).name}
                        </td>
                        <td className="table__td">
                          {getUserData(album.userId).email}
                        </td>
                        <td className="table__td">
                          {getUserData(album.userId).company.name}
                        </td>
                        <td className="table__td">{album.title}</td>
                        <td className="table__td table__td--options">
                          <Link to={`/users/${album.userId}`}>
                            <button className="table__button">
                              View Author
                            </button>
                          </Link>
                          <Link to={`/albums/${album.id}`}>
                            <button className="table__button">
                              View Album
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
            ) : (
              <>
                <div className="table-container__error">
                  {albumListDataAPI.error}
                </div>
                <div className="table-container__error">
                  {userListDataAPI.error}
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default AlbumListPage;
