import React from 'react';
import { useHarperDB } from 'use-harperdb';

const Movie = () => {
  let [data, loading, error, refresh] = useHarperDB({
    query: {
      operation: 'sql',
      sql: `select * from collection.movie where id = ${
        Math.floor(Math.random() * 8) + 1
      }`,
    },
    interval: 40000, // 40 Seconds
  });

  if (loading) {
    return <div> Loading... </div>;
  }

  if (data) {
    return (
      <div>
        <div className='movie-cover'>
          <div className='top-information'>
            <h2 className='title'>{data[0].title}</h2>
            <div className='circle'>
              <div className='ratings'>
                <span className='big-half'>{data[0].rating}</span>/
                <span className='small-half'>10</span>
              </div>
            </div>
          </div>

          <div className='supporting-info'>
            <span className='year'>{data[0].date}</span> -
            <span className='time'>
              {data[0].hours}h:{data[0].minutes}m
            </span>
          </div>
          <div className='image'>
            <img src={data[0].cover} alt='Movie Image' />
          </div>
        </div>

        <div className='genres'>
          <ul className='movie-genres'>
            {data[0].genres.map((genre, index) => {
              return (
                <li key={index}>
                  <span className='movie-genre-item'>{genre}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className='lower-information'>
          <p>{data[0].description}</p>

          <hr />
          <p>
            {' '}
            Starring:{' '}
            {data[0].stars.map((star, index) => {
              return <span key={index}>{star} - </span>;
            })}
          </p>
          <hr />
          <p>
            {' '}
            Writers:
            {data[0].writers.map((writer, index) => {
              return (
                <span key={index} className='writer'>
                  {writer} -{' '}
                </span>
              );
            })}
          </p>
          <hr />
          <p>
            Directors:
            {data[0].directors.map((director, index) => {
              return (
                <span key={index} className='director'>
                  {director} -{' '}
                </span>
              );
            })}
          </p>
          <hr />
          <div className='action-buttons'>
            <a href={data[0].website} className='visit-movie-button'>
              Visit Movie
            </a>
            <button className='generate-movie-button' onClick={refresh}>
              GENERATE NEW MOVIE
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Sorry No Data, {error}</div>;
  }
};

export default Movie;
