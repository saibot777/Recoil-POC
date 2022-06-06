import React, { memo } from 'react'

const Copyright: React.FC = memo(
  () => (
    <footer className="info">
      <p>
        Created by{' '}
        <a href="https://github.com/saibot777">Stefan Trajkovic</a>
      </p>
    </footer>
  ),
  () => true
)

export default Copyright
