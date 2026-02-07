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

        shortListMovies: builder.query<{ shorts: Short[] }, void>({
            query: () => '/user/shorts',
            providesTags: ['Shorts'],
        }),
    }),
});

export interface Short {
    id: string;
    videoUrl: string;
    title: string;
    movieTitle: string;
    movieId: string;
    likes: string;
    comments: string;
}

export const { useSearchMoviesQuery, useGetTrendingMoviesQuery, useShortListMoviesQuery } = movieApiSlice;
