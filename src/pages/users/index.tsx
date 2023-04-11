import { Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import AddUser from "./AddUser";

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
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const {t} = useTranslation()
    
    return (
        <div className="dashboard">
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
    )
}

export default UsersPage;