import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setPins } from "../store/slices/pinsSlice";

const useFetchPins = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPins = async () => {
      try {
        // Configure the endpoint URL to your local network IP.
        const response = await axios.get(
          `http://${process.env.EXPO_PUBLIC_BACKEND_URL}:${process.env.EXPO_PUBLIC_BACKEND_PORT}/api/pins`,
        );
        dispatch(setPins(response.data));
        setLoading(false);
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
