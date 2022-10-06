import { ListGroup } from "react-bootstrap"

const DishComments = props => (
  <ListGroup>
    {props.selectedDish ? (
      props.selectedDish.comments.map(comment => (
        <ListGroup.Item key={comment.id}>{comment.comment}</ListGroup.Item>
      ))
    ) : (
      <ListGroup.Item>Select a dish!</ListGroup.Item>
    )}
  </ListGroup>
)

export default DishComments
