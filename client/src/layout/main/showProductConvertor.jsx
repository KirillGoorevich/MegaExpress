import { useParams } from "react-router-dom";
import ShowProduct from "./showProduct";



const ShowProductConvertor = ({ user }) => {
  const { id } = useParams();
  return <ShowProduct id={id} />;
};

export default ShowProductConvertor;
