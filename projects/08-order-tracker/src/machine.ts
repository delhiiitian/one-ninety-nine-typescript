// The state machine: given a state and an event, return the next state, or an error.
// Every allowed move is written here once; anything else is rejected.

import type { OrderEvent, OrderState } from "./types.ts";

export type Transition = { ok: true; state: OrderState } | { ok: false; error: string };

export function transition(state: OrderState, event: OrderEvent): Transition {
  const reject = (): Transition => ({ ok: false, error: `Cannot "${event.type}" an order that is ${state.status}` });

  switch (state.status) {
    case "created":
      if (event.type === "pay") return { ok: true, state: { status: "paid", items: state.items, paymentId: event.paymentId } };
      if (event.type === "cancel") return { ok: true, state: { status: "cancelled", items: state.items, reason: event.reason } };
      return reject();

    case "paid":
      if (event.type === "ship") return { ok: true, state: { ...state, status: "shipped", trackingNo: event.trackingNo } };
      if (event.type === "cancel") {
        // Paid orders get a refund when cancelled.
        return { ok: true, state: { status: "cancelled", items: state.items, reason: event.reason, refundId: `RF-${state.paymentId}` } };
      }
      return reject();

    case "shipped":
      if (event.type === "deliver") return { ok: true, state: { ...state, status: "delivered", deliveredAt: event.at } };
      return reject();

    case "delivered":
    case "cancelled":
      return reject(); // final states: nothing more can happen

    default: {
      const impossible: never = state;
      return impossible;
    }
  }
}

export function total(state: OrderState): number {
  return state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function describe(state: OrderState): string {
  switch (state.status) {
    case "created": return "Waiting for payment";
    case "paid": return `Paid (${state.paymentId}), packing now`;
    case "shipped": return `Shipped, tracking ${state.trackingNo}`;
    case "delivered": return `Delivered at ${state.deliveredAt}`;
    case "cancelled": return `Cancelled: ${state.reason}${state.refundId ? `, refund ${state.refundId}` : ""}`;
  }
}
