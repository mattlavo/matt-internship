import React, { useEffect, useState } from "react";
import CollectionHeader from "../components/collection/CollectionHeader";
import CollectionInfo from "../components/collection/CollectionInfo";
import CollectionItems from "../components/collection/CollectionItems";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function CollectionPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [collection, setCollection] = useState({});

  const fetchCollection = async () => {
    try {
      const { data: response } = await axios.get(
        `https://remote-internship-api-production.up.railway.app/collection/${id}`
      );
      setCollection(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollection();
  }, []);

  return (
    <>
      {loading ? (
        <>
          <CollectionHeader skeleton={true} collection={collection} />
          <CollectionInfo skeleton={true} collection={collection} />
          <CollectionItems skeleton={true} collection={collection} />
        </>
      ) : (
        <>
          <CollectionHeader skeleton={false} collection={collection} />
          <CollectionInfo skeleton={false} collection={collection} />
          <CollectionItems skeleton={false} collection={collection} />
        </>
      )}
    </>
  );
}
