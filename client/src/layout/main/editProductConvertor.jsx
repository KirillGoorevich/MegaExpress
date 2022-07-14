import EditProduct from "./editProduct";
import { Navigate, useParams } from "react-router-dom";

const EditProductConvertor = ({ user }) => {
  const { id } = useParams();
  if (!user || (user && !user.biz)) return <Navigate replace to="/" />;
  return <EditProduct id={id} />;
};

export default EditProductConvertor;
