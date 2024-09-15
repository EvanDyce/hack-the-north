import { CohereStream } from 'ai'
import { COHERE_API_KEY } from './secret.ts';

// IMPORTANT! Set the runtime to edge

const API_KEY = COHERE_API_KEY

export async function POST(req: Request) {
  console.log(req)
  // Extract the `prompt` from the body of the request
  const { prompt } = await req.json();
  console.log(prompt)
  // console.log(process.env.COHERE_API_KEY)

  const data = `
    OrderDate	Region	Manager	SalesMan	Item	Units	 Unit_price 	Sale_amt
    1-6-18	East	Martha	Alexander	Television	95	" 1,198.00 "	" 113,810.00 "
    1-23-18	Central	Hermann	Shelli	Home Theater	50	 500.00 	" 25,000.00 "
    2-9-18	Central	Hermann	Luis	Television	36	" 1,198.00 "	" 43,128.00 "
    2-26-18	Central	Timothy	David	Cell Phone	27	 225.00 	" 6,075.00 "
    3-15-18	West	Timothy	Stephen	Television	56	" 1,198.00 "	" 67,088.00 "
    4-1-18	East	Martha	Alexander	Home Theater	60	 500.00 	" 30,000.00 "
    4-18-18	Central	Martha	Steven	Television	75	" 1,198.00 "	" 89,850.00 "
    5-5-18	Central	Hermann	Luis	Television	90	" 1,198.00 "	" 107,820.00 "
    5-22-18	West	Douglas	Michael	Television	32	" 1,198.00 "	" 38,336.00 "
    6-8-18	East	Martha	Alexander	Home Theater	60	 500.00 	" 30,000.00 "
    6-25-18	Central	Hermann	Sigal	Television	90	" 1,198.00 "	" 107,820.00 "
    7-12-18	East	Martha	Diana	Home Theater	29	 500.00 	" 14,500.00 "
    7-29-18	East	Douglas	Karen	Home Theater	81	 500.00 	" 40,500.00 "
    8-15-18	East	Martha	Alexander	Television	35	" 1,198.00 "	" 41,930.00 "
    9-1-18	Central	Douglas	John	Desk	2	 125.00 	 250.00 
    9-18-18	East	Martha	Alexander	Video Games	16	 58.50 	 936.00 
    10-5-18	Central	Hermann	Sigal	Home Theater	28	 500.00 	" 14,000.00 "
    10-22-18	East	Martha	Alexander	Cell Phone	64	 225.00 	" 14,400.00 "
    11-8-18	East	Douglas	Karen	Cell Phone	15	 225.00 	" 3,375.00 "
    11-25-18	Central	Hermann	Shelli	Video Games	96	 58.50 	" 5,616.00 "
    12-12-18	Central	Douglas	John	Television	67	" 1,198.00 "	" 80,266.00 "
    12-29-18	East	Douglas	Karen	Video Games	74	 58.50 	" 4,329.00 "
    1-15-19	Central	Timothy	David	Home Theater	46	 500.00 	" 23,000.00 "
    2-1-19	Central	Douglas	John	Home Theater	87	 500.00 	" 43,500.00 "
    2-18-19	East	Martha	Alexander	Home Theater	4	 500.00 	" 2,000.00 "
    3-7-19	West	Timothy	Stephen	Home Theater	7	 500.00 	" 3,500.00 "
    3-24-19	Central	Hermann	Luis	Video Games	50	 58.50 	" 2,925.00 "
    4-10-19	Central	Martha	Steven	Television	66	" 1,198.00 "	" 79,068.00 "
    4-27-19	East	Martha	Diana	Cell Phone	96	 225.00 	" 21,600.00 "
    5-14-19	Central	Timothy	David	Television	53	" 1,198.00 "	" 63,494.00 "
    5-31-19	Central	Timothy	David	Home Theater	80	 500.00 	" 40,000.00 "
    6-17-19	Central	Hermann	Shelli	Desk	5	 125.00 	 625.00 
    7-4-19	East	Martha	Alexander	Video Games	62	 58.50 	" 3,627.00 "
    7-21-19	Central	Hermann	Sigal	Video Games	55	 58.50 	" 3,217.50 "
    8-7-19	Central	Hermann	Shelli	Video Games	42	 58.50 	" 2,457.00 "
    8-24-19	West	Timothy	Stephen	Desk	3	 125.00 	 375.00 
    9-10-19	Central	Timothy	David	Television	7	" 1,198.00 "	" 8,386.00 "
    9-27-19	West	Timothy	Stephen	Cell Phone	76	 225.00 	" 17,100.00 "
    10-14-19	West	Douglas	Michael	Home Theater	57	 500.00 	" 28,500.00 "
    10-31-19	Central	Martha	Steven	Television	14	" 1,198.00 "	" 16,772.00 "
    11-17-19	Central	Hermann	Luis	Home Theater	11	 500.00 	" 5,500.00 "
    12-4-19	Central	Hermann	Luis	Home Theater	94	 500.00 	" 47,000.00 "
    12-21-19	Central	Martha	Steven	Home Theater	28	 500.00 	" 14,000.00 "
              278.00 	" 1,125.00 "	" 62,550.00 "
              34.75 	 140.63 	" 7,818.75 "
  `;

  const prompt_data = `${prompt}: ${data}`;

  const body = JSON.stringify({
    prompt: prompt_data,
    model: 'command-nightly',
    max_tokens: 300,
    stop_sequences: [],
    temperature: 0.9,
    return_likelihoods: 'NONE',
    stream: true
  });

  const response = await fetch('https://api.cohere.ai/v1/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`
    },
    body
  });

  // Extract the text response from the Cohere stream
  const stream = CohereStream(response)

  // Respond with the stream
  return new Response(stream)
}
