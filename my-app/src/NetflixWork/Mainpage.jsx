import React, { useEffect, useState, useRef } from "react";
import "./Mainpage.css";
import netflixlogo from "./netflix tools/assets/logo.png";
import Search from "./netflix tools/assets/Search.png";
import NotificationBell from "./netflix tools/assets/NotificationBell.png";
import facebook from "./netflix tools/assets/facebook.png";
import twitter from "./netflix tools/assets/twitter.png";
import instagram from "./netflix tools/assets/instagram.png";
import youtube from "./netflix tools/assets/youtube.png";
import RenderMovies from "./helpers/RenderMovies";

const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMWMwYWE1ODA3ZmI2MzRmNWM4NTIyMzNjYzhiNjk0YyIsIm5iZiI6MTcyODIyNzgwNS45NTY5NzEsInN1YiI6IjY3MDJhNTM3ZjM0OTVkNzJjNGY3YmQ5MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Rmpev1cDGcf58BLUQ9Ud_alEjrBUWNpILiU1RTF0O2Y"; // Replace with your TMDb API token

const baseUrl = "https://api.themoviedb.org/3";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
};

const Mainpage = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [peopleMovies, setPeopleMovies] = useState([]);

  const popularRef = useRef(null);
  const topRatedRef = useRef(null);
  const upcomingRef = useRef(null);
  const peopleRef = useRef(null);

  const getMovies = async (endpoint) => {
    const data_ = await fetch(endpoint, options);
    const result = await data_.json();
    return result.results || [];
  };

  useEffect(() => {
    const fetchData = async () => {
      const popular = await getMovies(`${baseUrl}/movie/popular`);
      const topRated = await getMovies(`${baseUrl}/movie/top_rated`);
      const upcoming = await getMovies(`${baseUrl}/movie/upcoming`);
      const people = await getMovies(`${baseUrl}/tv/airing_today`);
      setPopularMovies(popular);
      setTopRatedMovies(topRated);
      setUpcomingMovies(upcoming);
      setPeopleMovies(people);
    };
    fetchData();
  }, []);

  const allMoviesViaCategories = [
    <RenderMovies
      key={"popular"}
      movies={popularMovies}
      sectionTitle="Popular on Netflix"
      carouselRef={popularRef}
      sectionClass="popular-section"
    />,

    <RenderMovies
      key={"top-rated"}
      movies={topRatedMovies}
      sectionTitle="Top Rated"
      carouselRef={topRatedRef}
      sectionClass="top-rated-section"
    />,
    <RenderMovies
      key={"coming-soon"}
      movies={upcomingMovies}
      sectionTitle="Coming Soon"
      carouselRef={upcomingRef}
      sectionClass="upcoming-section"
    />,

    <RenderMovies
      key={"people-movie"}
      movies={peopleMovies}
      sectionTitle="People's Movie"
      carouselRef={peopleRef}
      sectionClass="people-section"
    />,
  ];

  return (
    <div className="mainpage">
      <header className="header">
        <img src={netflixlogo} alt="Netflix Logo" className="logo" />
        <div className="header-icons">
          <img src={Search} alt="Search" />
          <img src={NotificationBell} alt="Notifications" />
        </div>
      </header>

      <div className="first-page"></div>

      <div className="category-wrapper">
        <div className="category-proxy">
          {allMoviesViaCategories.map((movieCategory) => movieCategory)}
        </div>
      </div>

      <footer className="footer">
        <div className="social-icons">
          <img src={facebook} alt="Facebook" />
          <img src={twitter} alt="Twitter" />
          <img src={instagram} alt="Instagram" />
          <img src={youtube} alt="YouTube" />
        </div>
      </footer>
    </div>
  );
};

export default Mainpage;
