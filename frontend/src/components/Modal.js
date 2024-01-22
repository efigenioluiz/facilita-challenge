import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  overflow-y: auto; 
  max-height: 80vh; 
`;

const CloseButton = styled.button`
  background: #e74c3c;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: auto;
`;

const Modal = ({ isOpen, onClose }) => {
  const [routesCalculate, setRoutesCalculate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_URL_API_CUSTOMER+"/api/routes/calculate");
        setRoutesCalculate(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        {routesCalculate ? (
          <pre>{JSON.stringify(routesCalculate, null, 2)}</pre>
        ) : (
          <p>Loading API Data</p>
        )}
        <CloseButton onClick={onClose}>Close</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};
export default Modal;