import { FaCheckCircle } from 'react-icons/fa';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f9f9f9;
  text-align: center;
`;

const Icon = styled(FaCheckCircle)`
  color: #4caf50;
  font-size: 5rem;
`;

const Message = styled.h2`
  font-size: 2rem;
  color: #333;
  margin: 20px 0;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: #4caf50;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

const ResetSuccess = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login', { replace: true });
  };

  return (
    <Container>
      <Icon />
      <Message>Your Password has been Reset Successfully!</Message>
      <Button onClick={handleLoginRedirect}>Go to Login</Button>
    </Container>
  );
};

export default ResetSuccess;
