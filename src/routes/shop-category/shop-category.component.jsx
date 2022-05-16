import { useContext, Fragment } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import ProductCard from "../../components/product-card/product-card.component";
import { useParams } from "react-router-dom";
import { ProductsContainer } from "../categories-preview/categories-preview.styles";

const ShopCategory = () => {
  let { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  return (
    <Fragment>
      <h2>{category.toUpperCase()}</h2>
      <ProductsContainer>
        {categoriesMap[category].map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductsContainer>
    </Fragment>
  );
};

export default ShopCategory;
