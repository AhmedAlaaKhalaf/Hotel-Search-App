import { useEffect, useState } from "react";
import { useFetchCityId } from "../hooks/useFetchCityId";
import { Form, Button, InputGroup } from "react-bootstrap";
import Spinner from 'react-bootstrap/Spinner';



const SearchBar = ({ onSearch }) => {
    const [cityName, setCityName] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // wait 1 second after user key is up --> to reduce API request 
  useEffect(() => {
    const handleTime = setTimeout(() => {
      setDebouncedSearch(cityName);
    }, 1000); 

    return () => clearTimeout(handleTime);  
  }, [cityName]);
    const { data, isLoading, error } = useFetchCityId(debouncedSearch);

    const handleSearch = () => {
        if (data && data.length > 0) {
          console.log("City ID:", data[0].document_id); 
          onSearch(data[0].document_id);
        }
      };
      
      return <>
        <InputGroup className="mb-3">
        <Form.Control
          type="text"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          placeholder="Enter a city"
        />
        <Button variant="primary" onClick={handleSearch} disabled={isLoading}>
          {isLoading ? 
        <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
        </Spinner> : "Search"}
        </Button>
      </InputGroup>
      {error && <p className="text-danger">Error fetching city ID</p>}
      </>
      
}
export default SearchBar;
