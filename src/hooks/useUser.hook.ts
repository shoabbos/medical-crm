import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userAtom, defaultUser } from "../recoil/atoms";
import { authProtectedApi, publicApi } from "../config/axios.config";
import { useLocation, useNavigate } from "react-router-dom";
import { LOGIN_USER, LOGOUT_USER } from "../config/url_helpers";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
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
  const {t} = useTranslation()
  const onMount = useCallback(async () => {
    if (!user.role) {
      const localUserData = await getUser();
      if (localUserData && localUserData.role) {
        setUser(localUserData);
        if(location.pathname === '/') navigate('/dashboard')
      } else {
        navigate("/login");
      }
    }
  }, [setUser]);
  const logout = useCallback(async () => {
    authProtectedApi().post(LOGOUT_USER, {refresh: user.token.refresh})
    .then((res)=> {
        setUser(defaultUser);
        localStorage.removeItem("authUser");
        localStorage.removeItem("accessToken");
        toast.warning(t('logout_success'))
        navigate("/login");
      })
      .catch((err) => {
        setUser(defaultUser);
        localStorage.removeItem("authUser");
        localStorage.removeItem("accessToken");
        toast.warning(t('logout_success'))
        navigate("/login");
      })
  }, [setUser]);

  useEffect(() => {
    onMount();
  }, []);
  return { user, logout };
};
