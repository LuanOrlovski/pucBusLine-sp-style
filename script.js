// Dados consolidados de todas as linhas
const linhas = {
    paiol: [
        {
            nome: "505 - Boqueirão / Centro Cívico",
            sentido: "Museu Oscar Niemeyer → Terminal Boqueirão",
            dias: "Todos os dias",
            horarios: ["05:52", "00:02"],
            rota: [
                "Museu Oscar Niemeyer",
                "Centro Cívico - Palácio Iguaçu",
                "Prefeitura",
                "Comendador Fontana",
                "Círculo Militar",
                "Guadalupe",
                "Terminal Boqueirão",
                "Paiol",
                "Terminal Hauer",
                "Terminal Carmo"
            ],
            localizacaoAtual: 7
        },
        {
            nome: "507 - Sítio Cercado (Horário)",
            sentido: "Guadalupe → Terminal Sítio Cercado",
            dias: "Dias úteis e sábados",
            horarios: ["06:41", "00:05"],
            rota: [
                "Guadalupe",
                "Terminal Boqueirão",
                "Paiol",
                "Terminal Hauer",
                "Terminal Carmo",
                "Terminal Boqueirão",
                "Alto Boqueirão",
                "Terminal Sítio Cercado"
            ],
            localizacaoAtual: 2
        },
        {
            nome: "508 - Sítio Cercado (Anti-Horário)",
            sentido: "Guadalupe → Terminal Sítio Cercado",
            dias: "Dias úteis e sábados",
            horarios: ["06:28", "00:04"],
            rota: [
                "Guadalupe",
                "Terminal Pinheirinho",
                "Vale Do Pinhão",
                "Westphalen (Iguaçu)",
                "Água Verde (Iguaçu)",
                "Terminal Capão Raso",
                "Terminal Pinheirinho",
                "Xapinhal",
                "Terminal Sítio Cercado"
            ],
            localizacaoAtual: 4
        },
        {
            nome: "518 - PUC / Rodoferroviária",
            sentido: "PUC → Rodoferroviária",
            dias: "Dias úteis",
            horarios: ["06:52", "23:05"],
            rota: ["PUC", "Paiol", "Rodoferroviária"],
            localizacaoAtual: 1
        },
        {
            nome: "707 - Tatuquara / Centro",
            sentido: "Praça Rui Barbosa → Terminal Tatuquara",
            dias: "Todos os dias",
            horarios: ["05:55", "00:15"],
            rota: [
                "Praça Rui Barbosa",
                "Paiol",
                "PUC",
                "Xaxim",
                "Jardim da Ordem",
                "Terminal Tatuquara"
            ],
            localizacaoAtual: 1
        },
        {
            nome: "F02 - Curitiba / Fazenda Rio Grande",
            sentido: "Carlos Gomes → Terminal Fazenda Rio Grande",
            dias: "Todos os dias",
            horarios: ["05:45", "23:35"],
            rota: [
                "Carlos Gomes",
                "Paiol",
                "PUC",
                "Marechal Floriano Peixoto",
                "Xaxim",
                "Terminal Metropolitano Fazenda Rio Grande"
            ],
            localizacaoAtual: 1
        }
    ],
    puc: [
        {
            nome: "518 - PUC / Rodoferroviária",
            sentido: "PUC → Rodoferroviária",
            dias: "Dias úteis",
            horarios: ["06:52", "23:05"],
            rota: ["PUC", "Paiol", "Rodoferroviária"],
            localizacaoAtual: 0
        },
        {
            nome: "707 - Tatuquara / Centro",
            sentido: "Praça Rui Barbosa → Terminal Tatuquara",
            dias: "Todos os dias",
            horarios: ["05:55", "00:15"],
            rota: [
                "Praça Rui Barbosa",
                "Paiol",
                "PUC",
                "Xaxim",
                "Jardim da Ordem",
                "Terminal Tatuquara"
            ],
            localizacaoAtual: 2
        },
        {
            nome: "F02 - Curitiba / Fazenda Rio Grande",
            sentido: "Carlos Gomes → Terminal Fazenda Rio Grande",
            dias: "Todos os dias",
            horarios: ["05:45", "23:35"],
            rota: [
                "Carlos Gomes",
                "Paiol",
                "PUC",
                "Marechal Floriano Peixoto",
                "Xaxim",
                "Terminal Metropolitano Fazenda Rio Grande"
            ],
            localizacaoAtual: 2
        }
    ]
};

// Função para renderizar as linhas de ônibus
function renderLinhas(estacao) {
    const container = document.getElementById(`resultado-${estacao}`);
    if (!container) return;
    
    container.innerHTML = `<h2 class="estacao-titulo">Estação Tubo ${estacao.toUpperCase()}</h2>`;
    
    linhas[estacao].forEach((linha, index) => {
        const pontos = linha.rota.map((ponto, i) => {
            let classe = 'ponto';
            if (ponto.toLowerCase().includes('paiol')) classe += ' paiol';
            if (ponto.toLowerCase().includes('puc')) classe += ' puc';
            if (i === linha.localizacaoAtual) classe += ' ativo';
            return `<div class="${classe}" title="${ponto}"></div>`;
        }).reduce((acc, ponto, i) => {
            // Adiciona seta apenas entre os pontos, não no final
            return i < linha.rota.length - 1 ? acc + ponto + '<span class="seta">→</span>' : acc + ponto;
        }, '');
        
        const linhaHTML = `
            <div class="linha-onibus" style="animation-delay: ${index * 0.1}s">
                <h3>${linha.nome}</h3>
                <p><strong>Sentido:</strong> ${linha.sentido}</p>
                <p><strong>Dias de operação:</strong> ${linha.dias}</p>
                <p><strong>Horário:</strong> ${linha.horarios.join(' → ')}</p>
                <div class="linha-metro">
                    <div class="descricao-rota">
                        <span>${linha.rota[0]}</span>
                        <span>${linha.rota[linha.rota.length - 1]}</span>
                    </div>
                    <div class="linha">${pontos}</div>
                </div>
            </div>
        `;
        
        container.insertAdjacentHTML('beforeend', linhaHTML);
    });
}

// Gerenciamento do modo escuro
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('dark-mode', isDark);
    document.getElementById('toggle-dark').textContent = isDark ? '☀️' : '🌙';
}

// Navegação por hash
function handleHashChange() {
    const hash = window.location.hash.substring(1) || 'inicio';
    document.querySelectorAll('.pagina').forEach(pag => pag.style.display = 'none');
    document.getElementById(hash).style.display = 'block';
    
    // Atualiza menu ativo
    document.querySelectorAll('.menu a').forEach(a => {
        a.classList.toggle('ativo', a.getAttribute('href') === `#${hash}`);
    });
    
    // Renderiza conteúdo se necessário
    if (hash === 'rotas') renderLinhas('paiol');
    if (hash === 'rotas-puc') renderLinhas('puc');
}

// Inicialização do site
window.addEventListener('DOMContentLoaded', () => {
    // Modo escuro
    if (localStorage.getItem('dark-mode') === 'true') {
        document.body.classList.add('dark-mode');
        document.getElementById('toggle-dark').textContent = '☀️';
    }
    
    document.getElementById('toggle-dark').addEventListener('click', toggleDarkMode);
    
    // Navegação
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Executa na carga inicial
    
    // Botão de voltar ao topo
    window.addEventListener('scroll', () => {
        document.getElementById('topo').style.display = 
            window.scrollY > 300 ? 'block' : 'none';
    });
    
    document.getElementById('topo').addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});