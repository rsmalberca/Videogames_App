import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "../NewVideogame/NewVideogame.module.css";
import {
  getGenres,
  getVideogames,
  newVideogame,
} from "../../redux/actions/actions";
import { useEffect } from "react";
import SimpleHeader from "../SimpleHeader/SimpleHeader";

const regexName = /^[\w'\-,.][^_!¡?÷?¿/\\+=@#$%^&*(){}|~<>;:[\]]{2,}$/i;

const validate = (inputs) => {
  const errors = {};
  if (!inputs.platforms.length)
    errors.platforms = "At least 01 platform is required";
  if (!inputs.genres.length) errors.genres = "At least 01 genre is required";
  if (!inputs.name || inputs.name[0] === " " || !regexName.test(inputs.name))
    errors.name =
      "Please enter a valid name. Only letters, numbers, - and . are allowed";
  if (!inputs.description || inputs.description[0] === " ")
    errors.description =
      "The description is a required field. Max 2000 characters";
  if (!inputs.released)
    errors.released = "The date of release is a required field";
  if (!inputs.rating || inputs.rating < 1 || inputs.rating > 5)
    errors.rating = "Enter a rating between 1.0 and 5.0";
  return errors;
};

function NewVideogame() {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const videogames = useSelector((state) => state.allVideogames);

  useEffect(() => {
    dispatch(getVideogames());
    dispatch(getGenres());
    return () => {
      dispatch(getVideogames());
    };
  }, [dispatch]);

  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
    platforms: [],
    genres: [],
    createdByUser: true,
    image: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
    platforms: "",
    genres: "",
  });

  const inputChangeHandler = (e) => {
    e.preventDefault();
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const genreSelectHandler = (e) => {
    if (e.target.value !== "default") {
      setInput({
        ...input,
        genres: [...new Set([...input.genres, e.target.value])],
      });
      e.target.value = "default";
      setErrors(
        validate({
          ...input,
          [e.target.name]: e.target.value,
        })
      );
    }
  };

  const platformSelectHandler = (e) => {
    if (e.target.value !== "default") {
      setInput({
        ...input,
        platforms: [...new Set([...input.platforms, e.target.value])],
      });
      e.target.value = "default";
      setErrors(
        validate({
          ...input,
          [e.target.name]: e.target.value,
        })
      );
    }
  };

  const genreDeleteHandler = (e) => {
    setInput({
      ...input,
      genres: input.genres.filter((genre) => genre !== e.target.value),
    });
  };

  const platformDeleteHandler = (e) => {
    setInput({
      ...input,
      platforms: input.platforms.filter(
        (platform) => platform !== e.target.value
      ),
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(newVideogame(input));
    setInput({
      name: "",
      description: "",
      released: "",
      rating: 1,
      platforms: [],
      genres: [],
      createdByUser: true,
      image: "",
    });
    setErrors({
      name: "",
      description: "",
      released: "",
      rating: "",
      platforms: "",
      genres: "",
    });
  };

  // Get all the platforms
  const allPlatforms = [];
  videogames.map((videogame) =>
    videogame.platforms?.map((platform) => allPlatforms.push(platform))
  );
  let platforms = [...new Set(allPlatforms)];

  return (
    <div>
      <SimpleHeader />
      <form onSubmit={submitHandler} className={style.formContainer}>
        <h2 className={style.formTitle}>Create your own Video Game 🎮</h2>
        <div className={style.inputsContainer}>
          <div className={style.input__group__name}>
            <label htmlFor="name" className={style.input__label}>
              Name{" "}
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={input.name}
              onChange={inputChangeHandler}
              placeholder="Enter a name..."
              autoComplete="off"
              autoFocus="on"
              required
              className={style.input__name}
            />
            {!errors.name ? null : (
              <span className={style.danger}>{errors.name}</span>
            )}
          </div>
          <div className={style.input__group__description}>
            <label htmlFor="description" className={style.input__label}>
              Description{" "}
            </label>
            <textarea
              name="description"
              id="description"
              rows="5"
              cols="50"
              maxLength="2000"
              value={input.description}
              onChange={inputChangeHandler}
              placeholder="Enter a description..."
              autoComplete="off"
              required
              className={style.input__description}
            />
            {!errors.description ? null : (
              <span className={style.danger}>{errors.description}</span>
            )}
          </div>
          <div className={style.input__group__image}>
            <label htmlFor="image" className={style.input__label}>
              Image (optional){" "}
            </label>
            <input
              type="text"
              name="image"
              id="image"
              value={input.image}
              onChange={inputChangeHandler}
              placeholder="Enter an URL..."
              autoComplete="off"
              className={style.input__image}
            />
          </div>
          <div className={style.input__group__released}>
            <label htmlFor="released" className={style.input__label}>
              Date of release{" "}
            </label>
            <input
              type="date"
              name="released"
              id="released"
              value={input.released}
              onChange={inputChangeHandler}
              className={style.input__released}
            />
            {!errors.released ? null : (
              <span className={style.danger}>{errors.released}</span>
            )}
          </div>
          <div className={style.input__group__rating}>
            <label htmlFor="rating" className={style.input__label}>
              Rating{" "}
            </label>
            <input
              type="number"
              id="rating"
              name="rating"
              value={input.rating}
              onChange={inputChangeHandler}
              min="1"
              max="5"
              step="0.01"
              placeholder="1 - 5"
              className={style.input__rating}
            />
            {!errors.rating ? null : (
              <span className={style.danger}>{errors.rating}</span>
            )}
          </div>
          <div className={style.input__group__platforms}>
            <label className={style.input__label}>Platforms </label>
            <div>
              <select
                name="platforms"
                id="platforms"
                onChange={platformSelectHandler}
                className={style.input__platforms}
              >
                <option value="default">Select a platform</option>
                {platforms.map((platform) => {
                  return (
                    <option key={platform} value={platform}>
                      {platform}
                    </option>
                  );
                })}
              </select>
            </div>
            {!errors.platforms ? null : (
              <span className={style.danger}>{errors.platforms}</span>
            )}
          </div>
          {input.platforms.length ? (
            <div className={style.GPselected}>
              <h2 className={style.genre_text}>Platforms selected: </h2>
              <div className={style.genres}>
                {input.platforms.map((platform) => {
                  return (
                    <div key={platform} className={style.genre}>
                      {platform}{" "}
                      <button
                        onClick={platformDeleteHandler}
                        value={platform}
                        className={style.deleteButton}
                      >
                        &#10006;
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
          <div className={style.input__group__genres}>
            <label className={style.input__label}>Genres </label>
            <div>
              <select
                name="genres"
                id="genres"
                onChange={genreSelectHandler}
                className={style.input__genres}
              >
                <option value="default">Select a genre</option>
                {genres.map((genre) => {
                  return (
                    <option key={genre.id} value={genre.name}>
                      {genre.name}
                    </option>
                  );
                })}
              </select>
            </div>
            {!errors.genres ? null : (
              <span className={style.danger}>{errors.genres}</span>
            )}
          </div>
          {input.genres.length ? (
            <div className={style.GPselected}>
              <h2 className={style.genre_text}>Genres selected: </h2>
              <div className={style.genres}>
                {input.genres.map((genre) => {
                  return (
                    <div key={genre} className={style.genre}>
                      {genre}{" "}
                      <button
                        onClick={genreDeleteHandler}
                        value={genre}
                        className={style.deleteButton}
                      >
                        &#10006;
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
          {!Object.values(errors).length ? (
            <div className={style.divButtonCreate}>
              <button type="submit" className={style.create__button}>
                Create Video Game
              </button>
            </div>
          ) : null}
        </div>
      </form>
    </div>
  );
}

export default NewVideogame;
