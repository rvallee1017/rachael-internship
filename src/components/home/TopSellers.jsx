import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SkeletonCard from "../UI/SkeletonCard";
import AOS from "aos";
import "aos/dist/aos.css";

//https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers

const TopSellers = () => {
  AOS.init();

  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers")
      .then((response) => {
        setAuthors(response.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div data-aos="fade-up" data-aos-duration="1000">
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
            new Array(12).fill(0).map((_, index) => <SkeletonCard key={index} />)
          ) : (
            <div className="col-md-12">
            <ol className="author_list">
              {authors.map((author) => (
                <li key={author.id}>
                  <div className="author_list_pp">
                    <Link to={`/author/${author.id}`}>
                      <img
                        className="lazy pp-author"
                        src={author.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${author.id}`}>{author.authorName}</Link>
                    <span>{author.price} ETH</span>
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
    </div>
  );
};

export default TopSellers;
