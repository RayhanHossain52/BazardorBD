import Banner from "./components/Banner";
import Marquee from "./components/Marquee";
import PriceIncreaseProduct from "./components/IncreaseProducts/PriceIncreaseProduct";
import PriceDecreaseProduct from "./components/DecreaseProducts/PriceDecreaseProduct";
import AllProduct from "./components/AllProductList/AllProduct";

export default function Home() {
  return (
    <div>
      <Marquee></Marquee>
      <Banner></Banner>
      <PriceIncreaseProduct></PriceIncreaseProduct>
      <PriceDecreaseProduct></PriceDecreaseProduct>
      <AllProduct></AllProduct>
      </div>
  );
}
