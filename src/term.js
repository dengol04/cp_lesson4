class Term {
    /**
     * @param {number} coef
     * @param {string} symbol
     * @param {number} pow
     */
    constructor(coef, symbol, pow) {
        this.coef = Number(coef);
        this.symbol = symbol;
        this.pow = Number(pow);
    }

    /**
     * @param {string} diff_sym
     * @returns {Term}
     */
    diff(diff_sym) {
        let diffed_coef = this.coef * this.pow;
        if (diff_sym !== this.symbol)
                    diffed_coef = 0;

        const diffed_pow = this.pow - 1;

        const diffed_term = new Term(diffed_coef, this.symbol, diffed_pow);

        return diffed_term; 
    }

    to_string() {
        if (this.pow === 0 || this.coef === 0)
            return this.coef.toString();

        const formatted_coef = this.#format_coef(this.coef);
        const formatted_pow = this.#format_pow(this.pow);
        
        return `${formatted_coef}${this.symbol}${formatted_pow}`;
    }

    /**
     * @param {number} pow
     * @returns {string} contains "^" at the beginning
     */
    #format_pow(pow) {
        let formatted_pow = pow;
        if (formatted_pow === 1)
            formatted_pow = "";
        else
            formatted_pow = "^" + formatted_pow.toString();

        return formatted_pow;
    }

    /**
     * @param {number} coef
     * @returns {string} contains "*" at the end
     */
    #format_coef(coef) {
        let formatted_coef = coef;
        if (formatted_coef === 1)
            formatted_coef = "";
        else if (formatted_coef === -1)
            formatted_coef = "-";
        else 
            formatted_coef = formatted_coef.toString() + "*";

        return formatted_coef;
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