import { Link } from '@reach/router'
import React from 'react'

import type { Routes } from '../../../AppState'

interface Props {
  path: Routes
}

const FilterLink: React.FC<Props> = ({ path }) => {
  return (
    <ul className="filters">
      <li>
        <Link
          data-cy="all-filter"
          className={path === '/' ? 'selected' : ''}
          to="/"
        >
          All
        </Link>
      </li>
      <li>
        <Link
          data-cy="active-filter"
          className={path === '/active' ? 'selected' : ''}
          to="/active"
        >
          Active
        </Link>
      </li>
      <li>
        <Link
          data-cy="completed-filter"
          className={path === '/completed' ? 'selected' : ''}
          to="/completed"
        >
          Completed
        </Link>
      </li>
    </ul>
  )
}

export default FilterLink
