class MiniMaple{
    static diff(polynomial, variable) {
        const monomials = polynomial.match(/(?:[\+-]?\d*)?\*?(?:[^\d\^\*\+-]+)(?:\^-?\d+)?/g)
        let diffed_polynomial = ""
        for (const monomial of monomials) {
            diffed_polynomial += this.#diff_monomial(monomial, variable)
        }

        if (diffed_polynomial && diffed_polynomial[0] == "+")
            diffed_polynomial = diffed_polynomial.slice(1)

        return diffed_polynomial === "" ? "0" : diffed_polynomial
    }

    static monomial_parts = monomial => monomial.match(/^([\+-]?\d*)?\*?([^\d\^\*\+-]+)(\^-?\d+)?$/)

    static #diff_monomial(monomial, variable) {
        let coef = this.#find_coef(monomial)
        let diff_var = this.#find_diff_var(monomial)
        let pow = this.#find_pow(monomial)

        if (variable !== diff_var)
            return ""

        let diffed_coef = coef * pow
        let diffed_pow = pow - 1

        let diffed_monomial = this.#assemble_monomial(diffed_coef, variable, diffed_pow)

        return diffed_monomial
    }

    static #assemble_monomial(coef, variable, pow) {
        let monomial = ""

        if (coef === 0)
            return ""

        if (pow === 0)
            return coef.toString()

        if (coef !== 1)
            if (coef === -1)
                monomial += "-"
            else {
                if (coef > 0)
                    monomial += "+"
                monomial += coef + "*"
            }
        
        monomial += variable

        if (pow !== 1)
            monomial += "^" + pow
        
        return monomial
    }

    static #find_coef(monomial) {
        let coef = this.monomial_parts(monomial)[1]

        if (coef === "" || coef === undefined)
            return 1
        else {     
            if (coef === "-")
                return -1

            return Number(coef)
        }
    }

    static #find_pow(monomial) {
        let pow = this.monomial_parts(monomial)[3]
        
        if (pow === "" || pow == undefined)
            return 1
        else {
            pow = pow.slice(1)
            return Number(pow)
        }
    }

    static #find_diff_var(monomial) {
        return this.monomial_parts(monomial)[2]
    }
}

export {MiniMaple}