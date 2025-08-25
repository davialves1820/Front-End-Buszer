# 🚌 Buszer – Monitoramento Inteligente do Ônibus Circular da UFPB

## 📌 Descrição do Projeto
O **Buszer** é um sistema desenvolvido para permitir que estudantes e servidores da Universidade Federal da Paraíba acompanhem em **tempo real** a localização do ônibus circular, consultem os horários previstos, visualizem a rota e recebam notificações personalizadas sobre a estimativa de chegada.

---

## 📄 Documento de Requisitos
📎 [Documento de Requisitos](https://docs.google.com/document/d/1R314KmywxrJnf8lMydXkawByNYNznzh-jtw5UZWZ9bg/edit?usp=sharing)

---

## 🖼️ Figma
📎 [Figma](https://www.figma.com/design/MKuAPXkBIQiSlbQawefPYG/Buszer?node-id=0-1&t=GU1cPnVYtCyvlirA-1)

## 🎯 Objetivos
- Melhorar a experiência dos usuários no transporte circular da UFPB.
- Reduzir incertezas sobre atrasos ou mudanças na rota.
- Fornecer dados precisos e atualizados em tempo real.

---

## 📱 Requisitos Funcionais
| ID      | Funcionalidade | Prioridade |
|---------|---------------|------------|
| RF001 | Interface móvel amigável e otimizada | **Must** |
| RF002 | Autenticação de usuário | **Will not have** |
| RF003 | Consulta de horários previstos | **Must** |
| RF004 | Controle do administrador | **Must** |
| RF005 | Rastreamento em tempo real no mapa | **Must** |
| RF006 | Estimativa de chegada por ponto de parada | **Must** |
| RF007 | Visualização da rota completa | **Should** |
| RF008 | Notificações personalizadas | **Should** |
| RF009 | Alertas de ocorrências (atrasos, interrupções) | **Should** |

---

## ⚙️ Requisitos Não Funcionais
| ID      | Descrição | Prioridade |
|---------|-----------|------------|
| RN001 | Usabilidade e interface intuitiva | **Must** |
| RN002 | Segurança dos dados e integridade da localização | **Must** |
| RN003 | Atualizações em tempo real com atraso máximo de 1 minuto | **Must** |
| RN004 | Disponibilidade no horário de tráfego dos ônibus | **Must** |
| RN005 | Escalabilidade para outras frotas | **Could** |
| RN006 | Compatibilidade com iOS e Android (responsivo) | **Must** |

---

## 📖 Casos de Uso

| ID   | Nome | Ator | Prioridade | Descrição Resumida |
|------|------|------|------------|--------------------|
| UC01 | Consulta de Horário | Usuário | Essencial | Usuário consulta horários previstos de saída e chegada dos ônibus, com possibilidade de ver a rota. |
| UC02 | Visualização da Rota | Usuário | Essencial | Exibe no mapa a rota atual do ônibus, com destaque piscante para o veículo rastreado. |
| UC03 | Estimativa de Chegada | Usuário | Essencial | Calcula e exibe o tempo estimado de chegada do ônibus em cada ponto de parada. |
| UC04 | Alertas de Ocorrências | Usuário | Alta | Notifica sobre atrasos, adiantamentos e chegada do ônibus, com cores indicativas no horário. |
| UC05 | Notificações Personalizadas | Usuário | Alta | Usuário configura quais ônibus deseja receber alertas, via e-mail. |
| UC06 | Autenticação de Usuário | Usuário | Desejável | Permite login e cadastro para acesso personalizado ao sistema. |
| UC07 | Controle do Administrador | Administrador | Alta | Gerencia a frota, visualizando localização e enviando notificações globais ou específicas. |

---

