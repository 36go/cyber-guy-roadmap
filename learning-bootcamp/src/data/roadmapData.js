const roadmapData = {
  title: "خارطة الطريق - 30 يوماً",
  description: "خطة شاملة ومكثفة لمدة 30 يوماً لتعلم البرمجة والأمن السيبراني. اختر مسارك المفضل وانطلق في رحلة تعلمية مليئة بالتحديات والمشاريع العملية والشهادات المعتمدة.",
  weeks: [
    {
      id: 1,
      title: "الأسبوع ١: الأساسيات",
      subtitle: "البناء القوي",
      days: "1-7",
      color: "blue",
      paths: {
        backend: {
          title: "المسار الخلفي (Backend)",
          sessions: [
            { day: "1-2", title: "أساسيات SQL", resource: "Google Cloud Skills Boost", hours: 5, description: "تعلم أساسيات SQL من Google Cloud" },
            { day: "3-4", title: "تصميم قواعد البيانات", resource: "FreeCodeCamp + Oracle", hours: 4, description: "تصميم قواعد بيانات علائقية" },
            { day: "5-7", title: "تمارين SQL متقدمة", resource: "HackerRank + LeetCode", hours: 6, description: "حل 50+ استعلام SQL" }
          ]
        },
        frontend: {
          title: "المسار الأمامي (Frontend)",
          sessions: [
            { day: "1-2", title: "أساسيات JavaScript", resource: "JavaScript.info", hours: 5, description: "المتغيرات، الدوال، الكائنات" },
            { day: "3-4", title: "ES6+ والمفاهيم المتقدمة", resource: "FreeCodeCamp", hours: 4, description: "Arrow functions, Promises, Destructuring" },
            { day: "5-7", title: "DOM وتمارين عملية", resource: "MDN Web Docs", hours: 6, description: "التعامل مع DOM, الأحداث" }
          ]
        },
        security: {
          title: "المسار الأمني (Security)",
          sessions: [
            { day: "1-2", title: "أساسيات OWASP Top 10", resource: "OWASP Official", hours: 4, description: "أهم 10 ثغرات أمنية" },
            { day: "3-4", title: "أمن الويب", resource: "PortSwigger Academy", hours: 4, description: "مفاهيم أمن تطبيقات الويب" },
            { day: "5-7", title: "مختبرات عملية", resource: "TryHackMe", hours: 6, description: "تطبيقات عملية على الثغرات" }
          ]
        },
        python: {
          title: "مسار بايثون (Python)",
          sessions: [
            { day: "1-2", title: "أساسيات Python", resource: "Python.org", hours: 5, description: "المتغيرات، الأنواع، الطباعة" },
            { day: "3-4", title: "الجمل الشرطية والحلقات", resource: "W3Schools Python", hours: 4, description: "if/else, for, while" },
            { day: "5-7", title: "القوائم والقاموس والدوال", resource: "Real Python", hours: 6, description: "list, dict, functions" }
          ]
        }
      },
      milestones: ["إتمام أساسيات SQL", "بناء أول صفحة تفاعلية", "فهم OWASP Top 10", "كتابة أول كود Python"],
      totalHours: 40
    },
    {
      id: 2,
      title: "الأسبوع ٢: التعمق",
      subtitle: "بناء العمق المعرفي",
      days: "8-14",
      color: "purple",
      paths: {
        backend: {
          title: "المسار الخلفي (Backend)",
          sessions: [
            { day: "8-9", title: "MongoDB M001", resource: "MongoDB University", hours: 5, description: "أساسيات MongoDB" },
            { day: "10-11", title: "JWT والمصادقة", resource: "Microsoft Learn", hours: 4, description: "JSON Web Tokens" },
            { day: "12-14", title: "Node.js و Express", resource: "Node.js Docs", hours: 6, description: "بناء APIs باستخدام Express" }
          ]
        },
        frontend: {
          title: "المسار الأمامي (Frontend)",
          sessions: [
            { day: "8-9", title: "React Basics", resource: "Meta React Course", hours: 5, description: "JSX, Components, Props" },
            { day: "10-11", title: "React Hooks", resource: "React Docs", hours: 4, description: "useState, useEffect, useContext" },
            { day: "12-14", title: "State Management", resource: "Redux Toolkit", hours: 6, description: "إدارة الحالة المتقدمة" }
          ]
        },
        security: {
          title: "المسار الأمني (Security)",
          sessions: [
            { day: "8-9", title: "حقن SQL (SQL Injection)", resource: "PortSwigger Labs", hours: 4, description: "استغلال وحماية SQLi" },
            { day: "10-11", title: "XSS وهجمات الويب", resource: "TryHackMe", hours: 4, description: "Cross-Site Scripting" },
            { day: "12-14", title: "CSRF ومصادقة", resource: "HackTheBox", hours: 5, description: "هجمات التزوير والمصادقة" }
          ]
        },
        python: {
          title: "مسار بايثون (Python)",
          sessions: [
            { day: "8-9", title: "البرمجة الكائنية OOP", resource: "Real Python", hours: 5, description: "classes, objects, inheritance" },
            { day: "10-11", title: "التعامل مع الملفات والاستثناءات", resource: "Python Docs", hours: 4, description: "file I/O, try/except" },
            { day: "12-14", title: "المكتبات الشهيرة", resource: "PyPI", hours: 6, description: "requests, json, datetime" }
          ]
        }
      },
      milestones: ["إتمام MongoDB M001", "بناء أول تطبيق React", "فهم SQL Injection", "إتقان OOP في Python"],
      totalHours: 42
    },
    {
      id: 3,
      title: "الأسبوع ٣: البناء",
      subtitle: "المشاريع والتطبيق",
      days: "15-21",
      color: "green",
      paths: {
        backend: {
          title: "المسار الخلفي (Backend)",
          sessions: [
            { day: "15-16", title: "بناء REST API", resource: "REST API Design", hours: 5, description: "تصميم وتنفيذ API متكامل" },
            { day: "17-18", title: "المشروع 1: نظام مصادقة", resource: "5-projects-detailed", hours: 6, description: "نظام تسجيل دخول كامل" },
            { day: "19-21", title: "البريد الإلكتروني والتكامل", resource: "Nodemailer + Twilio", hours: 5, description: "إرسال الإيميلات والرسائل" }
          ]
        },
        frontend: {
          title: "المسار الأمامي (Frontend)",
          sessions: [
            { day: "15-16", title: "React Router و APIs", resource: "React Router v6", hours: 5, description: "التنقل والتكامل مع APIs" },
            { day: "17-18", title: "المشروع 1: Todo App", resource: "5-projects-detailed", hours: 6, description: "تطبيق إدارة المهام" },
            { day: "19-21", title: "Tailwind CSS و التصميم", resource: "Tailwind Docs", hours: 5, description: "تصميم متجاوب ومتقدم" }
          ]
        },
        security: {
          title: "المسار الأمني (Security)",
          sessions: [
            { day: "15-16", title: "XXE و SSRF", resource: "PortSwigger Labs", hours: 4, description: "ثغرات XML و Server-Side" },
            { day: "17-18", title: "المشروع 2: DVWA", resource: "DVWA + Burp Suite", hours: 6, description: "اختبار اختراق عملي" },
            { day: "19-21", title: "CTF وتحديات", resource: "TryHackMe CTF", hours: 5, description: "مسابقات Capture The Flag" }
          ]
        },
        python: {
          title: "مسار بايثون (Python)",
          sessions: [
            { day: "15-16", title: "Django Basics", resource: "Django Docs", hours: 5, description: "نموذج MVC، مسارات، قوالب" },
            { day: "17-18", title: "Django ORM وقواعد البيانات", resource: "Django Girls", hours: 6, description: "models, migrations, queries" },
            { day: "19-21", title: "Flask و REST APIs", resource: "Flask Docs", hours: 5, description: "بناء APIs باستخدام Flask" }
          ]
        }
      },
      milestones: ["إتمام 2 مشاريع", "بناء API كامل", "اختراق DVWA", "إنشاء تطبيق Django"],
      totalHours: 46
    },
    {
      id: 4,
      title: "الأسبوع ٤: الاحتراف",
      subtitle: "الشهادات والاستعداد الوظيفي",
      days: "22-30",
      color: "gold",
      paths: {
        backend: {
          title: "المسار الخلفي (Backend)",
          sessions: [
            { day: "22-24", title: "MongoDB M001 شهادة", resource: "MongoDB University", hours: 4, description: "إتمام شهادة MongoDB" },
            { day: "25-27", title: "AWS Cloud Practitioner", resource: "AWS Academy", hours: 5, description: "أساسيات السحابة" },
            { day: "28-30", title: "المشروع النهائي", resource: "Integration", hours: 6, description: "دمج كل المفاهيم في مشروع واحد" }
          ]
        },
        frontend: {
          title: "المسار الأمامي (Frontend)",
          sessions: [
            { day: "22-24", title: "Meta React شهادة", resource: "Coursera", hours: 5, description: "إتمام شهادة Meta React" },
            { day: "25-27", title: "تحسين الأداء", resource: "Web Dev Docs", hours: 4, description: "Performance Optimization" },
            { day: "28-30", title: "المشروع النهائي والنشر", resource: "Vercel + Netlify", hours: 6, description: "نشر المشاريع على الإنترنت" }
          ]
        },
        security: {
          title: "المسار الأمني (Security)",
          sessions: [
            { day: "22-24", title: "Google Cybersecurity شهادة", resource: "Google Coursera", hours: 5, description: "أساسيات الأمن السيبراني" },
            { day: "25-27", title: "Bug Bounty مقدمة", resource: "HackerOne + Bugcrowd", hours: 4, description: "مكافآت الثغرات" },
            { day: "28-30", title: "الاستعداد الوظيفي", resource: "LinkedIn + GitHub", hours: 5, description: "تجهيز الملف الوظيفي" }
          ]
        },
        python: {
          title: "مسار بايثون (Python)",
          sessions: [
            { day: "22-24", title: "تحليل البيانات مع Pandas", resource: "Pandas Docs", hours: 5, description: "DataFrames, cleaning, analysis" },
            { day: "25-27", title: "الأتمتة والـ Scripting", resource: "Automate the Boring Stuff", hours: 4, description: "أتمتة المهام المتكررة" },
            { day: "28-30", title: "المشروع النهائي", resource: "Integration", hours: 6, description: "تطبيق متكامل بلغة Python" }
          ]
        }
      },
      milestones: ["3+ شهادات", "5 مشاريع مكتملة", "ملف وظيفي جاهز"],
      totalHours: 44
    }
  ],
  stats: {
    totalDays: 30,
    totalHours: 170,
    totalProjects: 5,
    certifications: 3,
    commits: 100,
    hoursPerDay: 5.5
  },
  learningPaths: [
    {
      id: "backend",
      title: "المسار الخلفي (Backend)",
      icon: "server",
      color: "#2563EB",
      skills: ["SQL", "MongoDB", "Node.js", "Express", "APIs REST", "JWT"],
      courses: 12,
      hours: 40,
      difficulty: "مبتديء → متوسط"
    },
    {
      id: "frontend",
      title: "المسار الأمامي (Frontend)",
      icon: "code",
      color: "#10B981",
      skills: ["JavaScript", "React", "Tailwind CSS", "Redux", "HTML/CSS"],
      courses: 10,
      hours: 50,
      difficulty: "مبتديء → متوسط"
    },
    {
      id: "security",
      title: "الأمن السيبراني",
      icon: "shield",
      color: "#EF4444",
      skills: ["OWASP Top 10", "Burp Suite", "SQLi", "XSS", "CTF"],
      courses: 10,
      hours: 40,
      difficulty: "مبتديء → متوسط"
    },
    {
      id: "python",
      title: "مسار بايثون (Python)",
      icon: "fileCode",
      color: "#F59E0B",
      skills: ["Python", "Django/Flask", "APIs", "Data Analysis", "Automation"],
      courses: 10,
      hours: 40,
      difficulty: "مبتديء → متوسط"
    }
  ],
  skillsProgression: {
    labels: ["SQL", "JavaScript", "React", "Node.js", "الأمن السيبراني", "قواعد البيانات", "Python"],
    week1: [40, 30, 0, 0, 20, 30, 35],
    week2: [60, 50, 30, 20, 40, 50, 50],
    week3: [75, 70, 60, 50, 65, 70, 70],
    week4: [90, 85, 80, 75, 85, 85, 90]
  }
};

export default roadmapData;
