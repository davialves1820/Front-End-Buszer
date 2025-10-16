# Arquitetura do Sistema Buszer

## Visão Geral
Sistema de rastreamento de ônibus universitários construído com arquitetura em camadas e princípios de microserviços.

## Arquitetura em Camadas

### 1. Presentation Layer (Camada de Apresentação)
**Localização:** `src/components/` e `src/pages/`

Responsável pela interface do usuário e interação:
- **Components:** Componentes reutilizáveis de UI
  - `layout/Header.tsx` - Navegação principal
  - `schedules/ScheduleCard.tsx` - Card de horário
  - `admin/StatsCard.tsx` - Card de estatísticas
  - `admin/VehicleCard.tsx` - Card de veículo
  - `admin/NotificationCard.tsx` - Card de notificação

- **Pages:** Páginas principais da aplicação
  - `Home.tsx` - Landing page
  - `Schedules.tsx` - Página de horários públicos
  - `Admin.tsx` - Painel administrativo

### 2. Service Layer (Camada de Serviço)
**Localização:** `src/services/`

Contém a lógica de negócio e comunicação com APIs (microserviços simulados):

- **FleetService** (`fleetService.ts`)
  - Gestão de veículos
  - Estatísticas da frota
  - Atualização de status dos veículos
  - Gerenciamento de motoristas

- **ScheduleService** (`scheduleService.ts`)
  - Consulta de horários
  - Filtros por campus
  - Status de linhas

- **NotificationService** (`notificationService.ts`)
  - Criação de notificações
  - Contagem de não lidas
  - Marcação de leitura
  - Histórico de alertas

### 3. Data Layer (Camada de Dados)
**Localização:** `src/types/models.ts`

Define os modelos de domínio e tipos TypeScript:
- `Vehicle` - Modelo de veículo
- `Driver` - Modelo de motorista
- `Route` - Modelo de rota
- `Schedule` - Modelo de horário
- `Notification` - Modelo de notificação
- `FleetStats` - Estatísticas da frota
- `Location` - Localização GPS

## Princípios de Microserviços

Embora seja uma aplicação frontend, a estrutura simula microserviços através de:

### 1. Separação de Responsabilidades
Cada serviço tem uma responsabilidade específica e bem definida:
- **Fleet Service**: Tudo relacionado a veículos e motoristas
- **Schedule Service**: Horários e rotas
- **Notification Service**: Alertas e comunicação
- **Tracking Service**: Rastreamento em tempo real (preparado para implementação)

### 2. Baixo Acoplamento
Os serviços são independentes e se comunicam através de interfaces bem definidas.

### 3. Alta Coesão
Cada serviço agrupa funcionalidades relacionadas.

### 4. Escalabilidade
Estrutura preparada para migração para backend real:
- Fácil conversão para APIs REST
- Pronto para integração com Lovable Cloud/Supabase
- Estrutura preparada para WebSocket (tracking em tempo real)

## Estrutura de Pastas

```
src/
├── components/          # Presentation Layer
│   ├── layout/         # Componentes de layout
│   ├── schedules/      # Componentes de horários
│   ├── admin/          # Componentes administrativos
│   └── ui/             # Componentes base (shadcn)
├── pages/              # Páginas da aplicação
├── services/           # Service Layer (Microserviços)
│   ├── fleetService.ts
│   ├── scheduleService.ts
│   └── notificationService.ts
├── types/              # Data Layer
│   └── models.ts
└── lib/                # Utilitários
```

## Design System

### Cores (HSL)
- **Primary**: `194 68% 24%` - Teal escuro (header, navegação)
- **Secondary**: `194 100% 42%` - Cyan (botões ativos, badges)
- **Success**: `142 70% 45%` - Verde (ações positivas)
- **Destructive**: `0 84% 60%` - Vermelho (alertas)
- **Warning**: `45 100% 51%` - Amarelo (avisos)

### Tokens Semânticos
Todos os componentes usam tokens do design system, não cores diretas:
- `bg-primary`, `text-primary-foreground`
- `bg-success`, `text-success-foreground`
- etc.

## Fluxo de Dados

```
User Action → Component → Service → Mock Data → Component Update
```

### Exemplo: Carregar Estatísticas da Frota
1. `Admin.tsx` monta o componente
2. `useEffect` chama `FleetService.getFleetStats()`
3. Service retorna dados mockados
4. Estado é atualizado
5. `StatsCard` renderiza com novos dados

## Próximos Passos para Backend Real

### 1. Integração com Lovable Cloud
- Ativar Lovable Cloud no projeto
- Criar tabelas no Supabase:
  - `vehicles`
  - `drivers`
  - `routes`
  - `schedules`
  - `notifications`

### 2. Implementar Edge Functions
- `track-vehicle` - Atualizar localização GPS
- `send-notification` - Enviar notificações push
- `update-schedule` - Atualizar horários

### 3. Real-time Features
- WebSocket para tracking ao vivo
- Supabase Realtime para notificações
- Live updates de status

### 4. Autenticação
- Login de administradores
- Perfis de usuário
- Roles (admin, motorista, aluno)

## Benefícios da Arquitetura

✅ **Manutenibilidade**: Código organizado e fácil de entender
✅ **Testabilidade**: Serviços podem ser testados isoladamente
✅ **Escalabilidade**: Fácil adicionar novos microserviços
✅ **Reutilização**: Componentes e serviços reutilizáveis
✅ **Separação de Concerns**: Cada camada tem responsabilidade clara
✅ **Preparado para Backend**: Estrutura pronta para APIs reais
