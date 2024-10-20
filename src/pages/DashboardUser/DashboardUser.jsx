import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useUser from "../../store/useUsers";
const columns = [
  {
    id: "name",
    label: "Name",
    minWidth: 170,
  },
  {
    id: "item",
    label: "Item",
    minWidth: 170,
  },
  {
    id: "price",
    label: "Price",
    minWidth: 100,
  },
  {
    id: "date",
    label: "Date",
    minWidth: 170,
    align: "right",
  },
  {
    id: "status",
    label: "Status",
    minWidth: 170,
    align: "right",
  },
  {
    id: "action",
    label: "Action",
    minWidth: 170,
    align: "right",
  },
];

const DashboardUser = () => {
  const [data, setData] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //   call data from State Management
  const { fetchData, deleteData } = useUser((state) => state);
  useEffect(() => {
    const getData = async () => {
      await fetchData();
      setData(useUser.getState().usersData);
    };
    getData();
  }, []);
  useEffect(() => {
    if (data.length > 0) {
      const mappedData = data.flatMap((user) =>
        user.transaction.map((trans) => ({
          id: user.id,
          transactionId: trans.id,
          name: user.name,
          item: trans.item,
          price: "$" + parseFloat(trans.price),
          date: new Date(trans.date * 1000).toLocaleDateString(),
          status: trans.status ? "Completed" : "Pending",
        }))
      );

      setRowData(mappedData);
    }
  }, [data]);
  console.log(rowData);

  const handleDeleteDataTransaction = async (userId, transactionId) => {
    await deleteData(userId, transactionId);
    setRowData((prevData) =>
      prevData.filter(
        (row) => !(row.id === userId && row.transactionId === transactionId)
      )
    );
  };

  return (
    <div className="dashboard-user">
      <header className="dashboard-user__header">
        <img src="https://loremflickr.com/640/480/abstract" alt="ini image" />
        <div className="dashboard-user__header-person">
          <h4>Name</h4>
          <p>job title</p>
        </div>
      </header>
      <div className="dashboard-user__content">
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rowData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.id === "action" ? (
                                <>
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    style={{ marginRight: "8px" }}
                                    // onClick={() =>
                                    //   handleOpenEdit(row.idPenilaian)
                                    // }
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    variant="contained"
                                    color="error"
                                    size="small"
                                    onClick={() =>
                                      handleDeleteDataTransaction(
                                        row.id,
                                        row.transactionId
                                      )
                                    }
                                  >
                                    Delete
                                  </Button>
                                </>
                              ) : (
                                value
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  );
};

export default DashboardUser;
