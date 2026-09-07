import React from "react";
import Skeleton from "./Skeleton";

const SkeletonCard = () => {
  return (
    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
      <div className="nft__item">
        <Skeleton width="50px" height="50px" borderRadius="50%" />
        <Skeleton width="100%" height="230px" borderRadius="8px" />
        <Skeleton width="70%" height="20px" borderRadius="4px" />
        <Skeleton width="40%" height="18px" borderRadius="4px" />
      </div>
    </div>
  );
};

export default SkeletonCard;