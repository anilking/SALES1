import { SalesmapPage } from './app.po';

describe('salesmap App', () => {
  let page: SalesmapPage;

  beforeEach(() => {
    page = new SalesmapPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
