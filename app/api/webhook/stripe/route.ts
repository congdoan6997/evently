import stripe from "stripe";
import { NextResponse } from "next/server";
import { createOrder } from "@/lib/actions/order.actions";

export async function POST(request: Request) {
  const body = await request.text();

  const sig = request.headers.get("stripe-signature") as string;

  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return NextResponse.json(
      { message: "Webhook error", error: err },
      { status: 400 },
    );
  }

  const eventType = event.type;

  // Create oder

  if (eventType === "checkout.session.completed") {
    // const session = event.data.object as Stripe.Checkout.Session
    const { id, amount_total, metadata } = event.data.object;

    const order = {
      stripeId: id,
      eventId: metadata?.eventId || "",
      buyerId: metadata?.buyerId || "",
      totalAmount: amount_total ? (amount_total / 100).toString() : "0",
      createdAt: new Date(),
    };
    const newOrder = await createOrder(order);
    return NextResponse.json(
      { message: "Order created", order: newOrder },
      { status: 200 },
    );
  }

  return NextResponse.json(
    { message: "Unhandled event type" },
    { status: 200 },
  );
}
