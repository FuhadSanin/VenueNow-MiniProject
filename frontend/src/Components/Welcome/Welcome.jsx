import React from "react";
import "./Welcome.css";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBListGroup,
  MDBListGroupItem,
  MDBCardTitle,
} from "mdb-react-ui-kit";
import { IoCalendarClearOutline } from "react-icons/io5";
import moment from "moment";
import Carousel from "react-bootstrap/Carousel";
import { PieChart } from "@mui/x-charts/PieChart";
import { light } from "@mui/material/styles/createPalette";


const data = [
  { id: 0, value: 10, label: "IEEE" },
  { id: 1, value: 15, label: "IEDC" },
  { id: 2, value: 20, label: "NSS" },
  { id: 3, value: 18, label: "ARC" },
];

// const colors = ["#6978ca", "#111539", "#97a1d9","#4a5596"]; //same color for the pie chart
const colors = ["#e95b54", "#fbce4a", "#3caf85","#309fdb"]; //different colors for the pie chart

export default function Welcome({ profile, events }) {
  return (
    <section>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="4">
            <div className="text-center">
              <h1
                className="mb-1 text-capitalize"
                style={{ fontSize: "70px", fontWeight: 150 }}
              >
                Welcome <br />{" "}
                <span style={{ color: "#5d4f92", fontWeight: 500 }}>
                  Students
                </span>
              </h1>
            </div>
            <MDBCard className="mb-4 mt-5">
              <MDBCardBody>
                <MDBCardTitle className="mb-4">Upcoming Events</MDBCardTitle>
                <hr />
                {events && events.length > 0 ? (
                  events.map((event) => (
                    <div id={event._id}>
                      <MDBRow>
                        <MDBCol sm="6" className="bold">
                          <MDBCardText className="text-muted">
                            <IoCalendarClearOutline
                              style={{
                                verticalAlign: "middle",
                                marginRight: "5px",
                              }}
                            />
                            <span style={{ fontWeight: "600" }}>
                              {moment(event.start).format("D MMM, ddd")}
                            </span>
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol sm="6">
                          <MDBCardText>{event.title}</MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                    </div>
                  ))
                ) : (
                  <div>No events</div>
                )}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBRow className="mb-4">
              <MDBCol md="6">
                <MDBCard className="mb-4 mb-lg-0">
                  <MDBCardBody className="p-3">
                    <PieChart
                      series={[{ data }]}
                      colors={colors} // Pass the colors array to the colors property
                      width={400}
                      height={200}
                    />
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <Carousel indicators={false}>
                      {profile.carousel.map((carousel, index) => (
                        <Carousel.Item
                          key={index}
                          interval={index === 0 ? 1000 : 500}
                        >
                          <img
                            className="d-block w-300 object-fit-scale"
                            src={carousel.img}
                            alt={`Slide ${index + 1}`}
                            style={{ width: "100%", height: "200px" }} // Adjust the height as per your requirement
                          />
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
            <MDBCard>
              <MDBCardBody>
                <div
                  className="card instruction p-2 pt-0 "
                  style={{ width: "730px", height: "300px", color: "#747779" }}
                >
                  {
                    <>
                      <h1 className="fs-4 text-black"> Instructions</h1>
                      <p>
                        {" "}
                        1. This website provides information on events that have
                        already been scheduled, including their dates and time.{" "}
                      </p>
                      <p>
                        {" "}
                        2. Users are limited to viewing the scheduled events and
                        are unable to make bookings.
                      </p>
                      <p>
                        {" "}
                        3. Only student coordinators and staff members are
                        authorized to make bookings.
                      </p>
                      <p>
                        {" "}
                        4. Bookings are directed to the admin page for approval
                        or rejection.
                      </p>
                      <p>
                        {" "}
                        5. Events that are approved are exclusively showcased on
                        the calender interfacecd , while those that are rejected
                        are indicated as such on the forums page.
                      </p>
                    </>
                  }
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
