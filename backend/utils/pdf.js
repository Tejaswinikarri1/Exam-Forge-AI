const PDFParse = require('pdf-parse');
const { generateQuestionsWithAI } = require('./ai');

const extractTextFromPDF = async (pdfBuffer) => {
  try {
    const data = await PDFParse(pdfBuffer);
    return data.text;
  } catch (error) {
    console.error('PDF extraction error:', error);
    throw new Error(`Failed to extract PDF text: ${error.message}`);
  }
};

const parseQuestionsFromPDF = async ({ pdfBuffer, subject, difficulty, type, count }) => {
  try {
    // Extract text from PDF
    const pdfText = await extractTextFromPDF(pdfBuffer);

    // Use AI to structure questions from extracted PDF text
    const prompt = `You are a teacher analyzing a PDF document containing ${type} questions about "${subject}" at ${difficulty} difficulty level.

Here is the extracted text from the PDF:
---
${pdfText.substring(0, 3000)}
---

Please extract exactly ${Math.min(count, 20)} ${type} questions from this text and format them as JSON.

IMPORTANT: Return ONLY valid JSON array with NO markdown, NO code blocks, NO extra text.

${getQuestionFormat(type)}`;

    const Groq = require('groq-sdk');
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

const chatCompletion = await groq.chat.completions.create({
  model: "llama-3.1-8b-instant",
  messages: [
    {
      role: "user",
      content: prompt,
    },
  ],
  max_tokens: 3000,
});

    const responseText = chatCompletion.choices[0]?.message?.content || '';
    const questions = parseQuestionsFromAI(responseText, type);

    return {
      success: true,
      questions: questions.slice(0, count),
      model: 'llama-3.1-8b-instant',
      source: 'PDF',
      extractedText: pdfText.substring(0, 500),
      tokensUsed: chatCompletion.usage?.total_tokens || 0
    };
  } catch (error) {
    console.error('PDF parsing error:', error);
    throw new Error(`PDF parsing failed: ${error.message}`);
  }
};

const getQuestionFormat = (type) => {
  if (type === 'MCQ') {
    return `Format each question as:
{
  "question": "Question text here?",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctAnswer": "Option A",
  "explanation": "Why Option A is correct"
}
Return a JSON array like: [{"question": "...", "options": [...], "correctAnswer": "...", "explanation": "..."}, ...]`;
  } else if (type === 'True/False') {
    return `Format each question as:
{
  "question": "Statement here",
  "correctAnswer": true,
  "explanation": "Why this is true/false"
}
Return a JSON array like: [{"question": "...", "correctAnswer": true, "explanation": "..."}, ...]`;
  } else {
    return `Format each question as:
{
  "question": "Question text here?",
  "correctAnswer": "Expected answer",
  "keywords": ["key", "terms"],
  "explanation": "Explanation of the answer"
}
Return a JSON array like: [{"question": "...", "correctAnswer": "...", "keywords": [...], "explanation": "..."}, ...]`;
  }
};

const parseQuestionsFromAI = (responseText, type) => {
  try {
    let cleaned = responseText.trim();
    if (cleaned.startsWith('```json')) {
      cleaned = cleaned.replace(/^```json\n?/, '').replace(/\n?```$/, '');
    } else if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```\n?/, '').replace(/\n?```$/, '');
    }

    const parsed = JSON.parse(cleaned);
    const questions = Array.isArray(parsed) ? parsed : [];

    return questions.map((q) => {
      const uuidv4 = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
          const r = (Math.random() * 16) | 0;
          const v = c === 'x' ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        });
      };

      if (type === 'MCQ') {
        return {
          id: uuidv4(),
          question: q.question || '',
          options: Array.isArray(q.options) ? q.options : [],
          correctAnswer: q.correctAnswer || q.options?.[0] || '',
          explanation: q.explanation || '',
          source: 'PDF'
        };
      } else if (type === 'True/False') {
        return {
          id: uuidv4(),
          question: q.question || '',
          correctAnswer: q.correctAnswer ? 'True' : 'False',
          explanation: q.explanation || '',
          source: 'PDF'
        };
      } else {
        return {
          id: uuidv4(),
          question: q.question || '',
          correctAnswer: q.correctAnswer || '',
          keywords: q.keywords || [],
          explanation: q.explanation || '',
          source: 'PDF'
        };
      }
    });
  } catch (error) {
    console.error('Parse error:', error);
    return [];
  }
};

module.exports = { extractTextFromPDF, parseQuestionsFromPDF };
