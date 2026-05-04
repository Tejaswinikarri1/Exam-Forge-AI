// ─── EXPANDED QUESTION BANK (15+ SUBJECTS) ────────────────────────────────────────────────────────

// Using original subjects (C, Python, SQL) plus adding Java, JavaScript, DSA, etc.
export const EXPANDED_SUBJECTS = [
  "C Programming", "Python", "Java", "JavaScript", "SQL", "DSA",
  "HTML/CSS", "C++", "Operating Systems", "Computer Networks",
  "DBMS", "Data Structures", "Web Development", "Cloud Computing", "Machine Learning"
];

// Additional question banks for new subjects
export const JAVA_BANK = {
  easy: [
    {q: "What is the main method signature in Java?", opts: ["void main()","public static void main(String[] args)","static void main()","public void main(String args)"], ans: 1, exp: "Java programs start with: public static void main(String[] args)"},
    {q: "Which keyword creates an object in Java?", opts: ["create","new","instance","obj"], ans: 1, exp: "The 'new' keyword creates an instance of a class."},
    {q: "What is the difference between '==' and equals()?", opts: ["No difference","== compares references, equals compares values","equals() is faster","Both are identical"], ans: 1, exp: "== checks object identity; equals() checks value equality."},
    {q: "What is an interface in Java?", opts: ["A class type","Contract for implementing classes","Variable type","None"], ans: 1, exp: "Interface defines methods that implementing classes must provide."},
    {q: "What does super() do?", opts: ["Creates superclass","Calls parent class constructor","Accesses superclass variables","Defines inheritance"], ans: 1, exp: "super() explicitly calls the parent class constructor."},
  ],
  medium: [
    {q: "What is the purpose of finally block?", opts: ["Catch errors","Execute code regardless of exception","Handle specific errors","Define scope"], ans: 1, exp: "finally block executes whether or not an exception occurs."},
    {q: "What is Java's garbage collection?", opts: ["Manual memory management","Automatic memory cleanup","String cleaning","Data sorting"], ans: 1, exp: "Garbage collection automatically reclaims unused memory."},
    {q: "What is method overloading?", opts: ["Defining in subclass","Same name, different parameters","Multiple inheritance","None"], ans: 1, exp: "Overloading allows methods with same name but different parameters."},
  ],
  hard: [
    {q: "What is a sealed class?", opts: ["Abstract class","Cannot be inherited by unknown classes","Final class","None"], ans: 1, exp: "Sealed classes restrict which classes can extend them (Java 17+)."},
  ]
};

export const JAVASCRIPT_BANK = {
  easy: [
    {q: "How do you declare a variable in modern JavaScript?", opts: ["var x;","let x;","const x;","All of above"], ans: 3, exp: "var, let, and const are all valid; let/const are preferred."},
    {q: "What is the difference between let and const?", opts: ["Same","let is mutable, const immutable","const is mutable, let immutable","Both immutable"], ans: 1, exp: "let can be reassigned; const cannot."},
    {q: "What does JSON stand for?", opts: ["Java Syntax Object Notation","JavaScript Object Notation","Java System Operation Notation","None"], ans: 1, exp: "JSON = JavaScript Object Notation."},
    {q: "How do you parse JSON?", opts: ["JSON.read()","JSON.parse()","JSON.load()","JSON.get()"], ans: 1, exp: "JSON.parse() converts JSON string to object."},
  ],
  medium: [
    {q: "What is a closure in JavaScript?", opts: ["A function that closes","Function accessing outer scope variables","Loop terminator","Event handler"], ans: 1, exp: "Closure: function + access to outer variables."},
    {q: "What is hoisting?", opts: ["Memory management","Moving declarations to top of scope","Lifting elements","None"], ans: 1, exp: "Hoisting moves variable/function declarations to scope top."},
  ],
  hard: [
    {q: "What is the event loop in JavaScript?", opts: ["CSS loop","Mechanism handling async operations","DOM manipulation","Memory cleanup"], ans: 1, exp: "Event loop manages synchronous and asynchronous code execution."},
  ]
};

