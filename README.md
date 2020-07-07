<div align="center">
<h1>OBahia - Sistêma de Inteligência Territorial Estratégica</h1>
<h2>Previsão do Início da Estação Chuvosa</h2>
<br>
<img width="600" src="/assets/print.png" alt="OBahia - Análise de séries temporais">
<br>
<br>
</div>

<div align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/pimentafm/obahia-temporal?color=blue&style=for-the-badge">

  <a href="https://github.com/pimentafm">
    <img alt="Made by Fernando Pimenta" src="https://img.shields.io/badge/made%20by-Fernando%20Pimenta-blue?style=for-the-badge">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-blue?style=for-the-badge">
</div>

<div align="center">

[![made-with-TypeScript](https://img.shields.io/badge/TypeScript-294E80?style=for-the-badge)](https://www.typescriptlang.org/)
[![made-with-Nodejs](https://img.shields.io/badge/Node-green?style=for-the-badge)](https://nodejs.org/)
[![made-with-Yarn](https://img.shields.io/badge/Yarn-2188b6?style=for-the-badge)](https://yarnpkg.com/)
[![made-with-React](https://img.shields.io/badge/React-61dafb?style=for-the-badge)](https://reactjs.org/)
[![made-with-Mapserver](https://img.shields.io/badge/mapserver-33a333?style=for-the-badge)](https://mapserver.org/)
[![made-with-PHP](https://img.shields.io/badge/Django-purple?style=for-the-badge)](https://www.php.net/)
[![made-with-PostgreSQL](https://img.shields.io/badge/PostgreSQL-33658f?style=for-the-badge)](https://www.postgresql.org/)
[![made-with-PostGIS](https://img.shields.io/badge/PostGIS-5a7a9f?style=for-the-badge)](https://postgis.net/)

</div>

### Informações
<div align="justify">
A versão 2 do Climate Forecast System foi desenvolvida no Environmental Modeling Center do National Centers for Environmental Prediction (NCEP). É um modelo totalmente acoplado que representa a interação entre a atmosfera, oceanos, continentes e gelo marinho. Tornou-se operacional no NCEP em abril de 2011. As previsões são inicializadas diariamente, e produzem, para cada conjunto de inicializações, previsões climáticas para um período de nove meses. As previsões são geradas numa grade horizontal de 100 x 100 km, mas neste trabalho interpolamos para uma grade horizontal de ¼° x ¼°. As previsões usadas são de domínio público, e esta plataforma visa apenas facilitar a sua visualização.

As previsões para o Oeste da Bahia foram avaliadas por Luiz Felipe Sant´Anna Commar, em sua dissertação de MS em Meteorologia Aplicada na Universidade Federal de Viçosa, defendida em julho de 2020. A partir dos resultados desta dissertação, esta ferramenta web foi customizada para apresentar os resultados de previsão do início da estação chuvosa. Os resultados desta dissertação mostraram que a acurácia das estimativas de previsão do início das chuvas pelo CFSv2 para esta região dependem fortemente da data de inicialização das previsões, sendo que com dois meses de antecedência a previsão apresenta um erro médio absoluto (MAE) com 15 a 20 dias de diferença para os dados observados. Por esta razão, na customização desta plaforma, foi decidido apresentar resultados de previsões inicializadas em 01/08 e 01/09.

Ao se clicar no mapa, será obtido o valor da previsão em questão para aquele pixel, e o erro médio (MAE) calculado no período 2011-2019 para as previsões inicializadas na mesma data. Embora na maior parte dos anos testados, o início das chuvas tenha efetivamente ocorrido dentro do intervalo de MAE especificado, é possível que em alguns anos as chuvas se iniciem foram do intervalo previsto. Em qualquer caso, as previsões inicializadas em 1° de setembro devem ser mais precisas do que as previsões inicializadas em 1° de agosto.

Os erros tendem a ser menores do lado leste (fronteira com Tocantins e Goiás) do que do lado oeste da região (próximo ao rio São Francisco). Além disso, nos anos de El Niño, o MAE é entre 2 e 8 dias maior do que a média dos demais anos analisada.

Maiores detalhes sobre o sistema de previsão e a sua avaliação para a região estão disponíveis em:

Saha, S. et al., 2014: The NCEP Climate Forecast System Version 2, Journal of Climate, 27, 2185–2208. doi: http://dx.doi.org/10.1175/JCLI-D-12-00823.1

Commar, L. F. S., 2020: Avaliação da previsão climática do início da estação chuvosa no Oeste da Bahia. Dissertação de MS, Universidade Federal de Viçosa, julho de 2020. Orientador: Marcos Heil Costa.
</div>

### Termos de uso
<div align="justify">
O usuário assume todo o risco relacionado ao uso de informações nas páginas Web deste servidor. A UFV fornece essas informações "como estão", e a UFV se isenta de todas e quaisquer garantias, expressas ou implícitas, incluindo (mas não se limitando a) quaisquer garantias implícitas de adequação a uma finalidade específica. Em nenhum caso a UFV será responsável perante usuários ou terceiros por quaisquer danos diretos, indiretos, incidentais, conseqüenciais, especiais ou perda de lucro resultante de qualquer uso ou uso indevido desses dados.
</div>

Fernando Pimenta [My Github!](https://github.com/pimentafm) :bird: :sunglasses:

