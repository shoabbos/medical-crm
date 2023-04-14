import { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { authProtectedApi } from "../../config/axios.config";
import { ADMIN_FILE_UPLOAD } from "../../config/url_helpers";

const FilesPage = () => {
    const [file, setFile] = useState(null)
    const {t} = useTranslation()
    
    function handleFile(e: any) {
        if(e.target.files[0] && e.target.files[0]['type'] == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            let file = e.target.files[0]
            setFile(file)
            toast.success(t('upload_file_success'))
        } else {
            toast.error(t('upload_file_error'))
            e.target.value = null;
        }
    }
    function handleBrowse() {
        const uploadInput: any = document.querySelector('#selectedFile')
        uploadInput && uploadInput.click()
    }

    function submitFile() {
        const fileData = new FormData()
        if(file) {
            fileData.append('file', file)
            fileData.append('file_type', 'DOCTOR')
            authProtectedApi()
            .post(ADMIN_FILE_UPLOAD, fileData)
            .then((res) => {
                console.log(res)
                toast.success(t('submit_file_success'))
            })
            .catch((err) => {
                console.log(err)
                toast.success(t('submit_file_error'))
            })
        }

    }

    return (<div>
        <input type="file" accept=".xlsx" id="selectedFile" style={{display: 'none'}} onChange={handleFile} />
        <input type="button" value="Browse..." onClick={handleBrowse} />
        <button onClick={submitFile}>
            Submit
        </button>
    </div>)
}

export default FilesPage;