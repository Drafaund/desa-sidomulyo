import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    // Log untuk debugging
    console.log("API Key exists:", !!process.env.RESEND_API_KEY);

    const { name, email, message } = await request.json();

    // Validasi input
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Semua field harus diisi" },
        { status: 400 }
      );
    }

    // Validasi email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Format email tidak valid" },
        { status: 400 }
      );
    }

    // Kirim email - menggunakan domain yang sudah diverifikasi atau sandbox
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev", // Gunakan domain sandbox Resend jika domain Anda belum diverifikasi
      to: ["samiunbasirun555@gmail.com"],
      replyTo: email, // Email dari form sebagai reply-to
      subject: `Pesan Baru dari ${name} - Sidomulyo Village`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #10b981, #3b82f6); padding: 20px; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Pesan Baru dari Website</h1>
            <p style="color: white; margin: 5px 0 0 0; opacity: 0.9;">Sidomulyo Village Contact Form</p>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;">
            <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #1f2937; margin-top: 0;">Detail Pesan</h2>
              
              <div style="margin-bottom: 20px;">
                <strong style="color: #374151;">Nama:</strong>
                <p style="margin: 5px 0; color: #6b7280;">${name}</p>
              </div>
              
              <div style="margin-bottom: 20px;">
                <strong style="color: #374151;">Email:</strong>
                <p style="margin: 5px 0; color: #6b7280;">
                  <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a>
                </p>
              </div>
              
              <div style="margin-bottom: 20px;">
                <strong style="color: #374151;">Pesan:</strong>
                <div style="margin: 10px 0; padding: 15px; background: #f9fafb; border-left: 4px solid #10b981; border-radius: 4px;">
                  <p style="margin: 0; color: #374151; line-height: 1.5;">${message.replace(/\n/g, "<br>")}</p>
                </div>
              </div>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                <p style="margin: 0; color: #9ca3af; font-size: 14px;">
                  Pesan ini dikirim melalui contact form website Sidomulyo Village pada ${new Date().toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          </div>
        </div>
      `,
      // Kirim juga versi text plain sebagai fallback
      text: `
        Pesan Baru dari Website Sidomulyo Village
        
        Nama: ${name}
        Email: ${email}
        
        Pesan:
        ${message}
        
        Dikirim pada: ${new Date().toLocaleString("id-ID")}
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { success: false, error: "Gagal mengirim email: " + error.message },
        { status: 500 }
      );
    }

    console.log("Email sent successfully:", data);
    return NextResponse.json({
      success: true,
      message: "Email berhasil dikirim",
      data,
    });
  } catch (error) {
    console.error("API error:", error);

    // Berikan informasi error yang lebih spesifik
    let errorMessage = "Terjadi kesalahan pada server";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
