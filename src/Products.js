import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const Products = () => {
  const { products } = useSelector(state => state);
  const { searchUrl } = useParams();
  let canSearchName = false;
  let canSearchStock = false;

  if (searchUrl !== '{}' && !!searchUrl) {
    if (JSON.parse(searchUrl).name) {
      canSearchName = true;
    }
    if (JSON.parse(searchUrl).inStock) {
      canSearchStock = true;
    }
  }

  const filteredProducts = products.filter(product => {
    if (canSearchName && canSearchStock) {
      if (
        product.name.includes(JSON.parse(searchUrl).name) &&
        product.inStock
      ) {
        return true;
      } else {
        return false;
      }
    }

    if (canSearchName) {
      if (product.name.includes(JSON.parse(searchUrl).name)) {
        return true;
      } else {
        return false;
      }
    }

    if (canSearchStock) {
      if (product.inStock) {
        return true;
      } else {
        return false;
      }
    }

    return true;
  });

  return (
    <div>
      {filteredProducts.length !== 0 ? (
        <ul>
          {filteredProducts.map(product => {
            return (
              <li key={product.id}>
                {product.name}
                {!!product.inStock && <em> is in stock</em>}
              </li>
            );
          })}
        </ul>
      ) : (
        <Link to='/products'>Reset?</Link>
      )}
    </div>
  );
};

export default Products;
