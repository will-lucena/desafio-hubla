# Desafio Hubla

## Solução

Para resolver o problema proposto, criei uma tela com Vue3 que permite fazer o
upload de um arquivo .txt e faz o upload enviando esse arquivo através de um
endpoint multi-part para o backend que foi feito em node.

No backend o arquivo é parseado, usando o formato descrito no arquivo de
instruções como base para as regras de validação de tamanho de partes da string
e seus tipos. Com o arquivo traduzido para uma lista de transações faço a
inserção no banco postgres, validando os blocos de transações a medida que
insiro-os no banco e criando os relacionamentos entre transações, vendedores e
afiliados.

Com as transações salvas no banco é devolvido ao front a lista parseada das
infos para serem apresentadas ao usuário. O front ao receber essa lista monta
uma tabela com as transações e requisita ao backend os saldos de todos os
vendedores. Com a resposta desse segundo endpoint é montada a apresentação dos
saldos no front.

Os erros são mapeados no backend enviados ao front de forma estruturada, o front
apresenta eles como alertas.

É possível ordenar a lista de transações por qualquer uma das colunas, de forma
crescente ou decrescente, além de filtrar as transações somente de um (ou mais)
vendedor(es) selecionando o(s) card(s) de saldo dele(s).

## Setup

Como implementei o requisito bônus de usar docker-compose, tendo o setup do
docker instalado na máquina basta rodar um `docker compose up` no terminal e
terá toda a solução rodando em instantes, podendo acessa-la em `localhost:5173`

## Requisitos funcionais

1. [x] Ter uma tela (via formulário) para fazer o upload do arquivo
2. [x] Fazer o parsing do arquivo recebido, normalizar os dados e armazená-los
       em um banco de dados relacional, seguindo as definições de interpretação
       do arquivo
3. [x] Exibir a lista de todas as transações de produtos importadas
4. [x] Exibir o saldo final do produtor
5. [x] Exibir o saldo final de um afiliado
6. [x] Fazer tratamento de erros no backend, e reportar mensagens de erro
       amigáveis no frontend.

## Requisitos não funcionais

1. [x] Escreva um README descrevendo o projeto e como fazer o setup.
1. [x] A aplicação deve ser simples de configurar e rodar, compatível com
       ambiente Unix. Você deve utilizar apenas bibliotecas gratuitas ou livres.
1. [x] Utilize docker para os diferentes serviços que compõe a aplicação para
       que funcione facilmente fora do seu ambiente pessoal.
1. [x] Use qualquer banco de dados relacional.
1. [x] Use commits pequenos no Git e escreva uma boa descrição para cada um.
1. [x] Escreva unit tests tanto no backend quanto do frontend.
1. [x] Faça o código mais legível e limpo possível.
1. [x] Escreva o código (nomes e comentários) em inglês. A documentação pode ser
       em português se preferir.
1. [x] Grave um vídeo de poucos minutos (até 5) mostrando sua solução em
       funcionamento. Mesmo usando Docker já tivemos problemas.

## Requisitos bônus

1. [x] Tiver documentação das APIs do backend.
2. [x] Utilizar docker-compose para orquestar os serviços num todo.
3. [ ] Ter testes de integração ou end-to-end.
4. [x] Tiver toda a documentação escrita em inglês fácil de entender.
5. [ ] Lidar com autenticação e/ou autorização.
