import { useEffect, useState, useRef } from "react";
import { BASE_URL } from "../../constants/fetchData";
import Posts from "../../components/posts";
import useFetch from "../../hooks/useFetch";
import styles from "./index.module.css";
import _debounce from "lodash/debounce";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [startLimitData, setStartLimitData] = useState({ start: 0, limit: 10 });
  const { start, limit } = startLimitData;
  const url = `${BASE_URL}/?_start=${start}&&_limit=${limit}`;

  const { data, loading: isPostsFetching } = useFetch(url);

  const postPageRef = useRef();

  function handleScroll() {
    const bottom =
      postPageRef.current?.scrollHeight +
        postPageRef.current?.getBoundingClientRect().top -
        window.innerHeight <=
      10;

    if (bottom && !isPostsFetching) {
      setStartLimitData((prevData) => {
        const { start: prevStart, limit: prevLimit } = prevData;
        return { ...prevData, start: prevStart + prevLimit };
      });
    }
  }

  useEffect(() => {
    const debouncedScroll = _debounce(handleScroll, 250);
    window.addEventListener("scroll", debouncedScroll);
    return () => {
      window.removeEventListener("scroll", debouncedScroll);
    };
  }, [startLimitData]);

  useEffect(() => {
    if (data) {
      setPosts([...posts, ...data]);
    }
  }, [data]);

  return (
    <div ref={postPageRef}>
      <div className={styles["post-list__title"]}>Infinite Loading Test</div>
      <Posts posts={posts} />
    </div>
  );
}

export default PostList;
