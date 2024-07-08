import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../components/ui/Skeleton";

export default function UserPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [itemsLength, setItemsLength] = useState(12)
  const [filteredNFTS, setFilteredNFTS] = useState([])
  const [filter, setFilter] = useState('Default');
  

  const fetchUser = async () => {
    try {
      const { data: response } = await axios.get(
        `https://remote-internship-api-production.up.railway.app/user/${id}`
      );
      setUser(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchUser();
  }, []);

  useEffect(() => {
    if (user.items?.length > 0) {
      let sortedNfts = [...user?.items];
      if(filter === 'HIGH_TO_LOW') {
        sortedNfts.sort((a, b) => b.price - a.price)
      } else if(filter === 'LOW_TO_HIGH') {
        sortedNfts.sort((a, b) => a.price - b.price);
      }
      setFilteredNFTS(sortedNfts);
    }
  }, [filter])


  return (
    <>
      {loading ? (
        <header id="user-header">
          <Skeleton width="100%" height="100%" borderRadius={0} />
        </header>
      ) : (
        <header
          style={{
            backgroundImage: `url('${user?.imageLink}')`,
          }}
          id="user-header"
        ></header>
      )}

      <section id="user-info">
        <div className="row">
          <div className="user-info__wrapper">
            <figure className="user-info__img__wrapper">
              {loading ? (
                <Skeleton width="100%" height="100%" />
              ) : (
                <img
                  src={`${user?.profilePicture}`}
                  alt=""
                  className="user-info__img"
                />
              )}
            </figure>
            {loading ? (
              <div className="user-info__name">
                <Skeleton width="240px" height="16px" borderRadius={4} />
              </div>
            ) : (
              <h1 className="user-info__name">{user?.name}</h1>
            )}
            <div className="user-info__details">
              {loading ? (
                <Skeleton width="300px" height="16px" borderRadius={4} />
              ) : (
                <span className="user-info__wallet">
                  <FontAwesomeIcon
                    icon={faEthereum}
                    className="user-info__wallet__icon"
                  />
                  <span className="user-info__wallet__data">
                    {user?.walletCode}
                  </span>
                </span>
              )}
              <span className="user-info__year">
                {loading ? (
                  <Skeleton width="120px" height="16px" borderRadius={4} />
                ) : (
                  <span className="user-info__year__data">
                    Joined {user?.creationDate}
                  </span>
                )}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="user-items">
        <div className="row user-items__row">
          <div className="user-items__header">
            <div className="user-items__header__left">
              {loading ? (
                <Skeleton width="160px" height="16px" borderRadius={4} />
              ) : (
                <span className="user-items__header__text">{user?.items?.length} items</span>
              )}
            </div>
            <select onChange={(e) => setFilter(e.target.value)} className="user-items__header__sort">
              <option value="Default">Recently purchased</option>
              <option value="HIGH_TO_LOW">Price high to low</option>
              <option value="LOW_TO_HIGH">Price low to high</option>
            </select>
          </div>
          <div className="user-items__body">
            {
              loading ? new Array(10).fill(0).map((_, index) => (
              <div className="item-column" key={index}>
                <Link to={"/item"} className="item">
                  <figure className="item__img__wrapper">
                    <Skeleton width="100%" height="100%" borderRadius={0} />
                  </figure>
                  <div className="item__details">
                    <span className="item__details__name">
                      <Skeleton width="80px" height="16px" borderRadius={4} />
                    </span>
                    <span className="item__details__price">
                      <Skeleton width="48px" height="16px" borderRadius={4} />
                    </span>
                    <span className="item__details__last-sale">
                      <Skeleton width="120px" height="16px" borderRadius={4} />
                    </span>
                  </div>
                </Link>
              </div>
            )) : (filteredNFTS.length > 0 ? filteredNFTS.slice(0, itemsLength) : user.items.slice(0, itemsLength)).map((item, index)=> (
              <div className="item-column" key={index}>
                <Link to={`/item/${item.itemId}`} className="item">
                  <figure className="item__img__wrapper">
                    <img
                      src={`${item?.imageLink}`}
                      alt=""
                      className="item__img"
                    />
                  </figure>
                  <div className="item__details">
                    <span className="item__details__name">{item?.title}</span>
                    <span className="item__details__price">{item?.price} ETH</span>
                    <span className="item__details__last-sale">
                      Last sale: {item?.lastSale} ETH
                    </span>
                  </div>
                  <a className="item__see-more" href="#">
                    <button className="item__see-more__button">See More</button>
                    <div className="item__see-more__icon">
                      <FontAwesomeIcon icon={faShoppingBag} />
                    </div>
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
        {user.items?.length > itemsLength && <button className="collection-page__button" onClick={() => setItemsLength(prev => prev + 6)}>Load more</button>}
      </section>
    </>
  );
}
