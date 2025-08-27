import { NextResponse } from "next/server"
import { z } from "zod"
import { SignJWT } from "jose"
import prisma from "@/lib/prisma" // make sure you export a singleton PrismaClient
// Example: const prisma = globalThis.prisma ?? new PrismaClient(); if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma

const bodySchema = z.object({
  contact_no: z.string().min(5),
  otp: z.string().min(1),
})

function buildPortalUrls(domainType: number, domainName: string) {
  // domainType: 1 => subdomain on mojonetwork.in
  if (domainType === 1) {
    const base = `https://${domainName}.mojonetwork.in`
    return {
      portal_site_url: base,
      portal_admin_url: `${base}/login`,
    }
  }
  // custom domain
  const base = `https://${domainName}`
  return {
    portal_site_url: base,
    portal_admin_url: `${base}/login`,
  }
}

async function signJwt(payload: Record<string, unknown>) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET)
  // 7d expiry; tweak as needed
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret)
}

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const parsed = bodySchema.safeParse(json)
    if (!parsed.success) {
      return NextResponse.json(
        { status: 400, message: parsed.error.flatten().fieldErrors, data: null },
        { status: 400 }
      )
    }

    const { contact_no, otp } = parsed.data

    // Get latest OTP for contact_no
    const getOtp = await prisma.tempOtp.findFirst({
      where: { contact_no },
      orderBy: { id: "desc" },
      select: { id: true, otp: true, created_at: true },
    })

    // Optional: enforce expiry (e.g., 5 minutes)
    // if (getOtp && Date.now() - getOtp.created_at.getTime() > 5 * 60 * 1000) {
    //   return NextResponse.json({ status: 400, message: "OTP expired", data: null }, { status: 400 })
    // }

    if (!getOtp || getOtp.otp !== otp) {
      return NextResponse.json({ status: 400, message: "Enter Valid OTP", data: null }, { status: 400 })
    }

    // Fetch user
    const getUser = await prisma.user.findUnique({
      where: { contact_no },
      select: { id: true, name: true, contact_no: true },
    })

    if (!getUser) {
      return NextResponse.json({ status: 400, message: "User not found", data: null }, { status: 400 })
    }

    // Fetch portal for this user (assuming one portal; if multiple, adjust)
    const getPortal = await prisma.portal.findFirst({
      where: { user_id: getUser.id },
      select: {
        portal_id: true,
        channel_name: true,
        website_logo: true,
        domain_type: true,
        domain_name: true,
        is_profile_complete: true,
        state: true,
        city: true,
      },
    })

    // Create token (payload similar to your CI code)
    const tokenPayload = {
      id: getUser.id,
      name: getUser.name,
      contact_no: getUser.contact_no,
      time: Math.floor(Date.now() / 1000),
    }
    const token = await signJwt(tokenPayload)

    let portalDetails: Record<string, any> = {}
    if (getPortal && getPortal.is_profile_complete === 1) {
      const urls = buildPortalUrls(getPortal.domain_type, getPortal.domain_name)
      portalDetails = {
        portal_id: getPortal.portal_id,
        channel_name: getPortal.channel_name,
        portal_logo: getPortal.website_logo
          ? `${process.env.BASE_URL ?? ""}${process.env.WEBSITE_IMAGES ?? ""}${getPortal.website_logo}`
          : null,
        portal_site_url: urls.portal_site_url,
        portal_admin_url: urls.portal_admin_url,
      }
    }

    const data = {
      name: getUser.name,
      contact_no: getUser.contact_no,
      state: getPortal?.state ?? null,
      city: getPortal?.city ?? null,
      portal_id: getPortal?.portal_id ?? null,
      is_profile_complete: getPortal?.is_profile_complete ?? 0,
      token,
      portal_details: portalDetails,
    }

    // Delete all temp otps for this contact_no (mirrors your CI delete)
    await prisma.tempOtp.deleteMany({ where: { contact_no } })

    return NextResponse.json({ status: 200, message: "User login successfully.", data }, { status: 200 })
  } catch (err) {
    console.error("verify-otp error:", err)
    return NextResponse.json({ status: 500, message: "Something went wrong", data: null }, { status: 500 })
  }
}
