/* Presentation enhancements operate on the authenticated document's existing controls. */
(() => {
  const main = document.querySelector('body > main');
  const dashboard = document.getElementById('dashboard');
  if (!main || !dashboard) return;
  main.id = 'workspace-main';
  main.tabIndex = -1;
  const skip = document.createElement('a');
  skip.className = 'vf-skip-workspace';
  skip.href = '#workspace-main';
  skip.textContent = 'Skip to workspace';
  document.body.prepend(skip);

  const previousHero = dashboard.querySelector('.vf-showcase');
  const scanButton = previousHero?.querySelector('button[data-go="listing"]');
  const stockButton = previousHero?.querySelector('button[data-go="inventory"]');
  if (scanButton && stockButton) {
    const hero = document.createElement('div');
    hero.className = 'vf-desk-hero';
    hero.innerHTML = '<div class="vf-desk-intro"><span class="eyebrow">Seller workspace</span>' +
      '<h1>Your resale <em>studio.</em></h1><p>Photograph a find, check its price or pick up a saved listing.</p>' +
      '<div class="vf-desk-actions"></div></div>' +
      '<div class="vf-desk-photo" aria-hidden="true"><img src="/media/jacket.webp" width="600" height="600" alt=""></div>';
    hero.querySelector('.vf-desk-actions').append(scanButton, stockButton);
    previousHero.replaceWith(hero);
    const recent = document.getElementById('recent')?.closest('.card');
    if (recent) hero.after(recent);
  }

  // A native disclosure keeps every original stock action and its event handler.
  const stock = document.getElementById('items');
  if (stock) {
    const organiseActions = () => {
      for (const group of stock.querySelectorAll('.item > .vf-item-actions')) {
        const actions = document.createElement('details');
        actions.className = 'vf-stock-actions';
        const summary = document.createElement('summary');
        summary.textContent = 'Manage item';
        const title = group.parentElement.querySelector('.grow strong')?.textContent;
        if (title) summary.setAttribute('aria-label', 'Manage ' + title);
        group.before(actions);
        actions.append(summary, group);
      }
    };
    organiseActions();
    new MutationObserver(organiseActions).observe(stock, {childList:true});
  }

  const finalStep = document.getElementById('stage3');
  const card = finalStep?.querySelector('.vf-handoff');
  if (card) {
    const image = document.createElement('img');
    image.className = 'vf-preview-photo';
    image.alt = 'Your item photo';
    image.hidden = true;
    card.prepend(image);
    const refreshImage = () => {
      if (finalStep.hidden) { image.hidden = true; image.removeAttribute('src'); return; }
      const source = document.querySelector('#previews img.thumb')?.getAttribute('src');
      image.hidden = !source;
      if (source) image.src = source;
      else image.removeAttribute('src');
    };
    refreshImage();
    new MutationObserver(refreshImage).observe(finalStep, {attributes:true,attributeFilter:['hidden']});
  }
})();
