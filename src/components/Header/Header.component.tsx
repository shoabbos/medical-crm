import NavBar from "../NavBar/NavBar.component";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useRecoilState } from "recoil";
import { menuAtom, userAtom } from "../../recoil/atoms";
import { FC } from "react";
import { LayoutProps } from "../Layouts/BaseLayout";
import { Breadcrumbs } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { Link, useLocation } from "react-router-dom";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';




const Header: FC<LayoutProps> = ({ routes }) => {
  const [, setMenuState] = useRecoilState(menuAtom);
  const [user] = useRecoilState(userAtom);
  const location = useLocation()
  const breadcrumbPaths = location.pathname.split('/')

  return (
    <header className="ex-sm:px-4 ex-sm:py-4 ex-sm:mb-4">
      <div className="flex justify-between lg:items-center">
        <div className="flex gap-20">
          <Breadcrumbs aria-label="breadcrumb">
            {
              breadcrumbPaths.map((breadcrumbItem: string, idx) => {
                if (idx === 0) {
                  return (
                    <div key={breadcrumbItem + idx} >
                      <Link color="inherit" to="/" className="text-xs text-gray-400">
                        Home
                      </Link>
                      <Link className="text-xs capitalize text-gray-400" to={breadcrumbItem}>{breadcrumbItem}</Link>
                    </div>
                  )
                }
                else if (idx === breadcrumbPaths.length) {
                  <Link className="text-xs capitalize text-black" key={breadcrumbItem + idx} to={breadcrumbItem}>{breadcrumbItem}</Link>
                }
                return (
                  <Link className={`text-xs capitalize text-gray-400`} key={breadcrumbItem + idx} to={breadcrumbItem}>{breadcrumbItem}</Link>
                )
              })
            }

          </Breadcrumbs>
          <button>
            <MenuOpenIcon />
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;
