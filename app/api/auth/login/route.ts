// app/api/admin/auth/route.ts
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "@/app/lib/prisma";

// Đăng nhập: check email + password, trả JWT
export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "Sai email hoặc mật khẩu" }, { status: 401 });
    }

    // Nếu DB lưu plain password thì đổi sang so sánh trực tiếp
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: "Sai email hoặc mật khẩu" }, { status: 401 });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email , name: user.name , role: user.role},
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    // Lưu cookie
    const res = NextResponse.json({ message: "Login OK", token });
    res.cookies.set("token", token, { httpOnly: true, path: "/" });
    return res;

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Verify: check token
export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value ||
                  req.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ error: "No token" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    return NextResponse.json({ message: "Token OK", user: decoded });
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
