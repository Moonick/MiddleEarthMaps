import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

const useFetchPins = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPins = async () => {
      try {
        const response = await axios.get("http://192.168.1.186:3000/api/pins");
        dispatch(response.data);
      } catch (err: any) {
        setError(err.message || "Unexpected Error!");
        setLoading(false);
      }
    };

    fetchPins();
  }, []);

  return { loading, error };
};

export default useFetchPins;
