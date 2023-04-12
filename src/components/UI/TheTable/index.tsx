import { FC } from "react"
import "./index.css"

type Props = {
    classes: string;
    children: JSX.Element
};

const TheTable: FC<Props> = ({ classes, children }) => {
    return (
        <table className={`table ${classes}`}>
            {children}
        </table>
    );
};

export default TheTable;