(() => {
  const examples = {
    jacket: ['Forest green track jacket', 'Zip-front track jacket in forest green with cream stripes down the sleeves.', 'Forest green zip-front jacket with cream sleeve stripes'],
    trainers: ['Off-white low-top trainers', 'Off-white lace-up trainers with tonal panels and a low profile.', 'A pair of off-white low-top trainers'],
    denim: ['Indigo blue jeans', 'Indigo denim jeans with contrast stitching and a back patch pocket.', 'Folded indigo jeans showing the back pocket'],
    coupe: ['Red die-cast coupé', 'Red collectible model car with a coupé body and black wheels.', 'Red collectible model coupé viewed from the side']
  };

  const demo = document.querySelector('#scanner-demo');
  const photo = document.querySelector('#demo-photo');
  const state = document.querySelector('#demo-state');
  const buttons = [...demo.querySelectorAll('[data-example]')];
  const form = document.querySelector('#draft-form');
  const output = document.querySelector('#draft-output');
  const result = output.closest('.draft-result');
  const copyStatus = document.querySelector('#copy-status');
  let selected = 'jacket';
  let finishTimer;

  function scanExample(key) {
    selected = key;
    clearTimeout(finishTimer);
    const [name, description, alt] = examples[key];
    for (const button of buttons) button.setAttribute('aria-pressed', String(button.dataset.example === key));
    photo.src = '/media/' + key + '.webp';
    photo.alt = alt;
    document.querySelector('#demo-name').textContent = name;
    document.querySelector('#demo-description').textContent = description;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches ||
      ['minimal', 'off'].includes(document.documentElement.dataset.vfMotion);
    function finish() {
      demo.removeAttribute('data-reading');
      state.textContent = 'Example listing · ' + name;
    }
    if (reduced) { finish(); return; }
    demo.setAttribute('data-reading', '');
    const beam = demo.querySelector('.demo-beam');
    for (const animation of beam.getAnimations()) { animation.currentTime = 0; animation.play(); }
    state.textContent = 'Reading example photo…';
    finishTimer = setTimeout(finish, 530);
  }

  for (const button of buttons) button.addEventListener('click', () => scanExample(button.dataset.example));
  document.querySelector('#run-demo').addEventListener('click', () => scanExample(selected));
  document.querySelector('#use-example').addEventListener('click', () => {
    if ([form.elements.namedItem('item'), form.elements.size, form.elements.details].some(field => field.value.trim()) &&
        !window.confirm('Replace the details in your draft with this example?')) return;
    const [name, description] = examples[selected];
    form.elements.namedItem('item').value = name;
    form.elements.size.value = '';
    form.elements.details.value = description;
    result.hidden = true;
    output.value = '';
    copyStatus.textContent = '';
    form.elements.namedItem('item').focus();
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const item = form.elements.namedItem('item').value.trim();
    const size = form.elements.size.value.trim();
    const details = form.elements.details.value.trim();
    if (!item || !details) { form.elements[item ? 'details' : 'item'].focus(); return; }
    output.value = item + '\n\n' + (size ? 'Size / measurements: ' + size + '\n' : '') + details;
    result.hidden = false;
    copyStatus.textContent = '';
    output.focus();
  });
  document.querySelector('#copy-draft').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(output.value); copyStatus.textContent = 'Copied'; }
    catch { output.focus(); output.select(); copyStatus.textContent = 'Draft selected. Choose Copy.'; }
  });
})();
