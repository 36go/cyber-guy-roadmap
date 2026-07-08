const certificationsData = {
  title: "الشهادات والإنجازات",
  description: "احصل على شهادات معترف بها دولياً بدون أي تكلفة",
  certifications: [
    {
      id: "mongodb-m001",
      name: "MongoDB M001",
      issuer: "MongoDB University",
      logo: "🍃",
      duration: "٥ ساعات",
      difficulty: "مبتديء",
      cost: "مجاني",
      week: "٢-٤",
      description: "أساسيات MongoDB - قاعدة البيانات الوثائقية الرائدة",
      skills: ["CRUD Operations", "Aggregation Pipeline", "Indexing", "Data Modeling"],
      url: "https://university.mongodb.com/courses/M001/about",
      examUrl: "https://university.mongodb.com/",
      value: "عالية - MongoDB من أكثر قواعد البيانات طلباً"
    },
    {
      id: "gcloud-fundamentals",
      name: "Google Cloud Fundamentals",
      issuer: "Google Cloud",
      logo: "☁️",
      duration: "١٠ ساعات",
      difficulty: "مبتديء",
      cost: "مجاني",
      week: "١-٢",
      description: "أساسيات الحوسبة السحابية مع Google Cloud Platform",
      skills: ["Compute Engine", "Cloud Storage", "Cloud SQL", "IAM", "Networking"],
      url: "https://www.cloudskillsboost.google/paths/15",
      examUrl: "https://www.cloudskillsboost.google/",
      value: "متوسطة - فهم أساسيات السحابة"
    },
    {
      id: "google-cybersec",
      name: "Google Cybersecurity Certificate",
      issuer: "Google (Coursera)",
      logo: "🛡️",
      duration: "٢٠ ساعة",
      difficulty: "متوسط",
      cost: "مجاني (تجربة 7 أيام)",
      week: "٢-٤",
      description: "شهادة الأمن السيبراني من Google - برنامج احترافي",
      skills: ["Network Security", "Incident Response", "SIEM Tools", "Python for Security", "Risk Management"],
      url: "https://www.coursera.org/professional-certificates/google-cybersecurity",
      examUrl: "https://www.coursera.org/professional-certificates/google-cybersecurity",
      value: "عالية جداً - شهادة من Google معترف بها عالمياً"
    },
    {
      id: "meta-react",
      name: "Meta React Professional Certificate",
      issuer: "Meta (Coursera)",
      logo: "⚛️",
      duration: "٢٥ ساعة",
      difficulty: "متوسط",
      cost: "مجاني (تجربة 7 أيام)",
      week: "٢-٤",
      description: "برنامج احترافي من Meta لتطوير تطبيقات React",
      skills: ["React", "JSX", "Hooks", "State Management", "Testing", "Deployment"],
      url: "https://www.coursera.org/professional-certificates/meta-front-end-developer",
      examUrl: "https://www.coursera.org/professional-certificates/meta-front-end-developer",
      value: "عالية جداً - شهادة من Meta معترف بها"
    },
    {
      id: "aws-practitioner",
      name: "AWS Cloud Practitioner",
      issuer: "Amazon Web Services",
      logo: "☁️",
      duration: "١٠ ساعات",
      difficulty: "مبتديء",
      cost: "مجاني (موارد تعليمية)",
      week: "٤",
      description: "أساسيات AWS Cloud - شهادة مستوى تمهيدي",
      skills: ["AWS Services", "Cloud Concepts", "Security", "Billing", "Architecture"],
      url: "https://aws.amazon.com/training/learn-about/cloud-practitioner/",
      examUrl: "https://aws.amazon.com/certification/certified-cloud-practitioner/",
      value: "جيدة للمبتدئين - أساسيات السحابة"
    },
    {
      id: "owasp-top10",
      name: "OWASP Top 10 Certificate",
      issuer: "OWASP",
      logo: "🔒",
      duration: "٣ ساعات",
      difficulty: "مبتديء",
      cost: "مجاني",
      week: "١",
      description: "فهم أهم 10 ثغرات أمنية في تطبيقات الويب",
      skills: ["SQL Injection", "XSS", "CSRF", "Authentication Flaws", "Security Misconfiguration"],
      url: "https://owasp.org/www-project-top-ten/",
      examUrl: "https://owasp.org/",
      value: "متوسطة - أساسية لكل مطور"
    },
    {
      id: "python-cert",
      name: "Google IT Automation with Python",
      issuer: "Google (Coursera)",
      logo: "🐍",
      duration: "٢٠ ساعة",
      difficulty: "متوسط",
      cost: "مجاني (تجربة 7 أيام)",
      week: "٣-٤",
      description: "شهادة Google لأتمتة تكنولوجيا المعلومات باستخدام Python",
      skills: ["Python", "Automation", "Git", "Debugging", "Configuration Management"],
      url: "https://www.coursera.org/professional-certificates/google-it-automation",
      examUrl: "https://www.coursera.org/professional-certificates/google-it-automation",
      value: "عالية - شهادة Python من Google معتمدة عالمياً"
    }
  ],
  timeline: [
    { week: "١", title: "الأسبوع ١", certs: ["OWASP Top 10", "Google Cloud Fundamentals"] },
    { week: "٢", title: "الأسبوع ٢", certs: ["MongoDB M001 (start)"] },
    { week: "٣", title: "الأسبوع ٣", certs: ["MongoDB M001 (complete)", "Meta React (start)", "Google IT Python (start)"] },
    { week: "٤", title: "الأسبوع ٤", certs: ["Meta React (complete)", "Google Cybersecurity", "AWS Cloud Practitioner", "Google IT Python (complete)"] }
  ],
  resumeTips: [
    "ضع الشهادات في قسم منفصل 'الشهادات والاعتمادات'",
    "أضف رابط إثبات الشهادة (Credential URL)",
    "اذكر المهارات التي اكتسبتها من كل شهادة",
    "استخدم كلمات مفتاحية من وصف الشهادة في سيرتك الذاتية",
    "أضف تاريخ الإنجاز (الشهر والسنة)"
  ]
};

export default certificationsData;
