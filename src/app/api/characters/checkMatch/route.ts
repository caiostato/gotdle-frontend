import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (req.method === "POST") {
    const body = await req.json();
    let data;
    try {
      const prisma = new PrismaClient();

      const currChoice = await prisma.choices.findMany({
        orderBy: { created_at: "desc" },
      });

      data = await prisma.characters.findUnique({
        where: { id: Number(currChoice[0].character_id) },
      });

      const matchResult = JSON.stringify(data) === JSON.stringify(body);

      return NextResponse.json(
        { matchResult: matchResult },
        {
          status: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        }
      ); // Send back the newly created product
    } catch (error) {
      return NextResponse.json(
        { error: "Error creating product", details: error },
        { status: 500 }
      );
    }
  }
}
