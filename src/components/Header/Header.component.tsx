import NavBar from "../NavBar/NavBar.component";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useRecoilState } from "recoil";
import { menuAtom, userAtom } from "../../recoil/atoms";
import { FC } from "react";
import { LayoutProps } from "../Layouts/BaseLayout";
import { Breadcrumbs } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';




const Header: FC<LayoutProps> = ({ routes }) => {
  const [, setMenuState] = useRecoilState(menuAtom);
  const [user] = useRecoilState(userAtom);

  return (
    <header className="ex-sm:px-4 ex-sm:py-4 ex-sm:mb-4">
      <div className="flex justify-between lg:items-center">
        {/* <h1 className="font-bold text-2xl">CRM system </h1> */}
        {/* <NavBar routes={routes} /> */}
        {/* <button
          className="ex-sm:block ex-sm:text-3xl lg:hidden"
          onClick={() => {
            setMenuState("block");
          }}
        >
          <MenuRoundedIcon fontSize="inherit" />
        </button> */}
        <div className="flex gap-20">
          <Breadcrumbs aria-label="breadcrumb">
            {/* <StyledBreadcrumb
            component="a"
            href="/"
            label="Home"
            icon={<HomeIcon fontSize="small" />}
          /> */}
            <Link color="inherit" to="/" className="text-xs">
              Home
            </Link>
            <Link color="inherit" to="/dashboard" className="text-xs">
              Dashboard
            </Link>

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
