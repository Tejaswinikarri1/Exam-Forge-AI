// ─── FULL QUESTION BANK ────────────────────────────────────────────────────────
const QBANK = {
  "C Programming": {
    easy:[
      {q:"What is the correct syntax to declare an integer variable in C?",opts:["integer x;","int x;","var x: int;","x = int;"],ans:1,exp:"In C, integer variables are declared with the 'int' keyword followed by the variable name."},
      {q:"Which symbol is used to terminate a statement in C?",opts:[".",":",";"," "],ans:2,exp:"Every C statement ends with a semicolon (;)."},
      {q:"What does printf() do in C?",opts:["Reads input","Prints output to console","Declares variables","Allocates memory"],ans:1,exp:"printf() is a standard library function that prints formatted output to stdout."},
      {q:"What is the size of an int on a 32-bit system?",opts:["1 byte","2 bytes","4 bytes","8 bytes"],ans:2,exp:"On a 32-bit system, int is typically 4 bytes (32 bits)."},
      {q:"Which header file contains scanf() and printf()?",opts:["stdlib.h","string.h","stdio.h","math.h"],ans:2,exp:"stdio.h (Standard Input/Output) contains printf() and scanf() functions."},
      {q:"What does the & operator do in scanf()?",opts:["Dereferences pointer","Passes address of variable","Bitwise AND","Logical AND"],ans:1,exp:"& passes the memory address of the variable so scanf() can store the value there."},
      {q:"What is a pointer in C?",opts:["A type of loop","A variable that stores a memory address","A function","A constant"],ans:1,exp:"A pointer is a variable that holds the memory address of another variable."},
      {q:"What does return 0 mean in main()?",opts:["Error occurred","Program terminated successfully","Loop exit","Memory freed"],ans:1,exp:"Returning 0 from main() indicates the program executed successfully."},
      {q:"Which loop checks the condition before executing?",opts:["do-while","for","while","All of these"],ans:2,exp:"A while loop evaluates its condition before each iteration."},
      {q:"What is the output of printf(\"%d\", 5+3)?",opts:["5+3","8","53","Error"],ans:1,exp:"%d prints an integer; 5+3 evaluates to 8."},
    ],
    medium:[
      {q:"What does the * operator do when used with a pointer?",opts:["Multiplies","Declares pointer","Dereferences — accesses value at address","Address-of"],ans:2,exp:"The * (dereference) operator accesses the value stored at the memory address the pointer holds."},
      {q:"What is a null pointer in C?",opts:["A pointer to zero","A pointer to no valid memory address","A dangling pointer","A void pointer"],ans:1,exp:"A null pointer (NULL) points to no valid memory location."},
      {q:"What is the difference between malloc() and calloc()?",opts:["No difference","malloc initializes to zero; calloc doesn't","calloc initializes to zero; malloc doesn't","calloc takes one argument"],ans:2,exp:"calloc initializes allocated memory to 0; malloc leaves memory uninitialized."},
      {q:"What is a segmentation fault?",opts:["Syntax error","Memory access violation","Division by zero","Stack overflow"],ans:1,exp:"Segfault occurs when a program accesses memory it doesn't have permission to access."},
      {q:"What is the purpose of free() in C?",opts:["Free stack memory","Deallocate heap-allocated memory","Clear variables","Reset pointers"],ans:1,exp:"free() releases dynamically allocated heap memory back to the OS."},
      {q:"What does sizeof() return?",opts:["Value of variable","Size in bytes of a type or variable","Number of elements","Memory address"],ans:1,exp:"sizeof() returns the size in bytes of a data type or variable."},
      {q:"What is a struct in C?",opts:["A function","A user-defined composite data type","A pointer type","A loop construct"],ans:1,exp:"struct is a user-defined data type grouping variables of different types under one name."},
      {q:"What is the arrow operator (->) used for?",opts:["Subtraction","Accessing struct member via pointer","Comparison","Bitwise operation"],ans:1,exp:"-> accesses a struct or union member through a pointer."},
      {q:"What does static mean for a local variable?",opts:["Makes it global","Preserves value between function calls","Makes it constant","Puts it on heap"],ans:1,exp:"A static local variable retains its value across multiple function calls."},
      {q:"What is a dangling pointer?",opts:["A NULL pointer","A pointer to freed memory","A void pointer","An uninitialized pointer"],ans:1,exp:"A dangling pointer points to memory that has already been freed/deallocated."},
    ],
    hard:[
      {q:"What is memory alignment and why does it matter?",opts:["Sorting memory","Data placed at addresses that match its size for CPU efficiency","Memory cleanup","Pointer arithmetic"],ans:1,exp:"Alignment places data at addresses that are multiples of their size, improving CPU access efficiency."},
      {q:"What is a union in C and how does it differ from struct?",opts:["Same as struct","All members share the same memory location","Union has methods","Union is larger"],ans:1,exp:"In a union, all members share the same memory; its size equals its largest member."},
      {q:"What is undefined behavior in C?",opts:["Compilation error","Behavior not defined by C standard — anything can happen","Runtime exception","Warnings only"],ans:1,exp:"Undefined behavior means the standard places no requirements on the outcome."},
      {q:"Explain the C memory layout: stack vs heap.",opts:["Same region","Stack: automatic LIFO; Heap: dynamic manual allocation","Heap is faster","Stack is unlimited"],ans:1,exp:"Stack stores local variables/frames automatically; heap stores dynamically allocated data via malloc/free."},
      {q:"What is the role of the linker in C compilation?",opts:["Parses source","Resolves symbol references across object files into executable","Optimizes code","Manages memory"],ans:1,exp:"The linker combines object files, resolves external references, and produces the final executable."},
    ]
  },
  "Python": {
    easy:[
      {q:"Which keyword defines a function in Python?",opts:["function","def","func","define"],ans:1,exp:"'def' keyword is used to define functions in Python."},
      {q:"Which operator performs integer division in Python?",opts:["/","//","%","**"],ans:1,exp:"// performs floor (integer) division in Python."},
      {q:"How do you create a list in Python?",opts:["{}","()","[]","<>"],ans:2,exp:"Square brackets [] create lists in Python."},
      {q:"What does len() return?",opts:["Prints length","Length of an object","Converts to list","Loops over elements"],ans:1,exp:"len() returns the number of items in an object."},
      {q:"Which character starts a comment in Python?",opts:["//","/*","#","--"],ans:2,exp:"# starts a single-line comment in Python."},
      {q:"What does print('Hello'[::-1]) output?",opts:["Hello","olleH","Error","None"],ans:1,exp:"[::-1] reverses the string."},
      {q:"What is None in Python?",opts:["Zero","False","Null/no value","Empty string"],ans:2,exp:"None represents the absence of value in Python."},
      {q:"Which collection type is ordered and mutable?",opts:["tuple","set","dict","list"],ans:3,exp:"Lists are ordered and mutable in Python."},
      {q:"What keyword exits a loop in Python?",opts:["exit","stop","break","end"],ans:2,exp:"'break' terminates the innermost loop."},
      {q:"What does type() return?",opts:["Value","Type of object","Size","Memory address"],ans:1,exp:"type() returns the type/class of an object."},
    ],
    medium:[
      {q:"What is a Python decorator?",opts:["CSS tool","Function that wraps another function","Class attribute","Loop modifier"],ans:1,exp:"Decorators modify/extend function behavior using the @syntax."},
      {q:"What does *args allow in a function?",opts:["Keyword arguments","Variable positional arguments","Default arguments","Required arguments"],ans:1,exp:"*args collects any number of positional arguments into a tuple."},
      {q:"What is a generator in Python?",opts:["Class factory","Function using yield","List comprehension","Dict builder"],ans:1,exp:"Generators use yield to produce values lazily one at a time."},
      {q:"What is the difference between == and 'is'?",opts:["No difference","== checks value; is checks identity","is checks value; == identity","Both check identity"],ans:1,exp:"== compares values; 'is' checks if both refer to the same object."},
      {q:"What does __init__ do?",opts:["Destroys object","Initializes new instance","Copies class","Imports modules"],ans:1,exp:"__init__ is the constructor called when a new object is created."},
      {q:"What is a list comprehension?",opts:["List method","Compact syntax to create lists from iterables","List copy","List sort"],ans:1,exp:"List comprehension: [expr for item in iterable if condition]."},
      {q:"What does the 'with' statement provide?",opts:["Loop control","Context management and automatic cleanup","Exception handling","Import management"],ans:1,exp:"'with' ensures resources are properly cleaned up via __enter__/__exit__."},
      {q:"What does zip() do?",opts:["Compresses files","Combines iterables element-wise into tuples","Sorts lists","Flattens lists"],ans:1,exp:"zip() pairs corresponding elements from multiple iterables."},
      {q:"What is the difference between append() and extend()?",opts:["Same","append adds single item; extend adds all items from iterable","extend adds single item","append takes iterable"],ans:1,exp:"append() adds one item; extend() adds all items from an iterable."},
      {q:"What does enumerate() do?",opts:["Counts items","Returns (index, value) pairs for iterable","Sorts with index","Groups items"],ans:1,exp:"enumerate() yields (index, value) tuples while iterating."},
    ],
    hard:[
      {q:"What is Python's GIL and what does it prevent?",opts:["Global Import Lock","Global Interpreter Lock — prevents true multi-threading","General Index Lock","Global I/O Lock"],ans:1,exp:"GIL prevents multiple threads from executing Python bytecode simultaneously."},
      {q:"What is metaclass in Python?",opts:["Parent class","Class of a class — controls class creation","Built-in function","Module type"],ans:1,exp:"Metaclass is the class whose instances are classes themselves."},
      {q:"What does functools.lru_cache do?",opts:["Clears cache","Memoizes function results with LRU eviction","Creates list","Sorts results"],ans:1,exp:"lru_cache memoizes function calls, caching up to maxsize recent calls."},
      {q:"What is the MRO in Python?",opts:["Memory allocation order","Order Python searches parent classes for methods (C3 linearization)","Module import order","Method registration order"],ans:1,exp:"MRO (Method Resolution Order) determines method lookup order in inheritance hierarchies."},
      {q:"What does __slots__ do?",opts:["Creates slot functions","Restricts attributes and reduces per-instance memory","Defines GUI slots","Manages time slots"],ans:1,exp:"__slots__ prevents __dict__ creation, saving memory when many instances exist."},
    ]
  },
  "SQL": {
    easy:[
      {q:"What does SQL stand for?",opts:["Structured Query Language","Simple Query Language","Standard Query Logic","Structured Question Logic"],ans:0,exp:"SQL = Structured Query Language for relational databases."},
      {q:"Which SQL command retrieves data?",opts:["INSERT","UPDATE","SELECT","DELETE"],ans:2,exp:"SELECT fetches data from one or more tables."},
      {q:"What does WHERE clause do?",opts:["Groups rows","Sorts results","Filters rows by condition","Joins tables"],ans:2,exp:"WHERE filters rows matching the specified condition."},
      {q:"Which command inserts new rows?",opts:["ADD","INSERT INTO","CREATE","UPDATE"],ans:1,exp:"INSERT INTO adds new rows to a table."},
      {q:"What is a primary key?",opts:["Any column","Column uniquely identifying each row (NOT NULL)","Foreign reference","Index type"],ans:1,exp:"Primary key uniquely identifies each row and cannot be NULL."},
      {q:"ORDER BY default sort order?",opts:["Descending","Random","Ascending","Alphabetical only"],ans:2,exp:"ORDER BY defaults to ASC (ascending)."},
      {q:"What does COUNT(*) return?",opts:["Sum","Number of rows","Average","Maximum"],ans:1,exp:"COUNT(*) counts all rows in the result set."},
      {q:"What removes duplicate rows in output?",opts:["UNIQUE","DISTINCT","NODUPLICATE","SINGLE"],ans:1,exp:"SELECT DISTINCT eliminates duplicate rows."},
      {q:"What does DELETE do?",opts:["Drops table","Removes rows matching WHERE","Clears all data","Removes columns"],ans:1,exp:"DELETE removes specific rows based on WHERE condition."},
      {q:"What is NULL in SQL?",opts:["Zero","Empty string","Unknown/missing value","False"],ans:2,exp:"NULL means unknown or missing — not zero or empty string."},
    ],
    medium:[
      {q:"Which join returns only matching rows from both tables?",opts:["LEFT JOIN","RIGHT JOIN","INNER JOIN","FULL OUTER JOIN"],ans:2,exp:"INNER JOIN returns rows with matching values in both tables."},
      {q:"What does GROUP BY do?",opts:["Sorts data","Groups rows with same values for aggregate functions","Filters groups","Joins tables"],ans:1,exp:"GROUP BY groups rows sharing column values so aggregate functions apply per group."},
      {q:"Which clause filters aggregated results?",opts:["WHERE","HAVING","FILTER","GROUP FILTER"],ans:1,exp:"HAVING filters groups after GROUP BY aggregation."},
      {q:"What does COALESCE return?",opts:["NULL","Sum","First non-NULL value","Last value"],ans:2,exp:"COALESCE returns the first non-NULL argument."},
      {q:"What is a view in SQL?",opts:["Physical table copy","Virtual table based on stored query","Stored procedure","Index"],ans:1,exp:"A view is a virtual table defined by a SELECT query."},
      {q:"What does EXISTS do in a subquery?",opts:["Checks column existence","Returns TRUE if subquery has any rows","Counts rows","Compares NULL"],ans:1,exp:"EXISTS returns TRUE if the correlated subquery returns at least one row."},
      {q:"What does ROLLBACK do?",opts:["Commits changes","Undoes uncommitted transaction changes","Saves transaction","Drops table"],ans:1,exp:"ROLLBACK undoes all changes made in the current transaction."},
      {q:"What is the difference between UNION and UNION ALL?",opts:["Same","UNION removes duplicates; UNION ALL keeps all rows","UNION ALL is slower","UNION keeps duplicates"],ans:1,exp:"UNION deduplicates results; UNION ALL returns all rows including duplicates."},
      {q:"What is normalization?",opts:["Speeding up queries","Organizing database to reduce redundancy and improve integrity","Denormalization","Index creation"],ans:1,exp:"Normalization structures tables to eliminate redundancy and anomalies."},
      {q:"What is ACID in database transactions?",opts:["Access Control ID","Atomicity, Consistency, Isolation, Durability","Advanced Command ID","Automated Control Interface"],ans:1,exp:"ACID properties guarantee reliable database transactions."},
    ],
    hard:[
      {q:"What is a window function in SQL?",opts:["UI window query","Computation across related rows without collapsing them (OVER clause)","Cursor type","Recursive CTE"],ans:1,exp:"Window functions operate over a window of rows related to current row without grouping them."},
      {q:"What is a CTE (Common Table Expression)?",opts:["Permanent table","Named temporary result set within a query using WITH clause","Recursive loop","Index optimization"],ans:1,exp:"CTEs improve readability and can be recursive; defined with WITH name AS (SELECT ...)."},
      {q:"What isolation level prevents phantom reads?",opts:["READ UNCOMMITTED","READ COMMITTED","REPEATABLE READ","SERIALIZABLE"],ans:3,exp:"SERIALIZABLE is the strictest level, preventing dirty, non-repeatable, and phantom reads."},
      {q:"What is database sharding?",opts:["Backup strategy","Horizontal partitioning — splitting data across multiple databases","Vertical scaling","Query caching"],ans:1,exp:"Sharding horizontally partitions data across multiple database instances for scalability."},
      {q:"What is MVCC (Multi-Version Concurrency Control)?",opts:["Multiple views","Multiple data versions allow concurrent reads/writes without blocking","Version history","Machine version"],ans:1,exp:"MVCC maintains multiple versions of data to allow concurrent transactions without locking."},
    ]
  },
  "Operating Systems":{
    easy:[
      {q:"What is an operating system?",opts:["Programming language","Software managing hardware/software resources for applications","Web browser","Database"],ans:1,exp:"OS is system software that manages hardware resources and provides services to applications."},
      {q:"What is a process?",opts:["Program file on disk","A program in execution with its own address space","System call","Memory block"],ans:1,exp:"A process is a running instance of a program with its own resources."},
      {q:"What is virtual memory?",opts:["Faster RAM","Using disk as extension of RAM to run programs larger than physical memory","Extra RAM slots","GPU memory"],ans:1,exp:"Virtual memory creates an illusion of more RAM by using disk storage as overflow."},
      {q:"What is a deadlock?",opts:["Program crash","Multiple processes waiting indefinitely for resources held by each other","Memory overflow","CPU overload"],ans:1,exp:"Deadlock: circular wait where each process holds a resource needed by another."},
      {q:"What is a thread?",opts:["A process copy","A lightweight unit of execution within a process sharing its memory","Independent process","System call"],ans:1,exp:"Threads are lightweight execution units within a process, sharing code, data, and files."},
      {q:"What does fork() do?",opts:["Creates a file","Creates a copy of the calling process","Creates a thread","Opens a network connection"],ans:1,exp:"fork() creates an identical child process — a copy of the parent."},
      {q:"What is the shell in an OS?",opts:["Hardware layer","User interface to the OS — interprets commands","Memory manager","File system"],ans:1,exp:"The shell is a command interpreter providing user access to OS services."},
      {q:"What is a semaphore?",opts:["Traffic signal","Synchronization variable controlling access to shared resources","Network protocol","File lock"],ans:1,exp:"Semaphores are integer synchronization primitives using wait()/signal() to control access."},
      {q:"What is context switching?",opts:["Switching OS","Saving state of running process and restoring state of next process","Memory swap","CPU upgrade"],ans:1,exp:"Context switch saves current process PCB state and loads the next process's PCB."},
      {q:"What is a page fault?",opts:["CPU error","Accessed memory page is not currently in physical RAM","Disk error","Network error"],ans:1,exp:"A page fault occurs when a referenced virtual page is not in physical memory."},
    ],
    medium:[
      {q:"Which page replacement algorithm is theoretically optimal?",opts:["FIFO","LRU","Optimal (Belady's)","Clock"],ans:2,exp:"Optimal algorithm replaces the page used farthest in the future."},
      {q:"What causes thrashing in an OS?",opts:["Too many CPUs","Processes' working sets exceed available frames — excessive paging","Full disk","Network congestion"],ans:1,exp:"Thrashing: processes spend more time swapping pages than executing useful work."},
      {q:"What is the TLB (Translation Lookaside Buffer)?",opts:["Table lookup buffer","Cache for recent virtual-to-physical address translations","Thread list buffer","Task load balancer"],ans:1,exp:"TLB speeds up virtual memory translation by caching recent page table entries."},
      {q:"What is a zombie process?",opts:["Malware","Terminated process whose PCB remains until parent calls wait()","Blocked process","Sleeping process"],ans:1,exp:"Zombie processes have completed execution but remain in process table awaiting parent's wait()."},
      {q:"What is priority inversion?",opts:["Wrong priority","High-priority task blocked by low-priority task holding shared resource","Priority queue","Scheduling error"],ans:1,exp:"Priority inversion occurs when a high-priority task waits for a low-priority one with a needed lock."},
      {q:"What is demand paging?",opts:["All pages loaded on start","Pages loaded into memory only when referenced (lazy loading)","Fixed page size","Random loading"],ans:1,exp:"Demand paging loads pages only on access, reducing initial load time and memory usage."},
      {q:"What is Round Robin scheduling?",opts:["Priority-based","Each process gets fixed time quantum in circular order","FCFS variant","Shortest job first"],ans:1,exp:"Round Robin assigns each process a fixed time slice in cyclic order."},
      {q:"What is Copy-on-Write (COW)?",opts:["Backup strategy","Pages shared after fork() until one process writes — then copied","Memory allocation","Cache strategy"],ans:1,exp:"COW defers page copying after fork() until either process modifies it."},
      {q:"What is an orphan process?",opts:["Terminated process","Process whose parent terminated before it","Sleeping process","Background daemon"],ans:1,exp:"An orphan process's parent has exited; init/systemd (PID 1) adopts it."},
      {q:"What is inode in file systems?",opts:["File name","Data structure storing file metadata: permissions, size, block pointers","Directory entry","File content"],ans:1,exp:"Inodes store file metadata — everything except the filename."},
    ],
    hard:[
      {q:"What is the Linux CFS (Completely Fair Scheduler)?",opts:["FCFS variant","Red-black tree-based scheduler tracking virtual runtime for fair CPU sharing","Priority queue scheduler","Round Robin variant"],ans:1,exp:"CFS tracks vruntime weighted by priority and always runs the process with smallest vruntime."},
      {q:"What is NUMA and how does it affect performance?",opts:["Network protocol","Non-Uniform Memory Access — latency depends on memory proximity to CPU","Scheduling algorithm","Cache architecture"],ans:1,exp:"NUMA: memory access time varies by physical location relative to the accessing CPU core."},
      {q:"What is a futex in Linux?",opts:["Future text","Fast userspace mutex — only uses syscall on contention","File mutex","Forking utility"],ans:1,exp:"Futex (Fast Userspace muTEX) operates in userspace without syscall unless there's contention."},
      {q:"What is huge pages and its performance benefit?",opts:["Large files","2MB/1GB pages reducing TLB misses for large memory workloads","More RAM slots","Faster disk"],ans:1,exp:"Huge pages reduce TLB miss rate for applications with large footprints by covering more memory per entry."},
      {q:"What is the purpose of the OOM killer in Linux?",opts:["Security tool","Terminates processes when system runs out of memory to prevent full crash","Memory compactor","Swap manager"],ans:1,exp:"OOM killer selects and kills processes based on OOM score when free memory is exhausted."},
    ]
  },
  "Computer Networks":{
    easy:[
      {q:"What does HTTP stand for?",opts:["HyperText Transfer Protocol","High Transfer Text Protocol","HyperText Transport Program","High Text Transfer Protocol"],ans:0,exp:"HTTP = HyperText Transfer Protocol, the foundation of web communication."},
      {q:"Which device routes packets between networks?",opts:["Switch","Hub","Router","Bridge"],ans:2,exp:"Routers operate at Layer 3 and forward packets between different networks."},
      {q:"What does DNS do?",opts:["Assigns IP addresses","Translates domain names to IP addresses","Encrypts traffic","Monitors network"],ans:1,exp:"DNS resolves human-readable domain names to numeric IP addresses."},
      {q:"What is TCP?",opts:["Unreliable protocol","Reliable, connection-oriented transport protocol","Application protocol","Network protocol"],ans:1,exp:"TCP provides reliable, ordered, error-checked delivery of bytes between applications."},
      {q:"What port does HTTPS use?",opts:["80","21","443","22"],ans:2,exp:"HTTPS uses port 443 for encrypted web traffic."},
      {q:"What is the loopback address?",opts:["192.168.0.1","10.0.0.1","127.0.0.1","172.16.0.1"],ans:2,exp:"127.0.0.1 (localhost) routes traffic back to the same host for testing."},
      {q:"UDP differs from TCP by being:",opts:["Slower","Connectionless and unreliable but lower overhead","Encrypted","More reliable"],ans:1,exp:"UDP is connectionless — no handshake, no acknowledgment, lower overhead than TCP."},
      {q:"What does DHCP do?",opts:["Translates domains","Automatically assigns IP addresses to devices","Routes packets","Encrypts data"],ans:1,exp:"DHCP automatically configures IP address, subnet mask, gateway for network devices."},
      {q:"Default port for HTTP?",opts:["443","21","80","22"],ans:2,exp:"HTTP uses port 80 by default."},
      {q:"What does ping use?",opts:["TCP","UDP","ICMP","FTP"],ans:2,exp:"ping uses ICMP Echo Request/Reply to test network connectivity."},
    ],
    medium:[
      {q:"What is the TCP 3-way handshake?",opts:["SYN,ACK,FIN","SYN → SYN-ACK → ACK","ACK,SYN,ACK","SYN,SYN,ACK"],ans:1,exp:"Client SYN → Server SYN-ACK → Client ACK establishes TCP connection."},
      {q:"What does NAT do?",opts:["Encrypts traffic","Maps multiple private IPs to one public IP","Assigns IPs","Routes between VLANs"],ans:1,exp:"NAT allows multiple private hosts to share one public IP address."},
      {q:"What routing protocol uses Dijkstra?",opts:["RIP","BGP","OSPF","EIGRP"],ans:2,exp:"OSPF (Open Shortest Path First) uses Dijkstra's SPF algorithm internally."},
      {q:"What is ARP?",opts:["DNS for emails","Maps IP addresses to MAC addresses on local network","Routing protocol","Error reporting"],ans:1,exp:"ARP resolves IP addresses to physical MAC addresses via broadcast."},
      {q:"What is SSL/TLS?",opts:["Routing protocol","Cryptographic protocol providing secure communication over network","Email protocol","DNS extension"],ans:1,exp:"TLS (Transport Layer Security) encrypts network communication — HTTPS uses TLS."},
      {q:"What is a firewall?",opts:["Antivirus","Network security device filtering traffic by rules","Router","Proxy server"],ans:1,exp:"Firewalls filter inbound/outbound traffic based on IP, port, protocol rules."},
      {q:"What is IPv6 address size?",opts:["32 bits","64 bits","128 bits","256 bits"],ans:2,exp:"IPv6 uses 128-bit addresses, providing vastly more addresses than IPv4."},
      {q:"What is BGP used for?",opts:["LAN routing","Inter-autonomous system routing on the internet","Wireless routing","DNS resolution"],ans:1,exp:"BGP (Border Gateway Protocol) routes traffic between autonomous systems on the internet."},
      {q:"CIDR /24 provides how many usable hosts?",opts:["256","254","255","128"],ans:1,exp:"/24 = 8 host bits = 256 addresses; 254 usable (minus network/broadcast)."},
      {q:"What is a VPN?",opts:["Faster internet","Encrypted tunnel over public network for secure remote access","Free IP service","Better DNS"],ans:1,exp:"VPN encrypts traffic between endpoints over the public internet."},
    ],
    hard:[
      {q:"What is QUIC protocol?",opts:["Routing protocol","UDP-based transport with built-in TLS + multiplexing developed by Google","DNS resolver","Email protocol"],ans:1,exp:"QUIC provides 0-RTT connection setup, TLS 1.3, stream multiplexing over UDP."},
      {q:"What is anycast addressing?",opts:["One-to-all","One address assigned to multiple nodes; routed to nearest","One-to-one","Multicast"],ans:1,exp:"Anycast routes packets to the topologically nearest node sharing the IP."},
      {q:"What is MPLS used for?",opts:["Encryption","Fast packet forwarding using short labels instead of full IP lookup","DNS caching","Address translation"],ans:1,exp:"MPLS uses labels for fast forwarding decisions, enabling traffic engineering and VPNs."},
      {q:"What is ECMP?",opts:["Single path routing","Equal Cost Multi-Path — load balances across multiple equal-cost routes","Encryption protocol","QoS mechanism"],ans:1,exp:"ECMP distributes flows across multiple equal-cost paths for load balancing."},
      {q:"What is TCP CUBIC?",opts:["A cipher","Congestion control algorithm with cubic window growth optimized for high-bandwidth links","Routing protocol","DNS extension"],ans:1,exp:"TCP CUBIC replaces Reno with a cubic function for window growth, better utilizing high-BDP links."},
    ]
  }
};

