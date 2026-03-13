import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Homepage.css";
import service from "../services/config.services";
import image1 from "../img/image1.jpg";
import image2 from "../img/image2.jpg";
import image3 from "../img/image3.jpg";

function Homepage() {
  const [dataOnlyForLoggedUsers, setData] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      // call a private route here...
      // call a private route here...
      const response = await service.get(`/example-private-route`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="allpage">
      <div className="blocks">
        <section className="bestProduct">
          <div className="blockProduct">
            <div className="productCardi">
              <img src={image1} alt="product 1" />
            </div>

            <div className="productCardi">
              <img src={image2} alt="product 2" />
            </div>

            <div className="productCardi">
              <img src={image3} alt="product 2" />
            </div>
          </div>

          <div className="text">
         
              <h1 className="ctaButton">become a seller</h1>
          

            <h1 className="ctaButton">become a buyer</h1>
          </div>
        </section>

        <section className="explication">
          <div className="explicationContent">
            <p>
              tu peux acheter, vendre ou compléter ta collection de Pop ! de
              manière simple et sécurisée. Il rassemble les collectionneurs et
              passionnés autour de ces figurines.
            </p>
          </div>
        </section>

        <section className="review">
          <div className="reviewCard">
            <p>
              "Absolutely love these products! The quality is top-notch and
              delivery was super fast. Highly recommend to anyone looking for
              stylish and reliable items!"
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Homepage;
