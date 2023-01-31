import IdCell from "../components/IdCell";

const getCell = ({ value }) => <IdCell id={value ? value.toString() : ""} />;

export default getCell;