const ALL_SUBJECTS = [
  "C Programming","Python","Java","C++","DSA","SQL","HTML","CSS","JavaScript",
  "Computer Networks","DBMS","Compiler Design","Computer Organization","Operating Systems",
  "Discrete Mathematics","Formal Languages & Automata","Software Engineering",
  "Design & Analysis of Algorithms","Cryptography & Network Security",
  "Big Data Analytics","Cloud Computing","Machine Learning","Deep Learning"
];

const DIFFICULTY_LAYERS = {
  Easy: 1,
  Medium: 2,
  Hard: 3
};

const normalizeSubject = (subject) => (subject || '').toString().trim();

const SUBJECT_ALIASES = {
  'c++': 'C Programming',
  'c': 'C Programming',
  'js': 'JavaScript',
  'python': 'Python',
  'sql': 'SQL',
  'os': 'Operating Systems',
  'dbms': 'DBMS',
  'computer networks': 'Computer Networks',
  'dsa': 'Design & Analysis of Algorithms',
  'compiler design': 'Compiler Design',
  'computer organization': 'Computer Organization',
  'machine learning': 'Machine Learning',
  'deep learning': 'Deep Learning'
};

const findBestBankKey = (subject, bank) => {
  if (!subject || !bank) return null;
  const normalized = normalizeSubject(subject).toLowerCase();

  // exact case-insensitive match
  const exact = Object.keys(bank).find(k => k.toLowerCase() === normalized);
  if (exact) return exact;

  // alias mapping
  const alias = SUBJECT_ALIASES[normalized];
  if (alias && bank[alias]) return alias;

  // contains match (subject contains bank key or vice versa)
  const contains = Object.keys(bank).find(k => normalized.includes(k.toLowerCase()) || k.toLowerCase().includes(normalized.split(' ')[0] || ''));
  if (contains) return contains;

  // fallback strict startsWith/endsWith
  return Object.keys(bank).find(k => normalized.startsWith(k.toLowerCase()) || normalized.endsWith(k.toLowerCase()));
};

