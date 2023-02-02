import IdCell from "../components/IdCell";
import DefaultCell from "../components/DefaultCell";

const getIdCell = ({ value }) => <IdCell id={value ? value.toString() : ""} />;

const getDefaultCell = ({ value }) => <DefaultCell value={value ? value.toString() : ""} />;

export {
  getIdCell,
  getDefaultCell
};