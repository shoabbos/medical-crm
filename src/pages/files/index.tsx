import { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { authProtectedApi } from "../../config/axios.config";
import { ADMIN_FILE_UPLOAD, GET_FILE_STATUS, GET_FILE_TABLES } from "../../config/url_helpers";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import TheTable from "../../components/UI/TheTable";
import { FileTyping } from "../../typing/types/Files.type";

const FilesPage = () => {
    const [file, setFile] = useState(null)
    const { t } = useTranslation()

    const [open, setOpen] = useState(false);
    const [taskId, setTaskId] = useState('')
    const [errorLines, setErrorLines] = useState<number[]>([])
    const [fileUploading, setFileUploading] = useState(false)
    const [fileErrorChecking, setFileChecking] = useState(false)
    const [tables, setTables] = useState<FileTyping[]>([])
    const [nextPage, setNextPage] = useState('')
    const [fileId, setFileId] = useState(0)
    
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
                    setTaskId(res.data.task_id)
                    setTimeout(() => {
                        checkLinesForErrors(res.data.task_id, res.data.id)
                    }, 1000)
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

    async function checkLinesForErrors(taskId: string, fileId: number) {
        setFileChecking(true)
        await authProtectedApi
            .get(GET_FILE_STATUS + `?task_id=${taskId}`)
            .then((res) => {
                console.log(res)
                    const errors = Object.keys(res.data.result.message)
                    console.log(errors)
                    // @ts-ignore
                    setErrorLines(errors)
                    getTables(fileId)
                
            })
            .finally(() => {
                setFileChecking(false)
                setOpen(false)
            })
    }

    function deleteFile(id: string | number) {

    }

    function getTables(fileId: number) {
        authProtectedApi
            .get(GET_FILE_TABLES+fileId)
            .then((res) => {
                console.log(res)
                if(res.status === 200) {
                    setTables(res.data.results.table)
                    setNextPage(res.data.next)
                }
            })
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
              <th className=" text-center p-1">{t('table_head_actions')}</th>
            </tr>
          </thead>
          <tbody>


            {
              tables && tables.map((item, idx) => {
                return (
                  <tr className="" key={item.phone+item.id}>
                    <td className="py-[23px]  first-td px-4">
                      {idx + 1}
                    </td>
                    <td className="">
                      {item.specialist ?? t('table_body_empty')}
                    </td>
                    <td className="">
                      {item.id ?? t('table_body_empty')}
                    </td>
                    <td className="">
                      {t('table_body_empty')}
                    </td>
                    <td className="">
                      { t('table_body_empty')}
                    </td>
                    <td className="">
                      { t('table_body_empty')}
                    </td>
                    <td className="last-td text-center">
                      <button>
                        edit
                      </button>
                    </td>
                  </tr>
                )
              })
            }

          </tbody>
        </>
      </TheTable >
        </div>)
}

export default FilesPage;