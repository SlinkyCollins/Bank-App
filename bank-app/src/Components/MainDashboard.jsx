import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  useTheme,
  useMediaQuery,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import axios from 'axios';
import toast from 'react-hot-toast'; // For notifications
import { useDispatch } from 'react-redux'; // For dispatching actions
import { updateUserDetails } from '../Redux/userSlice'; // Import your Redux action

// Icons
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PaymentsIcon from '@mui/icons-material/Payments';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

// Import CSS
import "./MainDashboard.css";
import { useSelector } from "react-redux";

const MainDashboard = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [depositModalOpen, setDepositModalOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [isDepositing, setIsDepositing] = useState(false);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [transferData, setTransferData] = useState({ accountNumber: '', amount: '', description: '' });
  const [isTransferring, setIsTransferring] = useState(false);
  // Target very small screens specifically
  const isSmallMobile = useMediaQuery('(max-width:315px)');
  const dispatch = useDispatch(); // Redux dispatch

  const user = useSelector((state) => state.user?.userDetails);
  const balance = user?.balance || '0.00';

  const toggleBalance = () => setShowBalance(!showBalance);

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Income',
        data: [1200, 1900, 3000, 5000, 2300, 4800],
        tension: 0.4,
        borderColor: '#4a90e2',
        backgroundColor: 'rgba(74, 144, 226, 0.1)',
        fill: true,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#4a90e2',
        pointRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 10 } } },
      y: { grid: { color: '#f0f0f0' }, ticks: { display: false } },
    },
  };

  const transactions = [
    { id: 1, title: "Netflix Subscription", date: "Today, 10:23 AM", amount: "-₦4,500", type: "debit" },
    { id: 2, title: "Femi Adebayo", date: "Yesterday, 4:00 PM", amount: "+₦50,000", type: "credit" },
    { id: 3, title: "MTN Airtime", date: "Oct 24, 2023", amount: "-₦1,000", type: "debit" },
    { id: 4, title: "Salary Deposit", date: "Oct 21, 2023", amount: "+₦250,000", type: "credit" },
  ];

  // // Handle opening deposit modal
  const handleOpenDepositModal = () => setDepositModalOpen(true);
  const handleCloseDepositModal = () => {
    setDepositModalOpen(false);
    setDepositAmount(''); // Reset input
  };

  const handleDeposit = async () => {
    const amount = parseFloat(depositAmount);
    if (!amount || amount <= 0) {
      toast.error('Please enter a valid amount greater than 0.');
      return;
    }

    setIsDepositing(true);
    try {
      const token = localStorage.getItem("token");
      // Change to POST and send amount in body
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/transactions/deposit`,
        { amount, description: "Manual deposit" }, // Send amount in request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (response.status !== 200) {
        throw new Error('Deposit request failed');
      }
      console.log(response);
      const updatedBalance = response.data.balance; // Adjust based on your backend response
      dispatch(updateUserDetails({ balance: updatedBalance })); // Use the new action

      toast.success(`Successfully deposited ₦${amount.toFixed(2)}!`);
      handleCloseDepositModal();
    } catch (error) {
      toast.error('Deposit failed. Please try again.');
    } finally {
      setIsDepositing(false);
    }
  };

  // Handle opening withdraw modal
  const handleOpenWithdrawModal = () => setWithdrawModalOpen(true);
  const handleCloseWithdrawModal = () => {
    setWithdrawModalOpen(false);
    setWithdrawAmount(''); // Reset input
  };

  // Handle withdraw submission
  const handleWithdraw = async () => {
    const amount = parseFloat(withdrawAmount);
    if (!amount || amount <= 0) {
      toast.error('Please enter a valid amount greater than 0.');
      return;
    }
    if (amount > parseFloat(balance)) {
      toast.error('Insufficient funds.');
      return;
    }

    setIsWithdrawing(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/transactions/withdraw`,
        { amount, description: "Manual withdrawal" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (response.status !== 200) {
        throw new Error('Withdraw request failed');
      }
      const updatedBalance = response.data.balance;
      dispatch(updateUserDetails({ balance: updatedBalance }));

      toast.success(`Successfully withdrew ₦${amount.toFixed(2)}!`);
      handleCloseWithdrawModal();
    } catch (error) {
      toast.error('Withdrawal failed. Please try again.');
    } finally {
      setIsWithdrawing(false);
    }
  };

  // Handle opening transfer modal
  const handleOpenTransferModal = () => setTransferModalOpen(true);
  const handleCloseTransferModal = () => {
    setTransferModalOpen(false);
    setTransferData({ accountNumber: '', amount: '', description: '' }); // Reset form
  };

  const actions = [
    { label: "Transfer", icon: <SendIcon />, color: "#4a90e2", bg: "#eef5fc", onClick: handleOpenTransferModal },
    { label: "To Bank", icon: <AccountBalanceIcon />, color: "#2dbe60", bg: "#eaf9f0" },
    { label: "Pay Bills", icon: <PaymentsIcon />, color: "#f39c12", bg: "#fef6e7" },
    { label: "Airtime", icon: <PhoneIphoneIcon />, color: "#9b59b6", bg: "#f5eafb" },
  ];

  // Handle transfer submission
  const handleTransfer = async () => {
    const { accountNumber, amount, description } = transferData;
    const numAmount = parseFloat(amount);
    if (!accountNumber || !numAmount || numAmount <= 0) {
      toast.error('Please enter valid account number and amount.');
      return;
    }
    if (accountNumber === user?.accountNumber) {
      toast.error('Cannot transfer to your own account.');
      return;
    }
    if (numAmount > parseFloat(balance)) {
      toast.error('Insufficient funds.');
      return;
    }

    setIsTransferring(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/transactions/transfer`,
        { accountNumber, amount: numAmount, description: description || "Transfer" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (response.status !== 200) {
        throw new Error('Transfer request failed');
      }
      const updatedBalance = response.data.balance;
      dispatch(updateUserDetails({ balance: updatedBalance }));

      toast.success(`Successfully transferred ₦${numAmount.toFixed(2)}!`);
      handleCloseTransferModal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Transfer failed. Please try again.');
    } finally {
      setIsTransferring(false);
    }
  };


  return (
    // MASTER WRAPPER
    <Box className="main-dashboard-container">

      {/* 1. Header Section */}
      <Box sx={{ mb: 3, px: 2, pt: 2, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#34495e', fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
            Hello, {user?.firstName || 'User'} 👋
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}>
            Account Number: {user?.accountNumber || 'N/A'}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ fontSize: { xs: '0.8rem', sm: '1rem' } }}>
            Here is your financial overview.
          </Typography>
        </Box>
        {!isSmallMobile && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ borderRadius: '20px', backgroundColor: '#4a90e2', display: { xs: 'block', sm: 'flex' } }}
            onClick={handleOpenDepositModal}
          >
            Add Money
          </Button>
        )}
      </Box>

      {/* Main Layout Grid - Zero Spacing to prevent overflow */}
      <Grid container spacing={0}>

        {/* LEFT COLUMN */}
        <Grid item xs={12} md={8}>

          {/* Wrapper: Adjusted padding to 1 (8px) for better fit on 320px screens */}
          <Box sx={{ p: { xs: 1, md: 3 }, pt: 0 }}>

            {/* 2. Balance Card */}
            <Card className="balance-card glass-effect" sx={{ borderRadius: 4, mb: 3, position: 'relative', overflow: 'hidden' }}>
              <Box className="card-decoration-circle" />
              {/* Reduced padding inside card for small screens */}
              <CardContent sx={{ position: 'relative', zIndex: 2, color: 'white', p: { xs: 1.5, sm: 4 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>Total Balance</Typography>
                  <IconButton onClick={toggleBalance} size="small" sx={{ color: 'white' }}>
                    {showBalance ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
                  </IconButton>
                </Box>

                <Typography variant="h3" sx={{ fontWeight: 800, mb: 3, fontSize: 'clamp(1.8rem, 8vw, 3rem)' }}>
                  {showBalance ? `₦${balance}` : "********"}
                </Typography>

                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button variant="contained" startIcon={<ArrowUpwardIcon />} className="action-btn-primary" sx={{ bgcolor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(5px)', flex: 1 }} onClick={handleOpenWithdrawModal}>
                    Withdraw
                  </Button>
                  <Button variant="contained" startIcon={<ArrowDownwardIcon />} className="action-btn-primary" sx={{ bgcolor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(5px)', flex: 1 }}>
                    Receive
                  </Button>
                </Box>
              </CardContent>
            </Card>

            {/* 3. Quick Actions */}
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#34495e' }}>Quick Actions</Typography>

            {/* FIX: Reduced spacing to 1 (8px) on mobile to prevent negative margin overflow */}
            <Grid container spacing={{ xs: 1, sm: 2 }} sx={{ mb: 3 }}>
              {actions.map((action, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Card
                    className="action-card"
                    sx={{
                      borderRadius: 3,
                      textAlign: 'center',
                      cursor: 'pointer',
                      boxShadow: 'none',
                      bgcolor: 'white',
                      border: '1px solid #f0f2f5',
                      height: '100%',
                      '&:hover': action.onClick ? { transform: 'translateY(-3px)' } : {}
                    }}
                    onClick={action.onClick}
                  >
                    <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                      <Box sx={{ width: 45, height: 45, borderRadius: '50%', bgcolor: action.bg, color: action.color, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                        {React.cloneElement(action.icon, { fontSize: "medium" })}
                      </Box>
                      <Typography variant="caption" sx={{ fontWeight: 600, display: 'block' }}>{action.label}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* 4. Statistics Chart */}
            <Card className="statistics-card" sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" fontWeight={600}>Analytics</Typography>
                  <Button size="small" endIcon={<TrendingUpIcon />} sx={{ color: '#2dbe60' }}>+12.5%</Button>
                </Box>
                <Box sx={{ height: 250, position: 'relative', width: '100%', overflow: 'hidden' }}>
                  <Line data={chartData} options={chartOptions} />
                </Box>
              </CardContent>
            </Card>

          </Box>
        </Grid>

        {/* RIGHT COLUMN */}
        <Grid item xs={12} md={4}>
          <Box sx={{ p: { xs: 1, md: 3 }, pt: 0, pl: { md: 0 } }}>
            {/* 5. Transactions */}
            <Card className="transactions-card" sx={{ borderRadius: 4, height: '100%', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" fontWeight={600}>Transactions</Typography>
                  <Button size="small">See All</Button>
                </Box>

                <List sx={{ width: '100%', bgcolor: 'background.paper', p: 0 }}>
                  {transactions.map((t) => (
                    <React.Fragment key={t.id}>
                      <ListItem disableGutters sx={{ py: 1.5, borderBottom: '1px solid #f0f0f0' }}>
                        <ListItemAvatar sx={{ minWidth: 50 }}>
                          <Avatar sx={{ bgcolor: t.type === 'credit' ? '#eaf9f0' : '#fdeded', color: t.type === 'credit' ? '#2dbe60' : '#e74c3c', width: 35, height: 35 }}>
                            {t.title.charAt(0)}
                          </Avatar>
                        </ListItemAvatar>

                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: '100%', minWidth: 0 }}>
                          <Box sx={{ overflow: 'hidden', mr: 1, minWidth: 0 }}>
                            <Typography variant="subtitle2" fontWeight={600} noWrap>
                              {t.title}
                            </Typography>
                            <Typography variant="caption" color="textSecondary" noWrap>
                              {t.date}
                            </Typography>
                          </Box>
                          <Typography variant="body2" sx={{ fontWeight: 700, color: t.type === 'credit' ? '#2dbe60' : '#e74c3c', whiteSpace: 'nowrap' }}>
                            {t.amount}
                          </Typography>
                        </Stack>
                      </ListItem>
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Box>
        </Grid>

      </Grid>


      {/* Deposit Modal */}
      <Dialog
        open={depositModalOpen}
        onClose={handleCloseDepositModal}
        fullWidth
        maxWidth="sm"
        sx={{ '& .MuiDialog-paper': { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>Deposit Money</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Enter the amount you want to deposit. This is a simulation, no real payment required.
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Amount (₦)"
            type="number"
            fullWidth
            variant="outlined"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            inputProps={{ min: 0, step: 0.01 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDepositModal} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleDeposit}
            variant="contained"
            disabled={isDepositing}
            sx={{ backgroundColor: '#4a90e2' }}
          >
            {isDepositing ? 'Depositing...' : 'Deposit'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Withdraw Modal */}
      <Dialog
        open={withdrawModalOpen}
        onClose={handleCloseWithdrawModal}
        fullWidth
        maxWidth="sm"
        sx={{ '& .MuiDialog-paper': { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>Withdraw Money</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Enter the amount you want to withdraw. Ensure sufficient balance.
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Amount (₦)"
            type="number"
            fullWidth
            variant="outlined"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            inputProps={{ min: 0, step: 0.01, max: parseFloat(balance) }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseWithdrawModal} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleWithdraw}
            variant="contained"
            disabled={isWithdrawing}
            sx={{ backgroundColor: '#4a90e2' }}
          >
            {isWithdrawing ? 'Withdrawing...' : 'Withdraw'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Transfer Modal */}
      <Dialog
        open={transferModalOpen}
        onClose={handleCloseTransferModal}
        fullWidth
        maxWidth="sm"
        sx={{ '& .MuiDialog-paper': { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>Transfer Money</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Enter recipient account number and amount. Ensure sufficient balance.
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Recipient Account Number"
            type="text"
            fullWidth
            variant="outlined"
            value={transferData.accountNumber}
            onChange={(e) => setTransferData({ ...transferData, accountNumber: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Amount (₦)"
            type="number"
            fullWidth
            variant="outlined"
            value={transferData.amount}
            onChange={(e) => setTransferData({ ...transferData, amount: e.target.value })}
            inputProps={{ min: 0, step: 0.01 }}
          />
          <TextField
            margin="dense"
            label="Description (Optional)"
            type="text"
            fullWidth
            variant="outlined"
            value={transferData.description}
            onChange={(e) => setTransferData({ ...transferData, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTransferModal} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleTransfer}
            variant="contained"
            disabled={isTransferring}
            sx={{ backgroundColor: '#4a90e2' }}
          >
            {isTransferring ? 'Transferring...' : 'Transfer'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MainDashboard;