import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'
import PageTaskTemplates from './containers/PageTaskTemplates'

render(
  <PageTaskTemplates />,
  document.getElementById('page_task_tempates')
)