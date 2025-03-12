import { useFetchHotels } from "../hooks/useFetchHotels";
import { Card, Row, Col, Spinner, Alert } from "react-bootstrap";

const HotelList = ({ searchParams }) => {
  const { data, isLoading, error } = useFetchHotels(searchParams);

  console.log("HotelList data received:", data);

  if (isLoading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">Error fetching hotels</Alert>;

  if (!data || !Array.isArray(data) || data.length === 0) {
    return <Alert variant="info">No hotels found.</Alert>;
  }

  return (
    <div className="container mt-4">
      <Row>
        {Array.isArray(data) && data?.map((hotel) => (
          <Col key={hotel.hotelId} sm={2} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{hotel.name}</Card.Title>
                <Card.Text>Rating: {hotel.reviews?.rating} <i className='fas fa-star text-warning'></i></Card.Text>
                <Card.Text>
                  Price: {hotel.price1 ? `$${hotel.price1}/night` : "N/A"}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HotelList;
