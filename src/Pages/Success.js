import { useLocation } from "react-router-dom";
import "../Styles/Success.css";
import Navbar from "../Components/Navbar";
import NewsLetter from "../Components/NewsLetter";
import Footer from "../Components/Footer";

function Success() {
  const location = useLocation();
  return (
    <div className="success">
      <Navbar />
      successfull
      <NewsLetter />
      <Footer />
    </div>
  );
}

export default Success;
