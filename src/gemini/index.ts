const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function geminiChat(messages: { role: string; content: string }[]) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-goog-api-key": GEMINI_API_KEY!,
    },
    body: JSON.stringify({
      contents: [
        {
          parts: messages.map((m) => ({
            text: m.content,
          })),
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Gemini API error:", response.status, errorText);
    throw new Error(`Gemini API request failed: ${response.status}`);
  }

  const data = await response.json();
  console.log("Gemini response:", JSON.stringify(data, null, 2));

  const text =
    data.candidates?.[0]?.content?.parts?.[0]?.text ||
    "No response from Gemini.";

  return text;
}
