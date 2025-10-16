'server only'
import { NextResponse } from "next/server"
import Stripe from "stripe"
import { servicesData } from "@/app/data/services";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-08-27.basil",
})

export async function POST(req: Request) {
    try {
        const body = await req.json()

        const { services } = body;

        const line_items = services.map((serviceName: any) => {
            const service = servicesData.find(s => s.name === serviceName);
            if (!service) throw new Error('Service not found');
            return {
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: service.name,
                    },
                    unit_amount: Math.round(service.price * 100 / 2),
                },
                quantity: 1,
            }
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card", "revolut_pay",],
            mode: "payment",
            line_items,
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
            metadata: {
                booking_date: body.date,
                booking_time: body.time,
                duration: body.duration,
                booking_id: body.booking_id,
                services: body.services.join(", ")
            },
            phone_number_collection:{
                enabled: true,
            }
        })

        return NextResponse.json({ url: session.url })
    } catch (err: any) {
        console.error(err)
        return NextResponse.json(
            { error: "Error to create payment section" },
            { status: 500 }
        )
    }
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const session_id = searchParams.get("session_id");

    if (!session_id) {
        return NextResponse.json({ error: "Session ID ausente" }, { status: 400 });
    }

    try {
        const session = await stripe.checkout.sessions.retrieve(session_id, {
            expand: ["customer", "line_items", "payment_intent"],
        })

        const dataToSave = {
            customer_email: session.customer_details?.email,
            customer_name: session.customer_details?.name,
            services: session.metadata?.services,
            payment_status: session.payment_status,
            amount_total: session.amount_total,
            booking_date: session.metadata?.booking_date,
            booking_time: session.metadata?.booking_time,
            duration: session.metadata?.duration,
            phone_number: session.customer_details?.phone,
            booking_id: session.metadata?.booking_id,
        }

        //Wait back end get done
        // await fetch("https://seubackend.com/salvar-agendamento", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(dataToSave),
        // })

        console.log(dataToSave)
        return NextResponse.json(dataToSave)
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: "Error to find a section" }, { status: 500 })
    }
}
