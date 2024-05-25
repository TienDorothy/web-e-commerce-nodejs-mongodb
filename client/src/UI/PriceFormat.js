const PriceFormat = ({ price }) => {
  if (price === null || price === undefined) {
    price = 0;
  }
  return price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
};

export default PriceFormat;
