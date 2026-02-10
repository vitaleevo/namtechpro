const fs = require('fs');
const path = require('path');

const targets = [
    'legacy',
    'PLANO_CHATBOT.md',
    'PLAN_FIX_AUTH.md',
    'SECURITY_AUDIT.md',
    'plano_agendamento.md',
    'plano_de_correcao.md',
    'plano_testes_owasp.md',
    'relatorio_seguranca.md',
    'regras.md',
    'env_vars_for_vercel.env',
    'flavico.png',
    'principal .png'
];

targets.forEach(target => {
    const fullPath = path.join(__dirname, target);
    try {
        if (fs.existsSync(fullPath)) {
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                fs.rmSync(fullPath, { recursive: true, force: true });
                console.log(`Deleted folder: ${target}`);
            } else {
                fs.unlinkSync(fullPath);
                console.log(`Deleted file: ${target}`);
            }
        }
    } catch (err) {
        console.error(`Error deleting ${target}: ${err.message}`);
    }
});
