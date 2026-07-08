const videoResources = {
  html: {
    topic: 'HTML',
    videos: [
      {
        title: 'HTML Full Course - Build a Website Tutorial',
        channel: 'freeCodeCamp.org',
        url: 'https://youtube.com/watch?v=pQN-pnXPaVg',
        duration: '2 ساعة',
        description: 'دورة HTML كاملة من freeCodeCamp - تغطي كل شيء من الصفر إلى بناء موقع متكامل',
        level: 'مبتديء',
        type: 'course'
      },
      {
        title: 'HTML & CSS Full Course - Beginner to Pro',
        channel: 'Programming with Mosh',
        url: 'https://youtube.com/watch?v=G3e-cpL7ofc',
        duration: '6 ساعات',
        description: 'دورة HTML و CSS شاملة من المبتديء إلى الاحتراف مع مشاريع عملية',
        level: 'مبتديء',
        type: 'course'
      },
      {
        title: 'HTML Crash Course For Absolute Beginners',
        channel: 'Traversy Media',
        url: 'https://youtube.com/watch?v=UB1O30fR-EE',
        duration: '1 ساعة',
        description: 'دورة HTML مكثفة للمبتدئين - كل الأساسيات في فيديو واحد',
        level: 'مبتديء',
        type: 'tutorial'
      }
    ],
    docs: [
      { title: 'MDN HTML Documentation', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML', provider: 'MDN Web Docs' },
      { title: 'W3Schools HTML Tutorial', url: 'https://www.w3schools.com/html/', provider: 'W3Schools' },
      { title: 'HTML Specification', url: 'https://html.spec.whatwg.org/', provider: 'WHATWG' }
    ],
    furtherReading: [
      { title: 'HTML Living Standard', url: 'https://html.spec.whatwg.org/multipage/', type: 'Specification' },
      { title: 'web.dev HTML Guide', url: 'https://web.dev/learn/html/', type: 'Tutorial' },
      { title: 'HTML Best Practices', url: 'https://github.com/hail2u/html-best-practices', type: 'Guide' }
    ]
  },
  css: {
    topic: 'CSS',
    videos: [
      {
        title: 'CSS Full Course - Beginner to Advanced',
        channel: 'freeCodeCamp.org',
        url: 'https://youtube.com/watch?v=ieTHC78giGQ',
        duration: '6 ساعات',
        description: 'دورة CSS كاملة من freeCodeCamp تغطي Flexbox, Grid, Animations, Responsive Design',
        level: 'مبتديء',
        type: 'course'
      },
      {
        title: 'CSS Crash Course For Absolute Beginners',
        channel: 'Traversy Media',
        url: 'https://youtube.com/watch?v=yfoY53QXEnI',
        duration: '1.5 ساعة',
        description: 'دورة CSS مكثفة للمبتدئين - تعلم CSS بسرعة',
        level: 'مبتديء',
        type: 'tutorial'
      },
      {
        title: 'Kevin Powell CSS Tutorials',
        channel: 'Kevin Powell',
        url: 'https://youtube.com/@KevinPowell',
        duration: 'قناة كاملة',
        description: 'أفضل قناة لتعلم CSS - من الأساسيات إلى التقنيات المتقدمة',
        level: 'جميع المستويات',
        type: 'channel'
      },
      {
        title: 'CSS Flexbox & Grid Full Course',
        channel: 'Web Dev Simplified',
        url: 'https://youtube.com/watch?v=3elGSZSWTbM',
        duration: '2 ساعة',
        description: 'شرح كامل لـ Flexbox و Grid مع أمثلة عملية',
        level: 'متوسط',
        type: 'tutorial'
      }
    ],
    docs: [
      { title: 'MDN CSS Documentation', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS', provider: 'MDN Web Docs' },
      { title: 'CSS Tricks Guide', url: 'https://css-tricks.com/guides/', provider: 'CSS-Tricks' },
      { title: 'W3Schools CSS Tutorial', url: 'https://www.w3schools.com/css/', provider: 'W3Schools' }
    ],
    furtherReading: [
      { title: 'web.dev Learn CSS', url: 'https://web.dev/learn/css/', type: 'Tutorial' },
      { title: 'CSS Reference by Codrops', url: 'https://tympanus.net/codrops/css_reference/', type: 'Reference' },
      { title: 'Can I Use', url: 'https://caniuse.com/', type: 'Browser Support' }
    ]
  },
  javascript: {
    topic: 'JavaScript',
    videos: [
      {
        title: 'JavaScript Full Course (8 Hours)',
        channel: 'freeCodeCamp.org',
        url: 'https://youtube.com/watch?v=PkZNo7MFNFg',
        duration: '8 ساعات',
        description: 'دورة JavaScript كاملة - من الصفر إلى بناء تطبيقات',
        level: 'مبتديء',
        type: 'course'
      },
      {
        title: 'JavaScript Programming - Full Course',
        channel: 'freeCodeCamp.org',
        url: 'https://youtube.com/watch?v=jS4aFq5-91M',
        duration: '7 ساعات',
        description: 'دورة برمجة JavaScript شاملة مع تمارين عملية',
        level: 'مبتديء',
        type: 'course'
      },
      {
        title: 'JavaScript Crash Course for Beginners',
        channel: 'Traversy Media',
        url: 'https://youtube.com/watch?v=hdI2bqOjy3c',
        duration: '1.5 ساعة',
        description: 'دورة JavaScript مكثفة تغطي الأساسيات بسرعة',
        level: 'مبتديء',
        type: 'tutorial'
      },
      {
        title: 'JavaScript Full Course - The Net Ninja',
        channel: 'The Net Ninja',
        url: 'https://youtube.com/playlist?list=PL4cUxeGkcC9haFPT7J25Q9GRB_ZkFrQAc',
        duration: 'قائمة تشغيل كاملة',
        description: 'دورة JavaScript شاملة من The Net Ninja - أكثر من 70 فيديو',
        level: 'مبتديء',
        type: 'course'
      },
      {
        title: 'Namaste JavaScript (Akshay Saini)',
        channel: 'Akshay Saini',
        url: 'https://youtube.com/playlist?list=PLlasXeu85E9cQ32gLCvAvr9vNaUccPVNP',
        duration: 'قائمة تشغيل كاملة',
        description: 'دورة عميقة في JavaScript - فهم كيف يعمل JS تحت الغطاء',
        level: 'متقدم',
        type: 'course'
      },
      {
        title: 'JavaScript ES6+ Full Course',
        channel: 'Web Dev Simplified',
        url: 'https://youtube.com/watch?v=NCwa_xi0Uuc',
        duration: '1 ساعة',
        description: 'كل ما تحتاج معرفته عن JavaScript ES6+ في فيديو واحد',
        level: 'متوسط',
        type: 'tutorial'
      }
    ],
    docs: [
      { title: 'MDN JavaScript Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide', provider: 'MDN Web Docs' },
      { title: 'JavaScript.info', url: 'https://javascript.info/', provider: 'JavaScript.info' },
      { title: 'ECMAScript Specification', url: 'https://tc39.es/ecma262/', provider: 'TC39' },
      { title: 'W3Schools JavaScript', url: 'https://www.w3schools.com/js/', provider: 'W3Schools' }
    ],
    furtherReading: [
      { title: 'You Don\'t Know JS (Book Series)', url: 'https://github.com/getify/You-Dont-Know-JS', type: 'Book' },
      { title: 'Eloquent JavaScript (Free Book)', url: 'https://eloquentjavascript.net/', type: 'Book' },
      { title: 'JS Style Guide - Airbnb', url: 'https://github.com/airbnb/javascript', type: 'Guide' },
      { title: 'Clean Code JavaScript', url: 'https://github.com/ryanmcdermott/clean-code-javascript', type: 'Guide' }
    ]
  },
  typescript: {
    topic: 'TypeScript',
    videos: [
      {
        title: 'TypeScript Full Course for Beginners',
        channel: 'freeCodeCamp.org',
        url: 'https://youtube.com/watch?v=gp5H0Vw39yw',
        duration: '5 ساعات',
        description: 'دورة TypeScript كاملة للمبتدئين من freeCodeCamp',
        level: 'مبتديء',
        type: 'course'
      },
      {
        title: 'TypeScript Tutorial - The Net Ninja',
        channel: 'The Net Ninja',
        url: 'https://youtube.com/playlist?list=PL4cUxeGkcC9gUgr39QZMW1oumbK9dbEl9',
        duration: 'قائمة تشغيل كاملة',
        description: 'دورة TypeScript شاملة - أكثر من 50 فيديو من الأساسيات إلى المتقدم',
        level: 'مبتديء',
        type: 'course'
      },
      {
        title: 'TypeScript Crash Course',
        channel: 'Traversy Media',
        url: 'https://youtube.com/watch?v=BCg4U1FzODs',
        duration: '1 ساعة',
        description: 'دورة TypeScript مكثفة للمبتدئين',
        level: 'مبتديء',
        type: 'tutorial'
      }
    ],
    docs: [
      { title: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/', provider: 'TypeScript' },
      { title: 'TypeScript Playground', url: 'https://www.typescriptlang.org/play/', provider: 'TypeScript' },
      { title: 'TypeScript Deep Dive', url: 'https://basarat.gitbook.io/typescript/', provider: 'GitBook' }
    ],
    furtherReading: [
      { title: 'TypeScript Design Patterns', url: 'https://github.com/torokmark/design_patterns_in_typescript', type: 'Guide' },
      { title: 'React TypeScript Cheatsheet', url: 'https://react-typescript-cheatsheet.netlify.app/', type: 'Cheatsheet' },
      { title: 'TypeScript Exercises', url: 'https://typescript-exercises.github.io/', type: 'Exercises' }
    ]
  },
  react: {
    topic: 'React',
    videos: [
      {
        title: 'React Full Course for Beginners',
        channel: 'freeCodeCamp.org',
        url: 'https://youtube.com/watch?v=w7ejDZ8SWv8',
        duration: '10 ساعات',
        description: 'دورة React كاملة من freeCodeCamp - بناء تطبيقات ويب حديثة',
        level: 'مبتديء',
        type: 'course'
      },
      {
        title: 'React Tutorial - The Net Ninja',
        channel: 'The Net Ninja',
        url: 'https://youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d',
        duration: 'قائمة تشغيل كاملة',
        description: 'أفضل دورة React على YouTube - أكثر من 70 فيديو',
        level: 'مبتديء',
        type: 'course'
      },
      {
        title: 'React JS Crash Course 2024',
        channel: 'Traversy Media',
        url: 'https://youtube.com/watch?v=LDB4uaJ87e0',
        duration: '2 ساعة',
        description: 'دورة React مكثفة مع مشروع عملي',
        level: 'مبتديء',
        type: 'tutorial'
      },
      {
        title: 'React for Beginners - Dave Gray',
        channel: 'Dave Gray',
        url: 'https://youtube.com/playlist?list=PL0Zuz27SZ-6PrE9srvEn8nbhOOyxnWXfp',
        duration: 'قائمة تشغيل كاملة',
        description: 'دورة React للمبتدئين مع مشاريع تطبيقية',
        level: 'مبتديء',
        type: 'course'
      },
      {
        title: 'React Hooks Tutorial - Codevolution',
        channel: 'Codevolution',
        url: 'https://youtube.com/playlist?list=PLC3y8-rFHvwisvxhZ135p4Xa1S3lqAHdQ',
        duration: 'قائمة تشغيل كاملة',
        description: 'شرح كل React Hooks بالتفصيل مع أمثلة',
        level: 'متوسط',
        type: 'tutorial'
      }
    ],
    docs: [
      { title: 'React Official Docs', url: 'https://react.dev/', provider: 'React' },
      { title: 'React Beta Docs', url: 'https://react.dev/learn', provider: 'React' },
      { title: 'Vite Guide', url: 'https://vitejs.dev/guide/', provider: 'Vite' }
    ],
    furtherReading: [
      { title: 'React Patterns', url: 'https://reactpatterns.com/', type: 'Guide' },
      { title: 'Awesome React', url: 'https://github.com/enaqx/awesome-react', type: 'Resources' },
      { title: 'React TypeScript Cheatsheet', url: 'https://react-typescript-cheatsheet.netlify.app/', type: 'Cheatsheet' }
    ]
  },
  nodejs: {
    topic: 'Node.js',
    videos: [
      {
        title: 'Node.js Full Course for Beginners',
        channel: 'freeCodeCamp.org',
        url: 'https://youtube.com/watch?v=Oe421EPjeBE',
        duration: '6 ساعات',
        description: 'دورة Node.js كاملة - بناء REST APIs وتطبيقات خلفية',
        level: 'مبتديء',
        type: 'course'
      },
      {
        title: 'Node.js Crash Course',
        channel: 'Traversy Media',
        url: 'https://youtube.com/watch?v=fBNz5xF-Kx4',
        duration: '1.5 ساعة',
        description: 'دورة Node.js مكثفة للمبتدئين',
        level: 'مبتديء',
        type: 'tutorial'
      },
      {
        title: 'Node.js Tutorial - The Net Ninja',
        channel: 'The Net Ninja',
        url: 'https://youtube.com/playlist?list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU',
        duration: 'قائمة تشغيل كاملة',
        description: 'دورة Node.js شاملة من The Net Ninja',
        level: 'مبتديء',
        type: 'course'
      },
      {
        title: 'Node.js / Express Course - Dave Gray',
        channel: 'Dave Gray',
        url: 'https://youtube.com/playlist?list=PL0Zuz27SZ-6PFkIxaJ6IUxZ7cO1qwpAaM',
        duration: 'قائمة تشغيل كاملة',
        description: 'بناء APIs احترافية مع Express و Node.js',
        level: 'متوسط',
        type: 'course'
      }
    ],
    docs: [
      { title: 'Node.js Official Docs', url: 'https://nodejs.org/docs/latest/api/', provider: 'Node.js' },
      { title: 'Express.js Guide', url: 'https://expressjs.com/en/guide/routing.html', provider: 'Express' },
      { title: 'npm Documentation', url: 'https://docs.npmjs.com/', provider: 'npm' }
    ],
    furtherReading: [
      { title: 'Node.js Best Practices', url: 'https://github.com/goldbergyoni/nodebestpractices', type: 'Guide' },
      { title: 'Node.js Design Patterns (Book)', url: 'https://www.nodejsdesignpatterns.com/', type: 'Book' },
      { title: 'Awesome Node.js', url: 'https://github.com/sindresorhus/awesome-nodejs', type: 'Resources' }
    ]
  },
  python: {
    topic: 'Python',
    videos: [
      {
        title: 'Python Full Course for Beginners',
        channel: 'freeCodeCamp.org',
        url: 'https://youtube.com/watch?v=rfscVS0vtbw',
        duration: '4 ساعات',
        description: 'دورة Python كاملة من freeCodeCamp - تعلم Python من الصفر',
        level: 'مبتديء',
        type: 'course'
      },
      {
        title: 'Python Tutorial - Corey Schafer',
        channel: 'Corey Schafer',
        url: 'https://youtube.com/playlist?list=PL-osiE80TeTt2d9bfVyTiXJA-UTHn6WwU',
        duration: 'قائمة تشغيل كاملة',
        description: 'أفضل دورة Python على YouTube - شرح عميق ومفصل',
        level: 'مبتديء',
        type: 'course'
      },
      {
        title: 'Python for Everybody Specialization',
        channel: 'freeCodeCamp.org / Dr. Chuck',
        url: 'https://youtube.com/watch?v=8DvywoWv6fI',
        duration: '14 ساعة',
        description: 'دورة Python للجميع - دورة جامعية كاملة مجاناً',
        level: 'مبتديء',
        type: 'course'
      },
      {
        title: 'Python Tutorial - Programming with Mosh',
        channel: 'Programming with Mosh',
        url: 'https://youtube.com/watch?v=_uQrJ0TkZlc',
        duration: '6 ساعات',
        description: 'دورة Python شاملة مع مشاريع عملية',
        level: 'مبتديء',
        type: 'course'
      },
      {
        title: 'Learn Python - Tech With Tim',
        channel: 'Tech With Tim',
        url: 'https://youtube.com/playlist?list=PLzMcBGfZo4-mFu00qxl0a67RhjjZjCNjL',
        duration: 'قائمة تشغيل كاملة',
        description: 'دورة Python تفاعلية للمبتدئين مع تمارين',
        level: 'مبتديء',
        type: 'course'
      },
      {
        title: 'Intermediate Python - Corey Schafer',
        channel: 'Corey Schafer',
        url: 'https://youtube.com/playlist?list=PL-osiE80TeTskrapNbzXhwoFUiLCjGgY7',
        duration: 'قائمة تشغيل كاملة',
        description: 'مفاهيم Python المتوسطة: Decorators, Generators, OOP',
        level: 'متوسط',
        type: 'course'
      }
    ],
    docs: [
      { title: 'Python Official Docs', url: 'https://docs.python.org/3/', provider: 'Python' },
      { title: 'Real Python', url: 'https://realpython.com/', provider: 'Real Python' },
      { title: 'Python Package Index (PyPI)', url: 'https://pypi.org/', provider: 'PyPI' }
    ],
    furtherReading: [
      { title: 'Automate the Boring Stuff (Free Book)', url: 'https://automatetheboringstuff.com/', type: 'Book' },
      { title: 'Python Crash Course (Book)', url: 'https://nostarch.com/pythoncrashcourse2e', type: 'Book' },
      { title: 'PEP 8 - Style Guide', url: 'https://peps.python.org/pep-0008/', type: 'Guide' },
      { title: 'Awesome Python', url: 'https://github.com/vinta/awesome-python', type: 'Resources' }
    ]
  },
  sql: {
    topic: 'SQL & Databases',
    videos: [
      {
        title: 'SQL Full Course - Database Fundamentals',
        channel: 'freeCodeCamp.org',
        url: 'https://youtube.com/watch?v=HXV3zeQKqGY',
        duration: '4 ساعات',
        description: 'دورة SQL كاملة من freeCodeCamp - أساسيات قواعد البيانات',
        level: 'مبتديء',
        type: 'course'
      },
      {
        title: 'SQL Tutorial for Beginners',
        channel: 'Programming with Mosh',
        url: 'https://youtube.com/watch?v=7S_tz1z_5bA',
        duration: '3 ساعات',
        description: 'دورة SQL شاملة للمبتدئين مع تمارين عملية',
        level: 'مبتديء',
        type: 'course'
      },
      {
        title: 'Advanced SQL Tutorial',
        channel: 'freeCodeCamp.org',
        url: 'https://youtube.com/watch?v=2-1XQHAgDsM',
        duration: '3 ساعات',
        description: 'مفاهيم SQL المتقدمة - Joins, Subqueries, Window Functions',
        level: 'متقدم',
        type: 'course'
      },
      {
        title: 'Database Engineering - Hussein Nasser',
        channel: 'Hussein Nasser',
        url: 'https://youtube.com/c/HusseinNasser-software-engineering',
        duration: 'قناة كاملة',
        description: 'قناة متخصصة في هندسة قواعد البيانات - شرح عميق للمفاهيم',
        level: 'متقدم',
        type: 'channel'
      },
      {
        title: 'SQL & Database Design - Amigoscode',
        channel: 'Amigoscode',
        url: 'https://youtube.com/watch?v=5hzZtqCNQfs',
        duration: '2 ساعة',
        description: 'SQL وتصميم قواعد البيانات بطريقة عملية',
        level: 'مبتديء',
        type: 'tutorial'
      }
    ],
    docs: [
      { title: 'PostgreSQL Documentation', url: 'https://www.postgresql.org/docs/', provider: 'PostgreSQL' },
      { title: 'SQLite Documentation', url: 'https://www.sqlite.org/docs.html', provider: 'SQLite' },
      { title: 'MySQL Documentation', url: 'https://dev.mysql.com/doc/', provider: 'MySQL' },
      { title: 'MongoDB Documentation', url: 'https://www.mongodb.com/docs/', provider: 'MongoDB' }
    ],
    furtherReading: [
      { title: 'Use The Index, Luke', url: 'https://use-the-index-luke.com/', type: 'Guide' },
      { title: 'SQL Tutorial - Mode Analytics', url: 'https://mode.com/sql-tutorial/', type: 'Tutorial' },
      { title: 'Database Design - Entity Relationship', url: 'https://www.lucidchart.com/pages/er-diagrams', type: 'Guide' }
    ]
  },
  cybersecurity: {
    topic: 'الأمن السيبراني',
    videos: [
      {
        title: 'Cybersecurity Full Course for Beginners',
        channel: 'freeCodeCamp.org',
        url: 'https://youtube.com/watch?v=U_P23SqJaDc',
        duration: '6 ساعات',
        description: 'دورة الأمن السيبراني كاملة للمبتدئين من freeCodeCamp',
        level: 'مبتديء',
        type: 'course'
      },
      {
        title: 'Practical Ethical Hacking - Full Course',
        channel: 'The Cyber Mentor',
        url: 'https://youtube.com/watch?v=3Kq1MIfTWCE',
        duration: '12 ساعة',
        description: 'دورة اختبار الاختراق الأخلاقي كاملة - عملية 100%',
        level: 'متوسط',
        type: 'course'
      },
      {
        title: 'Cybersecurity For Beginners',
        channel: 'John Hammond',
        url: 'https://youtube.com/@JohnHammond010',
        duration: 'قناة كاملة',
        description: 'قناة متخصصة في الأمن السيبراني و CTF',
        level: 'مبتديء',
        type: 'channel'
      },
      {
        title: 'Web Security Course - David Bombal',
        channel: 'David Bombal',
        url: 'https://youtube.com/watch?v=3Kq1MIfTWCE',
        duration: '4 ساعات',
        description: 'دورة أمن تطبيقات الويب مع Kali Linux',
        level: 'متوسط',
        type: 'course'
      }
    ],
    docs: [
      { title: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/', provider: 'OWASP' },
      { title: 'PortSwigger Web Security Academy', url: 'https://portswigger.net/web-security', provider: 'PortSwigger' },
      { title: 'NIST Cybersecurity Framework', url: 'https://www.nist.gov/cyberframework', provider: 'NIST' }
    ],
    furtherReading: [
      { title: 'The Web Application Hacker\'s Handbook', url: 'https://www.amazon.com/Web-Application-Hackers-Handbook-Exploiting/dp/1118026470', type: 'Book' },
      { title: 'TryHackMe - Learn Cyber Security', url: 'https://tryhackme.com/', type: 'Platform' },
      { title: 'Hack The Box', url: 'https://www.hackthebox.com/', type: 'Platform' },
      { title: 'Pentest Bible', url: 'https://github.com/blaCCkHatHacEEkr/PENTESTING-BIBLE', type: 'Resources' }
    ]
  },
  git: {
    topic: 'Git & GitHub',
    videos: [
      {
        title: 'Git Full Course for Beginners',
        channel: 'freeCodeCamp.org',
        url: 'https://youtube.com/watch?v=RGOj5yH7evk',
        duration: '5 ساعات',
        description: 'دورة Git كاملة من freeCodeCamp - من الصفر إلى الاحتراف',
        level: 'مبتديء',
        type: 'course'
      },
      {
        title: 'Git & GitHub Crash Course',
        channel: 'Traversy Media',
        url: 'https://youtube.com/watch?v=SWYqp7iY_Tc',
        duration: '1 ساعة',
        description: 'دورة Git و GitHub مكثفة للمبتدئين',
        level: 'مبتديء',
        type: 'tutorial'
      },
      {
        title: 'Git Tutorial - The Net Ninja',
        channel: 'The Net Ninja',
        url: 'https://youtube.com/playlist?list=PL4cUxeGkcC9goXbgTDQ0n_iksTB3po7fM',
        duration: 'قائمة تشغيل كاملة',
        description: 'دورة Git شاملة من The Net Ninja - أكثر من 40 فيديو',
        level: 'مبتديء',
        type: 'course'
      }
    ],
    docs: [
      { title: 'Git Official Documentation', url: 'https://git-scm.com/doc', provider: 'Git' },
      { title: 'GitHub Docs', url: 'https://docs.github.com/', provider: 'GitHub' },
      { title: 'Git Book (Pro Git)', url: 'https://git-scm.com/book/en/v2', provider: 'Git' }
    ],
    furtherReading: [
      { title: 'Oh Shit, Git!?!', url: 'https://ohshitgit.com/', type: 'Guide' },
      { title: 'Git Flow Guide', url: 'https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow', type: 'Tutorial' },
      { title: 'Conventional Commits', url: 'https://www.conventionalcommits.org/', type: 'Standard' }
    ]
  },
  networking: {
    topic: 'الشبكات',
    videos: [
      {
        title: 'Computer Networking Full Course',
        channel: 'freeCodeCamp.org',
        url: 'https://youtube.com/watch?v=qiQR5rTSshw',
        duration: '9 ساعات',
        description: 'دورة شبكات الحاسوب كاملة من freeCodeCamp',
        level: 'مبتديء',
        type: 'course'
      },
      {
        title: 'NetworkChuck Tutorials',
        channel: 'NetworkChuck',
        url: 'https://youtube.com/@NetworkChuck',
        duration: 'قناة كاملة',
        description: 'أفضل قناة لتعلم الشبكات - شرح مبسط وممتع',
        level: 'مبتديء',
        type: 'channel'
      },
      {
        title: 'Professor Messer Network+',
        channel: 'Professor Messer',
        url: 'https://youtube.com/@professormesser',
        duration: 'قناة كاملة',
        description: 'دورة CompTIA Network+ كاملة مجاناً',
        level: 'متوسط',
        type: 'course'
      },
      {
        title: 'Practical Networking',
        channel: 'Practical Networking',
        url: 'https://youtube.com/@PracticalNetworking',
        duration: 'قناة كاملة',
        description: 'شبكات عملية مع شرح مفصل للبروتوكولات',
        level: 'متوسط',
        type: 'channel'
      }
    ],
    docs: [
      { title: 'Computer Networking: Principles and Protocols', url: 'https://www.computer-networking.info/', provider: 'Academic' },
      { title: 'Cisco Networking Academy', url: 'https://www.netacad.com/', provider: 'Cisco' },
      { title: 'RFC Editor', url: 'https://www.rfc-editor.org/', provider: 'IETF' }
    ],
    furtherReading: [
      { title: 'HTTP: The Definitive Guide', url: 'https://www.amazon.com/HTTP-Definitive-Guide-David-Gourley/dp/1565925092', type: 'Book' },
      { title: 'High Performance Browser Networking', url: 'https://hpbn.co/', type: 'Book' },
      { title: 'Computer Networking: A Top-Down Approach', url: 'https://www.amazon.com/Computer-Networking-Top-Down-Approach-8th/dp/0136681551', type: 'Book' }
    ]
  },
  linux: {
    topic: 'Linux',
    videos: [
      {
        title: 'Linux Operating System Full Course',
        channel: 'freeCodeCamp.org',
        url: 'https://youtube.com/watch?v=ROjZy1Z-eVw',
        duration: '6 ساعات',
        description: 'دورة Linux كاملة من freeCodeCamp',
        level: 'مبتديء',
        type: 'course'
      },
      {
        title: 'Learn Linux TV',
        channel: 'Learn Linux TV',
        url: 'https://youtube.com/@LearnLinuxTV',
        duration: 'قناة كاملة',
        description: 'قناة متخصصة في Linux و DevOps',
        level: 'مبتديء',
        type: 'channel'
      },
      {
        title: 'Linux for Beginners - NetworkChuck',
        channel: 'NetworkChuck',
        url: 'https://youtube.com/watch?v=U1w4TlB1e2E',
        duration: '1 ساعة',
        description: 'Linux للمبتدئين - دورة مكثفة',
        level: 'مبتديء',
        type: 'tutorial'
      }
    ],
    docs: [
      { title: 'Linux Documentation Project', url: 'https://www.tldp.org/', provider: 'TLDP' },
      { title: 'Ubuntu Documentation', url: 'https://help.ubuntu.com/', provider: 'Ubuntu' },
      { title: 'The Linux Kernel Archives', url: 'https://www.kernel.org/doc/', provider: 'Kernel' }
    ],
    furtherReading: [
      { title: 'Linux Command Line (Book)', url: 'https://linuxcommand.org/tlcl.php', type: 'Book' },
      { title: 'The Linux Programming Interface', url: 'https://man7.org/tlpi/', type: 'Book' },
      { title: 'Linux Journey', url: 'https://linuxjourney.com/', type: 'Tutorial' }
    ]
  },
  cs: {
    topic: 'علوم الحاسوب',
    videos: [
      {
        title: 'CS50 Full Computer Science Course',
        channel: 'CS50',
        url: 'https://youtube.com/watch?v=8mAITcNt710',
        duration: '24 ساعة',
        description: 'أفضل دورة علوم حاسوب في العالم - من جامعة هارفارد مجاناً',
        level: 'مبتديء',
        type: 'course'
      },
      {
        title: 'MIT 6.0001 - Introduction to Computer Science',
        channel: 'MIT OpenCourseWare',
        url: 'https://youtube.com/watch?v=nykOeWgQcHM',
        duration: '40 ساعة',
        description: 'دورة مقدمة في علوم الحاسوب من MIT - مستوى جامعي',
        level: 'متوسط',
        type: 'course'
      },
      {
        title: 'Data Structures Full Course',
        channel: 'freeCodeCamp.org',
        url: 'https://youtube.com/watch?v=RBSGKlAvoiM',
        duration: '8 ساعات',
        description: 'دورة هياكل البيانات كاملة - أساسية لكل مبرمج',
        level: 'متوسط',
        type: 'course'
      },
      {
        title: 'Algorithms Full Course',
        channel: 'freeCodeCamp.org',
        url: 'https://youtube.com/watch?v=8hly31xKli0',
        duration: '5 ساعات',
        description: 'دورة الخوارزميات كاملة مع تحليل التعقيد',
        level: 'متوسط',
        type: 'course'
      },
      {
        title: 'Stanford CS Lecture Series',
        channel: 'Stanford Online',
        url: 'https://youtube.com/@stanfordonline',
        duration: 'قناة كاملة',
        description: 'محاضرات جامعة ستانفورد في علوم الحاسوب',
        level: 'متقدم',
        type: 'channel'
      }
    ],
    docs: [
      { title: 'CS50x Course Materials', url: 'https://cs50.harvard.edu/x/', provider: 'Harvard' },
      { title: 'MIT OpenCourseWare', url: 'https://ocw.mit.edu/', provider: 'MIT' },
      { title: 'Khan Academy Computing', url: 'https://www.khanacademy.org/computing', provider: 'Khan Academy' }
    ],
    furtherReading: [
      { title: 'Structure and Interpretation of Computer Programs', url: 'https://mitpress.mit.edu/sites/default/files/sicp/index.html', type: 'Book' },
      { title: 'The Algorithm Design Manual', url: 'https://www.algorist.com/', type: 'Book' },
      { title: 'Introduction to Algorithms (CLRS)', url: 'https://mitpress.mit.edu/books/introduction-algorithms-third-edition', type: 'Book' },
      { title: 'Clean Code (Robert C. Martin)', url: 'https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882', type: 'Book' }
    ]
  }
};

export default videoResources;
export const getVideoResources = (topic) => videoResources[topic] || null;
