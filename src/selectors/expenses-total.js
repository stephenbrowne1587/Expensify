export default (expenses = []) => {
	return expenses.reduce((acc, curVal) => {
		return acc + curVal.amount;
	}, 0);
};