import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from './components/Form';
import Grid from "./components/Grid";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Modal from "./components/Modal";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function App() {
  const [customers, setCustomers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const getCustomers = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_URL_API_CUSTOMER+"/api/customer/");
      setCustomers(res.data.sort((a, b) => (a.name > b.name ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getCustomers();
  }, [setCustomers]);

  return (
    <>
      <Container>
        <Title>Customers</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getCustomers={getCustomers} />
        <Grid setOnEdit={setOnEdit} customers={customers} setCustomers={setCustomers} />
      </Container>
        {/* <button onClick={() => setModalOpen(true)}></button> */}
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>

        <h3>Content</h3>
      </Modal>
      <ToastContainer autoClose={3000} />
      <GlobalStyle />
    </>
  );
}

export default App;