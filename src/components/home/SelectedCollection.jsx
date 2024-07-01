import React, { useEffect, useState } from "react";
import SelectedItemVideo from "../../assets/selected-collection.mp4";
import SelectedItemThumbnail from "../../assets/selected-collection-thumbnail.jpg";
import SelectedItemLogo from "../../assets/selected-collection-logo.avif";
import VerifiedIcon from "../../assets/verified.png";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../ui/Skeleton";

export default function SelectedCollection() {
  const [loading, setLoading] = useState(true);
  const [selectedCollection, setSelectedCollection] = useState([]);

  const fetchCollection = async () => {
    try {
      const response = await axios.get(
        "https://remote-internship-api-production.up.railway.app/selectedCollection"
      );
      setSelectedCollection(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollection();
  }, []);

  return (
    <>
      <header>
        <div className="selected-collection">
          {loading ? (
            <Skeleton width="100%" height="100%" border-radius="0px" />
          ) : (
            <>
              <video
                autoPlay
                muted
                loop
                playsInline
                poster={selectedCollection.thumbnail}
                src={selectedCollection.videoLink}
                className="selected-collection__bg"
              />
              <div className="selected-collection__description">
                <img
                  src={selectedCollection.logo}
                  alt=""
                  className="selected-collection__logo"
                />
                <h1 className="selected-collection__title">
                  {selectedCollection.title}
                </h1>
                <Link to={"/user"} className="selected-collection__author">
                  By {selectedCollection.creator}
                  <img
                    src={VerifiedIcon}
                    className="selected-collection__author__verified"
                  />
                </Link>
                <div className="selected-collection__details">
                  {selectedCollection.amountOfItems} items ·{" "}
                  {selectedCollection.floorPrice} ETH
                </div>
                <Link
                  to={`/collection/${selectedCollection.collectionId}`}
                  className="selected-collection__button"
                >
                  <div className="green-pulse"></div>
                  View Collection
                </Link>
              </div>
            </>
          )}
        </div>
      </header>
    </>
  );
}
