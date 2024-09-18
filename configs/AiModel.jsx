

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};


  export const GenerateCourseLayout_AI = model.startChat({
    generationConfig,
 // safetySettings: Adjust safety settings
 // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
      {
        role: "user",
        parts: [
          {text: "Generate A Course Tutorial on following Detail With field Course Name, Description, Along with Chapter Name, about,Duration: Category :'Programing\",Topic:Python, Level:Basic,Duration:1 hours, NoOfChapter:5, in JSON format."},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n{\n  \"courseName\": \"Python Programming for Beginners\",\n  \"description\": \"This course introduces the fundamentals of Python programming, designed for absolute beginners with no prior coding experience. You'll learn the essential syntax, data types, control flow, functions, and basic programming concepts. By the end of the course, you'll be able to write simple Python programs and understand the core principles of this powerful language.\",\n  \"chapters\": [\n    {\n      \"chapterName\": \"Introduction to Python\",\n      \"about\": \"This chapter covers the basics of Python, including its history, purpose, and why it's a popular choice for programming. You'll learn how to set up your development environment and write your first Python program.\",\n      \"duration\": \"20 minutes\"\n    },\n    {\n      \"chapterName\": \"Data Types and Variables\",\n      \"about\": \"This chapter introduces fundamental data types like integers, floats, strings, and booleans. You'll learn how to assign values to variables and perform basic operations on them.\",\n      \"duration\": \"20 minutes\"\n    },\n    {\n      \"chapterName\": \"Control Flow and Logic\",\n      \"about\": \"This chapter focuses on conditional statements (if-else) and loops (for and while). You'll learn how to control the flow of your programs based on different conditions.\",\n      \"duration\": \"20 minutes\"\n    },\n    {\n      \"chapterName\": \"Functions and Modules\",\n      \"about\": \"This chapter explores functions and modules in Python. You'll learn how to define and call your own functions, and how to import and use pre-built modules to extend your programming capabilities.\",\n      \"duration\": \"15 minutes\"\n    },\n    {\n      \"chapterName\": \"Practice Projects and Next Steps\",\n      \"about\": \"This final chapter will guide you through building a simple Python project to solidify your understanding. You'll also learn about resources for further learning and explore potential career paths in Python programming.\",\n      \"duration\": \"15 minutes\"\n    }\n  ],\n  \"category\": \"Programming\",\n  \"topic\": \"Python\",\n  \"level\": \"Basic\",\n  \"duration\": \"1 hour\",\n  \"noOfChapters\": 5\n}\n```"},
        ],
      },
    ],
  });

   export const GenerateChapterContent_Ai = model.startChat({
    generationConfig,
 // safetySettings: Adjust safety settings
 // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
      {
        role: "user",
        parts: [
          {text: "Explain the concept in Detail on Topic:blood presure,Chapter:Lifestyle Modifications: The Cornerstone of Management, in JSON Format with list of array with field as title, description in detail, Code Example(Code field in <precode> format) if applicable\n\n"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n[\n  {\n    \"title\": \"Blood Pressure: The Basics\",\n    \"description\": \"Blood pressure is the force of blood pushing against the walls of your arteries. It's measured in millimeters of mercury (mmHg), and there are two readings: systolic and diastolic. Systolic pressure is the top number, representing the pressure when your heart beats. Diastolic pressure is the bottom number, reflecting the pressure between heartbeats. Healthy blood pressure is below 120/80 mmHg.\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Hypertension: The Silent Killer\",\n    \"description\": \"High blood pressure (hypertension) is a major risk factor for heart disease, stroke, kidney failure, and other health problems. It's often called the \\\"silent killer\\\" because it rarely causes symptoms in the early stages.  You may not even know you have it until you have a serious health event.\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Lifestyle Modifications for Blood Pressure Management\",\n    \"description\": \"Lifestyle changes are the cornerstone of managing blood pressure, often helping to prevent medication or reduce the need for higher dosages. They include:\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Weight Management\",\n    \"description\": \"Losing even a small amount of weight can significantly lower blood pressure. Aim for a gradual weight loss of 1-2 pounds per week.\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Healthy Diet\",\n    \"description\": \"Adopt the DASH (Dietary Approaches to Stop Hypertension) diet, rich in fruits, vegetables, and whole grains, low in saturated fat, and limiting sodium intake.\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Regular Exercise\",\n    \"description\": \"Engage in at least 30 minutes of moderate-intensity exercise most days of the week. Examples include brisk walking, swimming, or cycling.\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Sodium Reduction\",\n    \"description\": \"Limit sodium intake to less than 2,300 milligrams per day, ideally 1,500 milligrams for those with hypertension. Read food labels carefully and choose low-sodium options.\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Limit Alcohol Consumption\",\n    \"description\": \"Excessive alcohol intake can raise blood pressure. If you choose to drink, do so in moderation, up to one drink per day for women and two drinks per day for men.\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Quit Smoking\",\n    \"description\": \"Smoking damages blood vessels and increases blood pressure. Quitting smoking is essential for overall health and blood pressure management.\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Stress Management\",\n    \"description\": \"Chronic stress can contribute to high blood pressure. Practice relaxation techniques like deep breathing, meditation, or yoga to manage stress.\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Regular Blood Pressure Monitoring\",\n    \"description\": \"Monitor your blood pressure regularly at home and during doctor visits. This allows for early detection of changes and adjustments to your management plan.\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Medication Adherence\",\n    \"description\": \"If you are prescribed medication for hypertension, take it as directed by your doctor. Don't skip doses or stop taking the medication without consulting your physician.\",\n    \"code\": \"\"\n  }\n]\n```"},
        ],
      },
    ],
  });


  // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
  // console.log(result.response.text());