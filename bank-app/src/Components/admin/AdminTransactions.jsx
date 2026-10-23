import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';

const AdminTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const user = useSelector((state) => state.user?.userDetails);

  useEffect(() => {
    if (user?.role === 'admin') {
      const fetchTransactions = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/transactions`, { headers: { Authorization: `Bearer ${token}` } });
          setTransactions(response.data.transactions);
        } catch (error) {
          console.error("Failed to fetch transactions:", error);
        }
      };
      fetchTransactions();
    }
  }, [user]);

  if (!user || user.role !== 'admin') {
    return <Typography>Access denied.</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>All Transactions</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((t) => (
              <TableRow key={t._id}>
                <TableCell>{t.userId?.firstName} {t.userId?.lastName} ({t.userId?.accountNumber})</TableCell>
                <TableCell>{t.type}</TableCell>
                <TableCell>₦{t.amount}</TableCell>
                <TableCell>{new Date(t.date).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminTransactions;