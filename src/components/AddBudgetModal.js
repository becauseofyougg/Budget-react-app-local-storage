import { useRef } from "react"
import { Modal,Form, Button } from "react-bootstrap"
import { useBudgets } from "../contexts/BudgetsContext"


export default function AddBudgetModal({show, handleClose}) {
    const nameRef = useRef()
    const maxRef = useRef()
    const {addBudget} = useBudgets()
    const handleSubmit = (e) => {
        e.preventDefault()
        addBudget({
            name: nameRef.current.value,
            max: parseFloat(maxRef.current.value)
        })
        handleClose()
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>New budget</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group
                    className="mb-3" 
                    controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" ref={nameRef} required />
                    </Form.Group>

                    <Form.Group
                    className="mb-3" 
                    controlId="max">
                    <Form.Label>Maximum spending</Form.Label>
                    <Form.Control type="number" ref={maxRef} required min={0} step={0.01} />
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button
                         variant="primary" type="submit">Add</Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    )
}
