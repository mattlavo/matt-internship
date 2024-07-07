import { faEye, faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faShapes,
  faTag,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import RecommendedItems from "../components/item/RecommendedItems";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/ui/Skeleton";

export default function ItemPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [selectedNFT, setSelectedNFT] = useState([]);
  const [remainingTime, setRemainingTime] = useState(null);

  const fetchItemData = async () => {
    try {
      const { data: response } = await axios.get(
        `https://remote-internship-api-production.up.railway.app/item/${id}`
      );
      setSelectedNFT(response.data);

      const saleEndTime = new Date(response.data.expiryDate).getTime();
      const currentTime = Date.now()
      setRemainingTime(saleEndTime - currentTime);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItemData();
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime((prevTime) => Math.max(prevTime - 1000, 0));
    }, 1000);

    return () => clearInterval(intervalId);
  })

  const formatRemainingTime = (ms) => {
    if(ms <= 0) return "0h 0m 0s";

    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours}h ${minutes}m ${seconds}s`
  }
  

  return (
    <>
      <section id="item-info">
        <div className="container">
          <div className="row item-page__row">
            <div className="item-page__left">
              <figure className="item-page__img__wrapper">
                <div className="item-page__img__details">
                  <FontAwesomeIcon
                    icon={faEthereum}
                    className="item-page__img__icon"
                  />
                  {loading ? (
                    <Skeleton width="36px" height="16px" borderRadius={0} />
                  ) : (
                    <div className="item-page__img__likes">
                      <FontAwesomeIcon
                        icon={faHeart}
                        className="item-page__img__icon"
                      />
                      <span className="item-page__img__likes__text">
                        {selectedNFT.favorites}
                      </span>
                    </div>
                  )}
                </div>
                {loading ? (
                  <Skeleton width="100%" height="100%" borderRadius={0} />
                ) : (
                  <img
                    src={selectedNFT.imageLink}
                    alt=""
                    className="item-page__img"
                  />
                )}
              </figure>
            </div>
            <div className="item-page__right">
              <Link
                to={`/collection/${selectedNFT.collectionId}`}
                className="item-page__collection light-blue"
              >
                {loading ? (
                  <Skeleton width="140px" height="16px" borderRadius={0} />
                ) : (
                  selectedNFT?.collection
                )}
              </Link>

              {loading ? (
                <Skeleton width="260px" height="16px" borderRadius={0} />
              ) : (
                <h1 className="item-page__name">{selectedNFT.title}</h1>
              )}
              <span className="item-page__owner">
                {loading ? (
                  <Skeleton width="140px" height="16px" borderRadius={0} />
                ) : (
                  <>
                    Owned by{" "}
                    <Link
                      to={`/user/${selectedNFT.ownerId}`}
                      className="light-blue item-page__owner__link"
                    >
                      {selectedNFT?.owner}
                    </Link>
                  </>
                )}
              </span>

              <div className="item-page__details">
                <div className="item-page__detail">
                  {loading ? (
                    <Skeleton width="81px" height="16px" borderRadius={0} />
                  ) : (
                    <>
                      <FontAwesomeIcon
                        icon={faEye}
                        className="item-page__detail__icon"
                      />
                      <span className="item-page__detail__text">
                        {selectedNFT.views} views
                      </span>
                    </>
                  )}
                </div>
                <div className="item-page__detail">
                  {loading ? (
                    <Skeleton width="81px" height="16px" borderRadius={0} />
                  ) : (
                    <>
                      <FontAwesomeIcon
                        icon={faHeart}
                        className="item-page__detail__icon"
                      />
                      <span className="item-page__detail__text">
                        {selectedNFT.favorites} favorites
                      </span>
                    </>
                  )}
                </div>
                <div className="item-page__detail">
                  {loading ? (
                    <Skeleton width="81px" height="16px" borderRadius={0} />
                  ) : (
                    <>
                      <FontAwesomeIcon
                        icon={faShapes}
                        className="item-page__detail__icon"
                      />
                      <span className="item-page__detail__text">
                        {selectedNFT.category}
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div className="item-page__sale">
                <div className="item-page__sale__header">
                  {loading || remainingTime === null ? (
                    <Skeleton width="240px" height="16px" borderRadius={0} />
                  ) : (
                    <>
                      <div className="green-pulse"></div>
                      <span>Sale ends in {formatRemainingTime(remainingTime)}</span>
                    </>
                  )}
                </div>
                <div className="item-page__sale__body">
                  {loading ? (
                    <Skeleton width="84px" height="16px" />
                  ) : (
                    <span className="item-page__sale__label">
                      Current price
                    </span>
                  )}
                  <div className="item-page__sale__price">
                    {loading ? (
                      <span className="item-page__sale__price__eth">
                        <Skeleton
                          width="152px"
                          height="16px"
                          borderRadius={0}
                        />
                      </span>
                    ) : (
                      <span className="item-page__sale__price__eth">
                        {selectedNFT.ethPrice} ETH
                      </span>
                    )}

                    {loading ? (
                      <span className="item-page__sale__price__eth">
                        <Skeleton
                          width="152px"
                          height="16px"
                          borderRadius={0}
                        />
                      </span>
                    ) : (
                      <span className="item-page__sale__price__dollars">
                        {selectedNFT.usdPrice}
                      </span>
                    )}
                  </div>
                  <div className="item-page__sale__buttons">
                    {loading ? (
                      <Skeleton width="100%" height="48px" borderRadius={16} />
                    ) : (
                      <>
                        <div className="item-page__sale__buy">
                          <button className="item-page__sale__buy__button disabled">
                            Buy now
                          </button>
                          <button className="item-page__sale__buy__icon disabled">
                            <FontAwesomeIcon icon={faShoppingBag} />
                          </button>
                        </div>
                        <button className="item-page__sale__offer disabled">
                          <FontAwesomeIcon icon={faTag} />
                          Make offer
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {!loading && selectedNFT && <RecommendedItems nft={selectedNFT} />}
    </>
  );
}
