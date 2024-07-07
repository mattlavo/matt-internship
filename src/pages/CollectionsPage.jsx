import React, { useEffect, useState } from "react";
import SelectedCollection from "../components/home/SelectedCollection";
import { Link } from "react-router-dom";
import axios from "axios";
import CollectionCard from "../components/collection/CollectionCard";

export default function CollectionsPage() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [collectionsLength, setCollectionsLength] = useState(6);

  const fetchCollections = async () => {
    try {
      const { data: response } = await axios.get(
        "https://remote-internship-api-production.up.railway.app/collections"
      );
      setCollections(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCollections();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <h1 className="collections-page__title">Collections</h1>
        <div className="collections__body">
          {loading
            ? new Array(12).fill(0).map((collection, index) => (
                <div className="collection-column">
                  <CollectionCard
                    loading={true}
                    collection={collection}
                    link='collection'
                    index={index}
                  />
                </div>
              ))
            : collections.slice(0, collectionsLength).map((collection, index) => (
                <div className="collection-column">
                  <CollectionCard
                    loading={false}
                    collection={collection}
                    link={`/collection/${collection.id}`}
                    index={index}
                  />
                </div>
              ))}
        </div>
        {collectionsLength <= collections.length && <button className="collections-page__button" onClick={() => setCollectionsLength(prev => prev + 6)}>Load more</button>}
        
      </div>
    </div>
  );
}
