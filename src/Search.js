import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [inStock, setInStock] = useState(false);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    search();
  }, [name, inStock]);

  const search = () => {
    let searchObj = {};
    if (name) {
      //console.log(`name: ${name}`);
      searchObj = { ...searchObj, name: name };
    }
    if (inStock) {
      //console.log(`inStock: ${inStock}`);
      searchObj = { ...searchObj, inStock: inStock };
    }

    if (name || inStock) {
      navigate(`/products/${JSON.stringify(searchObj)}`);
    }
  };

  return (
    <div>
      <input
        value={name}
        placeholder='search by name'
        onChange={ev => {
          setName(ev.target.value);
        }}
      />
      <input
        type='checkbox'
        checked={inStock}
        onChange={ev => setInStock(ev.target.checked)}
      />
    </div>
  );
};

export default Search;
