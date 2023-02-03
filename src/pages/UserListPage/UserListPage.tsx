import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { userType } from "../../types/userType";
import "../../styles/pages/UserListPage.scss";
import ListPageHeader from "../../layout/ListPageHeader";
import { initialAPIDataType } from "../../types/initialAPIDataType";
import { initialAPIData } from "../../data/initialAPIData";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";

function UserListPage() {
  const navigate: NavigateFunction = useNavigate();

  const [userListDataAPI, setUserListDataAPI] = useState<
    initialAPIDataType & { data: userType[] | null }
  >(initialAPIData);

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
    <main className="userslist-main">
      <ListPageHeader
        classMainName="userslist"
        title="Users List"
        dataLength={
          userListDataAPI.data || userListDataAPI.error
            ? userListDataAPI.data!.length
            : 0
        }
      />
      <div className="userslist-main__description">
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
          userListDataAPI.loading || userListDataAPI.error
            ? "userslist-main__table-container userslist-main__table-container--content-center"
            : "userslist-main__table-container"
        }
      >
        {userListDataAPI.loading ? (
          <LoadingSpinner />
        ) : !userListDataAPI.error ? (
          <table className="table-container__table">
            <thead className="table__head">
              <tr>
                <th className="table__th">ID</th>
                <th className="table__th">Name</th>
                <th className="table__th">Street</th>
                <th className="table__th">City</th>
                <th className="table__th">Email</th>
                <th className="table__th">Phone</th>
                <th className="table__th">Company</th>
                <th className="table__th table__th--options">Options</th>
              </tr>
            </thead>
            <tbody className="table__body">
              {userListDataAPI.data!.length > 0 ? (
                userListDataAPI.data!.map((user: userType) => (
                  <tr className="table__tr" key={user.id}>
                    <td className="table__td">{user.id}</td>
                    <td className="table__td">{user.name}</td>
                    <td className="table__td">{user.address.street}</td>
                    <td className="table__td">{user.address.city}</td>
                    <td className="table__td">{user.email}</td>
                    <td className="table__td">{user.phone}</td>
                    <td className="table__td">{user.company.name}</td>
                    <td className="table__td table__td--options">
                      <Link to={`/users/${user.id}`}>
                        <button className="table__button">View User</button>
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
          <div className="table-container__error">{userListDataAPI.error}</div>
        )}
      </div>
    </main>
  );
}

export default UserListPage;
