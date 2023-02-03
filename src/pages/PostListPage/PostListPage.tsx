import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { postType } from "../../types/postType";
import { userType } from "../../types/userType";
import "../../styles/pages/PostListPage.scss";
import ListPageHeader from "../../layout/ListPageHeader";
import { useEffect, useState } from "react";
import { initialAPIDataType } from "../../types/initialAPIDataType";
import { initialAPIData } from "../../data/initialAPIData";
import LoadingSpinner from "../../components/LoadingSpinner";

function PostListPage() {
  const navigate: NavigateFunction = useNavigate();

  const [postListDataAPI, setPostListDataAPI] = useState<
    initialAPIDataType & { data: postType[] | null }
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
    fetch("https://jsonplaceholder.typicode.com/posts")
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
        setPostListDataAPI({ ...postListDataAPI, data: json, loading: false })
      )
      .catch((error) =>
        setPostListDataAPI({
          ...postListDataAPI,
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
    <main className="postslist-main">
      <ListPageHeader
        classMainName="postslist"
        title="Posts List"
        dataLength={
          postListDataAPI.data || postListDataAPI.error
            ? postListDataAPI.data!.length
            : 0
        }
      />
      <div className="postslist-main__description">
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
          postListDataAPI.loading ||
          userListDataAPI.loading ||
          postListDataAPI.error ||
          userListDataAPI.error
            ? "postslist-main__table-container postslist-main__table-container--content-center"
            : "postslist-main__table-container"
        }
      >
        {postListDataAPI.loading || userListDataAPI.loading ? (
          <LoadingSpinner />
        ) : !postListDataAPI.error && !userListDataAPI.error ? (
          <table className="table-container__table">
            <thead className="table__head">
              <tr>
                <th className="table__th">ID</th>
                <th className="table__th">Author</th>
                <th className="table__th">Email</th>
                <th className="table__th">Company</th>
                <th className="table__th">Title</th>
                <th className="table__th">Text</th>
                <th className="table__th table__th--options">Options</th>
              </tr>
            </thead>
            <tbody className="table__body">
              {postListDataAPI.data!.length > 0 &&
              userListDataAPI.data!.length > 0 ? (
                postListDataAPI.data!.map((post: postType) => (
                  <tr className="table__tr" key={post.id}>
                    <td className="table__td">{post.id}</td>
                    <td className="table__td">
                      {getUserData(post.userId).name}
                    </td>
                    <td className="table__td">
                      {getUserData(post.userId).email}
                    </td>
                    <td className="table__td">
                      {getUserData(post.userId).company.name}
                    </td>
                    <td className="table__td">{post.title}</td>
                    <td className="table__td">{post.body}</td>
                    <td className="table__td table__td--options">
                      <Link to={`/users/${post.userId}`}>
                        <button className="table__button">View Author</button>
                      </Link>
                      <Link to={`/posts/${post.id}`}>
                        <button className="table__button">View Post</button>
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
              {postListDataAPI.error}
            </div>
            <div className="table-container__error">
              {userListDataAPI.error}
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default PostListPage;
