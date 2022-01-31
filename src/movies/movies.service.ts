import { Injectable } from '@nestjs/common';
import axios from 'axios';

const MOVIE_API_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMzk5NTFiYTNjYjY0NjM2NGFlMTBiYzYwMTkwNDMxOSIsInN1YiI6IjVhOGQ2YjlmMGUwYTI2N2M2YjAwOWI0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cNgg2SipXIOCj1ofoTS03sx5We_ID1WQvumzTbyzx8E';
const headers = {
  'Content-Type': 'application/json;charset=utf-8',
  Authorization: `Bearer ${MOVIE_API_KEY}`,
};

export class Movie {
  poster_path: string;
  title: string;
  overview: string;
}

@Injectable()
export class MoviesService {
  private cache = [];

  private async cachedMoviePromise(id?: number): Promise<Movie[] | Movie> {
    if (this.cache.length === 0) {
      const {
        data: { results: movies },
      } = await axios.get('https://api.themoviedb.org/3/movie/popular', {
        headers,
      });

      movies.forEach(({ poster_path, title, overview }) => {
        this.cache.push({ poster_path, title, overview });
      });
    }

    if (id) {
      return this.cache[id];
    }
    return this.cache;
  }

  async findAll() {
    const movies = await this.cachedMoviePromise();
    return movies as Movie[];
  }

  async findOne(id: number) {
    const movie = await this.cachedMoviePromise(id);
    return movie as Movie;
  }
}
