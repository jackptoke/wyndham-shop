import { useContext, Fragment } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import ProductCard from "../../components/product-card/product-card.component";
import { ProductsContainer, NavLink } from "./categories-preview.styles";

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);

  return (
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
