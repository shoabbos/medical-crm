import { FC, ReactElement } from "react";
import Header from "../Header/Header.component";
import { PathRouteProps, Route, Routes } from "react-router-dom";
import NavBar from "../NavBar/NavBar.component";
export interface LayoutProps {
  routes: Record<string, PathRouteProps & { link?: string; icon?: JSX.Element, title: string }>;
}

const Layout: FC<LayoutProps> = ({ routes }) => {
  return (
    <div className="">
      <section className="content">
        <Header routes={routes} />
        <Routes>
          {Object.entries(routes).map(([path, route]) => (
            <Route
              key={"route-path" + path}
              path={route.path}
              element={route.element}
            />
          ))}
        </Routes>
      </section>
    </div>
  );
};

export default Layout;
