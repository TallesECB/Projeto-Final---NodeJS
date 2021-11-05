class offsetPagination extends Error {
    constructor(offset) {
        super();
        this.name = 'offsetPagination';
        this.idErro = 8;
        this.statusCode = 400;
        
        this.description = 'Bad Request'
        this.name = `Offset ${offset} -> Must be less than or equal to 1, Greater than or equal to 1000!`;
    }   
}

module.exports = offsetPagination;