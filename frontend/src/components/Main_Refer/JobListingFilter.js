import { useState } from "react"
import { Container, Row, Col } from "react-bootstrap"
import { clearFilter, useFilter, useFilterParam } from "../Filter/Filter"
import FilterInput from "../Filter/FilterInput"
import * as styles from "./JobListingFilter.module.css"

const JOB_MODE = 0
const MANAGER_MODE = 1

function JobListingFilter(props) {
  const filter = useFilter('/position/get', props.setResult)
  const [minSalary, setMinSalary] = useFilterParam("", 'minSalary', filter)
  const [maxSalary, setMaxSalary] = useFilterParam("", 'maxSalary', filter)
  const [jobTitle, setJobtitle] = useFilterParam("", 'title', filter)
  const managerFilter = useFilter('/position/get', props.setResult)
  const [managerName, setManagerName] = useFilterParam("", 'managerName', managerFilter)
  const [filterMode, setFilterMode] = useState(JOB_MODE)

  return (
    <Container>
      <Row className={[styles.menu, 'py-1']} xs='auto'>
        <Col>Filter by:</Col>
        <Col>
          <button onClick={() => setFilterMode(JOB_MODE)} disabled={filterMode==JOB_MODE}>
            Job Details
          </button>
          <button onClick={() => setFilterMode(MANAGER_MODE)} disabled={filterMode==MANAGER_MODE}>
            Manager Info
          </button>
        </Col>
      </Row>
      {filterMode == JOB_MODE
      ?
      <>
      <Row className={[styles.row, 'py-1']} xs='auto'>
        <Col>Job Title <FilterInput value={jobTitle} onChange={setJobtitle}/></Col>
        <Col>
        Salary range <FilterInput value={minSalary} onChange={setMinSalary}/>–<FilterInput value={maxSalary} onChange={setMaxSalary} />
        </Col>
        <Col>
          <button className={styles.clearButton}
          onClick={() => clearFilter(filter)}>
            Clear
          </button>
        </Col>
      </Row>
      <Row>
        <Col className={[styles.row, 'py-1']} xs='auto'>Tag <input/></Col>
      </Row>
      </>
      :
      <div>
      </div>}
    </Container>
  )
}

export default JobListingFilter