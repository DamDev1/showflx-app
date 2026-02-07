import { apiSlice } from './apiSlice';

export interface Movie {
    id: string;
    title: string;
    description: string;
    posterUrl: string;
    backdropUrl: string;
    year: number;
    rating: number;
    duration: string;
    genres: string[];
}

export const movieApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        searchMovies: builder.query<Movie[], string>({
            query: (query) => ({
                url: `/movies/search?query=${encodeURIComponent(query)}`,
                method: 'GET',
            }),
        }),
        getTrendingMovies: builder.query<Movie[], void>({
            query: () => '/movies/trending',
        }),

        shortListMovies: builder.query({
            query: () => '/user/shorts',
        }),
    }),
});

export const { useSearchMoviesQuery, useGetTrendingMoviesQuery, useShortListMoviesQuery } = movieApiSlice;
