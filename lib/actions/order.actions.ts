"use server";

import Stripe from "stripe";
import { connectToDatabase } from "@/lib/database";
import Order from "@/lib/database/models/order.model";
import { CheckoutOrderParams } from "@/types";
import { handleError } from "../utils";
import { RedirectType, redirect } from "next/navigation";
import { NextResponse } from "next/server";

export default async function checkoutOrder(order: CheckoutOrderParams) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const price = order.isFree ? 0 : Number(order.price) * 100;

  let url = "";
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: price,
            product_data: {
              name: order.eventTitle,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        eventId: order.eventId,
        buyerId: order.buyerId,
      },
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/?profile`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    });
    // return NextResponse.redirect(session.url!);
    // console.log('session::', session)
    if (session && session.url) {
      url = session.url;
    }
    // redirect(session.url, RedirectType.push);
  } catch (error) {
    console.log(error);
  }

  redirect(url);
}
