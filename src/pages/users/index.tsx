import { Box, Button, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AddUser from "./AddUser";
import { authProtectedApi } from "../../config/axios.config";
import { GET_USERS } from "../../config/url_helpers";
import TheTable from "../../components/UI/TheTable";
import "./index.style.css"

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const UsersPage = () => {
  const [open, setOpen] = useState(false);
  const [usersList, setUsersList] = useState([])
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { t } = useTranslation()

  useEffect(() => {
    authProtectedApi()
      .get(GET_USERS)
      .then((res) => {
        setUsersList(res.data)
      })
  }, [])
  console.log(usersList)
  return (
    <div className="dashboard">
      <div className="">
        <div className="">
          Users Page
        </div>
        <Button onClick={handleOpen}>Open modal</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AddUser />
          </Box>
        </Modal>
      </div>
      <TheTable classes="responsive-table">
        <>
          <thead>
            <tr className="text-xs text-[#B1B1B8] uppercase text-center">
              <th className="text-left px-4">#</th>
              <th className=" text-left">{t('table_head_name')}</th>
              <th className=" text-left">{t('table_head_special_id')}</th>
              <th className=" text-left">{t('table_head_username')}</th>
              <th className=" text-left">{t('table_head_region')}</th>
              <th className=" text-left">{t('table_head_district')}</th>
            </tr>
          </thead>
          <tbody>


            {
              usersList.map((item: {name: string; id: number; username: string; region: string; district: string;}, idx) => {
                return (
                  <tr className="">
                    <td className="py-[23px]  first-td px-4">
                      {idx + 1}
                    </td>
                    <td className="">
                      {item.name ?? t('table_body_empty')}
                    </td>
                    <td className="">
                      {item.id ?? t('table_body_empty')}
                    </td>
                    <td className="">
                      {item.username ?? t('table_body_empty')}
                    </td>
                    <td className="">
                      {item.region ?? t('table_body_empty')}
                    </td>
                    <td className="last-td">
                      {item.district ?? t('table_body_empty')}
                    </td>
                  </tr>
                )
              })
            }

          </tbody>
        </>
      </TheTable >

    </div >
  )
}

export default UsersPage;