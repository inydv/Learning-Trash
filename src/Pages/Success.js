import {useLocation} from "react-router-dom";
import "../Styles/Success.css";

function Success() {
  const location = useLocation();
  return <div className="success">
      successfull
  </div>;
}

export default Success;
