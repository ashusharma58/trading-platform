
describe('Real-Time Trading Dashboard', () => {
    it('logs in and sees tickers', () => {
        cy.visit('/login');
        cy.get('input[name="username"]').type('admin');
        cy.get('input[name="password"]').type('password');
        cy.get('button[type="submit"]').click();
        cy.contains('AAPL').should('exist');
    });
});
