export function receiptTemplateConfig() {
  return {
    subject: 'Recibo de compra para %customer% - Orden ID: %orderId%',
    text: 'Recibo de compra para',
    template: {
      preview: 'Recibo de compra para',
      theme: {},
      header: {},
      body: {},
      footer: {},
    },
  };
}

export function merchantTemplateConfig() {
  return {
    subject: 'Nueva orden - Orden ID: %orderId%',
    text: 'Nueva orden',
    template: {
      preview: 'Nueva orden',
      theme: {},
      header: {},
      body: {},
      footer: {},
    },
  };
}
