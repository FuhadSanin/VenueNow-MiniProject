import React from "react";
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
import "./ProfilePage.css";
import { FaFacebook } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa6";
import { IoCalendarClearOutline } from "react-icons/io5";
import moment from "moment";
import Carousel from "react-bootstrap/Carousel";

export default function ProfilePage({ profile, events }) {
  return (
    <section>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src={profile.icons}
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: "150px" }}
                  fluid
                />
                <p className="text-muted mb-1 text-capitalize">
                  {profile.name} Student Branch of College of Engineering
                </p>
                <p className="text-muted mb-4">Chengannur, Alappuzha</p>
                <div className="d-flex justify-content-center mb-2">
                  <MDBBtn
                    tag="a"
                    color="none"
                    className="m-1"
                    style={{ color: "#3b5998" }}
                  >
                    <MDBIcon fab icon="facebook-f" size="lg" />
                  </MDBBtn>
                  <MDBBtn
                    tag="a"
                    color="none"
                    className="m-1"
                    style={{ color: "#55acee" }}
                  >
                    <MDBIcon fab icon="twitter" size="lg" />
                  </MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-0">
                <MDBListGroup flush className="rounded-3">
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MdEmail
                      style={{
                        width: "26px",
                        height: "26px",
                        color: "#3b5998",
                      }}
                    />

                    <MDBCardText>Email Id</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <FaLinkedin
                      style={{
                        width: "26px",
                        height: "26px",
                        color: "#3b5998",
                      }}
                    />
                    <MDBCardText>LinkedIn</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <RiInstagramFill
                      style={{
                        width: "26px",
                        height: "26px",
                        color: "#3b5998",
                      }}
                    />

                    <MDBCardText>Instagram</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <FaFacebook
                      style={{
                        width: "26px",
                        height: "26px",
                        color: "#3b5998",
                      }}
                    />
                    <MDBCardText>Facebook</MDBCardText>
                  </MDBListGroupItem>
                  {/* <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon
                      fab
                      icon="facebook fa-lg"
                      style={{ color: "#3b5998" }}
                    />
                    <MDBCardText></MDBCardText>
                  </MDBListGroupItem> */}
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Chair</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      Fuhad Sanin
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Vice Chair</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">Nikhila C</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Contact Us</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      (097) 234-5678
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
            <MDBRow>
              <MDBCol md="6">
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
              </MDBCol>

              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <Carousel>
                      {profile.carousel.map((carousel, index) => (
                        <Carousel.Item
                          key={index}
                          interval={index === 0 ? 1000 : 500}
                        >
                          <img
                            className="d-block w-100"
                            src={carousel.img}
                            alt={`Slide ${index + 1}`}
                          />
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
