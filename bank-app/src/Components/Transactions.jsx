import { useState, useEffect } from 'react';
import {
  Box, Typography, Card, CardContent, List, ListItem, ListItemAvatar, Avatar, Stack, TextField, Select, MenuItem, FormControl, InputLabel, Grid, Pagination
} from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';
import "./Transactions.css";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // Items per page
  const [filters, setFilters] = useState({
    time: 'all',
    status: 'all',
    type: 'all',
    search: '',
    minAmount: '',
    maxAmount: ''
  });
  const user = useSelector((state) => state.user.userDetails);

  const totalPages = Math.ceil(filteredTransactions.length / limit);
  const paginatedTransactions = filteredTransactions.slice((page - 1) * limit, page * limit);

  // Fetch all transactions
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/transactions/getTransactions`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        setTransactions(response.data.transactions || []);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      }
    };
    fetchTransactions();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = transactions;

    // Time filter
    const now = new Date();
    if (filters.time === 'today') {
      filtered = filtered.filter(t => new Date(t.date).toDateString() === now.toDateString());
    } else if (filters.time === 'yesterday') {
      const yesterday = new Date(now);
      yesterday.setDate(now.getDate() - 1);
      filtered = filtered.filter(t => new Date(t.date).toDateString() === yesterday.toDateString());
    } else if (filters.time === 'lastWeek') {
      const lastWeek = new Date(now);
      lastWeek.setDate(now.getDate() - 7);
      filtered = filtered.filter(t => new Date(t.date) >= lastWeek);
    } else if (filters.time === 'last30Days') {
      const last30Days = new Date(now);
      last30Days.setDate(now.getDate() - 30);
      filtered = filtered.filter(t => new Date(t.date) >= last30Days);
    }

    // Status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(t => t.status === filters.status);
    }

    // Type filter
    if (filters.type !== 'all') {
      filtered = filtered.filter(t => t.type === filters.type);
    }

    // Amount range
    if (filters.minAmount) {
      filtered = filtered.filter(t => t.amount >= parseFloat(filters.minAmount));
    }
    if (filters.maxAmount) {
      filtered = filtered.filter(t => t.amount <= parseFloat(filters.maxAmount));
    }

    // Search (description or recipient)
    if (filters.search) {
      filtered = filtered.filter(t =>
        t.description?.toLowerCase().includes(filters.search.toLowerCase()) ||
        t.recipientAccount?.includes(filters.search)
      );
    }

    setFilteredTransactions(filtered);
  }, [transactions, filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>Transaction History</Typography>

      {/* Filters */}
      <Card sx={{ mb: 3, p: 2 }} className='filter-card'>
        <Typography variant="h6" sx={{ mb: 2 }}>Filters</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Time</InputLabel>
              <Select name="time" value={filters.time} onChange={handleFilterChange}>
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="today">Today</MenuItem>
                <MenuItem value="yesterday">Yesterday</MenuItem>
                <MenuItem value="lastWeek">Last Week</MenuItem>
                <MenuItem value="last30Days">Last 30 Days</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select name="status" value={filters.status} onChange={handleFilterChange}>
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select name="type" value={filters.type} onChange={handleFilterChange}>
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="deposit">Deposit</MenuItem>
                <MenuItem value="withdraw">Withdraw</MenuItem>
                <MenuItem value="transfer">Transfer</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField fullWidth label="Search (Description/Account)" name="search" value={filters.search} onChange={handleFilterChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Min Amount" name="minAmount" type="number" value={filters.minAmount} onChange={handleFilterChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Max Amount" name="maxAmount" type="number" value={filters.maxAmount} onChange={handleFilterChange} />
          </Grid>
        </Grid>
      </Card>

      {/* Transactions List */}
      <Card className='all-transactions-card'>
        <CardContent>
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {filteredTransactions.length > 0 ? paginatedTransactions.map((t) => (
              <ListItem key={t._id} sx={{ py: 1.5, borderBottom: '1px solid #f0f0f0' }}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: t.type === 'deposit' ? '#eaf9f0' : t.type === 'withdraw' ? '#fdeded' : '#eef5fc', color: t.type === 'deposit' ? '#2dbe60' : t.type === 'withdraw' ? '#e74c3c' : '#4a90e2' }}>
                    {t.description?.charAt(0) || t.type.charAt(0).toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: '100%' }}>
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t.description || t.type}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {new Date(t.date).toLocaleString()} | Status: {t.status}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: t.type === 'deposit' || (t.type === 'transfer' && t.senderAccount) ? '#2dbe60' : '#e74c3c' }}>
                    {t.type === 'deposit' || (t.type === 'transfer' && t.senderAccount) ? '+' : '-'}₦{t.amount}
                  </Typography>
                </Stack>
              </ListItem>
            )) : (
              <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center', py: 2 }}>
                No transactions match your filters.
              </Typography>
            )}
          </List>
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Pagination count={totalPages} page={page} onChange={(e, value) => setPage(value)} />
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Transactions;