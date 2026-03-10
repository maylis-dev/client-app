import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Homepage.css";
import service from "../services/config.services";

function Homepage() {

  const [dataOnlyForLoggedUsers, setData] = useState(null)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      
      // call a private route here...
        // call a private route here...
      const response = await service.get(`/example-private-route`)
      console.log(response)

    } catch (error) {
      console.log(error)
    }
  }





  return (
    <div className="allpage">
      <div className="blocks">
        <div className=" bestProduct">
          <div className="blockProduct">
            <div> product 1</div>

            <div> product 2</div>
            <div> product 3</div>
            <div> product 4</div>
          </div>
          <div className="text">
            <Link to="/about">
              <h1>become a seller</h1>
            </Link>
            <h1>become a buyer </h1>
          </div>
        </div>

        <div className="explication">
          <div>
            <p> sbzhezf</p>
          </div>
        </div>
        <div className=" review">
          <div className="review1">
            <p>reviw 1</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
