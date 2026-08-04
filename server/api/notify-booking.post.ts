import { Resend } from "resend"

// Sends an internal notification to the Herballo admin inbox when a customer
// submits a booking + payment transaction ID. The admin then verifies the
// MoMo transaction and manually confirms the consultation timing.
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  if (!config.resendApiKey || !config.bookingNotifyEmail) {
    throw createError({
      statusCode: 500,
      statusMessage:
        "Email is not configured. Set RESEND_API_KEY and BOOKING_NOTIFY_EMAIL in .env",
    })
  }

  const body = await readBody(event)
  const {
    bookingId,
    transactionId,
    userName,
    userEmail,
    phone,
    purpose,
    description,
    preferred_date,
    time_of_day,
    call_type,
    hear_about,
  } = body || {}

  const esc = (v: unknown) =>
    String(v ?? "—").replace(/[<>&]/g, (c) =>
      c === "<" ? "&lt;" : c === ">" ? "&gt;" : "&amp;"
    )

  const row = (label: string, value: unknown) =>
    `<tr>
      <td style="padding:8px 12px;color:#64748b;font-size:13px;font-weight:600;">${label}</td>
      <td style="padding:8px 12px;color:#1e293b;font-size:14px;">${esc(value)}</td>
    </tr>`

  // --- Admin notification email ---
  const adminHtml = `
    <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto;">
      <h2 style="color:#105212;">🌿 New Consultation Booking</h2>
      <p style="color:#475569;font-size:14px;">
        A new booking request was submitted. Verify the MTN MoMo transaction below,
        then reach out to the client to confirm the consultation time.
      </p>
      <table style="width:100%;border-collapse:collapse;background:#f8fafc;border-radius:12px;overflow:hidden;">
        ${row("Transaction ID", transactionId)}
        ${row("Client Name", userName)}
        ${row("Client Email", userEmail)}
        ${row("Phone", phone)}
        ${row("Purpose", purpose)}
        ${row("Description", description)}
        ${row("Preferred Date", preferred_date)}
        ${row("Time of Day", time_of_day)}
        ${row("Call Type", call_type)}
        ${row("Heard About Us", hear_about)}
        ${row("Booking Reference", bookingId)}
      </table>
      <p style="color:#94a3b8;font-size:12px;margin-top:16px;">
        Sent automatically by the Herballo booking system.
      </p>
    </div>
  `

  // --- Client confirmation email ---
  const clientHtml = `
    <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto;">
      <h2 style="color:#105212;">🌿 We've received your booking, ${esc(userName)}!</h2>
      <p style="color:#475569;font-size:15px;line-height:1.6;">
        Thank you for choosing <strong style="color:#105212;">Herballo</strong>. We've received
        your consultation request and payment details. Our team will verify your payment and
        reach out to confirm your exact consultation time within <strong>24 hours</strong>.
      </p>
      <h3 style="color:#1e293b;font-size:14px;margin-top:24px;">Your booking summary</h3>
      <table style="width:100%;border-collapse:collapse;background:#f8fafc;border-radius:12px;overflow:hidden;">
        ${row("Preferred Date", preferred_date)}
        ${row("Time of Day", time_of_day)}
        ${row("Call Type", call_type)}
        ${row("Consultation Type", purpose)}
        ${row("Amount", "GHS 300.00")}
        ${row("Payment Status", "Pending verification")}
        ${row("Booking Reference", bookingId)}
      </table>
      <p style="color:#475569;font-size:14px;line-height:1.6;margin-top:20px;">
        Your consultation is valid for <strong>1 month</strong> from today. If you have any
        questions, just reply to this email.
      </p>
      <p style="color:#94a3b8;font-size:12px;margin-top:16px;">
        🌱 Herballo — traditional African botanical knowledge meets modern science.
      </p>
    </div>
  `

  const resend = new Resend(config.resendApiKey)

  // Send both in parallel. resend.emails.send resolves with { error } rather
  // than throwing, so one failing does not prevent the other.
  const [admin, client] = await Promise.all([
    resend.emails.send({
      from: config.bookingFromEmail,
      to: config.bookingNotifyEmail,
      subject: `New booking — ${userName || "Unknown"} · Txn ${transactionId || "N/A"}`,
      html: adminHtml,
      replyTo: userEmail || undefined,
    }),
    userEmail
      ? resend.emails.send({
          from: config.bookingFromEmail,
          to: userEmail,
          subject: "We've received your Herballo consultation booking 🌿",
          html: clientHtml,
        })
      : Promise.resolve({ data: null, error: null }),
  ])

  if (admin.error) console.error("[notify-booking] admin email error:", admin.error)
  if (client.error) console.error("[notify-booking] client email error:", client.error)

  return {
    ok: !admin.error,
    adminSent: !admin.error,
    clientSent: !!userEmail && !client.error,
  }
})
