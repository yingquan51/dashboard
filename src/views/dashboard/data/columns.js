/* eslint-disable react/prop-types */
import IdCell from "./components/IdCell";
import DefaultCell from "./components/DefaultCell";

const columns = [
  {
    Header: "id",
    accessor: "id",
    Cell: ({ value }) => <IdCell id={value ? value.toString() : ""} />,
  },
  {
    Header: "name",
    accessor: "name",
    Cell: ({ value }) => <DefaultCell value={value ? value.toString() : ""} />,
  },
  {
    Header: "phone",
    accessor: "phone",
    Cell: ({ value }) => <DefaultCell value={value ? value.toString() : ""} />,
  },
  {
    Header: "age",
    accessor: "age",
    Cell: ({ value }) => <DefaultCell value={value ? value.toString() : ""} />,
  },
  {
    Header: "fbDate",
    accessor: "fbDate",
    Cell: ({ value }) => <DefaultCell value={value ? value.toString() : ""} />,
  },
  {
    Header: "ryDate",
    accessor: "ryDate",
    Cell: ({ value }) => <DefaultCell value={value ? value.toString() : ""} />,
  },
  {
    Header: "site",
    accessor: "site",
    Cell: ({ value }) => <DefaultCell value={value ? value.toString() : ""} />,
  },
];

export default columns;