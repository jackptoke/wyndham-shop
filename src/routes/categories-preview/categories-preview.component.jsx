import { Fragment } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../../components/product-card/product-card.component";
import { ProductsContainer, NavLink } from "./categories-preview.styles";

import {
  selectCategoriesMap,
  selectCategoriesIsLoading,
} from "../../store/categories/categories.selector";
import Spinner from "../../components/spinner/spinner.component";

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);

  console.log("Categories Preview - CategoriesMap: ", categoriesMap);
  return isLoading ? (
    <Spinner />
  ) : (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => (
        <Fragment key={title}>
          <NavLink to={`/shop/${title}`}>
            <h2>{title.toUpperCase()}</h2>
          </NavLink>
          <ProductsContainer>
            {categoriesMap[title].slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ProductsContainer>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default CategoriesPreview;
