import { PrismaClient } from "@prisma/client";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest) {
  if (req.method === "GET") {
    let data;

    try {
      const prisma = new PrismaClient();

      const currChoice = await prisma.choices.findMany({
        orderBy: { created_at: "desc" },
      });

      data = await prisma.characters.findUnique({
        where: { id: Number(currChoice[0].character_id) },
      });

      return NextResponse.json(
        { character: data },
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
        { error: "Error retrieving characters", details: error },
        { status: 500 }
      );
    }
  }
}