const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const SUBJECT_TF = {
  "C Programming": {
    easy: [
      { q: "C language is case-sensitive.", ans: true, exp: "C keywords and identifiers are case-sensitive in C." },
      { q: "In C, printf is used for input operations.", ans: false, exp: "printf is used for output operations, not input." },
      { q: "A pointer in C stores the address of a variable.", ans: true, exp: "Pointers hold memory addresses of other variables." }
    ],
    medium: [
      { q: "Dynamic memory in C is allocated using malloc and freed by free.", ans: true, exp: "malloc/calloc allocate heap memory; free releases it." },
      { q: "For loops in C always run exactly 10 times.", ans: false, exp: "Loop iteration depends on the loop condition, not a fixed number." },
      { q: "Using uninitialized local variables in C can lead to undefined behavior.", ans: true, exp: "Uninitialized variables may hold garbage data resulting in undefined behavior." }
    ],
    hard: [
      { q: "In C, a dangling pointer refers to memory that has been freed.", ans: true, exp: "Dangling pointers point to memory that is no longer valid." },
      { q: "The C compiler always reports runtime errors for undefined behavior.", ans: false, exp: "Undefined behavior may not generate runtime errors and is unpredictable." },
      { q: "A union in C allocates separate memory for each member.", ans: false, exp: "In a union, all members share the same memory location." }
    ]
  },
  Python: {
    easy: [
      { q: "Python uses indentation to define code blocks.", ans: true, exp: "Indentation is syntactically significant in Python." },
      { q: "A Python list is immutable.", ans: false, exp: "Lists are mutable; tuples are immutable." },
      { q: "The 'def' keyword is used to define functions.", ans: true, exp: "def defines functions in Python." }
    ],
    medium: [
      { q: "The 'self' parameter is mandatory in instance method definitions.", ans: true, exp: "Instance methods conventionally include self as the first parameter." },
      { q: "Dictionaries preserve insertion order in Python 3.7+.", ans: true, exp: "From Python 3.7, dict preserves insertion order." },
      { q: "The '==' operator checks object identity in Python.", ans: false, exp: "== checks value equality; 'is' checks identity." }
    ],
    hard: [
      { q: "Python's global interpreter lock (GIL) allows true parallel execution of threads.", ans: false, exp: "GIL restricts execution to one thread at a time in CPython." },
      { q: "Generators in Python can yield values lazily.", ans: true, exp: "Generators produce values on demand using yield." },
      { q: "List comprehensions always consume less memory than loops.", ans: false, exp: "They may be more concise but can use similar memory depending on usage." }
    ]
  },
  DBMS: {
    easy: [
      { q: "A primary key uniquely identifies each row in a table.", ans: true, exp: "Primary keys enforce uniqueness for table rows." },
      { q: "SQL's SELECT statement is used to update rows.", ans: false, exp: "SELECT retrieves rows; UPDATE changes rows." },
      { q: "Normalization reduces data redundancy.", ans: true, exp: "Normalization organizes tables to reduce repeated data." }
    ],
    medium: [
      { q: "A foreign key in one table can reference primary key in another.", ans: true, exp: "Foreign keys maintain relational integrity across tables." },
      { q: "A clustered index in SQL does not affect query speed.", ans: false, exp: "Clustered indexes often improve query performance for ordered retrieval." },
      { q: "Third normal form (3NF) eliminates transitive dependencies.", ans: true, exp: "3NF requires no transitive functional dependencies." }
    ],
    hard: [
      { q: "ACID stands for Atomicity, Consistency, Isolation, Durability.", ans: true, exp: "ACID describes transactional properties in RDBMS." },
      { q: "Denormalization always improves data integrity.", ans: false, exp: "Denormalization may improve performance but can reduce integrity." },
      { q: "In indexing, B-tree indexes are ideal for range queries.", ans: true, exp: "B-tree indexes support efficient range scans." }
    ]
  },
  "Operating Systems": {
    easy: [
      { q: "Deadlock requires four Coffman conditions to occur.", ans: true, exp: "Mutual exclusion, hold and wait, no preemption, circular wait are Coffman conditions." },
      { q: "Virtual memory allows processes to use more memory than physically available.", ans: true, exp: "Virtual memory uses disk-backed pages to extend memory." },
      { q: "Round robin scheduling gives each process a time quantum.", ans: true, exp: "Round robin uses fixed time slices for fairness." }
    ],
    medium: [
      { q: "A page fault occurs when a page is not in physical memory.", ans: true, exp: "Page faults trigger loading pages from disk." },
      { q: "Priority inversion occurs when higher-priority process preempts lower-priority process.", ans: false, exp: "It occurs when a low-priority task blocks a high-priority one." },
      { q: "Thrashing occurs when CPU is mostly idle.", ans: false, exp: "Thrashing occurs when paging overhead dominates CPU work." }
    ],
    hard: [
      { q: "Copy-on-write allows processes to share memory until a write occurs.", ans: true, exp: "COW delays copying pages until modification." },
      { q: "CFS in Linux uses red-black tree and virtual runtime.", ans: true, exp: "CFS selects tasks by vruntime to approximate fairness." },
      { q: "A zombie process still occupies memory and can execute.", ans: false, exp: "Zombies have terminated but keep a process table entry only." }
    ]
  },
  "Computer Networks": {
    easy: [
      { q: "TCP is connection-oriented and reliable.", ans: true, exp: "TCP provides reliable ordered delivery with acknowledgment." },
      { q: "IP operates at the transport layer.", ans: false, exp: "IP is a network layer protocol." },
      { q: "DNS resolves domain names to IP addresses.", ans: true, exp: "DNS is the domain name resolution service." }
    ],
    medium: [
      { q: "NAT maps private IP addresses to public IP addresses.", ans: true, exp: "NAT enables private LAN hosts to use one public IP." },
      { q: "OSPF uses distance vector routing.", ans: false, exp: "OSPF is a link-state protocol using Dijkstra." },
      { q: "UDP provides guaranteed packet delivery.", ans: false, exp: "UDP is unreliable and does not guarantee delivery." }
    ],
    hard: [
      { q: "BGP is used for inter-domain routing between autonomous systems.", ans: true, exp: "BGP is the protocol for internet routing between ASes." },
      { q: "MPLS uses labels and can improve traffic engineering.", ans: true, exp: "MPLS forwards based on labels and supports TE." },
      { q: "Anycast addresses are delivered to all nodes with the same address.", ans: false, exp: "Anycast routes to nearest single node among many." }
    ]
  }
};

