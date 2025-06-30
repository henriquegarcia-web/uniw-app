import {
  INotification,
  NotificationPriorityType,
  NotificationType,
} from '@papaya-punch/uniw-shared-modules'

// --- DADOS MOCADOS ---

export const mockNotifications: INotification[] = [
  {
    id: 'notif-001',
    userId: 'user-001',
    type: NotificationType.ORDER_UPDATE,
    title: 'Seu pedido foi enviado!',
    // title: 'Boas notícias! O seu pedido #1001-2025 já está a caminho.',
    message:
      'Seu pedido contendo o **Vestido Midi Floral** e **Batom Hidratante** foi despachado e deve chegar em breve. Use o código de rastreio BR123456789BR para acompanhar a entrega.',
    createdAt: Date.now() - 2 * 60 * 60 * 1000,
    read: false,
    priority: NotificationPriorityType.NORMAL,
    data: {
      screen: 'MainTabs',
      params: { screen: 'ProfileStack', params: { screen: 'OrderHistory' } },
    },
  },
  {
    id: 'notif-002',
    userId: 'user-001',
    type: NotificationType.PROMOTION,
    title: 'Oferta Relâmpago em Skincare!',
    priority: NotificationPriorityType.LOW,
    // title: 'Só hoje: 20% de desconto em todos os sérums. Não perca!',
    message:
      'Aproveite o dia para cuidar da sua pele! Todos os sérums da nossa coleção estão com **20% de desconto** usando o cupom **SKINCARE20**. A promoção é válida apenas hoje.',
    createdAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
    read: false,
  },
  {
    id: 'notif-003',
    userId: 'user-001',
    type: NotificationType.ANNOUNCEMENT,
    priority: NotificationPriorityType.LOW,
    title: 'Você ganhou 100 pontos!',
    // title: 'Parabéns pela sua compra! Adicionamos 100 pontos de fidelidade à sua conta.',
    message:
      'Obrigado por comprar conosco! Como recompensa, você recebeu **100 pontos** no nosso programa de fidelidade. Continue comprando para desbloquear cupons e prêmios incríveis!',
    createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
    read: true,
    data: {
      screen: 'MainTabs',
      params: { screen: 'ProfileStack', params: { screen: 'LoyaltyProgram' } },
    },
  },
  {
    id: 'notif-004',
    userId: 'user-001',
    type: NotificationType.ANNOUNCEMENT,
    priority: NotificationPriorityType.LOW,
    title: 'Nova coleção de Verão',
    // title: 'Confira as peças que acabaram de chegar para a nova estação.',
    message:
      'O verão chegou na UNIW! Explore nossa nova coleção com vestidos, bolsas e acessórios que são a cara da estação. Toque para ver mais.',
    createdAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
    read: true,
    data: {
      screen: 'MainTabs',
      params: {
        screen: 'CategoryStack',
        params: { screen: 'CategoryDetails', params: { categoryId: 'cat-5' } },
      },
    },
  },
]
