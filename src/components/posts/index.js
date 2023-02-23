import styles from "./index.module.css";
import { Link } from "react-router-dom";

function Posts({ posts }) {
  return (
    <div className={styles["posts"]}>
      {posts.map(({ id, thumbnailUrl, title }) => (
        <Link key={id} to={`/post/${id}`}>
          <div id={`posts-${id}`} className={styles["posts__single"]}>
            <div className={styles["posts__count"]}>{id}.</div>
            <div>
              <div>{title}</div>
              <img alt="post-img" src={thumbnailUrl} />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Posts;
