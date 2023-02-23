import { useEffect, useState, useRef } from "react";
import { BASE_URL, LIMIT, LAST_VIEWED_POST } from "../../constants/fetchData";
import Posts from "../../components/posts";
import styles from "./index.module.css";
import _debounce from "lodash/debounce";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [startLimitData, setStartLimitData] = useState({
    startMovingBottom: 0,
    limit: LIMIT,
    startMovingTop: 0,
  });
  const [isPostsFetching, setIsPostsFetching] = useState(false);

  const postPageRef = useRef();

  function handleNetworkCall(start, limit, addNewPostsInBeginning = false) {
    const url = `${BASE_URL}/?_start=${start}&&_limit=${limit}`;
    setIsPostsFetching(true);
    fetch(url)
      .then((data) => data.json())
      .then((jsonData) => {
        if (!addNewPostsInBeginning) {
          setPosts([...posts, ...jsonData]);
        } else {
          setPosts([...jsonData, ...posts]);
        }
        setIsPostsFetching(false);
      })
      .catch((e) => {});
  }

  function handleScroll() {
    const bottom =
      postPageRef.current?.scrollHeight +
        postPageRef.current?.getBoundingClientRect().top -
        window.innerHeight <=
      20;

    const top = window.scrollY <= 150;

    if (top && !isPostsFetching && startLimitData.startMovingTop >= LIMIT) {
      setStartLimitData((prevData) => {
        const { startMovingTop: prevStart, limit: prevLimit } = prevData;
        return { ...prevData, startMovingTop: prevStart - prevLimit };
      });
      handleNetworkCall(startLimitData.startMovingTop - LIMIT, LIMIT, true);
    }

    if (bottom && !isPostsFetching) {
      setStartLimitData((prevData) => {
        const { startMovingBottom: prevStart, limit: prevLimit } = prevData;
        return { ...prevData, startMovingBottom: prevStart + prevLimit };
      });
      handleNetworkCall(startLimitData.startMovingBottom + LIMIT, LIMIT);
    }
  }

  useEffect(() => {
    let latestId = sessionStorage.getItem(LAST_VIEWED_POST);
    console.log(latestId);
    if (!latestId) {
      handleNetworkCall(0, LIMIT);
    } else {
      let startModifier = Math.floor(latestId / LIMIT) * LIMIT;
      handleNetworkCall(startModifier, LIMIT);
    }
  }, []);

  useEffect(() => {
    const debouncedScroll = _debounce(handleScroll, 250);
    window.addEventListener("scroll", debouncedScroll);
    return () => {
      window.removeEventListener("scroll", debouncedScroll);
    };
  }, [startLimitData, posts]);

  useEffect(() => {
    let latestId = sessionStorage.getItem(LAST_VIEWED_POST);
    if (latestId && posts.length > 0) {
      let postIdDom = document.querySelector(`#posts-${latestId}`);
      console.log(postIdDom);
      if (postIdDom) {
        postIdDom.scrollIntoView();
      }
      sessionStorage.removeItem(LAST_VIEWED_POST);
      let currStartModifier = Math.max(Math.floor(latestId / LIMIT) * LIMIT, 0);
      setStartLimitData({
        startMovingTop: currStartModifier,
        startMovingBottom: currStartModifier,
        limit: LIMIT,
      });
    }
  }, [posts]);

  console.log(posts);

  return (
    <div ref={postPageRef}>
      <div className={styles["post-list__title"]}>Infinite Loading Test</div>
      <Posts posts={posts} />
    </div>
  );
}

export default PostList;
