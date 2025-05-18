import OpenAI from "openai";
const openai = new OpenAI({
  baseURL: import.meta.env.VITE_API_URL,
  apiKey: import.meta.env.VITE_API_KEY,
  dangerouslyAllowBrowser: true,
  //   defaultHeaders: {
  //     "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
  //     "X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
  //   },
});
async function generativeAI(text: string) {
  console.log("Text to send in generativeAI function:", text);
  const completion = await openai.chat.completions.create({
    model: "deepseek/deepseek-r1:free",
    messages: [
      {
        role: "system",
        content: `
                  You are a friendly and thoughtful AI assistant that helps users craft short and meaningful messages for personal and casual communication. Your responses should sound natural, polite, emotionally intelligent, and appropriate for a messaging app.
  
                  Only return the final message. Do not explain your reasoning or include headings like "Your message" or "Why this works." Just output the message directly, ready to be sent.
  
          Keep messages concise and warm (2–4 lines max, unless otherwise asked).
  
          Use a casual, human tone unless the user asks for formal.
  
              Handle message types like: greetings, gratitude, apologies, compliments, checking in, well wishes, supportive notes, and general friendly interactions.
  
              Adapt tone based on keywords like: "funny", "cute", "formal", "emotional", "short", or "one-liner".
  
              When unclear, prefer safe, polite, and slightly positive messages.
              Your job is to turn user intentions or vague ideas into complete, kind, and well-phrased text messages.
  
              Format the response in valid HTML using only the following tags:
              <b>, <i>, <u>, <br>, <div>, <ul>, <ol>, <li>. Do not include <html>, <head>, or <body> tags.
  
              Use:
              - <b> for emphasis (e.g., important words, names, greetings)
              - <i> for soft, emotional tone or nuance
              - <br> for line breaks inside messages
              - <ul>/<ol>/<li> for lists when applicable
              - <div> to wrap the entire message
  
              Return only the message inside <div> tags. Do not include explanations or code formatting.
  
              All messages should be ready to display directly inside a rich text messaging interface.
          `,
      },
      {
        role: "user",
        content: text,
      },
    ],
  });

  console.log(completion.choices[0].message);
  return completion.choices[0].message.content;
}
export const getAIResponse = async (text: string) => {
  try {
    console.log("Text to send to OpenAI:", text);
    const response = await generativeAI(text);
    console.log("Response from OpenAI:", response);
    return response;
  } catch (error) {
    console.error("Error fetching response:", error);
    throw error;
  }
  //   const message = await new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve(
  //         "<div>🌤 <b>Good morning, sunshine!</b> <br><i>Hope your day is as bright as your smile</i> 🌟<br>Can’t wait to hear all about it later! ☕💛<br>P.S. You’ve got this! 🐾✨</div>"
  //       );
  //     }, 5000);
  //   });
  //   return message;
  //   return "<div>🌤 <b>Good morning, sunshine!</b> <br><i>Hope your day is as bright as your smile</i> 🌟<br>Can’t wait to hear all about it later! ☕💛<br>P.S. You’ve got this! 🐾✨</div>";
};
