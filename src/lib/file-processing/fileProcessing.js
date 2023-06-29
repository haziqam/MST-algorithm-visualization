const fs = require('fs')

function getMatrixFromFile(filePath) {
    const array = fileToArray(filePath)
    const matrix = arrayToMatrix(array)
    if (isMatrixValid(matrix)) {
        return matrix
    }
}

function fileToArray(filePath) {
    const data = fs.readFileSync(filePath, 'utf8');
    const rows = data.split('\n');
    for (let i = 0; i < rows.length; i++) {
        rows[i] = rows[i].replace('\r', '')
    }
    return rows
}

function tokenize(input) {
    return input.match(/\S+/g)
}

function arrayToMatrix(array) {
    for (let i = 0; i < array.length; i++) {
        const tokens = tokenize(array[i])
        if (tokens) {
            array[i] = tokens.map((str) => parseFloat(str))
        }
        else {
            array.splice(i, 1)
        }
    }
    return array
}

function isMatrixValid(matrix) {
    const rows = matrix.length
    for (let i = 0; i < rows; i++) {
        let columns = matrix[i].length
        if (rows !== columns) {
            throw new Error(`Invalid input at row ${i + 1}. The number of rows must be equal to the number of columns`)
        }

        for (let j = 0; j < columns; j++) {
            if (isNaN(matrix[i][j]) || matrix[i][j] < 0) {
                throw new Error(`Invalid input at row ${i + 1} column ${j + 1}. Input must be a positive number or 0`)
            }
            if (i === j && matrix[i][j]) {
                throw new Error(`Invalid input at row ${i + 1} column ${j + 1}. Diagonal elements must be 0`)
            }
            if (matrix[i][j] !== matrix[j][i]) {
                throw new Error(`Invalid input at row ${i + 1} column ${j + 1}. Matrix must be symmetrical`)
            }
        }
    }
    return true
}

module.exports = {getMatrixFromFile}