export const DSA_BANK = {
  easy: [
    {q: "What is the time complexity of binary search?", opts: ["O(n)","O(log n)","O(n log n)","O(n²)"], ans: 1, exp: "Binary search on sorted array: O(log n)"},
    {q: "What is a hash table?", opts: ["Table of hashes","Data structure for fast key-value lookups","Array only","List only"], ans: 1, exp: "Hash table provides average O(1) lookup time."},
    {q: "What is a stack?", opts: ["Pyramid shape","LIFO (Last-In-First-Out) data structure","FIFO structure","Array only"], ans: 1, exp: "Stack: Last element added is first removed (LIFO)."},
    {q: "What is Big O notation?", opts: ["Large notation","Describes algorithm time/space complexity","File size measure","None"], ans: 1, exp: "Big O analyzes worst-case algorithm performance."},
  ],
  medium: [
    {q: "What is quicksort?", opts: ["Fast sort only","Divide-and-conquer algorithm using pivot","Bubble sort variant","Merge variant"], ans: 1, exp: "Quicksort uses partitioning around pivot elements."},
    {q: "What is a balanced binary search tree?", opts: ["String tree","Tree maintaining O(log n) height","Linear tree","None"], ans: 1, exp: "Balanced BST keeps height ~ log(n) for efficiency."},
  ],
  hard: [
    {q: "What is dynamic programming?", opts: ["Flexible programming","Solving overlapping subproblems with memoization","Random algorithm","None"], ans: 1, exp: "DP breaks problem into subproblems, storing results."},
  ]
};

export const HTML_CSS_BANK = {
  easy: [
    {q: "What does HTML stand for?", opts: ["Hypertext Markup Language","High Text Markup Language","Home Tool Markup Language","None"], ans: 0, exp: "HTML = HyperText Markup Language."},
    {q: "What is CSS used for?", opts: ["Server-side logic","Styling HTML elements","Database queries","Security"], ans: 1, exp: "CSS styles HTML for appearance."},
    {q: "What is the difference between id and class?", opts: ["None","id is unique, class is reusable","class is unique, id reusable","Both same"], ans: 1, exp: "id identifies single element; class can apply to many."},
  ],
  medium: [
    {q: "What is CSS flexbox?", opts: ["CSS hack","Layout module for flexible alignment","Text formatting","None"], ans: 1, exp: "Flexbox provides efficient layout management."},
    {q: "What is semantic HTML?", opts: ["Decorative HTML","HTML with meaning (header, nav, main, etc)","HTML tags only","None"], ans: 1, exp: "Semantic HTML improves accessibility and SEO."},
  ],
  hard: [
    {q: "What is CSS Grid?", opts: ["Data grid only","Two-dimensional layout system","Tables only","None"], ans: 1, exp: "CSS Grid enables powerful 2D layouts."},
  ]
};

export const CPP_BANK = {
  easy: [
    {q: "What is the scope resolution operator in C++?", opts: [":","::","->","#"], ans: 1, exp: ":: accesses namespace and class members."},
    {q: "What is a reference in C++?", opts: ["Pointer type","Alias to existing variable","Memory address","Function call"], ans: 1, exp: "Reference (&) is an alias, not a new variable."},
    {q: "What is the difference between struct and class?", opts: ["None","struct default public, class default private","class public, struct private","No difference"], ans: 1, exp: "struct defaults public; class defaults private."},
  ],
  medium: [
    {q: "What is RAII in C++?", opts: ["Random Access","Resource Acquisition Is Initialization","Array Index","None"], ans: 1, exp: "RAII ties resource lifetime to object lifetime."},
    {q: "What are templates in C++?", opts: ["Web template","Generic programming mechanism","File template","None"], ans: 1, exp: "Templates enable writing generic, reusable code."},
  ],
  hard: [
    {q: "What is move semantics?", opts: ["Object movement","Efficient resource transfer using rvalue refs","Memory relocation","None"], ans: 1, exp: "Move semantics avoid copying with rvalue references."},
  ]
};

