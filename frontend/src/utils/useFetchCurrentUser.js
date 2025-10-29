import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUserDetails } from "../store/userSlice";
import { SummaryApi } from "../common";

export const useFetchCurrentUser = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios({
          url: SummaryApi.showme.url,
          method: SummaryApi.showme.method,
          withCredentials: true,
        });

        if (response.data) {
          dispatch(setUserDetails(response.data));
          setUserData(response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();

    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(loadingTimer);
  }, [dispatch]);

  return { loading, userData };
};
