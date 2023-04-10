import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userAtom, defaultUser } from "../recoil/atoms";
import { authProtectedApi, publicApi } from "../config/axios.config";
import { useNavigate } from "react-router-dom";
import { LOGIN_USER } from "../config/url_helpers";
const getUserToken = async () => {
  // try {
  //   const { data } = await publicApi(LOGIN_USER);
  //   return data;
  // } catch (error) {
  //   return null;
  // }
  const data = localStorage.getItem('token')
  return data && JSON.parse(data)
};
export const useUserToken = () => {
  const [userToken, setUserToken] = useRecoilState(userAtom);
  const navigate = useNavigate();

  const onMount = useCallback(async () => {
    if (!userToken.access) {
      const token = await getUserToken();
      if (token) {
        setUserToken(token);
      } else {
        console.log('should navigate to login')
        navigate("/login");
      }
    }
  }, [setUserToken]);
  const logout = useCallback(async () => {
    setUserToken(defaultUser);
    localStorage.removeItem("token");
    navigate("/login");
  }, [setUserToken]);

  useEffect(() => {
    onMount();
  }, []);
  return { userToken, logout };
};
