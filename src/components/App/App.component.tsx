import "./App.style.css";
import CreateUser from "../AccountCreators/CreateUser.component";
import { useUserToken } from "../../hooks/useUserToken.hook";
import { useMemo } from "react";
import { Roles } from "../../typing/enums/Role.enum";
import { Categories } from "../Categories/Categories.component";
import { LayoutProps } from "../Layouts/BaseLayout";
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

const layouts: Record<Roles, LayoutProps | null> = {
  [Roles.ADMIN]: {
    routes: {
      "Bo'limlar": {
        path: "/categories",
        link: "/categories",
        element: <Categories />,
      },
      "Foydalanuchi yaratish": {
        path: "/create-user",
        element: <CreateUser />,
      },
    },
  },
  [Roles.MANAGER]: {
    routes: {
      "Ariza yuborish": {
        path: "/create-application",
        element: <CreateApplicationComponent />,
      },
      "Bo'limlar": {
        path: "/categories",
        link: "/categories",
        element: <Categories />,
      },
    },
  },
  [Roles.COURIER]: {
    routes: {
      "Arizalarni ko'rish": {
        path: "/applications",
        link: "/applications",
        element: <Applications />,
      },
      "Bo'limlar": {
        path: "/categories",
        link: "/categories",
        element: <Categories />,
      },
      "Ishchilar ro'yxati": {
        path: "/users/*",
        link: "/users",
        element: <Users />,
      },
      "Dashboard": {
        path: "/dashboard",
        link: "/dashboard",
        element: <DashboardPage />,
      },
    },
  },
};
const App = () => {
  const { userToken } = useUserToken();
  const layoutProps = useMemo(() => layouts["ADMIN"], []);

  if (!userToken.length === 0) {
    return (
      <div className="text-2xl md:px-[80px] lg:px-[100px]">
        {!userToken.access ? (
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
          <main>
            <Routes>
              <Route
                path="/dashboard"
                element={<DashboardPage />}
                >
              </Route>
              <Route
                path="/users"
                element={<UsersPage />}
                >
              </Route>

              <Route
                path="/applications/:applicationId"
                element={<ApplicationDetails />}
              />
              <Route
                path="/categories/:categoryId/schedules/*"
                element={<Schedules />}
              />
              <Route
                path="/categories/:categoryId/schedules/:scheduleId"
                element={<ScheduleDetailComponent />}
              />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
