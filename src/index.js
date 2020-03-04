function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let getArguments = (expression, sign) => {
        let argumentsArr = [];
        let argument = '';
        let bracketsCounter = 0;
            
        for (let i = 0; i < expression.length; i++) {
            let symbol = expression[i];
            switch (symbol) {
                case '(':
                    bracketsCounter++;
                break;

                case ')':
                    bracketsCounter--;
                break;

                case sign:
                    if (!bracketsCounter) {
                        argumentsArr.push(argument);
                        argument = '';
                        symbol = '';
                    }
                break;
            }

            argument += symbol;
        }

        if (bracketsCounter) {
            throw new Error("ExpressionError: Brackets must be paired");
        }
            
        argumentsArr.push(argument);
            
        return argumentsArr;
    }

	let doAddition = (expression) => {
        let result = 0;
		let argumentsArr = getArguments(expression, '+');

		argumentsArr = argumentsArr.map((item) => { 
			return doSubtraction(item);
		});

		result = argumentsArr.reduce((prev, cur) => {
			return +prev + +cur;
		});

		return result;
	}

	let doSubtraction = (expression) => {
        let result = 0;
		let argumentsArr = getArguments(expression, '-');
		
		argumentsArr = argumentsArr.map((item) => {
			return doMultiplication(item);
		});

		result = argumentsArr.reduce((prev, cur) => {
			return prev - cur;
		});

		return result;
	}

	let doMultiplication = (expression) => {
        let result = 0;
		let argumentsArr = getArguments(expression, '*');

		argumentsArr = argumentsArr.map((item) => {
			return doDivision(item);
		});

		result = argumentsArr.reduce((prev, cur) => {
			return prev * cur;
		});
		
		return result;
	}

	let doDivision = (expression) => {
        let result = 0;
		let argumentsArr = getArguments(expression, '/');

		argumentsArr = argumentsArr.map((item) => {
            item = item.trim();
            if ( item[0] === "(" && item[item.length - 1] === ")" ) {
                return doAddition(item.slice(1, -1));
            }
            
            return item;
		});
				
		result = argumentsArr.reduce((prev, cur) => {
            if (cur === '0') {
                throw new Error('TypeError: Division by zero.');
            }
            
            return prev / cur;
		});

		return result;
	}

	return doAddition(expr);
}

module.exports = {
    expressionCalculator
}
