import { Link } from "react-router-dom";
import { useUser } from "../../hooks/useUser.hook";
import { useRecoilState } from "recoil";
import { menuAtom } from "../../recoil/atoms";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import "./NavBar.style.css";
import { FC } from "react";
import { LayoutProps } from "../Layouts/BaseLayout";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import LayersIcon from '@mui/icons-material/Layers';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTranslation } from "react-i18next";


const NavBar: FC<LayoutProps> = ({ routes }) => {
  const { logout } = useUser();
  const [menuState, setMenuState] = useRecoilState(menuAtom);
  const {t} = useTranslation()


  return (
    <nav className="sidebar m-5">
      <header>
        <div className="image-text">
          <span className="image">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHkvYSbem_HX3twtOS3SBLqUC2oAtg5r4QTw&usqp=CAU" alt="luck" height="72px" />
          </span>

          <div className="text logo-text">
            <span className="name">CRM service</span>
            <span className="profession">Medical system</span>
          </div>
        </div>

      </header>
      <span className="menu-item__separator">

      </span>
      <div className="menu-bar">
        <div className="menu">
          {/* <li className="search-box">
            <i className="bx bx-search icon"></i>
            <input type="text" placeholder="Search..." />
          </li> */}

          <ul className="menu-links">
            {Object.entries(routes).filter(([path, route]) => route.title !== '404').map(([path, route]) => {
              return (
                <li key={"navlinkItem" + path} className="nav-link">
                  <Link className="nav-link__item" to={route.link || '/'}>
                    {route.icon}
                    <span className="text nav-text">{t(route.title)}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="bottom-content">
          <li className="" onClick={logout}>
            <div className="logout flex cursor-pointer">
              {/* <i className="bx bx-log-out icon"></i> */}
              <LogoutIcon className="icon p-2" />
              <span className="text nav-text">Logout</span>
            </div>
          </li>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
