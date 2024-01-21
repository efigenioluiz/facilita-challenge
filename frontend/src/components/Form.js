import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getCustomers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const customer = ref.current;

      customer.name.value = onEdit.name;
      customer.email.value = onEdit.email;
      customer.phone.value = onEdit.phone;
      customer.coordinateX.value = onEdit.coordinate_x;
      customer.coordinateY.value = onEdit.coordinate_y;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const customer = ref.current;

    if (
      !customer.name.value ||
      !customer.email.value ||
      !customer.phone.value 
    ) {
      return toast.warn("Please fill in all fields!");
    }
        
    if (onEdit) {
      await axios
        .put(process.env.REACT_APP_URL_API_CUSTOMER+"/api/customer/" + onEdit.id, {
          name: customer.name.value,
          email:customer.email.value,
          fone: customer.phone.value,
          coordinateX: customer.coordinateX.value,
          coordinateY: customer.coordinateY.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
      .post(process.env.REACT_APP_URL_API_CUSTOMER+"/api/customer", {
        name: customer.name.value,
        email: customer.email.value,
        phone: customer.phone.value,
        coordinateX: customer.coordinateX.value,
        coordinateY: customer.coordinateY.value,
      })
      .then(({ data }) => toast.success(data))
      .catch(({ data }) => toast.error(data));
    }

    customer.name.value = "";
    customer.email.value = "";
    customer.coordinateX.value = "";
    customer.coordinateY.value = "";

    setOnEdit(null);
    getCustomers();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Name</Label>
        <Input name="name" />
      </InputArea>

      <InputArea>
        <Label>E-mail</Label>
        <Input name="email" type="email" />
      </InputArea>

      <InputArea>
        <Label>Phone</Label>
        <Input name="phone" />
      </InputArea>
      
      <InputArea>
        <Label>Coordinate X</Label>
        <Input name="coordinateX" />
      </InputArea> 

      <InputArea>
        <Label>Coordinate Y</Label>
        <Input name="coordinateY" />
      </InputArea>

      <Button type="submit">Register!</Button>
    </FormContainer>
  );
};

export default Form;