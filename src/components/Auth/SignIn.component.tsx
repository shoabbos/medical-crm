import "./styles/SignIn.style.css";
import { useFormik } from "formik";
import { Button, Link, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { publicApi, authProtectedApi } from "../../config/axios.config";
import { userAtom, authTokenStateData } from "../../recoil/atoms";
import { LOGIN_USER } from "../../config/url_helpers";
import { useUser } from "../../hooks/useUser.hook";
import LoadingLayout from "../Layouts/LoadingLayout";
import { useTranslation } from "react-i18next";

const SignIn = () => {
  const [, setUserLogin] = useRecoilState(userAtom);
  const {user} = useUser()
  const navigate = useNavigate();
  const {t} = useTranslation()
  // const [, setToken] = useRecoilState(authTokenStateData);

  const { isSubmitting, errors, ...formik } = useFormik({
    initialValues: {
      username: "testadmin",
      password: "!1234567A@",
    },
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        const response = await publicApi.post(LOGIN_USER, {
          username: values.username,
          password: values.password,
        });
        if (response.data.token) {
          localStorage.setItem("authUser", JSON.stringify(response.data));
          setUserLogin(response.data);
          // setToken(response.data.access);
          navigate("/", {
            replace: true,
          });
        }
      } catch {
        setErrors({
          password: "Nato'gri foydalanuvchi yoki parol",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });
  if(user.status) {
    navigate('/dashboard')
    return <LoadingLayout />
  }
  return (
    <section className="signIn h-screen flex justify-center items-center">
      <div className="container mx-auto flex justify-center flex-col gap-6 items-center">
        <h1 className="text-3xl text-white">Xush kelibsiz</h1>

        <form
          onSubmit={formik.handleSubmit}
          className="signIn-box border-[1px] border-black bg-white md:min-w-[500px] ex-sm:min-w-full flex flex-col gap-4 items-center px-6 py-4"
        >
          <h2 className="text-xl">{t('auth_login')}</h2>
          <TextField
            id="username"
            name="username"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.username}
            label="Foydalanuchi ismingizni kiriting"
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            label="Shaxshiy kodingizni kiriting"
            fullWidth
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
          {/* <div className="flex w-full justify-between mt-4">
            <Link href="#">Yangi foydalanuchi yaratish</Link>
            <Link href="#">Parolni esdan chiqardim</Link>
          </div> */}
          <Button
            disabled={isSubmitting}
            variant="outlined"
            fullWidth
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    </section>
  );
};

export default SignIn;
