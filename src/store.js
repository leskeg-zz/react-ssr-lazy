import { observable, action } from 'mobx';

class Store {
	@observable test = 'hello world';

	@action changeTest(str) {
		this.test = str;
	}
}

export default new Store();
