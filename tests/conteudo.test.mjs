// Confere o conteúdo publicado do portfólio a partir do HTML renderizado pelo Next.
// Requer o site rodando: `npm run build && npm start` (ou BASE_URL apontando para outro endereço).
import { test } from 'node:test'
import assert from 'node:assert/strict'

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3000'

async function carregarHtml() {
  const resposta = await fetch(BASE_URL)
  assert.equal(resposta.status, 200)
  return resposta.text()
}

test('a página declara o idioma pt-BR', async () => {
  // Cenário
  const html = await carregarHtml()

  // Ação
  const declaraPtBr = html.includes('lang="pt-BR"')

  // Validação
  assert.ok(declaraPtBr, 'esperava <html lang="pt-BR">')
})

test('a página mostra o Ecossistema Jarbas', async () => {
  // Cenário
  const html = await carregarHtml()

  // Ação
  const mostraJarbas = html.includes('Ecossistema Jarbas')

  // Validação
  assert.ok(mostraJarbas)
})

test('a página lista as contribuições open source', async () => {
  // Cenário
  const html = await carregarHtml()

  // Ação
  const faltando = ['tw93/Pake', 'tw93/Mole', 'Project N.O.M.A.D.'].filter(
    (projeto) => !html.includes(projeto)
  )

  // Validação
  assert.deepEqual(faltando, [])
})

test('a página mostra o trabalho para a Spray Pro', async () => {
  // Cenário
  const html = await carregarHtml()

  // Ação
  const mostraSprayPro = html.includes('Spray Pro')

  // Validação
  assert.ok(mostraSprayPro)
})

test('a página não se apresenta como em construção', async () => {
  // Cenário
  const html = await carregarHtml()

  // Ação
  // O aviso é digitado no navegador; no HTML só aparece a barra de título do terminal.
  const emConstrucao = /under construction|construction-status\.sh/i.test(html)

  // Validação
  assert.equal(emConstrucao, false)
})

test('o rodapé mostra o ano atual', async () => {
  // Cenário
  const html = await carregarHtml()
  const ano = new Date().getFullYear()

  // Ação
  // O React separa texto fixo e variável com comentários <!-- --> no HTML.
  const mostraAno = html.replaceAll('<!-- -->', '').includes(`© ${ano}`)

  // Validação
  assert.ok(mostraAno, `esperava "© ${ano}" no rodapé`)
})
