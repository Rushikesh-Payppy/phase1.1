"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";

// Components
// import FlixNavbar from "@/Components/FlixNavbar";
import ScrollButtons from "@/Components/ScrollButtons";
import FlixBlogContent from "@/Components/FlixBlogContent";
import InitialPageLoadingAnimation from '@/Components/InitialPageLoadingAnimation';


const Page = ({ scrollButtons = true, navbar = true }) => {
  const scrollContainer = useRef(null);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const initialFetchDone = useRef(false); // Tracks if the first fetch is complete


  // Fetch data for a given page
  const getFlixData = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://strapi.payppy.app/api/flixes/?populate=*&pagination[page]=${page}&pagination[pageSize]=3`
      );
      const json = await response.json();

      const newItems = json?.data || [];
      console.log("new items", newItems);
      setData((prevData) => [...prevData, ...newItems]);

      if (newItems.length < 3) setHasMore(false); // If fewer than 3 items are fetched, no more data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  }, [page, hasMore, loading]);

  // Load initial data (only once)
  useEffect(() => {
    if (initialFetchDone.current) return;
    initialFetchDone.current = true;
    getFlixData();
  }, []); // Run only once on mount

  // Handle infinite scroll
  const handleScroll = () => {
    if (!scrollContainer.current) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollContainer.current;
    if (scrollTop + clientHeight >= scrollHeight - 50 && hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Fetch data on page change (but skip initial render caused by `setPage`)
  useEffect(() => {
    if (page > 1) {
      getFlixData();
    }
  }, [page]);

  // Attach scroll listener
  useEffect(() => {
    const container = scrollContainer.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);


  return (

    <main className=" w-full h-full flex justify-center ">

      {/* snap-start snap-always --> used for scrolling inside flix home page */}
      <div className="relative max-w-[52.7vh] overflow-scrollbar-hidden snap-start snap-always ">
        {/* Navbar */}
        {/* {navbar && <FlixNavbar />} */}

          <div ref={scrollContainer} className="w-full h-[100dvh] snap-y snap-mandatory overflow-y-scroll overflow-scrollbar-hidden ">
            {data.length > 0 &&
              data.map((element, index) => (
                <FlixBlogContent data={element} key={index} />
              ))}
            {loading && <InitialPageLoadingAnimation />}
          </div>
       
        {/* Scroll Buttons */}
        {scrollButtons && <ScrollButtons containerName={scrollContainer} />}

      </div>

    </main>

  );
};

export default Page;

