import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import HeaderDefault from "../../components/HeaderDefault/HeaderDefault";
import { Outlet, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openEdit, setOpenEdit] = useState(false);

  const [selectedData, setSelectedData] = useState({});
  const [editItemName, setEditItemName] = useState("");
  const [editItemPrice, setEditItemPrice] = useState(0);
  const [editItemStatus, seteditItemStatus] = useState();

  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //   call data from State Management
  const { fetchData, deleteData, updateTransactionData } = useUser(
    (state) => state
  );
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

  const handleDeleteDataTransaction = async (userId, transactionId) => {
    await deleteData(userId, transactionId);
    setRowData((prevData) =>
      prevData.filter(
        (row) => !(row.id === userId && row.transactionId === transactionId)
      )
    );
  };

  const handleOpenEdit = (row) => {
    setSelectedData(row);
    setEditItemName(row.item);
    setEditItemPrice(row.price.split("$").join(""));
    seteditItemStatus(row.status === "Completed");
    setOpenEdit(!openEdit);
  };
  console.log(selectedData);

  const handleSubmitEdit = async () => {
    await updateTransactionData(
      selectedData.id,
      editItemName,
      editItemPrice,
      editItemStatus
    );
    setRowData((prevData) =>
      prevData.map((row) => {
        return row.transactionId === selectedData.transactionId
          ? {
              ...row,
              item: editItemName,
              price: "$" + editItemPrice,
              status: editItemStatus ? "Completed" : "Pending",
            }
          : row;
      })
    );
    setOpenEdit(false);
  };
  return (
    <div className="dashboard-user">
      <HeaderDefault
        avatar={user.avatar}
        userName={user.name}
        userPosition={user.position}
      />
      <div className="dashboard-user__content">
        <button
          className="dashboard-user__content-button"
          onClick={() => navigate("create-data")}
        >
          Create Your Transaction
        </button>
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
                                    onClick={() => handleOpenEdit(row)}
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
          <Dialog open={openEdit} onClose={() => setOpenEdit(!openEdit)}>
            <DialogTitle>Edit Data Transaction</DialogTitle>
            <DialogContent>
              <DialogContentText>Edit Item Name</DialogContentText>
              <input
                type="text"
                style={{ width: "100%", marginBottom: "10px", height: "40px" }}
                placeholder="Edit item Name"
                onChange={(e) => setEditItemName(e.target.value)}
                value={editItemName || ""}
                id="edit-item-name"
              />

              <DialogContentText>Edit Price Item</DialogContentText>
              <input
                type="number"
                style={{ width: "100%", marginBottom: "10px", height: "40px" }}
                placeholder="Edit Price Item"
                onChange={(e) => setEditItemPrice(e.target.value)}
                value={editItemPrice || ""}
                id="edit-item-price"
              />

              <DialogContentText>
                Check the Checkbox If the Transaction is completed?
              </DialogContentText>
              <input
                type="checkbox"
                checked={editItemStatus}
                onChange={(e) => seteditItemStatus(e.target.checked)}
                value={editItemStatus || ""}
                id="edit-item-status"
              />
            </DialogContent>
            <DialogActions>
              <Button>Cancel</Button>
              <Button type="submit" onClick={handleSubmitEdit}>
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </div>

      <Outlet />
    </div>
  );
};

export default DashboardUser;
