const scheduleData = {
  title: "الجدول اليومي",
  subtitle: "خطة يومية مفصلة لمدة 30 يوماً",
  weeklyPatterns: [
    {
      week: 1,
      title: "الأسبوع ١: الأساسيات",
      pattern: [
        { time: "٨-١٠ صباحاً", activity: "SQL وقواعد البيانات", path: "backend", duration: "ساعتان" },
        { time: "١٠-١٢ ظهراً", activity: "JavaScript", path: "frontend", duration: "ساعتان" },
        { time: "١٢-٢ ظهراً", activity: "أساسيات Python", path: "python", duration: "ساعتان" },
        { time: "٢-٤ مساءً", activity: "أمن المعلومات", path: "security", duration: "ساعتان" },
        { time: "٤-٦ مساءً", activity: "تمارين ومشاريع", path: "projects", duration: "ساعتان" }
      ]
    },
    {
      week: 2,
      title: "الأسبوع ٢: التعمق",
      pattern: [
        { time: "٨-١٠ صباحاً", activity: "MongoDB و APIs", path: "backend", duration: "ساعتان" },
        { time: "١٠-١٢ ظهراً", activity: "React", path: "frontend", duration: "ساعتان" },
        { time: "١٢-٢ ظهراً", activity: "Python OOP ومكتبات", path: "python", duration: "ساعتان" },
        { time: "٢-٤ مساءً", activity: "اختبارات الاختراق", path: "security", duration: "ساعتان" },
        { time: "٤-٦ مساءً", activity: "مشاريع تطبيقية", path: "projects", duration: "ساعتان" }
      ]
    },
    {
      week: 3,
      title: "الأسبوع ٣: البناء",
      pattern: [
        { time: "٨-١٠ صباحاً", activity: "بناء APIs", path: "backend", duration: "ساعتان" },
        { time: "١٠-١٢ ظهراً", activity: "مشاريع React", path: "frontend", duration: "ساعتان" },
        { time: "١٢-٢ ظهراً", activity: "Django/Flask ويب", path: "python", duration: "ساعتان" },
        { time: "٢-٤ مساءً", activity: "CTF وتحديات", path: "security", duration: "ساعتان" },
        { time: "٤-٦ مساءً", activity: "تكامل المشاريع", path: "projects", duration: "ساعتان" }
      ]
    },
    {
      week: 4,
      title: "الأسبوع ٤: الاحتراف",
      pattern: [
        { time: "٨-١٠ صباحاً", activity: "شهادات وجاهزية", path: "backend", duration: "ساعتان" },
        { time: "١٠-١٢ ظهراً", activity: "تحسين وتطوير", path: "frontend", duration: "ساعتان" },
        { time: "١٢-٢ ظهراً", activity: "تحليل بيانات بايثون", path: "python", duration: "ساعتان" },
        { time: "٢-٤ مساءً", activity: "Bug Bounty", path: "security", duration: "ساعتان" },
        { time: "٤-٦ مساءً", activity: "الملف الوظيفي", path: "projects", duration: "ساعتان" }
      ]
    }
  ],
  days: [
    {
      day: 1,
      date: "اليوم ١",
      title: "أساسيات SQL و JavaScript و Python",
      week: 1,
      milestones: ["تثبيت بيئة التطوير", "كتابة أول استعلام SQL", "كتابة أول كود JavaScript", "كتابة أول برنامج Python"],
      difficulty: "سهل",
      timeBlocks: [
        { time: "٨-١٠ صباحاً", activity: "SQL Basics - Google Cloud", duration: "ساعتان", path: "backend", topic: "SQL", resource: "https://www.cloudskillsboost.google/paths/15", completed: false },
        { time: "١٠-١٢ ظهراً", activity: "JavaScript Fundamentals", duration: "ساعتان", path: "frontend", topic: "JS Variables & Functions", resource: "https://javascript.info", completed: false },
        { time: "١٢-١ مساءً", activity: "استراحة", duration: "ساعة", path: "break", topic: "", completed: true },
        { time: "١-٢ مساءً", activity: "Python Intro + تثبيت Python", duration: "ساعة", path: "python", topic: "Print, Variables, Installation", resource: "https://www.python.org/downloads/", completed: false },
        { time: "٢-٤ مساءً", activity: "OWASP Top 10 Intro", duration: "ساعتان", path: "security", topic: "Web Security", resource: "https://owasp.org/Top10/", completed: false },
        { time: "٤-٦ مساءً", activity: "تثبيت Git وإعداد GitHub + أوامر Git الأساسية", duration: "ساعتان", path: "projects", topic: "Git Install, Config, Init, Add, Commit", resource: "https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup", completed: false },
        { time: "٦-٧ مساءً", activity: "مراجعة وتوثيق", duration: "ساعة", path: "review", topic: "كتابة الملاحظات", completed: false }
      ],
      notes: "",
      totalHours: 10
    },
    {
      day: 2,
      date: "اليوم ٢",
      title: "استعلامات SQL ومتغيرات JS",
      week: 1,
      milestones: ["تنفيذ استعلامات SELECT و WHERE", "فهم المتغيرات والأنواع", "إنشاء أول مستودع Git"],
      difficulty: "سهل",
      timeBlocks: [
        { time: "٨-١٠ صباحاً", activity: "SQL SELECT و WHERE", duration: "ساعتان", path: "backend", topic: "SQL Queries", resource: "https://www.w3schools.com/sql/", completed: false },
        { time: "١٠-١٢ ظهراً", activity: "المتغيرات والأنواع في JS", duration: "ساعتان", path: "frontend", topic: "Variables & Data Types", resource: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types", completed: false },
        { time: "١٢-١ مساءً", activity: "استراحة", duration: "ساعة", path: "break", topic: "", completed: true },
        { time: "١-٣ مساءً", activity: "Top 10 - Injection", duration: "ساعتان", path: "security", topic: "SQL Injection", resource: "https://owasp.org/www-community/attacks/SQL_Injection", completed: false },
        { time: "٣-٥ مساءً", activity: "Git: commit, push, status, log + إعداد SSH", duration: "ساعتان", path: "projects", topic: "Git Workflow & SSH Setup", resource: "https://learngitbranching.js.org/", completed: false },
        { time: "٥-٦ مساءً", activity: "مراجعة وتوثيق", duration: "ساعة", path: "review", topic: "حل التمارين", completed: false }
      ],
      notes: "",
      totalHours: 8
    },
    {
      day: 3,
      date: "اليوم ٣",
      title: "JOIN والدوال في JS",
      week: 1,
      milestones: ["فهم INNER JOIN و LEFT JOIN", "كتابة دوال JavaScript", "معرفة XSS"],
      difficulty: "سهل",
      timeBlocks: [
        { time: "٨-١٠ صباحاً", activity: "SQL JOINs", duration: "ساعتان", path: "backend", topic: "Table Joins", resource: "https://www.w3schools.com/sql/sql_join.asp", completed: false },
        { time: "١٠-١٢ ظهراً", activity: "الدوال في JavaScript", duration: "ساعتان", path: "frontend", topic: "Functions & Scope", resource: "https://javascript.info/function-basics", completed: false },
        { time: "١٢-١ مساءً", activity: "استراحة", duration: "ساعة", path: "break", topic: "", completed: true },
        { time: "١-٣ مساءً", activity: "XSS - Cross Site Scripting", duration: "ساعتان", path: "security", topic: "XSS Attacks", resource: "https://owasp.org/www-community/attacks/xss/", completed: false },
        { time: "٣-٥ مساءً", activity: "تمرين: إنشاء موقع شخصي", duration: "ساعتان", path: "projects", topic: "HTML & CSS Basics", resource: "https://www.freecodecamp.org/", completed: false },
        { time: "٥-٦ مساءً", activity: "مراجعة وتوثيق", duration: "ساعة", path: "review", topic: "تدوين المفاهيم", completed: false }
      ],
      notes: "",
      totalHours: 8
    },
    {
      day: 4,
      date: "اليوم ٤",
      title: "GROUP BY والكائنات في JS",
      week: 1,
      milestones: ["استخدام GROUP BY و HAVING", "فهم الكائنات والمصفوفات", "اختبار ثغرة XSS عملياً"],
      difficulty: "سهل",
      timeBlocks: [
        { time: "٨-١٠ صباحاً", activity: "SQL GROUP BY و HAVING", duration: "ساعتان", path: "backend", topic: "Aggregation", resource: "https://www.w3schools.com/sql/sql_groupby.asp", completed: false },
        { time: "١٠-١٢ ظهراً", activity: "الكائنات والمصفوفات في JS", duration: "ساعتان", path: "frontend", topic: "Objects & Arrays", resource: "https://javascript.info/object", completed: false },
        { time: "١٢-١ مساءً", activity: "استراحة", duration: "ساعة", path: "break", topic: "", completed: true },
        { time: "١-٣ مساءً", activity: "Burp Suite -理论基础", duration: "ساعتان", path: "security", topic: "Burp Suite Intro", resource: "https://portswigger.net/burp", completed: false },
        { time: "٣-٥ مساءً", activity: "تمرين: موقع شخصي متكامل", duration: "ساعتان", path: "projects", topic: "HTML & CSS", resource: "https://www.w3schools.com/", completed: false },
        { time: "٥-٦ مساءً", activity: "مراجعة وتوثيق", duration: "ساعة", path: "review", topic: "مراجعة الأكواد", completed: false }
      ],
      notes: "",
      totalHours: 8
    },
    {
      day: 5,
      date: "اليوم ٥",
      title: "Subqueries و DOM في JS",
      week: 1,
      milestones: ["كتابة Subqueries في SQL", "التعامل مع DOM", "فهم CSRF"],
      difficulty: "سهل",
      timeBlocks: [
        { time: "٨-١٠ صباحاً", activity: "SQL Subqueries", duration: "ساعتان", path: "backend", topic: "Nested Queries", resource: "https://www.w3schools.com/sql/sql_subqueries.asp", completed: false },
        { time: "١٠-١٢ ظهراً", activity: "التعامل مع DOM", duration: "ساعتان", path: "frontend", topic: "DOM Manipulation", resource: "https://javascript.info/document", completed: false },
        { time: "١٢-١ مساءً", activity: "استراحة", duration: "ساعة", path: "break", topic: "", completed: true },
        { time: "١-٣ مساءً", activity: "CSRF - Cross Site Request Forgery", duration: "ساعتان", path: "security", topic: "CSRF Attacks", resource: "https://portswigger.net/web-security/csrf", completed: false },
        { time: "٣-٥ مساءً", activity: "مشروع: صفحة هبوط تفاعلية", duration: "ساعتان", path: "projects", topic: "Interactive Page", resource: "https://www.freecodecamp.org/learn/responsive-web-design/", completed: false },
        { time: "٥-٦ مساءً", activity: "مراجعة وتوثيق", duration: "ساعة", path: "review", topic: "تقييم الأداء", completed: false }
      ],
      notes: "",
      totalHours: 8
    },
    {
      day: 6,
      date: "اليوم ٦",
      title: "Indexes و Events في JS",
      week: 1,
      milestones: ["فهم Indexes في SQL", "معالجة الأحداث في JS", "فحص SSL/TLS"],
      difficulty: "سهل",
      timeBlocks: [
        { time: "٨-١٠ صباحاً", activity: "SQL Indexes و Performance", duration: "ساعتان", path: "backend", topic: "Database Optimization", resource: "https://use-the-index-luke.com/", completed: false },
        { time: "١٠-١٢ ظهراً", activity: "Event Listeners في JS", duration: "ساعتان", path: "frontend", topic: "Events", resource: "https://javascript.info/events", completed: false },
        { time: "١٢-١ مساءً", activity: "استراحة", duration: "ساعة", path: "break", topic: "", completed: true },
        { time: "١-٣ مساءً", activity: "SSL/TLS و HTTPS", duration: "ساعتان", path: "security", topic: "Cryptography Basics", resource: "https://letsencrypt.org/", completed: false },
        { time: "٣-٥ مساءً", activity: "مشروع: آلة حاسبة بالJavaScript", duration: "ساعتان", path: "projects", topic: "JS Project", resource: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/", completed: false },
        { time: "٥-٦ مساءً", activity: "مراجعة وتوثيق", duration: "ساعة", path: "review", topic: "مراجعة الأسبوع", completed: false }
      ],
      notes: "",
      totalHours: 8
    },
    {
      day: 7,
      date: "اليوم ٧",
      title: "مراجعة الأسبوع الأول",
      week: 1,
      milestones: ["إكمال مشروع أسبوعي", "مراجعة جميع المفاهيم", "تقييم التقدم"],
      difficulty: "سهل",
      timeBlocks: [
        { time: "٨-١٠ صباحاً", activity: "مراجعة SQL وتمارين شاملة", duration: "ساعتان", path: "backend", topic: "SQL Review", resource: "https://www.sql-practice.com/", completed: false },
        { time: "١٠-١٢ ظهراً", activity: "مراجعة JavaScript", duration: "ساعتان", path: "frontend", topic: "JS Review", resource: "https://javascript.info/", completed: false },
        { time: "١٢-١ مساءً", activity: "استراحة", duration: "ساعة", path: "break", topic: "", completed: true },
        { time: "١-٣ مساءً", activity: "اختبار قصير: OWASP Top 10", duration: "ساعتان", path: "security", topic: "Security Quiz", resource: "https://owasp.org/www-project-top-ten/", completed: false },
        { time: "٣-٥ مساءً", activity: "تسليم المشروع الأول", duration: "ساعتان", path: "projects", topic: "Project Submission", resource: "https://github.com", completed: false },
        { time: "٥-٦ مساءً", activity: "تخطيط الأسبوع القادم", duration: "ساعة", path: "review", topic: "Planning", completed: false }
      ],
      notes: "",
      totalHours: 8
    },
    {
      day: 8,
      date: "اليوم ٨",
      title: "مقدمة MongoDB و Node.js و Python OOP",
      week: 2,
      milestones: ["تثبيت MongoDB", "أول اتصال Node.js", "فهم JWT", "إنشاء أول Class في Python"],
      difficulty: "سهل",
      timeBlocks: [
        { time: "٨-١٠ صباحاً", activity: "مقدمة MongoDB - NoSQL", duration: "ساعتان", path: "backend", topic: "MongoDB Intro", resource: "https://www.mongodb.com/docs/manual/introduction/", completed: false },
        { time: "١٠-١٢ ظهراً", activity: "مقدمة Node.js و NPM", duration: "ساعتان", path: "frontend", topic: "Node.js Basics", resource: "https://nodejs.org/en/docs/guides/getting-started-guide/", completed: false },
        { time: "١٢-١ مساءً", activity: "استراحة", duration: "ساعة", path: "break", topic: "", completed: true },
        { time: "١-٢ مساءً", activity: "Python OOP Basics + تثبيت المكتبات", duration: "ساعة", path: "python", topic: "Classes, Objects, pip install", resource: "https://realpython.com/python3-object-oriented-programming/", completed: false },
        { time: "٢-٤ مساءً", activity: "JWT - JSON Web Tokens", duration: "ساعتان", path: "security", topic: "Authentication", resource: "https://jwt.io/introduction/", completed: false },
        { time: "٤-٦ مساءً", activity: "مشروع: REST API بسيط", duration: "ساعتان", path: "projects", topic: "Basic API", resource: "https://expressjs.com/", completed: false },
        { time: "٦-٧ مساءً", activity: "مراجعة وتوثيق", duration: "ساعة", path: "review", topic: "توثيق API", completed: false }
      ],
      notes: "",
      totalHours: 10
    },
    {
      day: 9,
      date: "اليوم ٩",
      title: "CRUD في MongoDB و Express",
      week: 2,
      milestones: ["عمليات CRUD في MongoDB", "بناء Express API", "اختبار JWT عملياً"],
      difficulty: "متوسط",
      timeBlocks: [
        { time: "٨-١٠ صباحاً", activity: "CRUD في MongoDB", duration: "ساعتان", path: "backend", topic: "MongoDB CRUD", resource: "https://www.mongodb.com/docs/manual/crud/", completed: false },
        { time: "١٠-١٢ ظهراً", activity: "Express.js - Routing", duration: "ساعتان", path: "frontend", topic: "Express Routes", resource: "https://expressjs.com/en/guide/routing.html", completed: false },
        { time: "١٢-١ مساءً", activity: "استراحة", duration: "ساعة", path: "break", topic: "", completed: true },
        { time: "١-٣ مساءً", activity: "Burp Suite - Intercepting Requests", duration: "ساعتان", path: "security", topic: "Burp Intercept", resource: "https://portswigger.net/burp/documentation/desktop/tools/intercept", completed: false },
        { time: "٣-٥ مساءً", activity: "مشروع: CRUD API مع MongoDB", duration: "ساعتان", path: "projects", topic: "Full CRUD API", resource: "https://www.mongodb.com/docs/drivers/node/current/", completed: false },
        { time: "٥-٦ مساءً", activity: "مراجعة وتوثيق", duration: "ساعة", path: "review", topic: "مراجعة الأكواد", completed: false }
      ],
      notes: "",
      totalHours: 8
    },
    {
      day: 10,
      date: "اليوم ١٠",
      title: "Mongoose و JS Modules",
      week: 2,
      milestones: ["استخدام Mongoose ODM", "وحدات ES6 Modules", "فحص Authorization"],
      difficulty: "متوسط",
      timeBlocks: [
        { time: "٨-١٠ صباحاً", activity: "Mongoose ODM - Schema", duration: "ساعتان", path: "backend", topic: "Mongoose", resource: "https://mongoosejs.com/docs/guide.html", completed: false },
        { time: "١٠-١٢ ظهراً", activity: "ES6 Modules و Arrow Functions", duration: "ساعتان", path: "frontend", topic: "ES6 Modules", resource: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules", completed: false },
        { time: "١٢-١ مساءً", activity: "استراحة", duration: "ساعة", path: "break", topic: "", completed: true },
        { time: "١-٣ مساءً", activity: "IDOR - Insecure Direct Object Reference", duration: "ساعتان", path: "security", topic: "IDOR", resource: "https://portswigger.net/web-security/access-control/idor", completed: false },
        { time: "٣-٥ مساءً", activity: "مشروع: User Authentication API", duration: "ساعتان", path: "projects", topic: "Auth API", resource: "https://www.passportjs.org/", completed: false },
        { time: "٥-٦ مساءً", activity: "مراجعة وتوثيق", duration: "ساعة", path: "review", topic: "تدوين الملاحظات", completed: false }
      ],
      notes: "",
      totalHours: 8
    },
    {
      day: 11,
      date: "اليوم ١١",
      title: "APIs و React Intro",
      week: 2,
      milestones: ["فهم RESTful APIs", "تثبيت React", "PortSwigger Lab 1"],
      difficulty: "متوسط",
      timeBlocks: [
        { time: "٨-١٠ صباحاً", activity: "RESTful APIs - Best Practices", duration: "ساعتان", path: "backend", topic: "REST APIs", resource: "https://restfulapi.net/", completed: false },
        { time: "١٠-١٢ ظهراً", activity: "مقدمة React - JSX", duration: "ساعتان", path: "frontend", topic: "React Intro", resource: "https://react.dev/learn", completed: false },
        { time: "١٢-١ مساءً", activity: "استراحة", duration: "ساعة", path: "break", topic: "", completed: true },
        { time: "١-٣ مساءً", activity: "PortSwigger Lab: SQL Injection", duration: "ساعتان", path: "security", topic: "SQLi Lab", resource: "https://portswigger.net/web-security/sql-injection/lab", completed: false },
        { time: "٣-٥ مساءً", activity: "مشروع: Git Branching + دمج الفروع", duration: "ساعتان", path: "projects", topic: "Git Branch & Merge", resource: "https://learngitbranching.js.org/", completed: false },
        { time: "٥-٦ مساءً", activity: "مراجعة وتوثيق", duration: "ساعة", path: "review", topic: "مراجعة المكونات", completed: false }
      ],
      notes: "",
      totalHours: 8
    },
    {
      day: 12,
      date: "اليوم ١٢",
      title: "MongoDB Aggregation و React State",
      week: 2,
      milestones: ["Aggregation Pipeline في MongoDB", "State و Hooks في React", "XSS Lab في PortSwigger"],
      difficulty: "متوسط",
      timeBlocks: [
        { time: "٨-١٠ صباحاً", activity: "MongoDB Aggregation Pipeline", duration: "ساعتان", path: "backend", topic: "Aggregation", resource: "https://www.mongodb.com/docs/manual/aggregation/", completed: false },
        { time: "١٠-١٢ ظهراً", activity: "React State و useState", duration: "ساعتان", path: "frontend", topic: "React State", resource: "https://react.dev/learn/state-a-components-memory", completed: false },
        { time: "١٢-١ مساءً", activity: "استراحة", duration: "ساعة", path: "break", topic: "", completed: true },
        { time: "١-٣ مساءً", activity: "PortSwigger Lab: Stored XSS", duration: "ساعتان", path: "security", topic: "XSS Lab", resource: "https://portswigger.net/web-security/cross-site-scripting/stored/lab", completed: false },
        { time: "٣-٥ مساءً", activity: "مشروع: To-Do App مع React", duration: "ساعتان", path: "projects", topic: "React To-Do", resource: "https://react.dev/learn", completed: false },
        { time: "٥-٦ مساءً", activity: "مراجعة وتوثيق", duration: "ساعة", path: "review", topic: "كتابة الاختبارات", completed: false }
      ],
      notes: "",
      totalHours: 8
    },
    {
      day: 13,
      date: "اليوم ١٣",
      title: "Indexes في MongoDB و Props",
      week: 2,
      milestones: ["تحسين أداء MongoDB", "Props و Components في React", "Lab: CSRF"],
      difficulty: "متوسط",
      timeBlocks: [
        { time: "٨-١٠ صباحاً", activity: "MongoDB Indexes و Performance", duration: "ساعتان", path: "backend", topic: "DB Performance", resource: "https://www.mongodb.com/docs/manual/indexes/", completed: false },
        { time: "١٠-١٢ ظهراً", activity: "React Props و Components", duration: "ساعتان", path: "frontend", topic: "Props & Components", resource: "https://react.dev/learn/passing-props-to-a-component", completed: false },
        { time: "١٢-١ مساءً", activity: "استراحة", duration: "ساعة", path: "break", topic: "", completed: true },
        { time: "١-٣ مساءً", activity: "PortSwigger Lab: CSRF", duration: "ساعتان", path: "security", topic: "CSRF Lab", resource: "https://portswigger.net/web-security/csrf/lab", completed: false },
        { time: "٣-٥ مساءً", activity: "مشروع: Blog API مع MongoDB", duration: "ساعتان", path: "projects", topic: "Blog API", resource: "https://expressjs.com/", completed: false },
        { time: "٥-٦ مساءً", activity: "مراجعة وتوثيق", duration: "ساعة", path: "review", topic: "مراجعة الأداء", completed: false }
      ],
      notes: "",
      totalHours: 8
    },
    {
      day: 14,
      date: "اليوم ١٤",
      title: "مراجعة الأسبوع الثاني",
      week: 2,
      milestones: ["مراجعة MongoDB و Node.js", "مراجعة React", "تقييم مسار الأمن"],
      difficulty: "متوسط",
      timeBlocks: [
        { time: "٨-١٠ صباحاً", activity: "مراجعة MongoDB - تمارين شاملة", duration: "ساعتان", path: "backend", topic: "MongoDB Review", resource: "https://www.mongodb.com/docs/manual/tutorial/", completed: false },
        { time: "١٠-١٢ ظهراً", activity: "مراجعة React - تمارين", duration: "ساعتان", path: "frontend", topic: "React Review", resource: "https://react.dev/reference/react", completed: false },
        { time: "١٢-١ مساءً", activity: "استراحة", duration: "ساعة", path: "break", topic: "", completed: true },
        { time: "١-٣ مساءً", activity: "اختبار: PortSwigger Labs", duration: "ساعتان", path: "security", topic: "Labs Review", resource: "https://portswigger.net/web-security/all-labs", completed: false },
        { time: "٣-٥ مساءً", activity: "تسليم المشروع الثاني", duration: "ساعتان", path: "projects", topic: "Project Submission", resource: "https://github.com", completed: false },
        { time: "٥-٦ مساءً", activity: "تخطيط الأسبوع الثالث", duration: "ساعة", path: "review", topic: "Weekly Planning", completed: false }
      ],
      notes: "",
      totalHours: 8
    },
    {
      day: 15,
      date: "اليوم ١٥",
      title: "Node.js APIs متقدمة و Django",
      week: 3,
      milestones: ["Middleware في Express", "React useEffect", "PortSwigger: Auth Labs", "إنشاء تطبيق Django"],
      difficulty: "متوسط",
      timeBlocks: [
        { time: "٨-١٠ صباحاً", activity: "Express Middleware و Error Handling", duration: "ساعتان", path: "backend", topic: "Express Middleware", resource: "https://expressjs.com/en/guide/using-middleware.html", completed: false },
        { time: "١٠-١٢ ظهراً", activity: "React useEffect Hook", duration: "ساعتان", path: "frontend", topic: "useEffect", resource: "https://react.dev/learn/synchronizing-with-effects", completed: false },
        { time: "١٢-١ مساءً", activity: "استراحة", duration: "ساعة", path: "break", topic: "", completed: true },
        { time: "١-٢ مساءً", activity: "Django Basics + Python FastAPI", duration: "ساعة", path: "python", topic: "Django Intro & FastAPI", resource: "https://fastapi.tiangolo.com/", completed: false },
        { time: "٢-٤ مساءً", activity: "PortSwigger Lab: Authentication", duration: "ساعتان", path: "security", topic: "Auth Labs", resource: "https://portswigger.net/web-security/authentication/lab", completed: false },
        { time: "٤-٦ مساءً", activity: "مشروع: E-commerce API", duration: "ساعتان", path: "projects", topic: "E-commerce API", resource: "https://expressjs.com/", completed: false },
        { time: "٦-٧ مساءً", activity: "مراجعة وتوثيق", duration: "ساعة", path: "review", topic: "review code", completed: false }
      ],
      notes: "",
      totalHours: 10
    },
    {
      day: 16,
      date: "اليوم ١٦",
      title: "Database Relationships و React Router",
      week: 3,
      milestones: ["Relationships في MongoDB", "React Router - Routing", "Lab: Access Control"],
      difficulty: "متوسط",
      timeBlocks: [
        { time: "٨-١٠ صباحاً", activity: "MongoDB Relationships - $lookup", duration: "ساعتان", path: "backend", topic: "DB Relationships", resource: "https://www.mongodb.com/docs/manual/reference/operator/aggregation/lookup/", completed: false },
        { time: "١٠-١٢ ظهراً", activity: "React Router DOM", duration: "ساعتان", path: "frontend", topic: "React Router", resource: "https://reactrouter.com/en/main/start/tutorial", completed: false },
        { time: "١٢-١ مساءً", activity: "استراحة", duration: "ساعة", path: "break", topic: "", completed: true },
        { time: "١-٣ مساءً", activity: "PortSwigger Lab: Access Control", duration: "ساعتان", path: "security", topic: "Access Control", resource: "https://portswigger.net/web-security/access-control/lab", completed: false },
        { time: "٣-٥ مساءً", activity: "مشروع: Blog مع React Router", duration: "ساعتان", path: "projects", topic: "Blog with Router", resource: "https://reactrouter.com/", completed: false },
        { time: "٥-٦ مساءً", activity: "مراجعة وتوثيق", duration: "ساعة", path: "review", topic: "مراجعة المسارات", completed: false }
      ],
      notes: "",
      totalHours: 8
    },
    {
      day: 17,
      date: "اليوم ١٧",
      title: "WebSockets و Context API",
      week: 3,
      milestones: ["تنفيذ WebSockets", "React Context API", "Lab: SSRF"],
      difficulty: "متوسط",
      timeBlocks: [
        { time: "٨-١٠ صباحاً", activity: "WebSockets مع Socket.io", duration: "ساعتان", path: "backend", topic: "WebSockets", resource: "https://socket.io/docs/v4/", completed: false },
        { time: "١٠-١٢ ظهراً", activity: "React Context API", duration: "ساعتان", path: "frontend", topic: "Context API", resource: "https://react.dev/learn/passing-data-deeply-with-context", completed: false },
        { time: "١٢-١ مساءً", activity: "استراحة", duration: "ساعة", path: "break", topic: "", completed: true },
        { time: "١-٣ مساءً", activity: "PortSwigger Lab: SSRF", duration: "ساعتان", path: "security", topic: "SSRF", resource: "https://portswigger.net/web-security/ssrf/lab", completed: false },
        { time: "٣-٥ مساءً", activity: "مشروع: Chat App مع Socket.io", duration: "ساعتان", path: "projects", topic: "Chat Application", resource: "https://socket.io/docs/v4/tutorial/introduction", completed: false },
        { time: "٥-٦ مساءً", activity: "مراجعة وتوثيق", duration: "ساعة", path: "review", topic: "تدوين الأكواد", completed: false }
      ],
      notes: "",
      totalHours: 8
    },
    {
      day: 18,
      date: "اليوم ١٨",
      title: "GraphQL و Advanced State",
      week: 3,
      milestones: ["مقدمة GraphQL", "useReducer في React", "Lab: File Upload"],
      difficulty: "متوسط",
      timeBlocks: [
        { time: "٨-١٠ صباحاً", activity: "GraphQL Basics", duration: "ساعتان", path: "backend", topic: "GraphQL", resource: "https://graphql.org/learn/", completed: false },
        { time: "١٠-١٢ ظهراً", activity: "React useReducer و Reducers", duration: "ساعتان", path: "frontend", topic: "useReducer", resource: "https://react.dev/learn/extracting-state-logic-into-a-reducer", completed: false },
        { time: "١٢-١ مساءً", activity: "استراحة", duration: "ساعة", path: "break", topic: "", completed: true },
        { time: "١-٣ مساءً", activity: "PortSwigger Lab: File Upload", duration: "ساعتان", path: "security", topic: "File Upload Vulns", resource: "https://portswigger.net/web-security/file-upload/lab", completed: false },
        { time: "٣-٥ مساءً", activity: "مشروع: GraphQL API", duration: "ساعتان", path: "projects", topic: "GraphQL Project", resource: "https://www.apollographql.com/docs/", completed: false },
        { time: "٥-٦ مساءً", activity: "مراجعة وتوثيق", duration: "ساعة", path: "review", topic: "مراجعة GraphQL", completed: false }
      ],
      notes: "",
      totalHours: 8
    },
    {
      day: 19,
      date: "اليوم ١٩",
      title: "Redis و Testing في React",
      week: 3,
      milestones: ["تخزين مؤقت مع Redis", "اختبارات React", "Lab: Command Injection"],
      difficulty: "صعب",
      timeBlocks: [
        { time: "٨-١٠ صباحاً", activity: "Redis - Caching و Session", duration: "ساعتان", path: "backend", topic: "Redis", resource: "https://redis.io/docs/getting-started/", completed: false },
        { time: "١٠-١٢ ظهراً", activity: "Testing React Components", duration: "ساعتان", path: "frontend", topic: "React Testing", resource: "https://testing-library.com/docs/react-testing-library/intro/", completed: false },
        { time: "١٢-١ مساءً", activity: "استراحة", duration: "ساعة", path: "break", topic: "", completed: true },
        { time: "١-٣ مساءً", activity: "PortSwigger Lab: Command Injection", duration: "ساعتان", path: "security", topic: "Command Injection", resource: "https://portswigger.net/web-security/os-command-injection/lab", completed: false },
        { time: "٣-٥ مساءً", activity: "مشروع: Performance Optimization", duration: "ساعتان", path: "projects", topic: "Caching & Performance", resource: "https://redis.io/docs/", completed: false },
        { time: "٥-٦ مساءً", activity: "مراجعة وتوثيق", duration: "ساعة", path: "review", topic: "تحليل الأداء", completed: false }
      ],
      notes: "",
      totalHours: 8
    },
    {
      day: 20,
      date: "اليوم ٢٠",
      title: "Docker Basics و Next.js",
      week: 3,
      milestones: ["تثبيت Docker", "مقدمة Next.js", "Lab: SSTI"],
      difficulty: "صعب",
      timeBlocks: [
        { time: "٨-١٠ صباحاً", activity: "Docker - Containers Basics", duration: "ساعتان", path: "backend", topic: "Docker", resource: "https://docs.docker.com/get-started/", completed: false },
        { time: "١٠-١٢ ظهراً", activity: "Next.js - SSR و SSG", duration: "ساعتان", path: "frontend", topic: "Next.js", resource: "https://nextjs.org/docs/getting-started/installation", completed: false },
        { time: "١٢-١ مساءً", activity: "استراحة", duration: "ساعة", path: "break", topic: "", completed: true },
        { time: "١-٣ مساءً", activity: "PortSwigger Lab: SSTI", duration: "ساعتان", path: "security", topic: "Server Side Template Injection", resource: "https://portswigger.net/web-security/server-side-template-injection/lab", completed: false },
        { time: "٣-٥ مساءً", activity: "مشروع: Dockerize API", duration: "ساعتان", path: "projects", topic: "Docker Project", resource: "https://docs.docker.com/compose/", completed: false },
        { time: "٥-٦ مساءً", activity: "مراجعة وتوثيق", duration: "ساعة", path: "review", topic: "مراجعة Docker", completed: false }
      ],
      notes: "",
      totalHours: 8
    },
    {
      day: 21,
      date: "اليوم ٢١",
      title: "مراجعة الأسبوع الثالث",
      week: 3,
      milestones: ["مراجعة APIs المتقدمة", "مراجعة React المتقدم", "CTF Challenge"],
      difficulty: "صعب",
      timeBlocks: [
        { time: "٨-١٠ صباحاً", activity: "مراجعة Backend - APIs و Docker", duration: "ساعتان", path: "backend", topic: "Backend Review", resource: "https://docs.docker.com/", completed: false },
        { time: "١٠-١٢ ظهراً", activity: "مراجعة Next.js و Testing", duration: "ساعتان", path: "frontend", topic: "Frontend Review", resource: "https://nextjs.org/docs", completed: false },
        { time: "١٢-١ مساءً", activity: "استراحة", duration: "ساعة", path: "break", topic: "", completed: true },
        { time: "١-٣ مساءً", activity: "CTF Challenge - TryHackMe", duration: "ساعتان", path: "security", topic: "CTF", resource: "https://tryhackme.com/", completed: false },
        { time: "٣-٥ مساءً", activity: "تسليم المشروع الثالث", duration: "ساعتان", path: "projects", topic: "Project Submission", resource: "https://github.com", completed: false },
        { time: "٥-٦ مساءً", activity: "تخطيط الأسبوع الرابع", duration: "ساعة", path: "review", topic: "Final Week Planning", completed: false }
      ],
      notes: "",
      totalHours: 8
    },
    {
      day: 22,
      date: "اليوم ٢٢",
      title: "CI/CD و Firebase و Pandas",
      week: 4,
      milestones: ["إعداد CI/CD Pipeline", "دمج Firebase مع React", "OSINT Basics", "تحليل بيانات بـ Pandas"],
      difficulty: "صعب",
      timeBlocks: [
        { time: "٨-١٠ صباحاً", activity: "CI/CD مع GitHub Actions", duration: "ساعتان", path: "backend", topic: "CI/CD", resource: "https://docs.github.com/en/actions", completed: false },
        { time: "١٠-١٢ ظهراً", activity: "Firebase Integration", duration: "ساعتان", path: "frontend", topic: "Firebase", resource: "https://firebase.google.com/docs", completed: false },
        { time: "١٢-١ مساءً", activity: "استراحة", duration: "ساعة", path: "break", topic: "", completed: true },
        { time: "١-٢ مساءً", activity: "Pandas - تحليل البيانات", duration: "ساعة", path: "python", topic: "Data Analysis", resource: "https://pandas.pydata.org/docs/", completed: false },
        { time: "٢-٤ مساءً", activity: "OSINT - Open Source Intelligence", duration: "ساعتان", path: "security", topic: "OSINT", resource: "https://osintframework.com/", completed: false },
        { time: "٤-٦ مساءً", activity: "مشروع: Full Stack Deployment", duration: "ساعتان", path: "projects", topic: "Deployment", resource: "https://vercel.com/", completed: false },
        { time: "٦-٧ مساءً", activity: "مراجعة وتوثيق", duration: "ساعة", path: "review", topic: "توثيق النشر", completed: false }
      ],
      notes: "",
      totalHours: 10
    },
    {
      day: 23,
      date: "اليوم ٢٣",
      title: "AWS أساسيات و TypeScript",
      week: 4,
      milestones: ["AWS EC2 و S3 Basics", "مقدمة TypeScript", "Reconnaissance"],
      difficulty: "صعب",
      timeBlocks: [
        { time: "٨-١٠ صباحاً", activity: "AWS EC2 و S3 Basics", duration: "ساعتان", path: "backend", topic: "AWS", resource: "https://aws.amazon.com/getting-started/?nc1=h_ls", completed: false },
        { time: "١٠-١٢ ظهراً", activity: "TypeScript Basics", duration: "ساعتان", path: "frontend", topic: "TypeScript", resource: "https://www.typescriptlang.org/docs/", completed: false },
        { time: "١٢-١ مساءً", activity: "استراحة", duration: "ساعة", path: "break", topic: "", completed: true },
        { time: "١-٣ مساءً", activity: "Reconnaissance - Passive و Active", duration: "ساعتان", path: "security", topic: "Recon", resource: "https://www.kali.org/tools/", completed: false },
        { time: "٣-٥ مساءً", activity: "مشروع: Cloud Deployment", duration: "ساعتان", path: "projects", topic: "AWS Project", resource: "https://aws.amazon.com/console/", completed: false },
        { time: "٥-٦ مساءً", activity: "مراجعة وتوثيق", duration: "ساعة", path: "review", topic: "مراجعة السحابة", completed: false }
      ],
      notes: "",
      totalHours: 8
    },
    {
      day: 24,
      date: "اليوم ٢٤",
      title: "PostgreSQL و Types متقدم",
      week: 4,
      milestones: ["مقارنة SQL vs NoSQL", "TypeScript Generics", "Network Scanning"],
      difficulty: "صعب",
      timeBlocks: [
        { time: "٨-١٠ صباحاً", activity: "PostgreSQL Advanced Queries", duration: "ساعتان", path: "backend", topic: "PostgreSQL", resource: "https://www.postgresql.org/docs/current/tutorial.html", completed: false },
        { time: "١٠-١٢ ظهراً", activity: "TypeScript Generics و Types", duration: "ساعتان", path: "frontend", topic: "TypeScript Generics", resource: "https://www.typescriptlang.org/docs/handbook/2/generics.html", completed: false },
        { time: "١٢-١ مساءً", activity: "استراحة", duration: "ساعة", path: "break", topic: "", completed: true },
        { time: "١-٣ مساءً", activity: "Nmap و Network Scanning", duration: "ساعتان", path: "security", topic: "Network Security", resource: "https://nmap.org/book/man.html", completed: false },
        { time: "٣-٥ مساءً", activity: "مشروع: Database Migration", duration: "ساعتان", path: "projects", topic: "DB Migration", resource: "https://www.prisma.io/", completed: false },
        { time: "٥-٦ مساءً", activity: "مراجعة وتوثيق", duration: "ساعة", path: "review", topic: "مراجعة قواعد البيانات", completed: false }
      ],
      notes: "",
      totalHours: 8
    },
    {
      day: 25,
      date: "اليوم ٢٥",
      title: "Microservices و Redux",
      week: 4,
      milestones: ["Microservices Architecture", "Redux Toolkit", "Web Application Firewall"],
      difficulty: "صعب",
      timeBlocks: [
        { time: "٨-١٠ صباحاً", activity: "Microservices مع Docker Compose", duration: "ساعتان", path: "backend", topic: "Microservices", resource: "https://docs.docker.com/compose/", completed: false },
        { time: "١٠-١٢ ظهراً", activity: "Redux Toolkit في React", duration: "ساعتان", path: "frontend", topic: "Redux", resource: "https://redux-toolkit.js.org/introduction/getting-started", completed: false },
        { time: "١٢-١ مساءً", activity: "استراحة", duration: "ساعة", path: "break", topic: "", completed: true },
        { time: "١-٣ مساءً", activity: "ModSecurity و WAF", duration: "ساعتان", path: "security", topic: "WAF", resource: "https://www.modsecurity.org/", completed: false },
        { time: "٣-٥ مساءً", activity: "مشروع: Microservices App", duration: "ساعتان", path: "projects", topic: "Microservices Project", resource: "https://docs.docker.com/compose/", completed: false },
        { time: "٥-٦ مساءً", activity: "مراجعة وتوثيق", duration: "ساعة", path: "review", topic: "مراجعة الهندسة", completed: false }
      ],
      notes: "",
      totalHours: 8
    },
    {
      day: 26,
      date: "اليوم ٢٦",
      title: "Kubernetes و Next.js Auth",
      week: 4,
      milestones: ["Kubernetes Basics", "Next.js Authentication", "Bug Bounty Methodology"],
      difficulty: "صعب",
      timeBlocks: [
        { time: "٨-١٠ صباحاً", activity: "Kubernetes - Pods و Deployments", duration: "ساعتان", path: "backend", topic: "Kubernetes", resource: "https://kubernetes.io/docs/tutorials/kubernetes-basics/", completed: false },
        { time: "١٠-١٢ ظهراً", activity: "Next.js Auth - NextAuth.js", duration: "ساعتان", path: "frontend", topic: "NextAuth", resource: "https://next-auth.js.org/getting-started/introduction", completed: false },
        { time: "١٢-١ مساءً", activity: "استراحة", duration: "ساعة", path: "break", topic: "", completed: true },
        { time: "١-٣ مساءً", activity: "Bug Bounty Methodology", duration: "ساعتان", path: "security", topic: "Bug Bounty", resource: "https://www.hackerone.com/", completed: false },
        { time: "٣-٥ مساءً", activity: "مشروع: Full Stack Next.js App", duration: "ساعتان", path: "projects", topic: "Next.js Project", resource: "https://nextjs.org/", completed: false },
        { time: "٥-٦ مساءً", activity: "مراجعة وتوثيق", duration: "ساعة", path: "review", topic: "مراجعة التوثيق", completed: false }
      ],
      notes: "",
      totalHours: 8
    },
    {
      day: 27,
      date: "اليوم ٢٧",
      title: "Monitoring و React Native",
      week: 4,
      milestones: ["Monitoring مع Prometheus", "React Native Intro", "OWASP Juice Shop"],
      difficulty: "صعب",
      timeBlocks: [
        { time: "٨-١٠ صباحاً", activity: "Monitoring - Prometheus و Grafana", duration: "ساعتان", path: "backend", topic: "Monitoring", resource: "https://prometheus.io/docs/introduction/overview/", completed: false },
        { time: "١٠-١٢ ظهراً", activity: "مقدمة React Native", duration: "ساعتان", path: "frontend", topic: "React Native", resource: "https://reactnative.dev/docs/getting-started", completed: false },
        { time: "١٢-١ مساءً", activity: "استراحة", duration: "ساعة", path: "break", topic: "", completed: true },
        { time: "١-٣ مساءً", activity: "OWASP Juice Shop - Challenges", duration: "ساعتان", path: "security", topic: "Juice Shop", resource: "https://owasp.org/www-project-juice-shop/", completed: false },
        { time: "٣-٥ مساءً", activity: "مشروع: Mobile API Integration", duration: "ساعتان", path: "projects", topic: "Mobile Project", resource: "https://reactnative.dev/", completed: false },
        { time: "٥-٦ مساءً", activity: "مراجعة وتوثيق", duration: "ساعة", path: "review", topic: "مراجعة الجوال", completed: false }
      ],
      notes: "",
      totalHours: 8
    },
    {
      day: 28,
      date: "اليوم ٢٨",
      title: "شهادات AWS و Portfolio",
      week: 4,
      milestones: ["تحضير AWS Cloud Practitioner", "إنشاء Portfolio", "Certified Ethical Hacker"],
      difficulty: "صعب",
      timeBlocks: [
        { time: "٨-١٠ صباحاً", activity: "AWS Cloud Practitioner - تحضير", duration: "ساعتان", path: "backend", topic: "AWS Certification", resource: "https://aws.amazon.com/certification/certified-cloud-practitioner/", completed: false },
        { time: "١٠-١٢ ظهراً", activity: "إنشاء Portfolio شخصي", duration: "ساعتان", path: "frontend", topic: "Portfolio", resource: "https://nextjs.org/", completed: false },
        { time: "١٢-١ مساءً", activity: "استراحة", duration: "ساعة", path: "break", topic: "", completed: true },
        { time: "١-٣ مساءً", activity: "CEH - Certified Ethical Hacker Basics", duration: "ساعتان", path: "security", topic: "CEH", resource: "https://www.eccouncil.org/programs/certified-ethical-hacker-ceh/", completed: false },
        { time: "٣-٥ مساءً", activity: "مشروع: Portfolio Website", duration: "ساعتان", path: "projects", topic: "Portfolio Project", resource: "https://vercel.com/", completed: false },
        { time: "٥-٦ مساءً", activity: "مراجعة وتوثيق", duration: "ساعة", path: "review", topic: "مراجعة السيرة الذاتية", completed: false }
      ],
      notes: "",
      totalHours: 8
    },
    {
      day: 29,
      date: "اليوم ٢٩",
      title: "مقابلات وسيرة ذاتية",
      week: 4,
      milestones: ["إعداد السيرة الذاتية", "محاكاة مقابلة تقنية", "مراجعة شاملة"],
      difficulty: "صعب",
      timeBlocks: [
        { time: "٨-١٠ صباحاً", activity: "تحضير السيرة الذاتية التقنية", duration: "ساعتان", path: "backend", topic: "CV Preparation", resource: "https://www.linkedin.com/", completed: false },
        { time: "١٠-١٢ ظهراً", activity: "مشاكل LeetCode - Algorithms", duration: "ساعتان", path: "frontend", topic: "Interview Prep", resource: "https://leetcode.com/", completed: false },
        { time: "١٢-١ مساءً", activity: "استراحة", duration: "ساعة", path: "break", topic: "", completed: true },
        { time: "١-٣ مساءً", activity: "محاكاة مقابلة أمنية", duration: "ساعتان", path: "security", topic: "Security Interview", resource: "https://www.pramp.com/", completed: false },
        { time: "٣-٥ مساءً", activity: "GitHub Profile Optimization", duration: "ساعتان", path: "projects", topic: "GitHub Profile", resource: "https://github.com", completed: false },
        { time: "٥-٦ مساءً", activity: "مراجعة وتوثيق", duration: "ساعة", path: "review", topic: "تقييم الجاهزية", completed: false }
      ],
      notes: "",
      totalHours: 8
    },
    {
      day: 30,
      date: "اليوم ٣٠",
      title: "الختام والتقييم النهائي",
      week: 4,
      milestones: ["تسليم المشروع النهائي", "اختبار نهاية الدورة", "خطة ما بعد البوتكمب"],
      difficulty: "صعب",
      timeBlocks: [
        { time: "٨-١٠ صباحاً", activity: "الاختبار النهائي - Backend", duration: "ساعتان", path: "backend", topic: "Final Exam Backend", resource: "https://www.cloudskillsboost.google/", completed: false },
        { time: "١٠-١٢ ظهراً", activity: "الاختبار النهائي - Frontend", duration: "ساعتان", path: "frontend", topic: "Final Exam Frontend", resource: "https://react.dev/", completed: false },
        { time: "١٢-١ مساءً", activity: "استراحة", duration: "ساعة", path: "break", topic: "", completed: true },
        { time: "١-٣ مساءً", activity: "Captstone CTF Challenge", duration: "ساعتان", path: "security", topic: "Final CTF", resource: "https://www.hackthebox.com/", completed: false },
        { time: "٣-٥ مساءً", activity: "عرض المشروع النهائي", duration: "ساعتان", path: "projects", topic: "Final Presentation", resource: "https://github.com", completed: false },
        { time: "٥-٦ مساءً", activity: "ختام وتوزيع الشهادات", duration: "ساعة", path: "review", topic: "Graduation", completed: false }
      ],
      notes: "",
      totalHours: 8
    }
  ]
};

export default scheduleData;
