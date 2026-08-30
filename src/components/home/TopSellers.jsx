import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";
import SkeletonCard from "../UI/SkeletonCard";

//https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers

const TopSellers = () => {

const [Author, setAuthor] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers")
      .then((response) => {
        setAuthor(response.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <div className="col-lg-12">
          {loading ? (
            new Array(12).fill(0).map((Author, index) => <SkeletonCard key={index} />)
          ) : (
            <div className="col-md-12">
            <ol className="author_list">
              {new Array(12).fill(0).map((Author, index) => (
                <li key={index}>
                  <div className="author_list_pp">
                    <Link to="/author">
                      <img
                        className="lazy pp-author"
                        src={AuthorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to="/author">{Author.name}</Link>
                    <span>{Author.price ? `${Author.price} ETH` : "2.1 ETH"}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