const SUBJECT_SA = {
  "C Programming": {
    easy: [
      { q: "Explain what a pointer is in C.", refAnswer: "A pointer is a variable that stores the memory address of another variable.", keywords: ["pointer", "memory address", "variable", "dereference"], exp: "Pointers store addresses and are dereferenced with *." },
      { q: "Describe why semicolons are needed in C.", refAnswer: "Semicolons terminate statements so the compiler can parse separate instructions.", keywords: ["semicolon", "statement", "compiler", "terminate"], exp: "Semicolons separate statements in C syntax." }
    ],
    medium: [
      { q: "Describe dynamic memory allocation in C.", refAnswer: "Use malloc/calloc to allocate heap memory and free to release it.", keywords: ["malloc", "free", "heap", "allocate"], exp: "Dynamic memory is managed at runtime with malloc/free." },
      { q: "Explain the difference between stack and heap memory.", refAnswer: "Stack holds local variables and function frames; heap holds dynamic allocations.", keywords: ["stack", "heap", "local", "dynamic"], exp: "Stack is automatic; heap is manual dynamic memory." }
    ],
    hard: [
      { q: "Explain undefined behavior in C.", refAnswer: "Undefined behavior arises when C standard does not define outcome (e.g., buffer overflow).", keywords: ["undefined behavior", "C standard", "buffer overflow", "unspecified"], exp: "Undefined behavior can produce unpredictable results." },
      { q: "Explain what a segmentation fault means.", refAnswer: "It means the program accessed memory it is not allowed to access.", keywords: ["segmentation fault", "memory", "access violation", "pointer"], exp: "Segfault occurs on invalid memory access." }
    ]
  },
  Python: {
    easy: [
      { q: "What does indentation signify in Python?", refAnswer: "Indentation defines code blocks and nesting.", keywords: ["indentation", "code block", "scope", "structure"], exp: "Python uses indentation instead of braces." },
      { q: "What is a Python list?", refAnswer: "A mutable ordered collection of items.", keywords: ["list", "mutable", "ordered", "collection"], exp: "Lists are ordered and can be modified." }
    ],
    medium: [
      { q: "Explain how Python dictionaries store data.", refAnswer: "Dictionaries store key-value pairs with hashed keys for fast lookup.", keywords: ["dictionary", "key-value", "hash", "lookup"], exp: "dict maps unique keys to values." },
      { q: "What are decorators used for?", refAnswer: "Decorators wrap and modify function behavior.", keywords: ["decorator", "wrapper", "function", "@"], exp: "Decorators add functionality to functions." }
    ],
    hard: [
      { q: "Explain the Global Interpreter Lock (GIL).", refAnswer: "GIL is a mutex that allows only one thread to execute Python bytecode at a time in CPython.", keywords: ["GIL", "thread", "bytecode", "CPython"], exp: "GIL restricts parallel execution of Python threads." },
      { q: "What is a generator in Python?", refAnswer: "A generator yields items lazily using yield and preserves state.", keywords: ["generator", "yield", "lazy", "iterator"], exp: "Generators produce values one at a time." }
    ]
  },
  "DBMS": {
    easy: [
      { q: "What is normalization?", refAnswer: "Normalization organizes data into tables to reduce redundancy.", keywords: ["normalization", "redundancy", "tables", "dependencies"], exp: "Normalization improves data integrity." },
      { q: "What is a primary key?", refAnswer: "A column that uniquely identifies each row.", keywords: ["primary key", "unique", "row", "identifier"], exp: "Primary keys enforce unique rows." }
    ],
    medium: [
      { q: "Explain foreign key constraints.", refAnswer: "Foreign keys enforce referential integrity between related tables.", keywords: ["foreign key", "referential integrity", "table", "constraint"], exp: "Foreign keys link tables reliably." },
      { q: "What is an index?", refAnswer: "An index speeds data retrieval using lookup structures.", keywords: ["index", "search", "performance", "lookup"], exp: "Indexes improve query speed." }
    ],
    hard: [
      { q: "What is ACID in databases?", refAnswer: "Atomicity, Consistency, Isolation, Durability define reliable transactions.", keywords: ["ACID", "transaction", "atomicity", "durability"], exp: "ACID ensures consistent and durable transaction behavior." },
      { q: "What is a transaction isolation level?", refAnswer: "It defines visibility and consistency guarantees for concurrent transactions.", keywords: ["isolation", "transaction", "concurrency", "dirty read"], exp: "Isolation levels balance concurrency and consistency." }
    ]
  }
};

