import React, { useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import axios from "axios";

const SearchContainer = styled.form`
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

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isExpanded, setExpanded] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = searchTerm
        ? await axios.get(
            `${process.env.REACT_APP_URL_API_CUSTOMER}/api/customer/search?searchTerm=${searchTerm}`
          )
        : await axios.get(`${process.env.REACT_APP_URL_API_CUSTOMER}/api/customer/`);

      if (typeof onSearch === 'function') {
        onSearch(response.data);
				setSearchTerm('');
      }
    } catch (error) {
      console.error(error);

      if (error.response) {
        const errorMessage =
          error.response.data?.error?.message || "Unknown error, try again later";
        toast.error(errorMessage);
      } else if (error.request) {
        toast.error("No response received from the server");
      } else {
        toast.error("Unknown error, try again later");
      }
    }
  };

  const toggleSection = () => {
    setExpanded(!isExpanded);
  };

  return (
    <>
      <Button onClick={toggleSection}>Search Section</Button>
      {isExpanded && (
        <SearchContainer onSubmit={handleSearch}>
          <InputArea>
            <Label>Search</Label>
            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputArea>

          <Button type="submit">Search</Button>
        </SearchContainer>
      )}
    </>
  );
};

export default Search;