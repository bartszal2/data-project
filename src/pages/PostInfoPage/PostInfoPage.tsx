import { useEffect, useState } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import InformationFieldBlock from "../../components/InformationFieldBlock";
import LoadingSpinner from "../../components/LoadingSpinner";
import { initialAPIData } from "../../data/initialAPIData";
import InfoPageHeader from "../../layout/InfoPageHeader";
import "../../styles/pages/PostInfoPage.scss";
import { commentType } from "../../types/commentType";
import { initialAPIDataType } from "../../types/initialAPIDataType";
import { postType } from "../../types/postType";
import { userType } from "../../types/userType";

function PostInfoPage() {
  const { id } = useParams<string>();

  const navigate: NavigateFunction = useNavigate();

  const [postDataAPI, setPostDataAPI] = useState<
    initialAPIDataType & { data: postType | null }
  >(initialAPIData);

  const [userListDataAPI, setUserListDataAPI] = useState<
    initialAPIDataType & { data: userType[] | null }
  >(initialAPIData);

  const [commentListDataAPI, setCommentListDataAPI] = useState<
    initialAPIDataType & { data: commentType[] | null }
  >(initialAPIData);

  useEffect((): void => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
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
        setPostDataAPI({ ...postDataAPI, data: json, loading: false })
      )
      .catch((error) =>
        setPostDataAPI({ ...postDataAPI, error: error.message, loading: false })
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

  useEffect((): void => {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
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
        setCommentListDataAPI({
          ...commentListDataAPI,
          data: json,
          loading: false,
        })
      )
      .catch((error) =>
        setCommentListDataAPI({
          ...commentListDataAPI,
          error: error.message,
          loading: false,
        })
      );
  }, []);

  return (
    <main className="postinfo-main">
      <InfoPageHeader
        classMainName="postinfo"
        title={`Post ${postDataAPI.data ? `'${postDataAPI.data.title}'` : ""}`}
      />
      <div className="postinfo-main__description">
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
          postDataAPI.loading ||
          userListDataAPI.loading ||
          postDataAPI.error ||
          userListDataAPI.error ||
          commentListDataAPI.loading ||
          commentListDataAPI.error
            ? "postinfo-main__container postinfo-main__container--content-center"
            : "postinfo-main__container"
        }
      >
        {postDataAPI.loading ||
        userListDataAPI.loading ||
        commentListDataAPI.loading ? (
          <LoadingSpinner />
        ) : !postDataAPI.error &&
          !userListDataAPI.error &&
          !commentListDataAPI.error ? (
          <>
            <InformationFieldBlock
              styleType="full-size"
              name="Name"
              value={postDataAPI.data!.title}
            />
            <InformationFieldBlock
              styleType="full-size"
              name="Text"
              value={postDataAPI.data!.body}
            />
            <InformationFieldBlock
              styleType="full-size"
              name="Author"
              value={
                userListDataAPI.data!.filter(
                  (user: userType) => user.id === postDataAPI.data!.userId
                )[0].name
              }
            />
            <div className="container__card container__card--full-size">
              <div className="card__title">Comments</div>
              <div className="card__comments-block">
                {commentListDataAPI.data!.length > 0
                  ? commentListDataAPI.data!.map((comment: commentType) => (
                      <div className="comments-block__element" key={comment.id}>
                        <div className="element__title">
                          Tile '{comment.name}'
                        </div>
                        <div className="element__text">{comment.body}</div>
                      </div>
                    ))
                  : "Data loading error. There is no data to display on the screen"}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="container__error">{postDataAPI.error}</div>
            <div className="container__error">{userListDataAPI.error}</div>
            <div className="container__error">{commentListDataAPI.error}</div>
          </>
        )}
      </div>
    </main>
  );
}

export default PostInfoPage;
