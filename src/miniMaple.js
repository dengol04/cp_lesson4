import { Term, TermParsingError } from "./term.js";

class MiniMaple{
    /**
     * @param {string} polynomial 
     * @param {string} variable 
     * @returns {string}
     */
    static diff(polynomial, variable) {
        polynomial = this.#simplify_polynomial(polynomial);
        let diffed_polynomial = "";
        const terms = polynomial.match(/(?:[\+-]?\d*)?\*?(?:[^\d\^\*\+-]+)(?:\^[\+-]?\d+)?/g);

        if (!terms)
            return "0";

        for (const term of terms) {
            const parsed_term = Term.from_string(term);
            if (parsed_term === null)
                throw new TermParsingError(term);

            const diffed_term = parsed_term.diff(variable);

            if (diffed_polynomial)
                if (diffed_term.coef > 0)
                    diffed_polynomial += "+";

            if (diffed_term.coef === 0)
                continue;

            diffed_polynomial += diffed_term.to_string();
        }

        return diffed_polynomial ? diffed_polynomial : "0";
    }

    /**
     * @param {string} polynomial
     * @returns {string} 
     */
    static #simplify_polynomial(polynomial) {
        const simplified_coef = polynomial
                                .replace(/\s/g, "")
                                .replace(/\+-/g, "-")
                                .replace(/-\+/g, "-")
                                .replace(/--/g, "+");

        return simplified_coef;
    }
}

export {MiniMaple}