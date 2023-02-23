import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LAST_VIEWED_POST } from "../../constants/fetchData";

function PostDetails() {
  const location = useLocation();

  useEffect(() => {
    let paths = location.pathname.split("/");
    let postId = paths[paths.length - 1];
    console.log(postId);
    sessionStorage.setItem(LAST_VIEWED_POST, postId);
  }, []);

  return (
    <div>
      <div>Post Details</div>
      <a href="/">Go Back</a>
    </div>
  );
}

export default PostDetails;
