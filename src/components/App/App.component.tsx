import "./App.style.css";
import { useEffect, useMemo } from "react";
import Layout from "../Layouts/BaseLayout";
import LoadingLayout from "../Layouts/LoadingLayout";
import NavBar from "../NavBar/NavBar.component";
import DashboardPage from "../../pages/dashboard";

import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import LayersIcon from '@mui/icons-material/Layers';



// auth
import { useUser } from "../../hooks/useUser.hook";
import { Roles } from "../../typing/enums/Role.enum";

import { LayoutProps } from "../Layouts/BaseLayout";
import { User } from "../../typing/types/User.type";
import NotFoundPage from "../../pages/errorPages/404";
import UsersPage from "../../pages/users";
import { authProtectedApi } from "../../config/axios.config";
import { GET_DISTRICTS, GET_REGIONS } from "../../config/url_helpers";
import { districtsAtom, regionsAtom } from "../../recoil/atoms";
import { useRecoilState } from "recoil";



const layouts: Record<Roles, LayoutProps | null> = {
  [Roles.SUPERUSER]: {
    routes: {
      "Dashboard": {
        path: "/dashboard",
        link: "/dashboard",
        title: 'dashboard_page',
        element: <DashboardPage />,
        icon: <SpaceDashboardIcon className="icon p-2" />
      },
      "Users": {
        path: "/users",
        link: "/users",
        title: 'users_page',
        element: <UsersPage />,
        icon: <LayersIcon className="icon p-2" />
      },
      "NotFound": {
        path: "/*",
        link: "/404",
        title: '404',
        element: <NotFoundPage />
      }
    },
  },
  [Roles.MANAGER]: {
    routes: {
      "Dashboard": {
        path: "/dashboard",
        link: "/dashboard",
        title: 'dashboard_page',
        element: <DashboardPage />,
        icon: <SpaceDashboardIcon className="icon p-2" />
      },
      "NotFound": {
        path: "/*",
        link: "/404",
        title: '404',
        element: <NotFoundPage />,
      }
    },
  },
  [Roles.COURIER]: {
    routes: {
      "Dashboard": {
        path: "/dashboard",
        link: "/dashboard",
        title: 'dashboard_page',
        element: <DashboardPage />,
        icon: <LayersIcon className="icon p-2" />
      },
      "NotFound": {
        path: "/*",
        link: "/404",
        title: '404',
        element: <NotFoundPage />
      }
    },
  },
};

const App = () => {
  const { user } = useUser();
  const layoutProps = useMemo(() => layouts[user.status as Roles], [user]);
  const [regions, setRegions] = useRecoilState(regionsAtom)
  const [districts, setDistricts] = useRecoilState(districtsAtom)

  useEffect(() => {
    authProtectedApi().get(GET_REGIONS)
      .then((res) => {
        setRegions(res.data)
      })
    authProtectedApi().get(GET_DISTRICTS)
      .then((res) => {
        setDistricts(res.data)
      })
  }, [])


  if (!user.status) {
    return (
      <div className="text-2xl md:px-[80px] lg:px-[100px]">
        {!user.status ? (
          <LoadingLayout></LoadingLayout>
        ) : (
          "Hatolik yuz berdi"
        )}
      </div>
    );
  }
  return (
    <div className="app">
      <div className="wrapper">
        {layoutProps ? <NavBar {...layoutProps} /> : 'Error access denied!'}
        <div className="home p-6">
          {layoutProps ? <Layout {...layoutProps} /> : "Error access denied!"}
        </div>
      </div>
    </div>
  );
};

export default App;
