import Container  from "react-bootstrap/Container"
import { Button, Stack } from "react-bootstrap"
import BudgetCard from "./components/BudgetCard"
import AddBudgetModal from "./components/AddBudgetModal";
import {useState} from "react"
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetsContext";
import AddExpenseModal from "./components/AddExpenseModal";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import WatchExpensesModal from "./components/WatchExpensesModal"

function App() {
  const [showBudgetModal, setShowBudgetModal] = useState(false)
  const [showExpenseModal, setShowExpenseModal] = useState(false)
  const [addExpenseModalId, setAddExpenseModalId] = useState()
  const {budgets, getBudgetExpenses} = useBudgets()
  const [watchExpensesModalId, setWatchExpensesModalId] = useState()

  function openExpenseModal(budgetId) {
    setShowExpenseModal(true)
    setAddExpenseModalId(budgetId)
  }
  return (
    <>
      <Container className="my-4">
              <Stack direction="horizontal" gap="2" className="mb-4">
              <h1 className="me-auto">My budget</h1>
              <Button variant="primary" onClick={() => setShowBudgetModal(true)}>Add budget</Button>
              <Button variant="outline-primary" onClick={openExpenseModal}>Add expense</Button>
            </Stack>
            <div style={{ display: "grid",
             gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1rem", alignItems: "flex-start"}}>              
            {budgets.map(budget => {
              const amount = getBudgetExpenses(budget.id).reduce((total,expense) => total + expense.amount,0)
              return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                onAddExpenseClick={() => openExpenseModal(budget.id)}
                onWatchExpenseClick={() => setWatchExpensesModalId(budget.id)}
                 />
              )
            })}
            <UncategorizedBudgetCard
            onAddExpenseClick={openExpenseModal}
            onWatchExpenseClick={() => setWatchExpensesModalId(UNCATEGORIZED_BUDGET_ID)}
             />
            <TotalBudgetCard />
            </div>
        </Container>
    <AddBudgetModal show={showBudgetModal} handleClose={() => setShowBudgetModal(false)}/>

    <AddExpenseModal
    defaultBudgetId={addExpenseModalId}
    show={showExpenseModal} handleClose={() => setShowExpenseModal(false)}/>

    <WatchExpensesModal
    budgetId={watchExpensesModalId} handleClose={() => setWatchExpensesModalId()}/>
  </>
  )
}

export default App;
