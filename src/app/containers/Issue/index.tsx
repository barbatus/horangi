import * as React from 'react';

import * as style from './style.css';

export default React.memo<{ new: boolean }>((props) => (
  <div className={style.sidePanel} />
));
