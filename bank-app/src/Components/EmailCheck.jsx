
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MdOutlineMarkEmailUnread } from 'react-icons/md';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f9f9f9;
  text-align: center;
`;

const Message = styled.h2`
  font-size: 2rem;
  color: #333;
  margin: 20px 0;
`;

const EmailCheck = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [countdown, setCountDown] = useState(15);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountDown((prev) => {
                if (prev === 1) {
                    clearInterval(timer);
                    navigate("/login", { replace: true });
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate]);

    const email = location.state?.email || 'your email'; // Correctly access email from location state or use default
    // Default message if email is not provided

    return (
        <Container>
            <div>
                <MdOutlineMarkEmailUnread style={{fontSize: "3.5rem", color: "#2dbe60"}}/>
            </div>
            <Message>Check your email</Message>
            <p style={{color: "#78838f", margin: "1rem 0 5rem"}}>We&apos;ve sent instructions on how to reset your password to <span style={{color: "#000", fontWeight: "600"}}>{email}.</span> </p>
            <p style={{color: "#78838f", fontSize: ".8rem"}}>Redirecting to login page in {countdown} seconds...</p>
        </Container>
    );
};

export default EmailCheck;
