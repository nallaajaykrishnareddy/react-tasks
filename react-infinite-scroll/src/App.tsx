import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<
    { title: string; body: string; id: number }[]
  >([]);
  const observer = useRef<IntersectionObserver | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getProducts = async (page: number) => {
    try {
      setIsLoading(true);
      const rawResponse = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
      );
      const response = await rawResponse.json();

      // Check if more data is available
      if (response.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...response]);
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (hasMore) {
      getProducts(page);
    }
  }, [page]);

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        console.log(entries);

        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  return (
    <>
      <div>
        {posts.map((post, index) => (
          <div
            key={post.id}
            style={{
              border: "1px solid gray",
              padding: "10px",
              margin: "10px",
            }}
            ref={posts.length === index + 1 ? lastElementRef : null}
          >
            <h1>{post.title}</h1>
            <h3>{post.body}</h3>
          </div>
        ))}
        {isLoading && <h5>Loading...</h5>}
        {!hasMore && <h5>No more posts to load</h5>}
      </div>
    </>
  );
}

export default App;
