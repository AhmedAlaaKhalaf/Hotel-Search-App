import { useState } from "react";
import SearchBar from "../components/SearchBar";
import HotelList from "../components/HotelList";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useQueryClient } from "@tanstack/react-query";

const queryClient = useQueryClient();


const Home = () => {
  const [searchParams, setSearchParams] = useState({
    cityId: "",
    checkin: "2025-12-25",
    checkout: "2025-12-26",
    adults: 2,
    children: 0,
    roomType: "Double",
  });

  const handleSearch = (cityId) => {
    setSearchParams((prev) => ({
      ...prev,
      cityId,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return <>
    <div className="bg-banner">
    <div className="container formContainer">
    <SearchBar onSearch={handleSearch} />
    <Form className="mt-3">
      <Row className="mb-3">
        {/* Check-in Date */}
        <Col md={6} className="mb-3">
          <Form.Label>Check-in Date</Form.Label>
          <Form.Control
            type="date"
            name="checkin"
            value={searchParams.checkin}
            onChange={handleInputChange}
          />
        </Col>

        {/* Check-out Date */}
        <Col md={6}>
          <Form.Label>Check-out Date</Form.Label>
          <Form.Control
            type="date"
            name="checkout"
            value={searchParams.checkout}
            onChange={handleInputChange}
          />
        </Col>
      </Row>

      <Row className="mb-3">
        {/* Adults */}
        <Col md={4} className="mb-3">
          <Form.Label>Adults</Form.Label>
          <Form.Control
            type="number"
            name="adults"
            min="1"
            value={searchParams.adults}
            onChange={handleInputChange}
          />
        </Col>

        {/* Children */}
        <Col md={4} className="mb-3">
          <Form.Label>Children</Form.Label>
          <Form.Control
            type="number"
            name="children"
            min="0"
            value={searchParams.children}
            onChange={handleInputChange}
          />
        </Col>

        {/* Room */}
        <Col md={4} className="mb-3">
          <Form.Label>Room Type</Form.Label>
          <Form.Select
            name="roomType"
            value={searchParams.roomType}
            onChange={handleInputChange}
          >
            <option value="Single">Single</option>
            <option value="Double">Double</option>
            <option value="Suite">Suite</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Search Button */}
      <Button
  variant="primary"
  className="w-100"
  disabled={!searchParams.cityId}
  onClick={() => {
    setSearchParams((prev) => ({ ...prev }));
    queryClient.invalidateQueries(["hotels"]); // force refresh using tanstack query
  }}
>
  Search Hotels
</Button>
    </Form>
    </div>
    </div>

    {/* Display Hotel List */}
    {searchParams.cityId && <HotelList searchParams={searchParams} />}
    </>
};

export default Home;
