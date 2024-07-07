import { faShoppingBag, faTableCells } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Skeleton from "../ui/Skeleton";

export default function RecommendedItems({ nft }) {
  const [loading, setLoading] = useState(true);
  const [collection, setCollection] = useState([]);
  const [swiperKey, setSwiperKey] = useState(0);
  const [filteredItems, setFilteredItems] = useState([]);

  const fetchCollection = async () => {
    try {
      const { data: response } = await axios.get(
        `https://remote-internship-api-production.up.railway.app/collection/${nft.collectionId}`
      );
      setCollection(response.data);
      setSwiperKey(swiperKey + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollection();
  }, []);

  console.log(nft);

  return (
    <section id="recommended-items">
      <div className="container">
        <div className="row recommended-items__row">
          <div className="recommended-items__wrapper">
            <div className="recommended-items__header">
              {loading ? (
                <Skeleton width="240px" height="16px" borderRadius={0} />
              ) : (
                <>
                  <FontAwesomeIcon icon={faTableCells} />
                  <h3 className="recommended-items__header__title">
                    More from this collection
                  </h3>
                </>
              )}
            </div>
            <div className="recommended-items__body">
              <Swiper
                key={swiperKey}
                breakpoints={{
                  0: {
                    width: 0,
                    slidesPerView: 1,
                  },
                  368: {
                    width: 368,
                    slidesPerView: 1,
                  },
                  768: {
                    width: 768,
                    slidesPerView: 2,
                  },
                  1024: {
                    width: 992,
                    slidesPerView: 3,
                  },
                  1220: {
                    width: 1220,
                    slidesPerView: 4,
                  },
                  1440: {
                    width: 1440,
                    slidesPerView: 5,
                  },
                }}
                modules={[Navigation, Pagination]}
                spaceBetween={12}
                loop
                navigation
                slidesPerView={6}
              >
                {loading
                  ? new Array(6).fill(0).map((_, index) => (
                      <div className="item-column">
                        <SwiperSlide>
                          <Link to={"/item"} key={index} className="item">
                            <figure className="item__img__wrapper">
                              <Skeleton
                                width="100%"
                                height="100%"
                                borderRadius={4}
                              />
                            </figure>
                            <div className="item__details">
                              <span className="item__details__name">
                                <Skeleton width="80px" height="16px" />
                              </span>
                              <span className="item__details__price">
                                <Skeleton width="48px" height="16px" />
                              </span>
                              <span className="item__details__last-sale">
                                <Skeleton width="120px" height="16px" />
                              </span>
                            </div>
                          </Link>
                        </SwiperSlide>
                      </div>
                    ))
                  : collection.items
                      ?.filter((item) => item.itemId !== nft?.id)
                      .slice(0, 10)
                      .map((recommendedNft, index) => (
                        <div className="item-column">
                          <SwiperSlide>
                            <Link
                              to={`/item/${recommendedNft.itemId}`}
                              key={index}
                              className="item"
                            >
                              <figure className="item__img__wrapper">
                                <img
                                  src={recommendedNft.imageLink}
                                  alt=""
                                  className="item__img"
                                />
                              </figure>
                              <div className="item__details">
                                <span className="item__details__name">
                                  {recommendedNft.title}
                                </span>
                                <span className="item__details__price">
                                  {parseFloat(recommendedNft.price).toFixed(2)}{" "}
                                  ETH
                                </span>
                                <span className="item__details__last-sale">
                                  Last sale: {recommendedNft.lastSale} ETH
                                </span>
                              </div>
                              <div className="item__see-more">
                                <button className="item__see-more__button">
                                  See More
                                </button>
                                <div className="item__see-more__icon">
                                  <FontAwesomeIcon icon={faShoppingBag} />
                                </div>
                              </div>
                            </Link>
                          </SwiperSlide>
                        </div>
                      ))}
              </Swiper>
            </div>

            <div className="recommended-items__footer">
              {loading ? (
                <Skeleton width="120px" height="24px" />
              ) : (
                <Link
                  to={`/collection/${nft.collectionId}`}
                  className="recommended-items__footer__button"
                >
                  View Collection
                </Link>

              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
