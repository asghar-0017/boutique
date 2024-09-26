import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import clsx from "clsx";
import { getDiscountPrice } from "../../helpers/product";
import ProductDescriptionInfo from "../../components/product/ProductDescriptionInfo";

const ProductImageDescription = ({ spaceTopClass, spaceBottomClass, product }) => {
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { compareItems } = useSelector((state) => state.compare);

  // Fetch wishlist and compare item based on the product ID from API response
  const wishlistItem = wishlistItems.find(item => item.id === product.id);
  const compareItem = compareItems.find(item => item.id === product.id);

  // Fetch the discounted price from the API product data
  const discountedPrice = getDiscountPrice(product.price, product.discount);

  // Calculate final product prices based on the currency
  const finalProductPrice = +(product.price * currency.currencyRate).toFixed(2);
  const finalDiscountedPrice = discountedPrice 
    ? +(discountedPrice * currency.currencyRate).toFixed(2) 
    : null;

  return (
    <div className={clsx("shop-area", spaceTopClass, spaceBottomClass)}>
      <div className="container">
        <div className="row">
          {/* Product single image */}
          <div className="col-lg-6 col-md-6">
            <div className="product-large-image-wrapper">
              {product.Imageurl && product.Imageurl.length > 0 ? (
                <img
                  src={product.Imageurl}
                  alt={product.name}
                  className="img-fluid"
                />
              ) : (
                <p>No image available</p>
              )}
            </div>
          </div>
          
          {/* Product description info */}
          <div className="col-lg-6 col-md-6">
            <ProductDescriptionInfo
              product={product}
              discountedPrice={discountedPrice}
              currency={currency}
              finalDiscountedPrice={finalDiscountedPrice}
              finalProductPrice={finalProductPrice}
              cartItems={cartItems}
              wishlistItem={wishlistItem}
              compareItem={compareItem}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

ProductImageDescription.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired, // API product should have 'id'
    name: PropTypes.string.isRequired, // Ensure 'name' exists for alt text
    price: PropTypes.number.isRequired, // Ensure 'price' exists
    discount: PropTypes.number, // 'discount' may be optional
    image: PropTypes.arrayOf(PropTypes.string).isRequired, // Ensure images array exists
    // Add other product properties as needed
  }),
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default ProductImageDescription;