export const getQuestionPool = (subject, difficulty, type, topic = '') => {
  const diff = (difficulty || 'Medium').toLowerCase();
  const safeSubject = normalizeSubject(subject) || 'General';

  if (type === 'True/False') {
    return generateTFPool(subject, difficulty, topic);
  }
  if (type === 'Short Answer') {
    return generateSAPool(subject, difficulty, topic);
  }

  const key = findBestBankKey(safeSubject, QBANK);
  if (key && QBANK[key] && QBANK[key][diff]) {
    return QBANK[key][diff].map(q => ({ ...q, q: topic ? `${q.q} (${topic})` : q.q }));
  }

  // When no dedicated bank exists, generate subject-specific template questions
  return Array.from({ length: 10 }, (_, i) => ({
    q: `(${safeSubject}) ${safeSubject} related question ${i + 1} (${diff})${topic ? ' — ' + topic : ''}`,
    opts: ['Option A', 'Option B', 'Option C', 'Option D'],
    ans: 0,
    exp: `A generated ${diff} ${safeSubject} question${topic ? ' on ' + topic : ''}.`
  }));
};

const generateTFPool = (subject, difficulty, topic = '') => {
  const subjectKey = Object.keys(SUBJECT_TF).find(k => subject.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(subject.split(' ')[0].toLowerCase()));
  const level = (difficulty || 'Medium').toLowerCase();
  if (subjectKey && SUBJECT_TF[subjectKey]) {
    const pool = SUBJECT_TF[subjectKey][level] || SUBJECT_TF[subjectKey].medium || SUBJECT_TF[subjectKey].easy;
    return pool.map(q => ({ ...q, q: topic ? `${q.q} (${topic})` : q.q }));
  }

  // Generate subject-specific placeholders when no stored true/false bank exists
  const phrases = [
    `${subject} is an important topic in ${difficulty} level.`,
    `${subject} concepts can be tested with true/false statements.`,
    `${subject} material at ${difficulty} difficulty focuses on core ideas.`,
    `${subject} requires conceptual understanding rather than memorization.`,
    `${subject} medium-level evaluations often include multiple-choice and true/false.`,
    `${subject} true/false statements test fundamental definitions.`,
  ];
  return phrases.map((q, i) => ({ q, ans: i % 2 === 0, exp: `Statement about ${subject} at ${difficulty} difficulty.` }));
};

