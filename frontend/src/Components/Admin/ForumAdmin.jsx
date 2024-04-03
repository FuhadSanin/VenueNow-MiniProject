import React, { useEffect } from "react"
import { Button, Table } from "react-bootstrap"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const ForumAdmin = ({ retrieveSlots, slots, loginuser }) => {
  const forumSlots = slots.filter(slot => slot.username === loginuser)
  useEffect(() => {
    retrieveSlots()
  }, [retrieveSlots])
  return (
    <div>
      {forumSlots.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th scope="col">Si No.</th>
              <th scope="col">Forum</th>
              <th scope="col">Title</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            {forumSlots.map((slot, index) => (
              <tr key={slot.id}>
                <th scope="row">{index + 1}.</th>
                <td>{slot.username}</td>
                <td>{slot.title}</td>
                <td>
                  {slot.status === "approved" ? (
                    <Button variant="success">Approved</Button>
                  ) : slot.status === "pending" ? (
                    <Button variant="warning">Pending</Button>
                  ) : (
                    <Button variant="danger">Rejected</Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div>No slots</div>
      )}
    </div>
  )
}

export default ForumAdmin
