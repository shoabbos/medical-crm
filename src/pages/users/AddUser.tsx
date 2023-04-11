import { useFormik } from "formik";
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { authProtectedApi } from "../../config/axios.config";
import { FC, memo, useEffect, useState } from "react";
import { ADD_USER } from "../../config/url_helpers";
import { districtsAtom, regionsAtom } from "../../recoil/atoms";
import { useRecoilState } from "recoil";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

interface Props {
    onCreate: (values: any) => void;
}

const AddUser: FC = () => {
    const [regions] = useRecoilState(regionsAtom)
    const [districts] = useRecoilState(districtsAtom)
    const { t } = useTranslation()

    const formik = useFormik({
        initialValues: {
            username: "",
            first_name: "",
            last_name: "",
            region: 0,
            district: 0,
            password: "",
            type: "",
        },
        onSubmit: async (values) => {
            try {
                const { data } = await authProtectedApi().post(ADD_USER, values);
                formik.resetForm();
            } catch (err) {
                console.log(err);
            }
        },
    });



    return (
        <section className="flex justify-center items-center">
            <div className="container mx-auto flex justify-center flex-col gap-6 items-center">
                <h1 className="text-3xl text-black">{t('add_user')}</h1>

                <form
                    onSubmit={formik.handleSubmit}
                    className="signIn-box border-[1px] bg-white flex flex-col gap-4 items-center px-6 py-4 ex-sm:min-w-full md:min-w-[300px]"
                >
                    <TextField
                        id="username"
                        name="username"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        label={t('auth_username')}
                        fullWidth
                        required
                    />
                    <TextField
                        id="password"
                        name="password"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        label={t('auth_password')}
                        fullWidth
                        required
                    />
                    <TextField
                        id="first_name"
                        name="first_name"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.first_name}
                        label={t('first_name')}
                        fullWidth
                        required
                    />
                    <TextField
                        id="last_name"
                        name="last_name"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.last_name}
                        label={t('last_name')}
                        fullWidth
                        required
                    />
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">{t('region_location')}</InputLabel>
                        <Select
                            labelId="region-select-label"
                            id="region-select"
                            value={formik.values.region}
                            label={t('region_location')}
                            name="region"
                            onChange={formik.handleChange}
                        >
                            {regions.map((item: any) => {
                                return (
                                    <MenuItem value={item.id} key={item.name + item.id}>{item.name}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">{t('district_location')}</InputLabel>
                        <Select
                            labelId="district-select-label"
                            id="district-select"
                            value={formik.values.district}
                            label={t('district_location')}
                            name="district"
                            onChange={formik.handleChange}
                        >
                            {districts.map((item: any) => {
                                return (
                                    <MenuItem value={item.id} key={item.name + item.id}>{item.name}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">{t('user_type')}</InputLabel>
                        <Select
                            labelId="district-select-label"
                            id="district-select"
                            value={formik.values.type}
                            label={t('user_type')}
                            name="type"
                            onChange={formik.handleChange}
                        >
                            {['SUPERUSER', 'MANAGER', 'COURIER'].map((item: any) => {
                                return (
                                    <MenuItem value={item} key={item}>{item}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>

                    <Button variant="outlined" type="submit">
                        Submit
                    </Button>
                </form>
            </div>
        </section>
    );
};

export default memo(AddUser);
