/// <reference types="cypress" />

describe('Конструктор бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.visit('http://localhost:4000/');
    cy.wait('@getIngredients');
  });

  it('добавляет ингредиент в конструктор', () => {
    cy.get('[data-cy="constructor-element"]').should('not.exist');
    cy.contains('button', 'Добавить').first().click();
    cy.contains('[data-cy="constructor-element"]', 'Булка R2-D3').should(
      'be.visible'
    );
  });

  it('открывает и закрывает модальное окно ингредиента', () => {
    cy.get('[data-cy="modal"]').should('not.exist');
    cy.get('[data-cy="open-modal-link"]').first().click();
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="modal-close"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('закрывает модальное окно по оверлею', () => {
    cy.get('[data-cy="modal"]').should('not.exist');
    cy.get('[data-cy="open-modal-link"]').first().click();
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="modal-overlay"]').click({ force: true });
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('создаёт заказ и очищает конструктор со входом в акаунт', () => {
    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );
    cy.intercept('POST', '**/auth/login', { fixture: 'login.json' }).as(
      'login'
    );
    cy.get('[data-cy="constructor-element"]').should('not.exist');
    cy.contains('button', 'Добавить').click();
    cy.get('[data-cy="order-button"]').click();
    cy.get('input[name=email]').type('test@example.com');
    cy.get('input[name=password]').type('password123');
    cy.contains('button', 'Войти').click();
    cy.wait('@login');
    cy.get('[data-cy="order-button"]').click();
    cy.wait('@createOrder');
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="order-number"]').should('contain', '12345');
    cy.get('[data-cy="modal-close"]').click();
    cy.get('[data-cy="constructor-element"]').should('not.exist');
  });

  it('создаёт заказ и очищает конструктор при уже авторизованном пользователе', () => {
    cy.setCookie('accessToken', 'mock-token');
    cy.window().then((win) => {
      win.localStorage.setItem('refreshToken', 'mock-refresh');
    });
    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );
    cy.visit('http://localhost:4000/');
    cy.wait('@getUser');
    cy.get('[data-cy="constructor-element"]').should('not.exist');
    cy.contains('button', 'Добавить').first().click();
    cy.get('[data-cy="constructor-element"]').should('exist');
    cy.get('[data-cy="order-button"]').click();
    cy.wait('@createOrder');
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="order-number"]').should('contain', '12345');
    cy.get('[data-cy="modal-close"]').click();
    cy.get('[data-cy="constructor-element"]').should('not.exist');
  });
});
