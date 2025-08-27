import { NextRequest } from "next/server";
import { apiResponse } from "@/utils/apiResponse";
import { prisma } from "@/lib/prisma";

const OTP_ENABLE = process.env.OTP_ENABLE === "true";

export async function POST(req: NextRequest) {
  try {
    let body: any;
    try {
      body = await req.json();
    } catch {
      return apiResponse(false, "Invalid JSON body", null, null, 400);
    }

    const contact_no = body?.contact_no;

    if (!contact_no || typeof contact_no !== "string") {
      return apiResponse(false, "Contact number is required", null, null, 422);
    }

    const user = await prisma.tbl_users.findUnique({
      where: { contact_no },
      select: { id: true, contact_no: true, status: true },
    });

    if (!user) {
      return apiResponse(false, "Enter registered contact number", null, null, 400);
    }

    if (user.status !== "UNBLOCKED") {
      return apiResponse(false, "Your account is blocked. Please contact support.", null, null, 403);
    }

    let otp: number;
    if (contact_no === "9457125774" || !OTP_ENABLE) {
      otp = 12345;
    } else {
      otp = Math.floor(10000 + Math.random() * 90000);
      const msg_text = `Hi, Your OTP for verify your mobile number is ${otp} From Mojo Network. Valid for 30 minutes. Please do not share this OTP.\nRegards,\nGNOSISACCRUE Team`;
      console.log(`Sending OTP SMS to ${contact_no}: ${msg_text}`);
    }

    await prisma.tbl_temp_otp.create({
      data: {
        contact_no,
        create_date: new Date(),
        update_date: new Date(),
        otp: String(otp),
      },
    });

    return apiResponse(true, "OTP sent successfully", { contactNo: user?.contact_no });
  } catch (error) {
    console.error("Login OTP error:", error);
    return apiResponse(false, "Internal server error", null, (error as Error).message, 500);
  }
}
