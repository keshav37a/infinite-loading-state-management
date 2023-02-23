import styles from "./index.module.css";

function Posts({ posts }) {
  return (
    <div className={styles["posts"]}>
      {posts.map(({ id, thumbnailUrl, title }, index) => (
        <a key={id} href={thumbnailUrl}>
          <div className={styles["posts__single"]}>
            <div className={styles["posts__count"]}>{index + 1}.</div>
            <div>
              <div>{title}</div>
              <img alt="post-img" src={thumbnailUrl} />
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

export default Posts;
