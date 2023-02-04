
// outsource dependencies
import { createBrowserHistory } from 'history';

// Export history outside of components to be able "dispatch" navigation actions from anywhere!
export const history = createBrowserHistory();
