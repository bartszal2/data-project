import { useEffect, useState } from "react";
import {
  Link,
  NavigateFunction,
  useNavigate,
  useParams,
} from "react-router-dom";
import InformationFieldBlock from "../../components/InformationFieldBlock";
import LoadingSpinner from "../../components/LoadingSpinner";
import { initialAPIData } from "../../data/initialAPIData";
import InfoPageHeader from "../../layout/InfoPageHeader";
import "../../styles/pages/UserInfoPage.scss";
import { initialAPIDataType } from "../../types/initialAPIDataType";
import { postType } from "../../types/postType";
import { userType } from "../../types/userType";

function UserInfoPage() {
  const { id } = useParams<string>();

  const navigate: NavigateFunction = useNavigate();

  const [postListDataAPI, setPostListDataAPI] = useState<
    initialAPIDataType & { data: postType[] | null }
  >(initialAPIData);

  const [userDataAPI, setUserDataAPI] = useState<
    initialAPIDataType & { data: userType | null }
  >(initialAPIData);

  useEffect((): void => {
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
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
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
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
        setUserDataAPI({ ...userDataAPI, data: json, loading: false })
      )
      .catch((error) =>
        setUserDataAPI({ ...userDataAPI, error: error.message, loading: false })
      );
  }, []);

  return (
    <main className="userinfo-main">
      <InfoPageHeader
        classMainName="userinfo"
        title={`User ${userDataAPI.data ? `'${userDataAPI.data.name}'` : ""}`}
      />
      <div className="userinfo-main__description">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius modi odit
        repellendus obcaecati nostrum sunt, inventore odio quis saepe
        accusantium laboriosam hic commodi exercitationem dicta ea delectus
        harum alias consequatur culpa recusandae sequi non beatae tenetur optio.
        Eius facere exercitationem veniam, totam, eveniet dolore reiciendis
        minus aut eum molestiae quidem enim inventore, dicta suscipit dolor
        voluptas eos voluptatibus ex hic iure animi deserunt ipsum voluptatum!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
        aspernatur eligendi fuga autem. Velit, obcaecati. Nam qui enim
        exercitationem voluptatum consectetur assumenda, voluptatem voluptate?
        Impedit unde tempora nihil velit. Eveniet.
      </div>
      <div
        className={
          postListDataAPI.loading ||
          userDataAPI.loading ||
          postListDataAPI.error ||
          userDataAPI.error
            ? "userinfo-main__container userinfo-main__container--content-center"
            : "userinfo-main__container"
        }
      >
        {postListDataAPI.loading || userDataAPI.loading ? (
          <LoadingSpinner />
        ) : !postListDataAPI.error && !userDataAPI.error ? (
          <>
            <InformationFieldBlock
              styleType="two-size"
              name="Name"
              value={userDataAPI.data!.name}
            />
            <InformationFieldBlock
              styleType="default"
              name="Address"
              value={`${userDataAPI.data!.address.street}, ${
                userDataAPI.data!.address.city
              }`}
            />
            <InformationFieldBlock
              styleType="default"
              name="Phone"
              value={userDataAPI.data!.phone}
            />
            <InformationFieldBlock
              styleType="default"
              name="Email"
              value={userDataAPI.data!.email}
            />
            <InformationFieldBlock
              styleType="default"
              name="Website"
              value={userDataAPI.data!.website}
            />
            <InformationFieldBlock
              styleType="default"
              name="Company"
              value={userDataAPI.data!.company.name}
            />
            <InformationFieldBlock
              styleType="default"
              name="Count of posts"
              value={postListDataAPI.data!.length}
            />
            <div className="container__card container__card--full-size">
              <div className="card__title">Posts</div>
              <div className="card__table-container">
                <table className="table-container__table">
                  <thead className="table__head">
                    <tr>
                      <th className="table__th">ID</th>
                      <th className="table__th">Title</th>
                      <th className="table__th">Text</th>
                      <th className="table__th table__th--options">Options</th>
                    </tr>
                  </thead>
                  <tbody className="table__body">
                    {postListDataAPI.data!.length > 0 &&
                    Object.values(userDataAPI.data!).length > 0 ? (
                      postListDataAPI.data!.map((post: postType) => (
                        <tr className="table__tr" key={post.id}>
                          <td className="table__td">{post.id}</td>
                          <td className="table__td">{post.title}</td>
                          <td className="table__td">{post.body}</td>
                          <td className="table__td table__td--options">
                            <Link to={`/posts/${post.id}`}>
                              <button className="table__button">
                                View Post
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
            <div className="container__error">{postListDataAPI.error}</div>
            <div className="container__error">{userDataAPI.error}</div>
          </>
        )}
      </div>
    </main>
  );
}

export default UserInfoPage;
