import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import Countdown from "../UI/Countdown";
import axios from "axios";
import SkeletonCard from "../UI/SkeletonCard";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [sliceNum, setSliceNum] = useState(6)

  function handleFilterChange(event) {
    const selectedValue = event.target.value;
    let sortedItems = [...items];

    if (selectedValue === "price_low_to_high") {
      sortedItems.sort((a, b) => a.price - b.price);
    } else if (selectedValue === "price_high_to_low") {
      sortedItems.sort((a, b) => b.price - a.price);
    } else if (selectedValue === "likes_high_to_low") {
      sortedItems.sort((a, b) => b.likes - a.likes);
    }

    setItems(sortedItems);
  }


  useEffect(() => {
    axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore")
      .then((response) => {
        setItems(response.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>

      {
        isLoading ? (
          <>
          <SkeletonCard />
          </>
        ) : (
          <>
           <div>
        <select id="filter-items" onChange={handleFilterChange} defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {items.slice(0, sliceNum).map((item, index) => (
        <div
          key={index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to="/author"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                <img
                  className="lazy"
                  src={item.authorImage || AuthorImage}
                  alt=""
                />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            <Countdown expiryDate={item.expiryDate} />

            <div className="nft__item_wrap">
              <div className="nft__item_extra">
                <div className="nft__item_buttons">
                  <button>Buy Now</button>
                  <div className="nft__item_share">
                    <h4>Share</h4>
                    <a href="/about" target="_blank" rel="noreferrer">
                      <i className="fa fa-facebook fa-lg"></i>
                    </a>
                    <a href="/about" target="_blank" rel="noreferrer">
                      <i className="fa fa-twitter fa-lg"></i>
                    </a>
                    <a href="/contact" target="_blank" rel="noreferrer">
                      <i className="fa fa-envelope fa-lg"></i>
                    </a>
                  </div>
                </div>
              </div>
              <Link to={`/item-details/${item.nftId}`}>
                <img
                  src={item.nftImage || nftImage}
                  className="lazy nft__item_preview"
                  alt=""
                />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to={`/item-details/${item.nftId}`}>
                <h4>{item.title || "Pinky Ocean"}</h4>
              </Link>
              <div className="nft__item_price">
                {item.price ? `${item.price} ETH` : "1.74 ETH"}
              </div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{item.likes || 69}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div onClick={() => setSliceNum(sliceNum + 6)} className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead">
          Load more
        </Link>
      </div>
          </>
        )
      }
        </>
  );
};

export default ExploreItems;