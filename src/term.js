class Term {
    /**
     * @param {number} coeff
     * @param {string} symbol
     * @param {number} pow
     */
    constructor(coeff, symbol, pow) {
        this.coeff = Number(coeff);
        this.symbol = symbol;
        this.pow = Number(pow);
    }

    /**
     * @param {string} diff_sym
     * @returns {Term}
     */
    diff(diff_sym) {
        let diffed_coef = this.coeff * this.pow;
        if (diff_sym !== this.symbol)
                    diffed_coef = 0;

        const diffed_pow = this.pow - 1;

        const diffed_term = new Term(diffed_coef, this.symbol, diffed_pow);
        
        return diffed_term; 
    }

    to_string() {
        if (this.pow === 0)
            return this.coeff.toString();
        else if (this.pow === 1)
            return `${this.coeff}*${this.symbol}`;

        let simplified_coef = this.coeff;
        if (simplified_coef === 1)
            simplified_coef = "";
        else if (simplified_coef === 0)
            return "0";

        return `${simplified_coef}*${this.symbol}^${this.pow}`;
    }

    static from_string(str) {
        const term_parts = str.match(/(?<coef>[\+-]?\d*)?\*?(?<sym>[^\d\^\*\+-]+)(?<pow>\^[\+-]?\d+)?/);
        if (!term_parts)
            return null;

        const parsed_coef = this.#parse_coef(term_parts.groups.coef);
        const parsed_sym = term_parts.groups.sym;
        const parsed_pow = this.#parse_pow(term_parts.groups.pow);

        return new Term(parsed_coef, parsed_sym, parsed_pow)
    }
    
    /**
     * @param {string} coef
     * @returns {number}
     */
    static #parse_coef(coef) {
        if (coef === "+" || !coef)
            return 1;
        else if (coef === "-")
            return -1;
        else
            return Number(coef);
    }

    /**
     * @param {string} pow - contains "^" at the beginning
     * @returns {number}
     */
    static #parse_pow(pow) {
        if (!pow)
            return 1;
        
        return Number(pow.slice(1));
    }
}

class TermParsingError extends Error {
    /**
     * @param {string} message
     * @param {string} term 
     */
    constructor(term) {
        super(`Error: unable to parse term ${term}`);
        this.invalid_term = term;
    }
}

export { Term, TermParsingError }