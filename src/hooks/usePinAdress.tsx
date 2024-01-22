import { useState, useEffect } from "react";
import { getPinAddress } from "../utils";

const usePinAddress = (latitude: number, longitude: number): { pinAddress: string; errorMsg: string } => {
  const [pinAddress, setPinAddress] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    const fetchAddress = async () => {
      if (latitude && longitude) {
        try {
          const address = await getPinAddress(latitude, longitude);
          setPinAddress(address);
        } catch (error) {
          console.error("Error fetching pin address:", error);
          setErrorMsg("Failed to fetch pin address");
          setPinAddress("");
        }
      }
    };

    fetchAddress();
  }, [latitude, longitude]);

  return { pinAddress, errorMsg };
};

export default usePinAddress;
