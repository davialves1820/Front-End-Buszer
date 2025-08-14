# 🚌 Buszer – Monitoramento Inteligente do Ônibus Circular da UFPB

## 📌 Descrição do Projeto
O **Buszer** é um sistema desenvolvido para permitir que estudantes e servidores da Universidade Federal da Paraíba acompanhem em **tempo real** a localização do ônibus circular, consultem os horários previstos, visualizem a rota e recebam notificações personalizadas sobre a estimativa de chegada.

---

## 📄 Documento de Requisitos
📎 [Documento de Requisitos](https://docs.google.com/document/d/1R314KmywxrJnf8lMydXkawByNYNznzh-jtw5UZWZ9bg/edit?usp=sharing)

---

## 🎯 Objetivos
- Melhorar a experiência dos usuários no transporte circular da UFPB.
- Reduzir incertezas sobre atrasos ou mudanças na rota.
- Fornecer dados precisos e atualizados em tempo real.

---

## 📱 Funcionalidades Principais (Requisitos Funcionais)
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

### **[UC01] Consulta de Horário**
Permite que o usuário consulte os horários previstos de saída e chegada do ônibus nos principais pontos.

### **[UC02] Visualização da Rota**
Exibe no mapa a rota completa do ônibus, com indicação em tempo real da sua posição.

### **[UC03] Estimativa de Chegada**
Calcula e exibe o tempo estimado de chegada do ônibus a um ponto de parada.

### **[UC04] Alertas de Ocorrências**
Envia notificações sobre atrasos, mudanças de rota e outras ocorrências.

### **[UC05] Notificações Personalizadas**
Permite configurar alertas para receber avisos sobre a aproximação do ônibus.

### **[UC06] Autenticação de Usuário**
(Desejável) Permite login no sistema para salvar preferências.

### **[UC07] Controle do Administrador**
Permite ao administrador gerenciar e monitorar toda a frota.

---
