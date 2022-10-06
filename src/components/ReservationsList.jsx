import { Component } from "react"
import { ListGroup, Alert } from "react-bootstrap"
import { SpinnerDiamond } from "spinners-react"
import { parseISO, format } from "date-fns"

class ReservationsList extends Component {
  state = {
    reservations: [], // reservations will ALWAYS be an ARRAY --> The perfect initial state is EMPTY ARRAY
    isLoading: true,
    errMessage: "",
  }

  componentDidMount() {
    // 2.
    // <-- the name of this function is a reserved keyword
    console.log("HEY I AM THE COMPONENT DID MOUNT!")
    this.fetchReservations()
  }

  fetchReservations = async () => {
    // 3.
    try {
      const url = "https://striveschool-api.herokuapp.com/api/reservation"

      // throw new Error("KABOOOOOOOOOOOOOOOOOOOOOOOOOM!")

      const response = await fetch(url)
      if (response.ok) {
        // server answered with 200 ok :)
        const data = await response.json()
        this.setState({
          reservations: data,
          isLoading: false,
        })
      } else {
        const message = await response.text()
        this.setState({
          ...this.state,
          isLoading: false,
          errMessage: message,
        })
      }
    } catch (error) {
      console.log(error)
      this.setState({
        ...this.state,
        isLoading: false,
        errMessage: "Generic Error Happened!",
      })
    }
  }

  render() {
    // 1. // 4.
    // Is it a good idea to fetch reservations from here?????
    // NOOOOOOOOOOOOOOOOOOOO it's a terrible idea! Why?
    // Well, because this would cause a (infinite) loop of re-rendering
    // First thing that is happening is the render function, but render calls fetchReservations
    // Then fetchReservations causes a re-render because it updates the state
    // When you update the state, render function will be called again, therefore also fetchReservations will be called again
    // and so on so far......................
    // this.fetchReservations()
    console.log("HEY I AM THE RENDER!")
    return (
      <div>
        <h2>Reservations List!!</h2>
        <ListGroup>
          {this.state.errMessage && (
            <Alert variant="danger">{this.state.errMessage}</Alert>
          )}
          {this.state.isLoading && (
            <SpinnerDiamond
              size={50}
              thickness={100}
              speed={100}
              color="rgba(57, 84, 172, 1)"
              secondaryColor="rgba(0, 0, 0, 0.44)"
            />
          )}
          {this.state.reservations.map((bookedTable, index) => (
            <ListGroup.Item key={index}>
              {bookedTable.name} for {bookedTable.numberOfPeople} at{" "}
              {format(parseISO(bookedTable.dateTime), "do MMMM yyyy | HH:mm")}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    )
  }
}

export default ReservationsList
