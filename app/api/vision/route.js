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
      text: {
        format: { type: "json_object" }
      },
      input: [
        {
          role: "user",
          content: [
            { type: "input_text", text: "The image provided should be a screenshot of a person's work schedule. Your job is to return data about the availability of all 24 hours of the day, returning a list of 24 availability ratings of each hour for all 7 days of the week starting at hour 0 (midnight). Your options for each hour are: 'dead'/'low-match'/'full-match'/'error'. Please return ONLY a single JSON object (MEANING INCLUDE NOTHING OTHER THAN {first_day: ['avalability1', 'availability2', etc...], second_day: [availability...]}). Every single entry in the object should ALWAYS follow the following format: full_name_of_day_of_week_in_lowercase: ['dead' (if that entire hour reserved for work) / 'low-match' (if only part of that hour is reserved for work) / 'full-match' (if that entire hour is not spent working) / 'error' (if there is no time data for that day or if that day is not present in the screenshot at all)]. If the image provided is not screenshot of a schedule, return ONLY an empty object ({})." },
            {
              type: "input_image",
              image_url: imageUrl
            },
          ],
        },
      ],
    });

    return new NextResponse(
      JSON.stringify(response.output[0].content[0].text)
    );
  } catch (error) {
    return new NextResponse(JSON.stringify(error));
  }
}