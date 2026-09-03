import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import axios from "axios";
import SkeletonCard from "../components/UI/SkeletonCard";


//https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=17914494

const ItemDetails = () => {
  const [loading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [ownerImage, setOwnerImage] = useState(AuthorImage);
  const [creatorImage, setCreatorImage] = useState(AuthorImage);

   useEffect(() => {
    axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${items.id}`)
    .then((response) => {
      console.log(response.data);
      setItems([response.data]);
      setIsLoading(false)
    });
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>

    {
        loading ? (
          <>
          <SkeletonCard />
          </>
        ) : (
          <>

    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{items.title || "Rainbow Style #194"}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {items.views || 100}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                     {items.likes || 74}
                    </div>
                  </div>
                  <p>
                    {items.description || "doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."}
                  </p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to="/author">
                            <img className="lazy" src={items.ownerImage || ownerImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to="/author">{`${items.ownerName || "Monica Lucas"}`}</Link>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to="/author">
                            <img className="lazy" src={items.creatorImage || creatorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to="/author">{`${items.creatorName || "Monica Lucas"}`}</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{items.price ? `${items.price} ETH` : "1.85"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    </>
        )
      }
      </>
  );
};

export default ItemDetails;
