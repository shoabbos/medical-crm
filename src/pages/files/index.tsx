import { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { authProtectedApi } from "../../config/axios.config";
import { ADMIN_FILE_UPLOAD, GET_FILE_STATUS } from "../../config/url_helpers";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

const FilesPage = () => {
    const [file, setFile] = useState(null)
    const { t } = useTranslation()

    const [open, setOpen] = useState(false);
    const [fileId, setFileId] = useState('')
    const [errorLines, setErrorLines] = useState<number[]>([])
    const [fileUploading, setFileUploading] = useState(false)
    const [fileErrorChecking, setFileChecking] = useState(false)
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleFile(e: any) {
        if (e.target.files[0] && e.target.files[0]['type'] == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            let file = e.target.files[0]
            setFile(file)
            toast.success(t('select_file_success'))
        } else {
            toast.error(t('select_file_error'))
            e.target.value = null;
        }
    }
    function handleBrowse() {
        const uploadInput: any = document.querySelector('#selectedFile')
        uploadInput && uploadInput.click()
    }

    function submitFile() {
        const fileData = new FormData()
        setOpen(true);
        setFileUploading(true)
        if (file) {
            fileData.append('file', file)
            fileData.append('file_type', 'DOCTOR')
            authProtectedApi
                .post(ADMIN_FILE_UPLOAD, fileData)
                .then((res) => {
                    console.log(res)
                    setFileId(res.data.task_id)
                    checkLinesForErrors(res.data.task_id)
                    toast.success(t('upload_file_success'))
                })
                .catch((err) => {
                    console.log(err)
                    toast.success(t('upload_file_error'))
                })
                .finally(() => {
                    setFileUploading(false)
                })
        }

    }

    function checkLinesForErrors(taskId: string) {
        setFileChecking(true)
        authProtectedApi
            .get(GET_FILE_STATUS + `?task_id=${taskId}`)
            .then((res) => {
                console.log(res)
                if (Object.keys(res.data.result.message).length) {
                    const errors = Object.keys(res.data.result.message)
                    console.log(errors)
                    setErrorLines(...errors)
                }
            })
            .finally(() => {
                setFileChecking(false)
                setOpen(false)
            })
    }

    function deleteFile(id: string | number) {

    }

    return (
        <div className="w-full">
            <div className="upload-box">
                <input type="file" accept=".xlsx" id="selectedFile" style={{ display: 'none' }} onChange={handleFile} />
            </div>

            <input type="button" className="block" value="Fayl tanlash" onClick={handleBrowse} />
            <button onClick={submitFile} className="block">
                Submit
            </button>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {
                    fileUploading ? <>
                        <DialogTitle id="alert-dialog-title">
                            Ma'lumotlar yuklanmoqda bir muddat kuting...
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {t('upload_file_waiting')}
                            </DialogContentText>
                        </DialogContent>
                    </>
                        :

                        fileErrorChecking

                            ?

                            <>
                                <DialogTitle id="alert-dialog-title">
                                    Ma'lumotlar xatolarga tekshirilmoqda bir muddat kuting...
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        {t('upload_file_waiting')}
                                    </DialogContentText>
                                </DialogContent>
                            </>
                            : null
    
                }
            </Dialog>

        </div>)
}

export default FilesPage;