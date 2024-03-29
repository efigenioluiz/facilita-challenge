import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 1120px;
  margin: 20px auto;
  word-break: break-all;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

const Grid = ({ customers, setCustomers, setOnEdit }) => {
  if (!Array.isArray(customers)) {

    if (customers && customers.id) {
      customers = [customers];
    } else {
      return null;
    }
  }

  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_URL_API_CUSTOMER}/api/customer/${id}`
      );

      const newArray = customers.filter((customer) => customer.id !== id);
      toast.success(response.data.email + ' successfully deleted');
      setCustomers(newArray);
      setOnEdit(null);
    } catch (error) {
      toast.error('Error deleting customer');
    }
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Email</Th>
          <Th onlyWeb>Phone</Th>
          <Th style={{ textAlign: 'center' }}>X</Th>
          <Th style={{ textAlign: 'center' }}>Y</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {customers.map((item, i) => (
          <Tr key={i}>
            <Td width="30%">{item.name}</Td>
            <Td width="30%">{item.email}</Td>
            <Td width="13%" onlyWeb={true}>
              {item.phone}
            </Td>
            <Td style={{ width: '15%', textAlign: 'center' }}>{item.coordinate_x}</Td>
            <Td style={{ width: '15%' }}>{item.coordinate_y}</Td>
            <Td alignCenter={true} width="5%">
              <FaEdit onClick={() => handleEdit(item)} />
            </Td>
            <Td alignCenter={true} width="5%">
              <FaTrash onClick={() => handleDelete(item.id)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Grid;