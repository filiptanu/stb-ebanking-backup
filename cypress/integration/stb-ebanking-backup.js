const url = 'https://ebank.stb.com.mk/';

const username = Cypress.env('USERNAME');
const password = Cypress.env('PASSWORD');
const accountNumber = Cypress.env('ACCOUNT_NUMBER');
const year = parseInt(Cypress.env('YEAR'));
const month = parseInt(Cypress.env('MONTH'));

const ACCOUNT_NUMBER_SELECTOR = '.account-id-lnk > span > a';
const WARRANTS_CONTAINER_SELECTOR = '#MainContainer_ctl00_regMainContent_regMainContent';
const WARRANTS_SELECTOR = '.igdm_MenuItemHorizontalRootLink > span';
const WARRANTS_LABEL = 'Налози';
const DATE_INPUT_SELECTOR = '#MainContainer_ctl00_regTopMenu_WebDateChooser1 > tbody > tr > td.igte_Inner > input.igte_EditInContainer';
const SHOW_WARRANT_SELECTOR = '[id^="MainContainer_ctl00_regMainContent_payments_grdPayments_ctl"][id$=_lnkShow]';
const WARRANT_FRAME_SELECTOR = '#MainContainer_ctl00_regMainContent_ucpp30_divNalogRamka';
const GO_BACK_SELECTOR = '#MainContainer_ctl00_regRightMenu_paymentactions_lnkBack';

describe('STB eBanking Backup', () => {
  it('Opens STB eBanking', () => {
    cy.visit(url, {
      auth: {
        username,
        password,
      },
    });

    cy.get(ACCOUNT_NUMBER_SELECTOR).contains(accountNumber).click();
    cy.get(WARRANTS_SELECTOR).contains(WARRANTS_LABEL).click();

    for (const date of generateDateStringsForYearMonth(year, month)) {
      cy.get(DATE_INPUT_SELECTOR).type(`${date}{enter}`);

      cy.get(WARRANTS_CONTAINER_SELECTOR).then($warrantsContainer => {
        if ($warrantsContainer.find(SHOW_WARRANT_SELECTOR).length > 0) {
          cy.get(SHOW_WARRANT_SELECTOR).then($showButtonElements => {
            for (let j = 0; j < $showButtonElements.length; j++) {
              cy.get(SHOW_WARRANT_SELECTOR).eq(j).click();
              cy.get(WARRANT_FRAME_SELECTOR).screenshot();
              cy.get(GO_BACK_SELECTOR).click();
            }
          });
        }
      });
    }
  });
});

const getDaysInYearMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
}

const generateDateStringsForYearMonth = (year, month) => {
  const daysInMonth = getDaysInYearMonth(year, month);
  const dateStrings = [];

  for (let i = 1; i <= daysInMonth; i++) {
    const day = i < 10 ? `0${i}` : i.toString();
    dateStrings.push(`${day}.${month}.${year}`)
  }

  console.log(dateStrings)

  return dateStrings;
}
