import { LocalStorage } from '@dpdfe/event-utils';

const storage = {
    domain: '',
    message: '',
    use_current_tab: true
};

export default LocalStorage(storage);
