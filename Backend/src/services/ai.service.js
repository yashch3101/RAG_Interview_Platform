const Groq = require("groq-sdk")
const { z } = require("zod")
const chromium = require("@sparticuz/chromium")
const puppeteer = require("puppeteer-core")

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
})


const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The title of the job for which the interview report is generated"),
})

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {


    const prompt = `
        Analyze the candidate profile and job description.

        Resume:
        ${resume}

        Self Description:
        ${selfDescription}

        Job Description:
        ${jobDescription}

        Generate a realistic and personalized interview preparation report.

        Focus heavily on:
        - Candidate projects
        - Technical skills
        - Work experience
        - Achievements
        - Resume strengths
        - Resume weaknesses

        The report should be tailored specifically to this candidate and should not contain generic interview content.
    `;

    const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
        {
            role: "system",
            content: `
                You are an expert AI Interview Coach.

                Return ONLY valid JSON.

                Rules:

                1. title must contain ONLY the job title.
                Example:
                "Machine Learning Engineer Intern"

                2. matchScore must be an INTEGER between 0 and 100.
                Example:
                85

                3. Generate at least 10 technicalQuestions.

                4. Generate at least 5 behavioralQuestions.

                5. Generate at least 5 skillGaps if applicable.

                6. Generate a detailed 7-day preparationPlan.

                7. Every answer should be detailed and practical.

                8. Do not return markdown.

                9. Do not return explanations outside JSON.

                10. Return exactly this schema:

                {
                "title": string,
                "matchScore": number,
                "technicalQuestions": [
                    {
                    "question": string,
                    "intention": string,
                    "answer": string
                    }
                ],
                "behavioralQuestions": [
                    {
                    "question": string,
                    "intention": string,
                    "answer": string
                    }
                ],
                "skillGaps": [
                    {
                    "skill": string,
                    "severity": "low" | "medium" | "high"
                    }
                ],
                "preparationPlan": [
                    {
                    "day": number,
                    "focus": string,
                    "tasks": [string]
                    }
                ]
            }
                11. Generate resume-specific technical questions based on the candidate's projects, skills, technologies, achievements, and experience mentioned in the resume.

                12. Avoid generic textbook interview questions unless they are directly relevant to the candidate profile.

                13. Do not create skill gaps for skills that are already demonstrated in the resume or project experience.

                14. Skill gaps must be derived only from the job description and candidate profile.

                15. Do not invent missing skills that are not explicitly required in the job description.

                16. Technical questions should focus on the candidate's actual projects such as computer vision, deep learning, face recognition, object detection, NLP, AI systems, model optimization, deployment, and related technologies when present in the resume.

                17. Behavioral questions should reference real project experiences whenever possible.

                18. Preparation plan should be personalized according to the candidate's skill gaps and target role.

                19. For non-AI/ML roles, do not include machine learning, deep learning, NLP, computer vision, or data science topics unless they are explicitly required in the job description.
                
                20. Do not assume tools, frameworks, or technologies that are not explicitly mentioned in the resume or job description.

                21. For roles that are not AI/ML related:

                - Prioritize questions about mobile development,
                frontend development, APIs, architecture,
                debugging, performance optimization, state management,
                UI/UX, deployment, and software engineering.

                - If a project contains AI/ML components but the target role
                is not AI/ML, focus only on the software engineering and
                application development aspects of the project.

                - Do not generate machine learning interview questions
                unless AI/ML skills are explicitly required in the job description.
            `
        },
        {
            role: "user",
            content: prompt
        }
    ],
    temperature: 0.3,
    response_format: {
        type: "json_object"
    }
})

const parsed = JSON.parse(
    response.choices[0].message.content
)

return interviewReportSchema.parse(parsed)
}



async function generatePdfFromHtml(htmlContent) {

    const browser = await puppeteer.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath(),
        headless: true
    });

    const page = await browser.newPage();

    await page.setContent(htmlContent, {
        waitUntil: "networkidle0"
    });

    const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: {
            top: "20mm",
            bottom: "20mm",
            left: "15mm",
            right: "15mm"
        }
    });

    await browser.close();

    return pdfBuffer;
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {

    const resumePdfSchema = z.object({
        html: z.string().describe("The HTML content of the resume which can be converted to PDF using any library like puppeteer")
    })

    const prompt = `Generate resume for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}

                        the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
                        The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
                        The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
                        you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
                        The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
                        The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.
                    `

const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            {
                role: "system",
                content: `
                    Generate a complete professional ATS-friendly resume using HTML and inline CSS.

                    Requirements:

                    - Use A4 page layout
                    - Use font-size between 11px and 14px
                    - Use professional typography
                    - Keep margins balanced
                    - Use section dividers
                    - Use modern clean design
                    - Keep content within one page whenever possible
                    - Use bold section headings
                    - Use bullet points for achievements
                    - Make it visually appealing while remaining ATS-friendly
                    - Do not use tables
                    - Do not use multi-column layouts
                    - Use semantic HTML

                    Sections:
                    1. Header
                    2. Summary
                    3. Skills
                    4. Experience
                    5. Projects
                    6. Education
                    7. Achievements

                    Return only valid JSON:
                    {
                    "html": "<html>...</html>"
                    }
                `
            },
            {
                role: "user",
                content: prompt
            }
        ],
        response_format: {
            type: "json_object"
        }
    })

    const jsonContent = JSON.parse(
        response.choices[0].message.content
    )

    const pdfBuffer = await generatePdfFromHtml(
        jsonContent.html
    )

    return pdfBuffer

}

module.exports = { generateInterviewReport, generateResumePdf }