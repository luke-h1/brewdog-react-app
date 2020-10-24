import React, { Fragment, useState } from 'react';
import './search.scss';
const Search = () => {
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const showError = (msg) => {
    setError(msg);
    setTimeout(() => {
      setError('');
    }, 2000);
  };

  const onClick = async () => {
    try {
      const BASE_URL = `https://api.punkapi.com/v2/beers`;
      const res = await fetch(`${BASE_URL}`);
      const data = await res.json();
      const i = Math.floor(Math.random() * 15);
      const result = (
        <div className="card">
          <div className="img-container">
            <img src={data[i].image_url} alt="beer" className="img" />
          </div>
          <h3>{data[i].name}</h3>
          <h3>{data[i].tagline}</h3>
          <h3>Strength: {data[i].abv} %</h3>
          <h3>First Brewed: {data[i].first_brewed}</h3>
          <p>{data[i].description}</p>
        </div>
      );
      setResult(result);
    } catch (e) {
      console.log(e);
      showError(<h1>Something went wrong</h1>);
    }
  };

  return (
    <Fragment>
      <div className="search-container">
        <input
          type="submit"
          className="search__input"
          placeholder="Submit"
          onClick={onClick}
        />
      </div>
      {error}
      <div className="result-container">{result}</div>
    </Fragment>
  );
};
export default Search;
