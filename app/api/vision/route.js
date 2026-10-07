import { NextResponse } from "next/server"
import OpenAI from "openai";

// Authenticate
const openai = new OpenAI({
  apiKey: process.env.SECRET_KEY
});

export async function POST(request) {
  const { imageUrl } = await request.json()

  try {
    const response = await openai.responses.create({
      model: "gpt-4o",
      input: [
        {
          role: "user",
          content: [
            { type: "input_text", text: "Describe this image in four words only. Do not use any punctuation whatsoever." },
            {
              type: "input_image",
              image_url: imageUrl,
              detail: "auto",
            },
          ],
        },
      ],
    });

    return new NextResponse(
      response.output_text
    );
  } catch (error) {
    return new NextResponse(JSON.stringify(error));
  }
}