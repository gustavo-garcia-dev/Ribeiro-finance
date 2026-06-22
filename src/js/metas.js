(function () {
  const nomeInput = document.getElementById('nomeMeta');
  const valorInput = document.getElementById('valorMeta');
  const prazoValueInput = document.getElementById('prazoValue');
  const prazoButtons = document.querySelectorAll('.botoes-prazo .prazo');
  const salvarBtn = document.getElementById('salvarMetaBtn');
  const form = document.getElementById('formMeta');

  const metasList = document.getElementById('metasList');

  function showError(input, message) {
    if (!input || !input.parentElement) return;
    const prev = input.parentElement.querySelector('.field-error');
    if (prev) prev.remove();

    const p = document.createElement('p');
    p.className = 'field-error';
    p.style.color = '#ff4d4d';
    p.style.marginTop = '8px';
    p.style.fontSize = '13px';
    p.textContent = message;
    input.parentElement.appendChild(p);
  }

  function clearError(input) {
    if (!input || !input.parentElement) return;
    const prev = input.parentElement.querySelector('.field-error');
    if (prev) prev.remove();
  }

  function parseValor(value) {
    // como o input é type=number, geralmente já vem como número
    const n = Number(value);
    return Number.isFinite(n) ? n : NaN;
  }

  function getPrazo() {
    const n = Number(prazoValueInput?.value);
    return Number.isFinite(n) ? n : null;
  }

  function validate() {
    let ok = true;

    const nome = String(nomeInput?.value || '').trim();
    const valorNum = parseValor(valorInput?.value);
    const prazoYears = getPrazo();

    if (!nome) {
      ok = false;
      showError(nomeInput, 'Informe o nome da meta.');
    } else {
      clearError(nomeInput);
    }

    if (!Number.isFinite(valorNum) || valorNum <= 0) {
      ok = false;
      showError(valorInput, 'Informe um valor válido (maior que 0).');
    } else {
      clearError(valorInput);
    }

    if (!prazoYears) {
      ok = false;
      // mostra erro ao lado do prazo (prazoValueInput está dentro do mesmo .campo)
      showError(prazoValueInput, 'Selecione um prazo.');
    } else {
      clearError(prazoValueInput);
    }

    return { ok, payload: { nome, valor: valorNum, prazoAnos: prazoYears } };
  }

  function addMetaPreview(meta) {
    if (!metasList) return;

    const card = document.createElement('div');
    card.className = 'meta-preview-card';

    const h = document.createElement('h3');
    h.textContent = meta.nome;

    const p1 = document.createElement('p');
    p1.textContent = `Valor: R$ ${meta.valor.toFixed(2)}`;

    const p2 = document.createElement('p');
    p2.textContent = `Prazo: ${meta.prazoAnos} ano(s)`;

    card.appendChild(document.createElement('i')).className = 'fa-solid fa-bullseye';
    card.appendChild(h);
    card.appendChild(p1);
    card.appendChild(p2);

    metasList.style.display = 'grid';
    metasList.style.gap = '12px';

    // se quiser "ao lado", coloque um layout em CSS; por enquanto adiciona abaixo
    metasList.appendChild(card);
  }

  // prazo buttons
  prazoButtons?.forEach((btn) => {
    btn.addEventListener('click', () => {
      prazoButtons.forEach((b) => b.classList.remove('ativo'));
      btn.classList.add('ativo');

      const text = String(btn.textContent || '').trim();
      const match = text.match(/(\d+)/);
      if (match) prazoValueInput.value = String(match[1]);

      // ao mudar prazo, remove erro do prazo
      clearError(prazoValueInput);
    });
  });

  // Botão SALVAR (não bloqueado)
  if (salvarBtn) {
    salvarBtn.addEventListener('click', (e) => {
      e.preventDefault();

      const { ok, payload } = validate();
      if (!ok) return;

      // simples: valida e zera o formulário
      addMetaPreview(payload);

      nomeInput.value = '';
      valorInput.value = '';

      // mantém prazo selecionado (como está hoje no UI)
      // remove erros já existentes
      clearError(nomeInput);
      clearError(valorInput);
      clearError(prazoValueInput);
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => e.preventDefault());
  }

  // não desabilita botão: apenas garante que está habilitado
  if (salvarBtn) salvarBtn.disabled = false;
})();

