// All the shapes of the system. Reading this file explains the whole domain.

export type OrderId = `ORD-${number}`;

export interface LineItem {
  name: string;
  quantity: number;
  price: number;
}

// Each state carries only the data that makes sense in that state.
export type OrderState =
  | { status: "created"; items: LineItem[] }
  | { status: "paid"; items: LineItem[]; paymentId: string }
  | { status: "shipped"; items: LineItem[]; paymentId: string; trackingNo: string }
  | { status: "delivered"; items: LineItem[]; paymentId: string; trackingNo: string; deliveredAt: string }
  | { status: "cancelled"; items: LineItem[]; reason: string; refundId?: string };

export type Status = OrderState["status"];

// Things that can happen to an order.
export type OrderEvent =
  | { type: "pay"; paymentId: string }
  | { type: "ship"; trackingNo: string }
  | { type: "deliver"; at: string }
  | { type: "cancel"; reason: string };

export interface Order {
  id: OrderId;
  customer: string;
  state: OrderState;
  log: Array<{ from: Status; to: Status; event: OrderEvent["type"] }>;
}
