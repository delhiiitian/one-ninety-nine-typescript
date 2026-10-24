// The service glues things together: creates orders, applies events, records history.

import { transition } from "./machine.ts";
import { Repository } from "./repository.ts";
import type { LineItem, Order, OrderEvent, OrderId, Status } from "./types.ts";

export class OrderService {
  private orders = new Repository<Order>();
  private nextNumber = 1001;

  create(customer: string, items: LineItem[]): Order {
    const id: OrderId = `ORD-${this.nextNumber++}`;
    return this.orders.save({ id, customer, state: { status: "created", items }, log: [] });
  }

  apply(id: OrderId, event: OrderEvent): string {
    const order = this.orders.find(id);
    if (!order) return `${id}: not found`;
    const result = transition(order.state, event);
    if (!result.ok) return `${id}: REJECTED - ${result.error}`;
    order.log.push({ from: order.state.status, to: result.state.status, event: event.type });
    order.state = result.state;
    return `${id}: ${event.type} -> ${result.state.status}`;
  }

  get(id: OrderId): Order | undefined {
    return this.orders.find(id);
  }

  all(): Order[] {
    return this.orders.all();
  }

  countByStatus(): Record<Status, number> {
    const counts: Record<Status, number> = { created: 0, paid: 0, shipped: 0, delivered: 0, cancelled: 0 };
    for (const order of this.orders.all()) counts[order.state.status]++;
    return counts;
  }
}
