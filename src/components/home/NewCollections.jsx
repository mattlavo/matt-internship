import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Pagination } from "swiper/modules";
import Skeleton from "../ui/Skeleton";

export default function NewCollections() {
  // https://remote-internship-api-production.up.railway.app/newCollections

  const [newCollections, setNewCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [swiperKey, setSwiperKey] = useState(0);

  const fetchNewCollection = async () => {
    try {
      const { data: response } = await axios.get(
        "https://remote-internship-api-production.up.railway.app/newCollections"
      );
      setNewCollections(response.data);
      setSwiperKey(swiperKey + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewCollection();
  }, []);

  return (
    <section id="new-collections">
      <div className="container">
        <div className="row">
          <h2 className="new-collections__title">New Collections</h2>
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
            <div className="new-collections__body">
              {loading
                ? new Array(8).fill(0).map((collection, index) => (
                    <SwiperSlide>
                      <Link
                        to={`/collection/${collection.collectionId}`}
                        key={index}
                        className="collection"
                      >
                        {/* <img
                          src={collection.imageLink}
                          alt=""
                          className="collection__img"
                        /> */}
                        <div className="collection__img">
                          <Skeleton
                            width="100%"
                            height="100%"
                            borderRadius={0}
                          />
                        </div>
                        <div className="collection__info">
                          {/* <h3 className="collection__name">
                            {collection.title}
                          </h3> */}
                          <div className="collection__stats">
                            <div className="collection__stat">
                              <span className="collection__stat__label">
                                <Skeleton width="48px" height="16px" />
                              </span>
                              <span className="collection__stat__data">
                                <Skeleton width="90px" height="16px" /> 
                              </span>
                            </div>
                            <div className="collection__stat">
                              <span className="collection__stat__label">
                                <Skeleton width="48px" height="16px" />
                              </span>
                              <span className="collection__stat__data">
                                <Skeleton width="90px" height="16px" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))
                : newCollections.map((collection, index) => (
                    <div key={index} className="collection-column">
                      <SwiperSlide>
                        <Link
                          to={`/collection/${collection.collectionId}`}
                          key={index}
                          className="collection"
                        >
                          <img
                            src={collection.imageLink}
                            alt=""
                            className="collection__img"
                          />
                          <div className="collection__info">
                            <h3 className="collection__name">
                              {collection.title}
                            </h3>
                            <div className="collection__stats">
                              <div className="collection__stat">
                                <span className="collection__stat__label">
                                  Floor
                                </span>
                                <span className="collection__stat__data">
                                  {parseFloat(collection.floor).toFixed(2)} ETH
                                </span>
                              </div>
                              <div className="collection__stat">
                                <span className="collection__stat__label">
                                  Total Volume
                                </span>
                                <span className="collection__stat__data">
                                  {collection.totalVolume} ETH
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </SwiperSlide>
                    </div>
                  ))}
            </div>
          </Swiper>
        </div>
      </div>
    </section>
  );
}
