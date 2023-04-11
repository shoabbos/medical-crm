import "./App.style.css";
import CreateUser from "../AccountCreators/CreateUser.component";
import { useMemo } from "react";
import { Categories } from "../Categories/Categories.component";
import Layout from "../Layouts/BaseLayout";
import CreateApplicationComponent from "../ApplicationCreator/CreateApplication.component";
import Applications from "../Applications/Applications.component";
import { Users } from "../Users/Users.component";
import { Route, Routes } from "react-router-dom";
import { ApplicationDetails } from "../Applications/ApplicationDetails.component";
import { QuestionCreator } from "../QuestionCreator/QuestionCreator.component";
import Schedules from "../Schedules/Schedules.component";
import ScheduleDetailComponent from "../Schedules/ScheduleDetail.component";
import LoadingLayout from "../Layouts/LoadingLayout";
import NavBar from "../NavBar/NavBar.component";
import DashboardPage from "../../pages/dashboard";
import UsersPage from "../../pages/users";

// auth
import { useUser } from "../../hooks/useUser.hook";
import { Roles } from "../../typing/enums/Role.enum";

import { LayoutProps } from "../Layouts/BaseLayout";
import { User } from "../../typing/types/User.type";
import NotFoundPage from "../../pages/errorPages/404";


const layouts: Record<Roles, LayoutProps | null> = {
  [Roles.SUPERUSER]: {
    routes: {
      "Dashboard": {
        path: "/dashboard",
        link: "/dashboard",
        element: <DashboardPage />,
      },
      "NotFound": {
        path: "/*",
        link: "/404",
        element: <NotFoundPage />
      }
    },
  },
  [Roles.MANAGER]: {
    routes: {
      "Dashboard": {
        path: "/dashboard",
        link: "/dashboard",
        element: <DashboardPage />,
      },
      "NotFound": {
        path: "/*",
        link: "/404",
        element: <NotFoundPage />
      }
    },
  },
  [Roles.COURIER]: {
    routes: {
      "Dashboard": {
        path: "/dashboard",
        link: "/dashboard",
        element: <DashboardPage />,
      },
      "NotFound": {
        path: "/*",
        link: "/404",
        element: <NotFoundPage />
      }
    },
  },
};

const App = () => {
  const { user } = useUser();
  const layoutProps = useMemo(() => layouts[user.status as Roles], [user]);

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
        <NavBar routes={layoutProps} />

        <div className="home p-6">
          {layoutProps ? <Layout {...layoutProps} /> : "Error access denied!"}
        </div>
      </div>
    </div>
  );
};

export default App;
