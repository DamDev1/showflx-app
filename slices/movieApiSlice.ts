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
        shortListMovies: builder.query<{ shorts: Short[] }, void>({
            query: () => '/user/shorts',
            providesTags: ['Shorts'],
        }),
        getMovieById: builder.query({
            query: (id) => `/user/movies/${id}`,
        }),
        getTrendingMovies: builder.query({
            query: () => '/user/browse/trending',
        }),
        getPopularMovies: builder.query({
            query: () => '/user/browse/popular',
        }),
        getNewReleases: builder.query({
            query: () => '/user/browse/new-releases',
        }),
        getContinueWatching: builder.query({
            query: () => '/user/history',
            keepUnusedDataFor: 0, // Always refetch to get latest progress
        }),
        saveWatchProgress: builder.mutation({
            query: (data) => ({
                url: '/user/history',
                method: 'POST',
                body: data,
            }),
        }),
        incrementMovieView: builder.mutation({
            query: (id) => ({
                url: `/user/movies/${id}/view`,
                method: 'POST',
            }),
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

export const { useSearchMoviesQuery, useGetTrendingMoviesQuery, useShortListMoviesQuery, useGetMovieByIdQuery, useGetPopularMoviesQuery, useGetNewReleasesQuery, useGetContinueWatchingQuery, useSaveWatchProgressMutation, useIncrementMovieViewMutation } = movieApiSlice;
