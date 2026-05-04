let Groq;
let groq;

// Safely initialize Groq SDK
console.log('🔧 Attempting to load Groq SDK...');
console.log('GROQ_API_KEY exists:', !!process.env.GROQ_API_KEY);

try {
    Groq = require('groq-sdk');
    console.log('📦 groq-sdk module loaded');

    groq = new Groq({
        apiKey: process.env.GROQ_API_KEY,
    });
    console.log('✅ Groq client initialized with API key');
} catch (error) {
    console.error('❌ CRITICAL: Failed to initialize Groq SDK');
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.log('⚠️ ACTIONS REQUIRED:');
    console.log('1. Run: npm install groq-sdk');
    console.log('2. Verify GROQ_API_KEY in .env file');
    console.log('3. Restart the backend server');
}

const generateQuestionsWithAI = async ({ subject, topic, difficulty, type, count }) => {
    // Check if Groq is initialized
    if (!groq) {
        throw new Error('Groq SDK not initialized. Please ensure groq-sdk is installed and GROQ_API_KEY is set in .env file');
    }

    const prompt = buildPrompt({ subject, topic, difficulty, type, count });

    try {
        const chatCompletion = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            max_tokens: 4000,
        });

        const responseText = chatCompletion.choices[0]?.message?.content || "";
        const questions = parseQuestionsFromAI(responseText, type);

        return {
            success: true,
            questions: questions.slice(0, count),
            model: 'llama-3.1-8b-instant',
            tokensUsed: chatCompletion.usage?.total_tokens || 0
        };
    } catch (error) {
        console.error('Groq API Error:', error);
        throw new Error(`AI Generation failed: ${error.message}`);
    }
};

const buildPrompt = ({ subject, topic, difficulty, type, count }) => {
    const difficultyLevel = difficulty || 'Medium';
    const questionType = type || 'MCQ';
    const topicStr = topic ? ` about ${topic}` : '';

    if (questionType === 'MCQ') {
        return `Generate exactly ${count} multiple-choice questions about "${subject}"${topicStr} at ${difficultyLevel} difficulty level.

IMPORTANT: Return ONLY valid JSON array with NO markdown, NO code blocks, NO extra text.

Format each question as:
{
  "question": "Question text here?",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctAnswer": "Option A",
  "explanation": "Why Option A is correct"
}

Return a JSON array like: [{"question": "...", "options": [...], "correctAnswer": "...", "explanation": "..."}, ...]`;
    } else if (questionType === 'True/False') {
        return `Generate exactly ${count} true/false questions about "${subject}"${topicStr} at ${difficultyLevel} difficulty level.

IMPORTANT: Return ONLY valid JSON array with NO markdown, NO code blocks, NO extra text.

Format each question as:
{
  "question": "Statement here",
  "correctAnswer": true,
  "explanation": "Why this is true/false"
}

Return a JSON array like: [{"question": "...", "correctAnswer": true, "explanation": "..."}, ...]`;
    } else {
        return `Generate exactly ${count} short-answer questions about "${subject}"${topicStr} at ${difficultyLevel} difficulty level.

IMPORTANT: Return ONLY valid JSON array with NO markdown, NO code blocks, NO extra text.

Format each question as:
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
        // Remove markdown code blocks if present
        let cleaned = responseText.trim();
        if (cleaned.startsWith('```json')) {
            cleaned = cleaned.replace(/^```json\n?/, '').replace(/\n?```$/, '');
        } else if (cleaned.startsWith('```')) {
            cleaned = cleaned.replace(/^```\n?/, '').replace(/\n?```$/, '');
        }

        const parsed = JSON.parse(cleaned);
        const questions = Array.isArray(parsed) ? parsed : [];

        return questions.map((q, idx) => {
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
                    difficulty: 'Medium',
                    explanation: q.explanation || '',
                    source: 'AI'
                };
            } else if (type === 'True/False') {
                return {
                    id: uuidv4(),
                    question: q.question || '',
                    options: ['True', 'False'],
                    correctAnswer: q.correctAnswer ? 'True' : 'False',
                    difficulty: 'Medium',
                    explanation: q.explanation || '',
                    source: 'AI'
                };
            } else {
                return {
                    id: uuidv4(),
                    question: q.question || '',
                    correctAnswer: q.correctAnswer || '',
                    keywords: q.keywords || [],
                    difficulty: 'Medium',
                    explanation: q.explanation || '',
                    source: 'AI'
                };
            }
        });
    } catch (error) {
        console.error('Parse error:', error);
        return [];
    }
};

module.exports = { generateQuestionsWithAI };
