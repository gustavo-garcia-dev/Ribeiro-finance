(function () {

  // ==============================
  // ELEMENTOS
  // ==============================

  const nomeInput = document.getElementById('nomeMeta');
  const valorInput = document.getElementById('valorMeta');
  const prazoValueInput = document.getElementById('prazoValue');

  const prazoButtons = document.querySelectorAll('.botoes-prazo .prazo');

  const salvarBtn = document.getElementById('salvarMetaBtn');
  const form = document.getElementById('formMeta');

  const metasList = document.getElementById('metasList');


  // ==============================
  // ERROS
  // ==============================

  function showError(input, message) {

    if (!input || !input.parentElement) return;

    const erroAnterior =
      input.parentElement.querySelector('.field-error');

    if (erroAnterior) {
      erroAnterior.remove();
    }

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

    const erroAnterior =
      input.parentElement.querySelector('.field-error');

    if (erroAnterior) {
      erroAnterior.remove();
    }
  }


  // ==============================
  // LOCAL STORAGE
  // ==============================

  function pegarMetas() {

    return JSON.parse(
      localStorage.getItem('metas')
    ) || [];

  }


  function salvarMetas(metas) {

    localStorage.setItem(
      'metas',
      JSON.stringify(metas)
    );

  }


  // ==============================
  // VALIDAÇÃO
  // ==============================

  function validarFormulario() {

    let valido = true;

    const nome =
      String(nomeInput?.value || '').trim();

    const valor =
      Number(valorInput?.value);

    const prazo =
      Number(prazoValueInput?.value);


    // Nome

    if (!nome) {

      showError(
        nomeInput,
        'Informe o nome da meta.'
      );

      valido = false;

    } else {

      clearError(nomeInput);

    }


    // Valor

    if (!Number.isFinite(valor) || valor <= 0) {

      showError(
        valorInput,
        'Informe um valor válido maior que 0.'
      );

      valido = false;

    } else {

      clearError(valorInput);

    }


    // Prazo

    if (!Number.isFinite(prazo) || prazo <= 0) {

      showError(
        prazoValueInput,
        'Selecione um prazo.'
      );

      valido = false;

    } else {

      clearError(prazoValueInput);

    }


    return {

      valido,

      nome,

      valor,

      prazo

    };

  }


  // ==============================
  // CRIAR CARD
  // ==============================

  function criarCard(meta, index) {

    const card =
      document.createElement('article');

    card.className =
      'meta-preview-card';


    // Evita problema caso não exista economizado
    const economizado =
      Number(meta.economizado) || 0;


    // Calcula porcentagem

    let porcentagem =
      (economizado / meta.valor) * 100;


    if (porcentagem > 100) {
      porcentagem = 100;
    }


    if (porcentagem < 0) {
      porcentagem = 0;
    }


    porcentagem =
      porcentagem.toFixed(1);


    // Valor que falta

    const falta =
      Math.max(
        meta.valor - economizado,
        0
      );


    card.innerHTML = `

            <div class="meta-card-top">

                <i class="fa-solid fa-bullseye"></i>

                <div>

                    <h3>
                        ${meta.nome}
                    </h3>

                    <p>
                        Prazo: ${meta.prazoAnos} ano(s)
                    </p>

                </div>

            </div>


            <div class="meta-card-info">

                <div>

                    <span>Meta</span>

                    <strong>
                        ${formatarMoeda(meta.valor)}
                    </strong>

                </div>


                <div>

                    <span>Economizado</span>

                    <strong>
                        ${formatarMoeda(economizado)}
                    </strong>

                </div>


                <div>

                    <span>Falta</span>

                    <strong>
                        ${formatarMoeda(falta)}
                    </strong>

                </div>

            </div>


            <div class="progresso-meta">

                <div class="progresso-texto">

                    <span>
                        Progresso
                    </span>

                    <span>
                        ${porcentagem}%
                    </span>

                </div>


                <div class="barra-progresso">

                    <div
                        class="barra-progresso-preenchida"
                        style="width: ${porcentagem}%">
                    </div>

                </div>

            </div>


            <div class="adicionar-dinheiro">

                <input
                    type="number"
                    class="valor-adicionar"
                    placeholder="R$ 0,00"
                    min="0"
                    step="0.01"
                >

                <button
                    type="button"
                    class="btn-adicionar-dinheiro"
                    data-index="${index}">

                    Adicionar

                </button>

            </div>


            <div class="acoes-meta">

                <button
                    type="button"
                    class="btn-excluir-meta"
                    data-index="${index}">

                    <i class="fa-solid fa-trash"></i>

                    Excluir

                </button>

            </div>

        `;


    // ==============================
    // ADICIONAR DINHEIRO
    // ==============================

    const btnAdicionar =
      card.querySelector(
        '.btn-adicionar-dinheiro'
      );


    const inputAdicionar =
      card.querySelector(
        '.valor-adicionar'
      );


    btnAdicionar.addEventListener(
      'click',
      function () {

        const valorAdicionar =
          Number(inputAdicionar.value);


        if (
          !Number.isFinite(valorAdicionar) ||
          valorAdicionar <= 0
        ) {

          alert(
            'Digite um valor válido.'
          );

          return;

        }


        const metas =
          pegarMetas();


        const metaAtual =
          metas[index];


        metaAtual.economizado =
          (Number(metaAtual.economizado) || 0)
          + valorAdicionar;


        // Não deixa ultrapassar a meta

        if (
          metaAtual.economizado >
          metaAtual.valor
        ) {

          metaAtual.economizado =
            metaAtual.valor;

        }


        salvarMetas(metas);


        carregarMetas();

      }
    );


    // ==============================
    // EXCLUIR META
    // ==============================

    const btnExcluir =
      card.querySelector(
        '.btn-excluir-meta'
      );


    btnExcluir.addEventListener(
      'click',
      function () {

        const confirmar =
          confirm(
            'Deseja realmente excluir esta meta?'
          );


        if (!confirmar) {
          return;
        }


        const metas =
          pegarMetas();


        metas.splice(index, 1);


        salvarMetas(metas);


        carregarMetas();

      }
    );


    return card;

  }


  // ==============================
  // FORMATAR MOEDA
  // ==============================

  function formatarMoeda(valor) {

    return Number(valor).toLocaleString(
      'pt-BR',
      {
        style: 'currency',
        currency: 'BRL'
      }
    );

  }


  // ==============================
  // MOSTRAR METAS
  // ==============================

  function carregarMetas() {

    if (!metasList) return;


    const metas =
      pegarMetas();


    metasList.innerHTML = '';


    if (metas.length === 0) {

      metasList.innerHTML = `

                <div class="sem-metas">

                    <i class="fa-solid fa-bullseye"></i>

                    <p>
                        Nenhuma meta criada ainda.
                    </p>

                </div>

            `;

      return;

    }


    metas.forEach(
      function (meta, index) {

        const card =
          criarCard(meta, index);

        metasList.appendChild(card);

      }
    );

  }


  // ==============================
  // BOTÕES DE PRAZO
  // ==============================

  prazoButtons.forEach(
    function (btn) {

      btn.addEventListener(
        'click',
        function () {


          // Remove ativo

          prazoButtons.forEach(
            function (botao) {

              botao.classList.remove(
                'ativo'
              );

            }
          );


          // Ativa selecionado

          btn.classList.add(
            'ativo'
          );


          // Pega número

          const texto =
            String(
              btn.textContent || ''
            ).trim();


          const match =
            texto.match(/(\d+)/);


          if (match) {

            prazoValueInput.value =
              match[1];

          }


          clearError(
            prazoValueInput
          );

        }
      );

    }
  );


  // ==============================
  // SALVAR META
  // ==============================

  if (salvarBtn) {

    salvarBtn.addEventListener(
      'click',
      function (event) {

        event.preventDefault();


        const resultado =
          validarFormulario();


        if (!resultado.valido) {
          return;
        }


        const metas =
          pegarMetas();


        const novaMeta = {

          nome:
            resultado.nome,

          valor:
            resultado.valor,

          prazoAnos:
            resultado.prazo,

          economizado:
            0

        };


        metas.push(
          novaMeta
        );


        salvarMetas(
          metas
        );


        // Atualiza os cards

        carregarMetas();


        // Limpa formulário

        nomeInput.value = '';

        valorInput.value = '';


        clearError(
          nomeInput
        );

        clearError(
          valorInput
        );

        clearError(
          prazoValueInput
        );


        console.log(
          'Meta criada:',
          novaMeta
        );

      }
    );

  }


  // ==============================
  // FORM
  // ==============================

  if (form) {

    form.addEventListener(
      'submit',
      function (event) {

        event.preventDefault();

      }
    );

  }


  // ==============================
  // INICIAR
  // ==============================

  carregarMetas();


})();