const generateSAPool = (subject, difficulty, topic = '') => {
  const subjectKey = Object.keys(SUBJECT_SA).find(k => subject.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(subject.split(' ')[0].toLowerCase()));
  const level = (difficulty || 'Medium').toLowerCase();
  if (subjectKey && SUBJECT_SA[subjectKey]) {
    const pool = SUBJECT_SA[subjectKey][level] || SUBJECT_SA[subjectKey].medium || SUBJECT_SA[subjectKey].easy;
    return pool.map(q => ({ ...q, q: topic ? `${q.q} (${topic})` : q.q }));
  }

  return Array.from({ length: 6 }, (_, i) => ({
    q: `Explain a key concept in ${subject} (${difficulty}) ${i + 1}.`,
    refAnswer: `A detailed response for ${subject} ${difficulty} concept ${i + 1}.`,
    keywords: [subject.split(' ')[0], 'concept', difficulty.toLowerCase()],
    exp: `Short answer placeholder for ${subject} at ${difficulty} difficulty.`
  }));
};

const makeQuestionSignature = (item) => {
  const q = (item.q || '').toString().trim();
  const opts = Array.isArray(item.opts) ? item.opts.map(o => o.toString().trim()).join('|') : '';
  const ans = item.ans !== undefined ? item.ans.toString() : (item.correctIndex !== undefined ? item.correctIndex.toString() : '');
  return `${q}|||${opts}|||${ans}`;
};

