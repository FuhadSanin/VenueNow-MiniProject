import React from "react";
import "./Welcome.css";
import {
  PieChart,
  Pie,
  Legend,
  Cell,
  ResponsiveContainer,
  Label
} from "recharts";

import Carousel from 'react-bootstrap/Carousel';
import arc1 from "../../Assets/ARC/arc1.jpg"
import arc2 from "../../Assets/ARC/arc2.jpg"
import arc3 from "../../Assets/ARC/arc3.jpg"
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
  MDBCardTitle,
} from "mdb-react-ui-kit";

function ProfileSection() {
  return (
    <section style={{ backgroundColor: "#eee" }}>
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center welcome">
              <h1 className="my-3">Welcome User!</h1>
              </div>
            </div>
            <div className="card mb-4 mb-lg-0">
              <div className="card-body p-0">
                
              <Carousel>
                        <Carousel.Item
                          
                        >
                          <img
                            src={arc1}
                            style={{ width: "100%", height: "300px" }} 
                          />
                        </Carousel.Item>
                        <Carousel.Item
                          
                          >
                            <img
                              src={arc2}
                              style={{ width: "100%", height: "300px" }} 
                            />
                          </Carousel.Item>
                          <Carousel.Item
                          
                          >
                            <img
                              src={arc3}
                              style={{ width: "100%", height: "300px" }} 
                            />
                          </Carousel.Item>
                    
                    </Carousel>
                
              </div>
            </div>
          </div>
          <div className="col-lg-8">
          <div className="card instruction" style={{ width: '730px', height: '300px' }}>
          {
            <>
            <h1> Instructions</h1>
            <p> 1. This website provides information on events that have already been scheduled, including their dates and time. </p>
            <p> 2. Users are limited to viewing the scheduled events and are unable to make bookings.</p>
            <p> 3. Only student coordinators and staff members are authorized to make bookings.</p>
            <p> 4. Bookings are directed to the admin page for approval or rejection.</p>
            <p> 5. Events that are approved are exclusively showcased on the calender interfacecd , while those that are rejected are indicated as such on the forums page.</p>
            </>
          }
          </div>
          
            <MDBRow>
              {
              /* <MDBCol md="6">
                <MDBCard className="mb-4">
                  <MDBCardBody>
                    <MDBCardTitle className="mb-4">
                      Upcoming Events
                    </MDBCardTitle>
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
                                />{" "}
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
              </MDBCol> */}

              {/* <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                  <PieChart>
          <Pie
            data={data01}
            dataKey="value"
            cx={200}
            cy={200}
            innerRadius={80}
            outerRadius={100}
          >
            {data01.map((entry, index) => (
              <Cell
                key={cell-${index}}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
            <Label
              content={<CustomLabel labelText="ICPs" value={15} />}
              position="center"
            />
          </Pie>
          <Legend content={<CustomizedLegend />} />
        </PieChart>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol> */
              }
            </MDBRow>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfileSection;