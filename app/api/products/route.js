import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, price, description, imageUrl } = body;

    if (!name || !price || !description) {
      return new Response("Missing required fields", { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        name,
        price,
        description,
        imageUrl: imageUrl || "",
      },
    });

    return new Response(JSON.stringify(product), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("POST /api/products error:", error);
    return new Response("Failed to create product", { status: 500 });
  }
}

export async function GET(req) {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("GET /api/products error:", error);
    return new Response("Failed to fetch products", { status: 500 });
  }
}