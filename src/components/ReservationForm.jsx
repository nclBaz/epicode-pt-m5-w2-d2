import { Component } from "react"
import { Form, Button } from "react-bootstrap"

class ReservationForm extends Component {
  state = {
    reservation: {
      name: "",
      phone: "",
      numberOfPeople: 1,
      dateTime: "",
      smoking: false,
      specialRequests: "",
    },
  }

  handleChange = (propertyName, valueToSet) => {
    // USAGE: this.handleChange("phone", 1234) or this.handleChange("numberOfPeople", 2)

    // const myObject = { name: "whatever"}

    // 1. myObject.name
    // 2. myObject["name"]

    // In order to use a STRING coming as a parameter (propertyName) as object property name, you need to EVALUATE that by putting it into square brackets

    this.setState({
      reservation: {
        ...this.state.reservation,
        [propertyName]: valueToSet,
      },
    })
  }

  handleSubmit = async event => {
    // event is the form submission event, your function will get it automatically!
    // Default behaviour of browsers is to reload the page during submit of forms
    // To prevent that we could use the method event.preventDefault()
    event.preventDefault()

    // I don't need to collect one by one the values from the form inputs! I already have all of them saved in the state!

    console.log("CURRENT STATE: ", this.state)

    // ******************* FETCH *************************
    // HTTP Requests they need to be asynchronous operations --> we are going to use Promises

    try {
      const url = "https://striveschool-api.herokuapp.com/api/reservation"

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.reservation),
      })

      if (response.ok) {
        alert("Reservation saved!")
        // clean the form
        this.setState({
          reservation: {
            name: "",
            phone: "",
            numberOfPeople: 1,
            dateTime: "",
            smoking: false,
            specialRequests: "",
          },
        })
      } else {
        const { message } = await response.json()
        alert(message)
      }
    } catch (error) {
      alert("An error occurred!")
    }
  }

  render() {
    return (
      <div>
        <h2>Book your table!</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>What's your name?</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={this.state.reservation.name}
              onChange={event => {
                this.handleChange("name", event.target.value)
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>What's your phone number?</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter phone number"
              value={this.state.reservation.phone}
              onChange={event => {
                this.handleChange("phone", event.target.value)
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>How many people?</Form.Label>
            <Form.Control
              as="select"
              value={this.state.reservation.numberOfPeople}
              onChange={event => {
                this.handleChange("numberOfPeople", event.target.value)
              }}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>When are you coming?</Form.Label>
            <Form.Control
              type="datetime-local"
              value={this.state.reservation.dateTime}
              onChange={event => {
                this.handleChange("dateTime", event.target.value)
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Do you smoke?"
              checked={this.state.reservation.smoking}
              onChange={event => {
                this.handleChange("smoking", event.target.checked)
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Any special requests?</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Write here your special requests!"
              value={this.state.reservation.specialRequests}
              onChange={event => {
                this.handleChange("specialRequests", event.target.value)
              }}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    )
  }
}

export default ReservationForm
