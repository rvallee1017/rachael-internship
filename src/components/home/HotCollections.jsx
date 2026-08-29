import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from "../UI/Skeleton";




const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] =useState(true)
  useEffect(() => {
    axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
    .then((response) => {
      console.log(response.data);
      setCollections(response.data);
      setLoading(false)
    });
  }, [])
 
  const settings = {
  dots: true,
  arrows: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};
  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <div className="col-lg-12">
            <Slider {...settings}>
              {collections.map((collection) => (
                <div key={collection.id} style={{ padding: "0 10px" }}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Skeleton width="100%" height="200px" />
                      <Link to="/item-details">
                        <img src={collection.nftImage} className="lazy img-fluid" alt="" />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Skeleton width="50px" height="50px" borderRadius="50%" />
                      <Link to="/author">
                        <img className="lazy pp-coll" src={collection.authorImage} alt="" />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Skeleton width="100px" height="20px" />
                      <Link to="/explore">
                        <h4>{collection.title}</h4>
                        <Skeleton width="60px" height="20px" />
                      </Link>
                      <span>{collection.code}</span>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
