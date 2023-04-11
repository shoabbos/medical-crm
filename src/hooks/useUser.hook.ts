import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userAtom, defaultUser } from "../recoil/atoms";
import { authProtectedApi, publicApi } from "../config/axios.config";
import { useLocation, useNavigate } from "react-router-dom";
import { LOGIN_USER } from "../config/url_helpers";
const getUser = async () => {
  // try {
  //   const { data } = await publicApi(LOGIN_USER);
  //   return data;
  // } catch (error) {
  //   return null;
  // }
  const data = localStorage.getItem('authUser')
  return data && JSON.parse(data)
};
export const useUser = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const navigate = useNavigate();
  const location = useLocation()

  const onMount = useCallback(async () => {
    if (!user.status) {
      const localUserData = await getUser();
      if (localUserData && localUserData.status) {
        setUser(localUserData);
        if(location.pathname === '/') navigate('/dashboard')
      } else {
        navigate("/login");
      }
    }
  }, [setUser]);
  const logout = useCallback(async () => {
    setUser(defaultUser);
    localStorage.removeItem("authUser");
    navigate("/login");
  }, [setUser]);

  useEffect(() => {
    onMount();
  }, []);
  return { user, logout };
};
