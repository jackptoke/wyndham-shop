import { Fragment } from "react";
import { useSelector } from "react-redux";

import ProductCard from "../../components/product-card/product-card.component";
import { useParams } from "react-router-dom";
import { ProductsContainer } from "../categories-preview/categories-preview.styles";

import { selectCategoriesMap } from "../../store/categories/categories.selector";

const ShopCategory = () => {
  let { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  console.log("CATEGORY: ", category);
  console.log("Category Map: ", categoriesMap);
  return (
    <Fragment>
      <h2>{category.toUpperCase()}</h2>
      <ProductsContainer>
        {categoriesMap[category] &&
          categoriesMap[category].map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </ProductsContainer>
    </Fragment>
  );
};

export default ShopCategory;
