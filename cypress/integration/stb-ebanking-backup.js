describe('STB eBanking Backup', () => {
  it('Opens https://ebank.stb.com.mk/', () => {
    cy.visit('https://ebank.stb.com.mk/', {
      auth: {
        // TODO (filip): Pass this as environment variables
        username: '<your-username>',
        password: '<your-password>',
      },
    });

    cy.get('#MainContainer_ctl00_regMainContent_accounts_gridAccountsRetail_ctl03_Payments').click();
    cy.get('#MainContainer_ctl00_regTopMenu_WebDateChooser1 .igte_Button').click();

    cy.get('#MainContainer_ctl00_regTopMenu_WebMonthCalendar1 .igmc_Day[style*="font-weight: bold;"]').then($dateElements => {
      cy.log(`$dateElements.length: ${$dateElements.length}`);
      
      for (let i = 0; i < $dateElements.length; i++) {
        cy.log(`i: ${i}`);
        
        let correctI = i > 1 ? i - 1 : i; // The currently selected date gets a different class, that's why the `- 1` subraction
        cy.get('#MainContainer_ctl00_regTopMenu_WebMonthCalendar1 .igmc_Day[style*="font-weight: bold;"]').eq(correctI).click({force: true});

        cy.get('[id^="MainContainer_ctl00_regMainContent_payments_grdPayments_ctl"][id$=_lnkShow]').then($showButtonElements => {
          cy.log(`$showButtonElements.length: ${$showButtonElements.length}`);

          for (let j = 0; j < $showButtonElements.length; j++) {
            cy.log(`j: ${j}`);

            cy.get('[id^="MainContainer_ctl00_regMainContent_payments_grdPayments_ctl"][id$=_lnkShow]').eq(j).click();
            cy.get('#MainContainer_ctl00_regMainContent_ucpp30_divNalogRamka').screenshot();
            cy.get('#MainContainer_ctl00_regRightMenu_paymentactions_lnkBack').click();
          }
        });        
      }
    });
  });
});
