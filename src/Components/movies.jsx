import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";
class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1, //current page and page size for pagination
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" } //setting default to path and order to asc
  };

  componentWillMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()]; //adding one genre more to the array
    this.setState({ movies: getMovies(), genres: genres });
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id != movie._id); //filters and stores all movies in movies and set state
    this.setState({ movies: movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies]; //makes copy of array, finds index of the movie, sets that movie[index] to that copy of array, sets to !value and sets state
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = sortColumn => {
    // this.setState({ sortColumn: { path: path, order: "asc" } });
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      sortColumn,
      currentPage,
      selectedGenre,
      movies: allMovies
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies; //if no genre is selected it returns all movies

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };
  render() {
    const { length: count } = this.state.movies; //length of movies
    const { pageSize, sortColumn, currentPage, selectedGenre } = this.state;

    if (count == 0) return <h3>There are no movies in the database.</h3>;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div class="row">
        <div className="col-3">
          <ListGroup
            selectedItem={selectedGenre}
            items={this.state.genres}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <h3>Showing {totalCount} movies in the database</h3>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination //movie count, pagesize, what happens on page change and current page
            itemsCount={totalCount}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
