import React from "react";

const RenderMovies = ({ movies, sectionTitle, carouselRef, sectionClass }) => {
  const scrollCarousel = (direction, carouselRef) => {
    const scrollAmount = 300;
    if (carouselRef.current) {
      const scrollLeftValue =
        direction === "right"
          ? carouselRef.current.scrollLeft + scrollAmount
          : carouselRef.current.scrollLeft - scrollAmount;

      carouselRef.current.scrollTo({
        left: scrollLeftValue,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className={`carousel-section ${sectionClass}`}>
      <h2>{sectionTitle}</h2>
      <div className="carousel-container">
        <button
          className="scroll-button scroll-button-left"
          onClick={() => scrollCarousel("left", carouselRef)}
        >
          &#9664;
        </button>
        <div className="carousel" ref={carouselRef}>
          {movies.slice(0, 15).map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
              />
            </div>
          ))}
        </div>
        <button
          className="scroll-button scroll-button-right"
          onClick={() => scrollCarousel("right", carouselRef)}
        >
          &#9654;
        </button>
      </div>
    </div>
  );
};

export default RenderMovies;
