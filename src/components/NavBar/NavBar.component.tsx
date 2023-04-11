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


const NavBar: FC<LayoutProps | any> = ({ routes }) => {
  const { logout } = useUser();
  const [menuState, setMenuState] = useRecoilState(menuAtom);

  // return (
  //   <nav
  //     className={`nav
  //   z-20
  //     ex-sm:fixed ex-sm:right-0 ex-sm:top-0 ex-sm:min-h-full ex-sm:bg-blue-500
  //   lg:min-h-auto lg:relative lg:block lg:bg-transparent

  //   ${menuState}
  //   `}
  //   >
  //     <button
  //       className="ex-sm:block lg:hidden ex-sm:text-4xl"
  //       onClick={() => {
  //         setMenuState("hidden");
  //       }}
  //     >
  //       <CloseRoundedIcon color="error" fontSize="inherit" />
  //     </button>
  //     <ul
  //       className="nav-list flex gap-4
  //       ex-sm:flex-col ex-sm:text-white ex-sm:font-bold ex-sm:p-4
  //       lg:text-base lg:flex-row lg:text-black
  //       "
  //     >
  //       {Object.keys(routes).map((title) => (
  //         <li key={"navlink" + routes[title].path} className="nav-list__item">
  //           <Link to={routes[title].link || routes[title].path}>{title}</Link>
  //         </li>
  //       ))}
  //       <li className="nav-list__item cursor-pointer" onClick={logout}>
  //         Profildan Chiqish
  //       </li>
  //     </ul>
  //   </nav>
  // );

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
            <li className="nav-link">
              <Link to="/dashboard" className="nav-link__item">
                {/* <i className="bx bx-home-alt icon"></i> */}
                <SpaceDashboardIcon className="icon p-2" />
                <span className="text nav-text">Dashboard</span>
              </Link>
            </li>

            <li className="nav-link">
              <Link to="/users" className="nav-link__item">
                {/* <i className="bx bx-bar-chart-alt-2 icon"></i> */}
                <LayersIcon className="icon p-2" />
                <span className="text nav-text">Users</span>
              </Link>
            </li>
            {/* 
            <li className="nav-link">
              <a href="#">
                <i className="bx bx-bell icon"></i>
                <span className="text nav-text">Notifications</span>
              </a>
            </li>

            <li className="nav-link">
              <a href="#">
                <i className="bx bx-pie-chart-alt icon"></i>
                <span className="text nav-text">Analytics</span>
              </a>
            </li>

            <li className="nav-link">
              <a href="#">
                <i className="bx bx-heart icon"></i>
                <span className="text nav-text">Likes</span>
              </a>
            </li>

            <li className="nav-link">
              <a href="#">
                <i className="bx bx-wallet icon"></i>
                <span className="text nav-text">Wallets</span>
              </a>
            </li> */}
          </ul>
        </div>

        <div className="bottom-content">
          <li className="">
            <div className="logout flex cursor-pointer">
              {/* <i className="bx bx-log-out icon"></i> */}
              <LogoutIcon className="icon p-2" />
              <span className="text nav-text" onClick={logout}>Logout</span>
            </div>
          </li>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;