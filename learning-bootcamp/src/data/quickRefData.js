const quickRefData = {
  title: "مرجع سريع",
  description: "ملخص سريع لكل ما تحتاجه في الرحلة",
  stats: {
    totalDays: 30,
    totalHours: 170,
    projects: 5,
    certifications: 3,
    commits: "100+",
    hoursPerDay: "5-6"
  },
  successMetrics: [
    { metric: "شهادات", target: "3+", icon: "certificate" },
    { metric: "مشاريع", target: "5", icon: "projects" },
    { metric: "Commits على GitHub", target: "100+", icon: "git" },
    { metric: "مقالات تقنية", target: "3+", icon: "article" },
    { metric: "تحديثات LinkedIn", target: "10+", icon: "linkedin" },
    { metric: "تواصل مهني", target: "10+", icon: "network" }
  ],
  dailyRoutine: [
    { time: "٨-١٠ ص", activity: "التعلم العميق (مفاهيم جديدة)", priority: "الأعلى" },
    { time: "١٠-١٢ ص", activity: "التطبيق العملي (تمارين)", priority: "عالية" },
    { time: "١٢-١ م", activity: "استراحة", priority: "متوسطة" },
    { time: "١-٣ م", activity: "التعمق والتوسع", priority: "عالية" },
    { time: "٣-٥ م", activity: "المشاريع", priority: "الأعلى" },
    { time: "٥-٦ م", activity: "المراجعة والنشر", priority: "متوسطة" }
  ],
  firstDayChecklist: [
    { task: "تثبيت VS Code والإضافات", done: false },
    { task: "تثبيت Git وإعداد GitHub", done: false },
    { task: "تثبيت Node.js و npm", done: false },
    { task: "إنشاء حساب MongoDB Atlas", done: false },
    { task: "الانضمام إلى Discord (الرابط في الأسفل)", done: false },
    { task: "إنشاء حساب على LinkedIn وتحديث الملف", done: false }
  ],
  toolsList: [
    { name: "VS Code", purpose: "محرر الأكواد", url: "https://code.visualstudio.com/", icon: "code" },
    { name: "Git", purpose: "التحكم بالإصدارات", url: "https://git-scm.com/", icon: "git" },
    { name: "Postman", purpose: "اختبار APIs", url: "https://www.postman.com/", icon: "tool" },
    { name: "MongoDB Compass", purpose: "إدارة MongoDB", url: "https://www.mongodb.com/products/compass", icon: "database" },
    { name: "DBeaver", purpose: "إدارة SQL", url: "https://dbeaver.io/", icon: "database" },
    { name: "Burp Suite", purpose: "اختبار الاختراق", url: "https://portswigger.net/burp/communitydownload", icon: "shield" },
    { name: "Docker", purpose: "الحاويات", url: "https://www.docker.com/", icon: "tool" },
    { name: "Node.js", purpose: "بيئة تشغيل JavaScript", url: "https://nodejs.org/", icon: "code" }
  ],
  commonMistakes: [
    { mistake: "مشاهدة فيديوهات دون تطبيق", solution: "أوقف الفيديو كل 5 دقائق وطبق الكود", severity: "critical" },
    { mistake: "محاولة تعلم كل شيء معاً", solution: "ركز على مسار واحد كل أسبوع", severity: "high" },
    { mistake: "عدم مشاركة التقدم", solution: "انشر يومياً على تويتر بهاشتاغ #100DaysOfCode", severity: "medium" },
    { mistake: "الاستسلام في الأسبوع الثالث", solution: "الأسبوع ٣ هو الأصعب. استمر وسترى النتائج", severity: "high" },
    { mistake: "مقارنة النفس بالآخرين", solution: "قارن نفسك بنسختك السابقة فقط", severity: "medium" },
    { mistake: "السعي للكمال", solution: "أنجز أولاً ثم حسّن. المُنجَز > المثالي", severity: "low" }
  ]
};

export default quickRefData;
