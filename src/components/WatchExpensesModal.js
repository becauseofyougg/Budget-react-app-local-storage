import { Modal, Button, Stack } from "react-bootstrap"
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetsContext"
import { currencyFormatter } from "../utils"


export default function WatchExpensesModal({budgetId, handleClose}) {
    const {getBudgetExpenses, budgets, deleteBudgets, deleteExpense} = useBudgets()

    const expenses = getBudgetExpenses(budgetId)

    const budget = UNCATEGORIZED_BUDGET_ID === budgetId
     ? { name: "uncategorized", id: UNCATEGORIZED_BUDGET_ID}
     : budgets.find(budget => budget.id === budgetId)

    return (
        <Modal show={budgetId != null} onHide={handleClose}>           
                <Modal.Header closeButton>
                    <Modal.Title>
                        <Stack direction="horizontal" gap="2">
                            <div>Expenses: {budget?.name}</div>
                            {budgetId !== UNCATEGORIZED_BUDGET_ID && (
                                <Button onClick={() => {
                                    deleteBudgets(budget)
                                    handleClose()
                                }} variant="outline-danger">Delete</Button>
                            )}
                        </Stack>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Stack direction="vertical" gap="3">
                        {expenses.map(expense => (
                            <Stack direction="horizontal" gap="2" key={expense.id}>
                                <div className="me-auto fs-4">{expense.description}</div>
                                <div className="fs-5">{currencyFormatter.format(expense.amount)}</div>
                                <Button onClick={() => deleteExpense(expense)} size="sm" variant="outline-danger">&times;</Button>
                            </Stack>
                            ))}
                    </Stack>
                </Modal.Body>                         
        </Modal>
    )
}