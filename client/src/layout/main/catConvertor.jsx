import { useLocation } from "react-router-dom";
import CatOrder from "./catOrder";

const CatOrderConvertor = () => {
  const location = useLocation();
  const {cat} = location.state;
  return <CatOrder cat={cat}/>;
};

export default CatOrderConvertor;
