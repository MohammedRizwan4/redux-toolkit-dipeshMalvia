import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from '../../common/apis/movieApi'
import { APIKEY } from '../../common/apis/MovieApiKey'

export const fetchAsyncMovies = createAsyncThunk("movies/fetchAsyncMovies", async (term) => {

    const response = await movieApi.get(`?apiKey=${APIKEY}&s=${term}&type=movie`)
    return response.data;
})

export const fetchAsyncShows = createAsyncThunk("shows/fetchAsyncShows", async (term) => {

    const response = await movieApi.get(`?apiKey=${APIKEY}&s=${term}&type=series`)
    return response.data;
})

export const fetchAsyncMovieOrShowDetail = createAsyncThunk("shows/fetchAsyncMovieOrShowDetail", async (id) => {

    const response = await movieApi.get(`?apiKey=${APIKEY}&i=${id}&Plot=full`)
    return response.data;
})

const initialState = {
    movies: {},
    shows: {},
    selectedMovieOrShow: {}
}

const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        removeSelectedMovieOrShow: (state) => {
            state.selectedMovieOrShow = {};
        }
    },
    extraReducers: {
        //lifecycle of async creators
        [fetchAsyncMovies.pending]: () => {
            console.log("Pending");
        },
        [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
            console.log("Movies Fullfilled");
            return { ...state, movies: payload }
        },
        [fetchAsyncMovies.rejected]: () => {
            console.log("Rejected");
        },
        [fetchAsyncShows.fulfilled]: (state, { payload }) => {
            console.log("Shows Fullfilled");
            return { ...state, shows: payload }
        },
        [fetchAsyncMovieOrShowDetail.fulfilled]: (state, { payload }) => {
            console.log("Movie/Show Fullfilled");
            return { ...state, selectedMovieOrShow: payload }
        }
    }
})

export const { removeSelectedMovieOrShow, loadingreducer } = movieSlice.actions;

export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getMovieOrShow = (state) => state.movies.selectedMovieOrShow;

export default movieSlice.reducer;