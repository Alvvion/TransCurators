import { AllProduct } from "@/app/(products)/shop/page";

type ProductDetailsProps = {
  id: string;
  products: AllProduct[];
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ id, products }) => {
  return <div>ProductDetails</div>;
};

export default ProductDetails;
