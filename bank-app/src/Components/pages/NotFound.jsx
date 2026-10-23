import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f9f9f9;
  text-align: center;
`;

const Message = styled.h1`
  font-size: 3rem;
  color: #333;
  margin: 20px 0;
`;

const SubMessage = styled.p`
  font-size: 1.5rem;
  color: #666;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const NotFound = () => {
  const navigate = useNavigate();

  const handleHomeRedirect = () => {
    navigate('/', { replace: true });
  };

  return (
    <Container>
      <Message>404 - Not Found</Message>
      <SubMessage>Sorry, the page you&#39;re looking for doesn&#39;t exist.</SubMessage>
      <Button onClick={handleHomeRedirect}>Go to Homepage</Button>
    </Container>
  );
};

export default NotFound;
