import React, { Component } from "react";
import Input from "./common/input";
import Form from "./common/form";
import Joi from "joi-browser";
import { getGenres } from "../services/fakeGenreService";
import { getMovie, saveMovie } from "../services/fakeMovieService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    genres: [],
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genre: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .integer()
      .min(0)
      .max(100)
      .required()
      .label("Numberr In Stock"),
    dailyRentalRate: Joi.number()
      .integer()
      .min(0)
      .max(10)
      .required()
      .label("Daily Rental Rate")
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    const movieId = this.props.match.params.id;
    if (movieId === "new") return;

    const movie = getMovie(movieId);
    if (!movie) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  }
  doSubmit = () => {
    //console.log("Submitted");
    saveMovie(this.state.data);
    this.props.history.push("/movies");
  };
  render() {
    return (
      <React.Fragment>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}></form>
        {this.renderInput("title", "Title")}
        {this.renderSelect("genreId", "Genre", this.state.genres)}
        {this.renderInput("numberInStock", "Number in Stock")}
        {this.renderInput("dailyRentalRate", "Rate")}

        {this.renderButton("Save")}
      </React.Fragment>
    );
  }
}

export default MovieForm;
// import React, { Component } from "react";

// const MovieForm = ({ match, history }) => {
//   return (
//     <div>
//       <h1>MovieForm {match.params.id}</h1>;
//       <button
//         className="btn btn-primary"
//         onClick={() => history.push("/movies")}
//       >
//         Save
//       </button>
//     </div>
//   );
// };

// export default MovieForm;