const clusterUnique = (arr) => {
  const seen = new Set();
  return arr.filter(item => {
    const key = makeQuestionSignature(item);
    if (!key || key.trim().length === 0) return false;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

export const generateQuestions = (subject, difficulty, count, type, topic = '') => {
  const parsedCount = parseInt(count, 10);
  const n = Number.isFinite(parsedCount) ? Math.max(1, parsedCount) : 10;
  const type_ = type || 'MCQ';
  const pool = getQuestionPool(subject, difficulty, type_, topic);
  const uniquePool = clusterUnique(pool);

  const seenQ = new Set();
  const questions = [];
  const addUnique = (q) => {
    const key = (q.q || '').trim();
    if (!key || seenQ.has(key)) return false;
    seenQ.add(key);
    questions.push(q);
    return true;
  };

  const shuffled = [...uniquePool].sort(() => Math.random() - 0.5);
  while (questions.length < n && shuffled.length > 0) {
    const candidate = shuffled.pop();
    addUnique(candidate);
  }

  let fallbackIndex = 1;
  while (questions.length < n) {
    const fallbackQuestion = {
      q: `${subject} ${difficulty} placeholder question ${fallbackIndex}`,
      exp: 'Placeholder question when not enough unique source questions are available.',
    };
    if (type_ === 'True/False') {
      fallbackQuestion.opts = ['True', 'False'];
      fallbackQuestion.ans = fallbackIndex % 2 === 0;
    } else if (type_ !== 'Short Answer') {
      fallbackQuestion.opts = ['Option A', 'Option B', 'Option C', 'Option D'];
      fallbackQuestion.ans = 0;
    }
    if (addUnique(fallbackQuestion)) fallbackIndex += 1;
    else fallbackIndex += 1;
  }

  const qlist = questions.slice(0, n).map((q, i) => {
    const base = { ...q, id: i + 1, subject, difficulty, type: type_ };
    if (type_ === 'True/False') return { ...base, opts: ['True', 'False'], correctIndex: q.ans === true ? 0 : 1 };
    if (type_ === 'Short Answer') return { ...base, opts: null, correctIndex: null };
    return base;
  });

  if (type_ === 'True/False') {
    const last = JSON.parse(localStorage.getItem('last_tf_questions') || '[]');
    const filtered = qlist.filter(q => !last.includes(q.q));
    const final = filtered.length >= n ? filtered.slice(0, n) : qlist;
    localStorage.setItem('last_tf_questions', JSON.stringify(final.map(q => q.q).slice(0, 10)));
    return final;
  }

  return qlist;
};

export const generateMockTest = ({ subject, topic = '', difficulty, type, count }) => {
  const qs = generateQuestions(subject || 'General', difficulty || 'Medium', count || 10, type || 'MCQ', topic);

  const mockQuestions = qs.map((orig, index) => {
    const normalizedQuestion = topic ? `${orig.q}` : orig.q;
    let options = [];
    let correctAnswer = '';

    if (type === 'True/False') {
      options = ['True', 'False'];
      const correctBool = orig.ans === true || orig.ans === 1 || orig.correctIndex === 0;
      correctAnswer = correctBool ? 'True' : 'False';
    } else if (type === 'Short Answer') {
      options = [];
      correctAnswer = orig.refAnswer || orig.ans || '';
    } else {
      const availableOpts = Array.isArray(orig.opts) ? orig.opts.slice(0, 4) : [];
      while (availableOpts.length < 4) availableOpts.push('Option');
      options = availableOpts;
      const answerIndex = Number.isFinite(orig.ans) ? orig.ans : (orig.correctIndex ?? 0);
      const validIndex = answerIndex >= 0 && answerIndex < options.length ? answerIndex : 0;
      correctAnswer = options[validIndex];
    }

    return {
      id: orig.id || uuidv4(),
      question: topic ? `${normalizedQuestion}` : normalizedQuestion,
      options,
      correctAnswer,
      explanation: orig.exp || orig.explanation || 'No explanation provided.',
      difficulty: difficulty || 'Medium',
      subject: subject || 'General',
      topic: topic || ''
    };
  });

  return { questions: mockQuestions.slice(0, Number.isFinite(parseInt(count, 10)) ? parseInt(count, 10) : 10) };
};

export const evaluateShortAnswer = (studentAnswer, question) => {
  if (!studentAnswer || studentAnswer.trim().length === 0) {
    return { score: 0, pct: 0, feedback: 'No answer provided.', keywordsFound: [], keywordScore: 0, aiScore: 0 };
  }
  const lower = studentAnswer.toLowerCase();
  const keywords = question.keywords || [];
  const found = keywords.filter(k => lower.includes(k.toLowerCase()));
  const keywordScore = keywords.length > 0 ? Math.round((found.length / keywords.length) * 100) : 50;
  const similarityBoost = Math.min(30, Math.round((studentAnswer.split(' ').length / 60) * 30));
  const aiScore = Math.min(100, keywordScore + similarityBoost);
  const finalScore = Math.round((keywordScore * 0.5) + (aiScore * 0.5));
  let feedback = '';
  if (finalScore >= 85) feedback = 'Excellent answer! You covered the key concepts thoroughly.';
  else if (finalScore >= 65) feedback = `Good understanding. Missing: ${keywords.filter(k => !found.includes(k)).slice(0, 2).join(', ') || 'few detail points'}.`;
  else if (finalScore >= 40) feedback = `Partial understanding. Key missing: ${keywords.filter(k => !found.includes(k)).slice(0, 3).join(', ') || 'concept depth'}.`;
  else feedback = `Needs improvement. Reference: ${question.exp || 'Review the core concept and try again.'}`;
  return { score: finalScore, pct: finalScore, feedback, keywordsFound: found, keywordScore, aiScore };
};

export { ALL_SUBJECTS };
