import { PromptTemplate } from 'langchain/prompts';
import { OpenAI } from 'langchain/llms/openai';
import { StructuredOutputParser } from 'langchain/output_parsers';
import z from 'zod';
import { Document } from 'langchain/document';
import { loadQARefineChain } from 'langchain/chains';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    sentimentalScore: z.number().describe('the mood of the person who wrote the journal entry.'),
    mood: z.string().describe('the mood of the person who wrote the journal entry.'),
    subject: z.string().describe('the subject of the journal entry.'),
    negative: z.boolean().describe('is the journal entry negative? (i.e. does it contain negative emotions?).'),
    summary: z.string().describe('quick summary of the entire entry.'),
    color: z.string().describe(
      'a hex color code that represents the mood of the entry. Example #0101fe for a “blue” color representing happiness.'
    ),
  })
);

const createPrompt = async (content: string) => {
  const formatInstructions = parser.getFormatInstructions();
  const prompt = new PromptTemplate({
    template:
      'Analyze the following journal entry. Follow the instructions and format your response to match the format instructions. \n{format_instructions}\n{entry}',
    inputVariables: ['entry'],
    partialVariables: { format_instructions: formatInstructions },
  });
  return prompt.format({ entry: content });
};

const createDocs = (entries: any[]) =>
  entries.map(
    (entry) =>
      new Document({
        pageContent: entry.content,
        metadata: { id: entry.id, createdAt: entry.createdAt },
      })
  );

const createVectorStore = async (docs: Document[]) => {
  const embeddings = new OpenAIEmbeddings();
  return MemoryVectorStore.fromDocuments(docs, embeddings);
};

const createChain = (model: OpenAI) => loadQARefineChain(model);

export const analyzeQuestion = async (question: string, entries: any[]) => {
  const docs = createDocs(entries);
  const model = new OpenAI({
    temperature: 0,
    modelName: 'gpt-3.5-turbo',
    openAIApiKey: process.env.OPENAI_API_KEY,
  });
  const chain = createChain(model);
  const store = await createVectorStore(docs);
  const relevantDocs = await store.similaritySearch(question);
  const result = await chain.call({ input_documents: relevantDocs, question });
  return result.output_text;
};

export const analyze = async (content: string) => {
  const input = await createPrompt(content);
  const model = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
    modelName: 'gpt-3.5-turbo',
  });
  const result = await model.call(input);
  try {
    console.log('HERE IS THE RESULT:', result);
    return parser.parse(result);
  } catch (error) {
    console.log(error);
  }
};

export const ques = async (question: string, entries: any[]) => {
  const docs = createDocs(entries);
  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' });
  const chain = createChain(model);
  const store = await createVectorStore(docs);
  const relevantDocs = await store.similaritySearch(question);
  const result = await chain.call({ input_documents: relevantDocs, question });
  return result.output_text;
};