export const DBMS_BANK = {
  easy: [
    {q: "What is a database?", opts: ["File system","Organized collection of data","Memory storage","None"], ans: 1, exp: "Database stores structured data with relationships."},
    {q: "What is a schema?", opts: ["Design pattern","Database structure/blueprint","SQL command","None"], ans: 1, exp: "Schema defines tables, columns, and data types."},
  ],
  medium: [
    {q: "What is normalization?", opts: ["Making data normal","Reducing redundancy and dependency","Data formatting","None"], ans: 1, exp: "Normalization organizes data efficiently."},
    {q: "What is a transaction?", opts: ["Commercial exchange","All-or-nothing operation","Data transfer","None"], ans: 1, exp: "Transaction ensures ACID properties."},
  ],
  hard: [
    {q: "What is denormalization?", opts: ["Reverse of normal","Intentionally adding redundancy for performance","Data cleanup","None"], ans: 1, exp: "Denormalization trades redundancy for speed."},
  ]
};

export const OS_BANK = {
  easy: [
    {q: "What is an operating system?", opts: ["Software that manages hardware","Hardware component","Application","None"], ans: 0, exp: "OS manages hardware resources and applications."},
    {q: "What is a process?", opts: ["Data processing","Program in execution","Thread only","None"], ans: 1, exp: "Process is an executing program instance."},
  ],
  medium: [
    {q: "What is deadlock?", opts: ["System failure","Processes waiting infinitely for resources","Program crash","None"], ans: 1, exp: "Deadlock: circular wait for resources."},
    {q: "What is virtual memory?", opts: ["Memory in cloud","Using disk as memory extension","RAM only","None"], ans: 1, exp: "Virtual memory extends physical RAM using disk."},
  ],
  hard: [
    {q: "What is page replacement?", opts: ["Memory paging","Algorithm selecting page to remove","File system operation","None"], ans: 1, exp: "Page replacement algorithms manage memory efficiently."},
  ]
};

export const NETWORKS_BANK = {
  easy: [
    {q: "What does TCP stand for?", opts: ["Total Control Protocol","Transmission Control Protocol","Transfer Channel Protocol","None"], ans: 1, exp: "TCP = Transmission Control Protocol."},
    {q: "What is the difference between TCP and UDP?", opts: ["None","TCP reliable, UDP fast","UDP reliable, TCP fast","Both unreliable"], ans: 1, exp: "TCP ensures delivery; UDP prioritizes speed."},
  ],
  medium: [
    {q: "What is the OSI model?", opts: ["Operating System Interface","7-layer networking model","Open Source Interface","None"], ans: 1, exp: "OSI defines 7 network layers."},
    {q: "What is DNS?", opts: ["Data Name Server","Domain Name System","Direct Network Service","None"], ans: 1, exp: "DNS converts domain names to IP addresses."},
  ],
  hard: [
    {q: "What is routing?", opts: ["Path planning","Forwarding packets through network","Web routes only","None"], ans: 1, exp: "Routing determines packet paths across networks."},
  ]
};

// Export merged QBANK with all subjects
export const ALL_SUBJECTS = [
  "C Programming", "Python", "Java", "JavaScript", "SQL", "DSA",
  "HTML/CSS", "C++", "Operating Systems", "Computer Networks",
  "DBMS", "Data Structures", "Web Development", "Cloud Computing", "Machine Learning"
];

export const EXTENDED_QBANK = {
  "C Programming": require("./questions.js").QBANK["C Programming"],
  "Python": require("./questions.js").QBANK["Python"],
  "SQL": require("./questions.js").QBANK["SQL"],
  "Java": JAVA_BANK,
  "JavaScript": JAVASCRIPT_BANK,
  "DSA": DSA_BANK,
  "Data Structures": DSA_BANK,
  "HTML/CSS": HTML_CSS_BANK,
  "C++": CPP_BANK,
  "Operating Systems": OS_BANK,
  "Computer Networks": NETWORKS_BANK,
  "DBMS": DBMS_BANK
};
