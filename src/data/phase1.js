const buildStats = (sections) => ({
    aptitudeCount: sections.aptitude.length,
    javaCount: sections.java.length,
    dsaCount: sections.dsa.length,
    codingCount: sections.coding.length,
    interviewCount: sections.interview.length,
    revisionCount: sections.revision.length,
    totalTasks: Object.values(sections).reduce((total, section) => total + section.length, 0)
});

const withStats = (day) => ({
    ...day,
    stats: buildStats(day.sections)
});

const phase1 = [
    {
        day: 1,
        title: "Number System + Java Foundation + Array Foundation",
        sections: {
            aptitude: [
                "Number System Basics",
                "Divisibility Rules (1-12)",
                "Prime & Composite Numbers",
                "Even & Odd Numbers",
                "Factors & Multiples",
                "LCM & HCF Basics",
                "Solve 30 Aptitude Questions"
            ],
            java: [
                "Java Setup",
                "Program Structure",
                "Variables",
                "Data Types",
                "Type Casting",
                "Operators",
                "Scanner Class",
                "Input / Output",
                "Solve 10 Java Programs"
            ],
            dsa: [
                "Array Declaration",
                "Array Traversal",
                "Input Array",
                "Output Array",
                "Sum of Array",
                "Maximum Element",
                "Minimum Element",
                "Average of Array",
                "Count Even/Odd",
                "Solve 5 Array Problems",
                "What is Time Complexity?",
                "O(1)",
                "O(n)",
                "O(log n)",
                "O(n²)",
                "Best Case",
                "Average Case",
                "Worst Case",
                "Time Complexity of Array Traversal"
            ],
            coding: [
                "Reverse Number",
                "Palindrome Number",
                "Prime Number",
                "Factorial",
                "Fibonacci",
                "Sum Of Digits",
                "Count Digits",
                "Armstrong Number",
                "Solve 8 Coding Problems"
            ],
            interview: [
                "1 Minute Self Introduction",
                "Project Summary Preparation",
                "Explain One Project In 2 Minutes"
            ],
            revision: [
                "Revise Notes",
                "Re-code Without Seeing",
                "Track Mistakes",
                "Create Day 1 Summary Notes"
            ]
        }
    },

    {
        day: 2,
        title: "LCM HCF + Operators + Arrays Deep Dive",
        sections: {
            aptitude: [
                "LCM Basics",
                "LCM of 2 Numbers",
                "LCM of Multiple Numbers",
                "HCF Basics",
                "HCF of 2 Numbers",
                "HCF of Multiple Numbers",
                "LCM-HCF Relationship",
                "Word Problems on LCM & HCF",
                "Factors and Multiples Revision",
                "Solve 30-40 LCM/HCF Questions"
            ],
            java: [
                "Arithmetic Operators",
                "Relational Operators",
                "Logical Operators",
                "Assignment Operators",
                "Unary Operators",
                "Ternary Operator",
                "Bitwise Operators (Basics)",
                "Operator Precedence",
                "Expression Evaluation",
                "Type Casting Revision",
                "Solve 10 Java Programs Using Operators"
            ],
            dsa: [
                "Maximum Element",
                "Minimum Element",
                "Second Largest Element",
                "Second Smallest Element",
                "Count Even Numbers",
                "Count Odd Numbers",
                "Array Sum",
                "Array Average",
                "Linear Search",
                "Check Element Exists",
                "Frequency Count",
                "Find Duplicate Elements",
                "Find Missing Number (Basic)",
                "Check Sorted Array",
                "Reverse Array",
                "Solve 8-10 Array Problems"
            ],
            coding: [
                "Factorial Number",
                "Armstrong Number",
                "Perfect Number",
                "Strong Number",
                "Leap Year",
                "Power of Number",
                "GCD Program",
                "LCM Program",
                "Multiplication Table",
                "Pattern Problem 1",
                "Pattern Problem 2",
                "Solve 8-10 Coding Problems"
            ],
            interview: [
                "Introduce Yourself (1 Minute)",
                "Explain Academic Background",
                "Practice Speaking for 10 Minutes"
            ],
            revision: [
                "Re-code 3 Programs Without Seeing",
                "Write Notes",
                "Track Mistakes",
                "Revise Day 1 Topics"
            ]
        }
    },

    {
        day: 3,
        title: "Percentage + Conditional Statements + Searching",
        sections: {
            aptitude: [
                "Percentage Basics",
                "Percentage to Fraction",
                "Fraction to Percentage",
                "Percentage Increase",
                "Percentage Decrease",
                "Successive Percentage",
                "Profit Percentage Basics",
                "Loss Percentage Basics",
                "Exam Mark Percentage Problems",
                "Population Percentage Problems",
                "Percentage Word Problems",
                "Solve 30-40 Percentage Questions"
            ],
            java: [
                "if Statement",
                "if else Statement",
                "else if Ladder",
                "Nested if else",
                "switch Statement",
                "Ternary Operator",
                "Menu Driven Program",
                "Grade Calculator Program",
                "ATM Program (Basic)",
                "Electricity Bill Program",
                "Solve 10 Conditional Programs"
            ],
            dsa: [
                "Linear Search",
                "Search Element in Array",
                "Count Occurrences",
                "Find First Occurrence",
                "Find Last Occurrence",
                "Search in String Array",
                "Search User Input Value",
                "Solve 5-8 Searching Problems"
            ],
            coding: [
                "Even Odd Number",
                "Positive Negative Zero",
                "Largest of Two Numbers",
                "Largest of Three Numbers",
                "Smallest of Three Numbers",
                "Voting Eligibility Program",
                "Leap Year Program",
                "Grade Calculation Program",
                "Calculator Using Switch",
                "Solve 8-10 Coding Problems"
            ],
            interview: [
                "Tell Me About Yourself (1 Minute)",
                "Explain Your Strengths",
                "Practice Speaking for 10 Minutes"
            ],
            revision: [
                "Revise Day 1",
                "Revise Day 2",
                "Re-code 3 Programs Without Seeing",
                "Write Notes",
                "Track Mistakes"
            ]
        }
    },

    {
        day: 4,
        title: "Ratio & Proportion + Loops + Number Logic",
        sections: {
            aptitude: [
                "Ratio Basics",
                "Equivalent Ratios",
                "Simplifying Ratios",
                "Comparison of Ratios",
                "Proportion Basics",
                "Direct Proportion",
                "Inverse Proportion",
                "Partnership Problems",
                "Ratio Based Age Problems",
                "Ratio Based Mixture Problems",
                "Ratio & Proportion Word Problems",
                "Solve 30-40 Ratio Questions"
            ],
            java: [
                "for Loop",
                "while Loop",
                "do-while Loop",
                "Nested Loops",
                "Break Statement",
                "Continue Statement",
                "Loop Tracing",
                "Infinite Loop Understanding",
                "Solve 10 Loop-Based Programs"
            ],
            dsa: [
                "Array Traversal Using Loops",
                "Count Even Numbers",
                "Count Odd Numbers",
                "Find Maximum Using Loop",
                "Find Minimum Using Loop",
                "Array Sum Using Loop",
                "Frequency Count Using Loop",
                "Solve 5-8 Loop-Based Problems"
            ],
            coding: [
                "Count Digits",
                "Reverse Number",
                "Palindrome Number",
                "Sum of Digits",
                "Product of Digits",
                "Armstrong Number",
                "Strong Number",
                "Perfect Number",
                "Prime Number",
                "Prime Numbers in Range",
                "Fibonacci Series",
                "Solve 8-10 Coding Problems",
                "Right Triangle Pattern",
                "Inverted Triangle Pattern",
                "Number Triangle Pattern",
                "Star Pyramid Pattern",
                "Hollow Square Pattern",
                "Floyd's Triangle",
                "Pascal Triangle (Basic Understanding)",
                "Solve 5-8 Pattern Problems"
            ],
            interview: [
                "Self Introduction (2 Minutes)",
                "Explain Academic Project",
                "Practice Speaking for 10 Minutes"
            ],
            revision: [
                "Revise Day 1 Topics",
                "Revise Day 2 Topics",
                "Revise Day 3 Topics",
                "Re-code 3 Programs Without Seeing",
                "Update Mistake Notes"
            ]
        }
    },

    {
        day: 5,
        title: "Average + Arrays Deep Dive + 2D Arrays + Problem Solving",
        sections: {
            aptitude: [
                "Average Basics",
                "Average Formula",
                "Average of Numbers",
                "Average of Consecutive Numbers",
                "Average with Missing Value",
                "Weighted Average Basics",
                "Average Age Problems",
                "Average Marks Problems",
                "Average Speed Problems",
                "Solve 30-40 Average Questions"
            ],
            java: [
                "1D Array Revision",
                "Array Input",
                "Array Output",
                "Array Traversal",
                "Array Length",
                "User Input Array",
                "Solve 5 Array Programs"
            ],
            dsa: [
                "2D Array Basics",
                "Matrix Input",
                "Matrix Output",
                "Row Sum",
                "Column Sum",
                "Matrix Addition",
                "Matrix Traversal",
                "Transpose Matrix",
                "Diagonal Sum",
                "Solve 5 Matrix Problems",
                "Reverse Array",
                "Frequency Count",
                "Check Sorted Array",
                "Largest Element",
                "Smallest Element",
                "Second Largest Element",
                "Second Smallest Element",
                "Count Even/Odd Elements",
                "Sum of Array",
                "Average of Array",
                "Find Duplicate Elements",
                "Find Missing Number",
                "Move Zeros to End",
                "Remove Duplicates (Basic)",
                "Union of Two Arrays (Basic)",
                "Intersection of Two Arrays (Basic)",
                "Solve 10-15 Array Problems"
            ],
            coding: [
                "Largest Element Program",
                "Smallest Element Program",
                "Second Largest Program",
                "Array Reverse Program",
                "Frequency Count Program",
                "Check Sorted Program",
                "Missing Number Program",
                "Duplicate Element Program",
                "Move Zeros Program",
                "Linear Search Program",
                "Matrix Addition Program",
                "Transpose Matrix Program",
                "Solve 8-10 Coding Problems"
            ],
            interview: [
                "Tell Me About Yourself (2 Minutes)",
                "Explain One Project Clearly",
                "Practice Speaking for 10 Minutes"
            ],
            revision: [
                "Revise Day 1 to Day 4",
                "Re-code 5 Programs Without Seeing",
                "Write Short Notes",
                "Update Mistake Notebook"
            ]
        }
    },

    {
        day: 6,
        title: "Profit & Loss + Strings Deep Dive",
        sections: {
            aptitude: [
                "Cost Price (CP)",
                "Selling Price (SP)",
                "Profit Formula",
                "Loss Formula",
                "Profit Percentage",
                "Loss Percentage",
                "Discount Basics",
                "Marked Price",
                "Successive Discount",
                "Profit-Loss Word Problems",
                "Discount Word Problems",
                "Solve 30-40 Profit & Loss Questions"
            ],
            java: [
                "String Creation",
                "String vs StringBuilder",
                "Immutable Nature of String",
                "String Input",
                "length()",
                "charAt()",
                "substring()",
                "equals()",
                "equalsIgnoreCase()",
                "compareTo()",
                "toUpperCase()",
                "toLowerCase()",
                "trim()",
                "contains()",
                "replace()",
                "split()",
                "Solve 10 String Programs"
            ],
            dsa: [
                "String Traversal",
                "Reverse String",
                "Palindrome String",
                "Count Vowels",
                "Count Consonants",
                "Count Words",
                "Count Digits in String",
                "Remove Spaces",
                "Find Character Frequency",
                "Check Anagram",
                "Find Duplicate Characters",
                "Longest Word in Sentence",
                "Solve 8-10 String Problems"
            ],
            coding: [
                "Reverse String Program",
                "Palindrome String Program",
                "Anagram Program",
                "Character Frequency Program",
                "Vowel Count Program",
                "Remove Spaces Program",
                "Word Count Program",
                "Toggle Case Program",
                "Duplicate Character Program",
                "Longest Word Program",
                "Solve 8-10 Coding Problems"
            ],
            interview: [
                "Tell Me About Yourself (2 Minutes)",
                "Explain Your Strongest Project",
                "Practice Speaking for 10 Minutes"
            ],
            revision: [
                "Revise Day 1 to Day 5",
                "Re-code 5 Programs Without Seeing",
                "Update Mistake Notebook",
                "Write Important String Notes"
            ]
        }
    },

    {
        day: 7,
        title: "Weekly Revision + Placement Mock Test",
        sections: {
            aptitude: [
                "Revise Number System",
                "Revise LCM & HCF",
                "Revise Percentage",
                "Revise Ratio & Proportion",
                "Revise Average",
                "Revise Profit & Loss",
                "Solve 50 Aptitude Questions",
                "Analyze Wrong Answers"
            ],
            java: [
                "Revise Variables",
                "Revise Data Types",
                "Revise Operators",
                "Revise Conditional Statements",
                "Revise Loops",
                "Revise Arrays",
                "Revise Strings",
                "Solve 10 Java Programs"
            ],
            dsa: [
                "Array Traversal",
                "Largest Element",
                "Second Largest Element",
                "Frequency Count",
                "Linear Search",
                "Check Sorted Array",
                "Reverse Array",
                "Palindrome String",
                "Anagram Check",
                "Solve 10 DSA Problems"
            ],
            coding: [
                "Prime Number",
                "Palindrome Number",
                "Armstrong Number",
                "Factorial",
                "Fibonacci",
                "Reverse Number",
                "Reverse String",
                "Palindrome String",
                "Character Frequency",
                "Largest Element",
                "Solve 10 Coding Questions"
            ],
            interview: [
                "Tell Me About Yourself (2 Minutes)",
                "Explain CookieAI Project",
                "Explain Classroom Project",
                "Explain Canteen Project",
                "Practice Speaking for 15 Minutes"
            ],
            revision: [
                "Identify Weak Aptitude Topics",
                "Identify Weak Java Topics",
                "Identify Weak DSA Topics",
                "Update Mistake Notebook",
                "Prepare Plan for Week 2"
            ]
        }
    },

    {
        day: 8,
        title: "Simple Interest + Compound Interest + Methods & Functions",
        sections: {
            aptitude: [
                "Simple Interest Formula",
                "Simple Interest Problems",
                "Principal Amount",
                "Rate of Interest",
                "Time Period Problems",
                "Compound Interest Formula",
                "Annual Compound Interest",
                "Half-Yearly Compound Interest",
                "Difference Between SI & CI",
                "Compound Interest Word Problems",
                "Solve 30-40 SI & CI Questions"
            ],
            java: [
                "Methods Basics",
                "Method Declaration",
                "Method Definition",
                "Method Calling",
                "Return Type",
                "Void Method",
                "Parameterized Methods",
                "Method Arguments",
                "Pass By Value",
                "Method Overloading Basics",
                "Static Methods",
                "Solve 10 Method-Based Programs"
            ],
            dsa: [
                "Array Operations Using Methods",
                "Find Maximum Using Method",
                "Find Minimum Using Method",
                "Array Sum Using Method",
                "Reverse Array Using Method",
                "String Reverse Using Method",
                "Palindrome Check Using Method",
                "Solve 5-8 Method-Based Problems"
            ],
            coding: [
                "Simple Interest Program",
                "Compound Interest Program",
                "Calculator Using Methods",
                "Factorial Using Method",
                "Prime Number Using Method",
                "Palindrome Using Method",
                "Reverse Number Using Method",
                "Largest Of Three Using Method",
                "Sum Of Digits Using Method",
                "Fibonacci Using Method",
                "Solve 8-10 Coding Problems"
            ],
            interview: [
                "Tell Me About Yourself (2 Minutes)",
                "Explain One Project Flow",
                "Practice Speaking for 15 Minutes"
            ],
            revision: [
                "Revise Week 1 Aptitude",
                "Revise Arrays",
                "Revise Strings",
                "Re-code 5 Programs Without Seeing",
                "Update Mistake Notebook"
            ]
        }
    },

    {
        day: 9,
        title: "Time & Work + OOP Fundamentals",
        sections: {
            aptitude: [
                "Time and Work Basics",
                "Work Formula",
                "Efficiency Concept",
                "Individual Work Problems",
                "Combined Work Problems",
                "Men-Women Work Problems",
                "Pipes and Cisterns Basics",
                "Time and Work Shortcuts",
                "Work & Wages Basics",
                "Solve 30-40 Time and Work Questions"
            ],
            java: [
                "OOP Introduction",
                "Class Creation",
                "Object Creation",
                "Class vs Object",
                "Instance Variables",
                "Instance Methods",
                "this Keyword",
                "Object Reference",
                "Multiple Objects",
                "Memory Concept (Basic)",
                "Solve 10 OOP Programs"
            ],
            dsa: [
                "Create Array Utility Class",
                "Array Operations Using Objects",
                "Student Class with Array",
                "Store Multiple Students",
                "Search Student",
                "Display Student Details",
                "Solve 5-8 OOP Based Problems"
            ],
            coding: [
                "Student Class Program",
                "Employee Class Program",
                "Bank Account Class",
                "Book Class",
                "Mobile Class",
                "Rectangle Class",
                "Car Class",
                "Product Class",
                "College Student Record",
                "Solve 8-10 OOP Programs"
            ],
            interview: [
                "Explain OOP in Your Own Words",
                "Class vs Object",
                "What is this Keyword?",
                "Tell Me About Yourself",
                "Practice Speaking for 15 Minutes"
            ],
            revision: [
                "Revise Day 1-8 Topics",
                "Re-code 5 Programs Without Seeing",
                "Update Mistake Notebook",
                "Write OOP Notes"
            ]
        }
    },

    {
        day: 10,
        title: "Time Speed Distance + Constructors",
        sections: {
            aptitude: [
                "Time Speed Distance Basics",
                "Speed Formula",
                "Time Formula",
                "Distance Formula",
                "Unit Conversion (km/hr ↔ m/s)",
                "Average Speed",
                "Train Problems",
                "Relative Speed",
                "Boat and Stream Basics",
                "Race Problems",
                "Solve 30-40 TSD Questions"
            ],
            java: [
                "Constructor Basics",
                "Default Constructor",
                "Parameterized Constructor",
                "Constructor Overloading",
                "Constructor vs Method",
                "Object Initialization",
                "this() Constructor Chaining",
                "Multiple Constructors",
                "Solve 10 Constructor Programs"
            ],
            dsa: [
                "Student Class with Constructor",
                "Employee Class with Constructor",
                "Product Class with Constructor",
                "Array of Objects",
                "Store Multiple Objects",
                "Display Object Details",
                "Solve 5-8 OOP Problems"
            ],
            coding: [
                "Employee Class Program",
                "Student Management Program",
                "Bank Account Program",
                "Product Inventory Program",
                "Book Class Program",
                "Car Class Program",
                "Constructor Overloading Program",
                "Array of Employee Objects",
                "Solve 8-10 OOP Programs"
            ],
            interview: [
                "What is Constructor?",
                "Why Constructor is Used?",
                "Constructor vs Method",
                "What is Constructor Overloading?",
                "Practice Speaking for 15 Minutes"
            ],
            revision: [
                "Revise Day 1-9 Topics",
                "Re-code 5 Programs Without Seeing",
                "Update Mistake Notebook",
                "Write Constructor Notes"
            ]
        }
    },

    {
        day: 11,
        title: "Probability + Encapsulation + Data Hiding",
        sections: {
            aptitude: [
                "Probability Basics",
                "Experimental Probability",
                "Theoretical Probability",
                "Favorable Outcomes",
                "Total Outcomes",
                "Probability Formula",
                "Dice Problems",
                "Coin Toss Problems",
                "Card Selection Problems",
                "Complementary Probability",
                "Conditional Probability (Basic)",
                "Solve 30-40 Probability Questions"
            ],
            java: [
                "Encapsulation Basics",
                "Data Hiding",
                "Private Variables",
                "Getter Methods",
                "Setter Methods",
                "Generate Getters and Setters",
                "Validation Using Setters",
                "Read Only Fields",
                "Write Only Fields",
                "Solve 10 Encapsulation Programs"
            ],
            dsa: [
                "Student Class with Encapsulation",
                "Employee Class with Encapsulation",
                "Product Class with Encapsulation",
                "Validate User Input",
                "Store Data Securely",
                "Array of Encapsulated Objects",
                "Solve 5-8 OOP Problems"
            ],
            coding: [
                "Bank Account Program",
                "ATM Simulation Program",
                "Student Record System",
                "Employee Management System",
                "Product Management System",
                "Library Book System",
                "User Registration System",
                "Salary Validation Program",
                "Mobile Details Program",
                "Solve 8-10 OOP Programs"
            ],
            interview: [
                "What is Encapsulation?",
                "What is Data Hiding?",
                "Why Use Private Variables?",
                "Getter vs Setter",
                "Advantages of Encapsulation",
                "Practice Speaking for 15 Minutes"
            ],
            revision: [
                "Revise Day 1-10 Topics",
                "Re-code 5 Programs Without Seeing",
                "Update Mistake Notebook",
                "Write Encapsulation Notes"
            ]
        }
    },

    {
        day: 12,
        title: "Data Interpretation + Inheritance",
        sections: {
            aptitude: [
                "Introduction to Data Interpretation",
                "Table Based DI",
                "Bar Graph DI",
                "Pie Chart DI",
                "Line Graph DI",
                "Mixed Graph DI",
                "Percentage Based DI",
                "Ratio Based DI",
                "Average Based DI",
                "Profit Loss Based DI",
                "Time Speed Distance Based DI",
                "Caselet DI",
                "Data Comparison Questions",
                "Calculation Speed Practice",
                "Solve 30-40 DI Questions"
            ],
            java: [
                "Inheritance Fundamentals",
                "Code Reusability",
                "Parent Class",
                "Child Class",
                "extends Keyword",
                "super Keyword",
                "super() Constructor",
                "super Method Call",
                "Method Inheritance",
                "Variable Inheritance",
                "Constructor Inheritance",
                "Hierarchical Inheritance",
                "Multilevel Inheritance",
                "IS-A Relationship",
                "Solve 10 Inheritance Programs"
            ],
            dsa: [
                "Vehicle -> Car",
                "Vehicle -> Bike",
                "Person -> Student",
                "Person -> Employee",
                "Animal -> Dog",
                "Animal -> Cat",
                "Shape -> Circle",
                "Shape -> Rectangle",
                "Array of Child Objects",
                "Solve 5-8 OOP Problems"
            ],
            coding: [
                "Vehicle Management System",
                "Student Management System",
                "Employee Payroll System",
                "Bank Account Hierarchy",
                "Hospital Management Classes",
                "Library Management Classes",
                "College Management Classes",
                "Online Shopping Classes",
                "Inheritance Based Calculator",
                "Solve 8-10 OOP Programs"
            ],
            interview: [
                "What is Inheritance?",
                "Why Use Inheritance?",
                "Advantages of Inheritance",
                "Types of Inheritance in Java",
                "What is super Keyword?",
                "What is IS-A Relationship?",
                "Difference Between Composition and Inheritance",
                "Explain Real World Example of Inheritance",
                "Practice Technical Explanation"
            ],
            revision: [
                "Revise OOP Concepts",
                "Revise Constructors",
                "Revise Encapsulation",
                "Re-code 5 Programs Without Seeing",
                "Update Mistake Notebook",
                "Create OOP Summary Notes"
            ]
        }
    },

    {
        day: 13,
        title: "Logical Reasoning + Polymorphism + Abstraction",
        sections: {
            aptitude: [
                "Logical Reasoning Fundamentals",
                "Number Series",
                "Letter Series",
                "Alphanumeric Series",
                "Coding-Decoding",
                "Blood Relations",
                "Direction Sense",
                "Seating Arrangement",
                "Ranking Problems",
                "Syllogism",
                "Statement and Conclusion",
                "Statement and Assumption",
                "Analogy",
                "Odd One Out",
                "Puzzle Basics",
                "Solve 40-50 Reasoning Questions"
            ],
            java: [
                "Polymorphism Fundamentals",
                "Compile Time Polymorphism",
                "Runtime Polymorphism",
                "Method Overloading",
                "Rules of Method Overloading",
                "Method Overriding",
                "Rules of Method Overriding",
                "Dynamic Method Dispatch",
                "Upcasting",
                "Reference Variable vs Object",
                "Runtime Binding",
                "Solve 10 Polymorphism Programs",
                "Abstraction Fundamentals",
                "Abstract Class",
                "Abstract Methods",
                "Concrete Methods",
                "Interface Fundamentals",
                "Interface vs Abstract Class",
                "Multiple Inheritance Using Interface",
                "default Methods",
                "static Methods in Interface",
                "Functional Interface Basics",
                "Solve 5-8 Abstraction Programs"
            ],
            dsa: [
                "Shape -> Circle",
                "Shape -> Rectangle",
                "Shape -> Triangle",
                "Employee Salary Calculation",
                "Payment System",
                "Notification System",
                "Vehicle Hierarchy",
                "Bank Account Hierarchy",
                "Solve 5-8 OOP Problems"
            ],
            coding: [
                "Area Calculator Using Overloading",
                "Shape Program Using Overriding",
                "Employee Payroll System",
                "Banking System",
                "Vehicle Management System",
                "Online Payment System",
                "Student Result System",
                "Hospital Management System",
                "Library Management System",
                "Abstract Shape System",
                "Payment Gateway Using Interface",
                "Solve 8-10 OOP Programs"
            ],
            interview: [
                "What is Polymorphism?",
                "Method Overloading vs Overriding",
                "Compile Time vs Runtime Polymorphism",
                "What is Dynamic Binding?",
                "What is Upcasting?",
                "What is Abstraction?",
                "Abstract Class vs Interface",
                "Can Abstract Class Have Constructor?",
                "Can Interface Have Methods?",
                "Can Static Methods Be Overridden?",
                "Can Constructors Be Overridden?",
                "Real World Example of Polymorphism",
                "Real World Example of Abstraction",
                "Practice Technical Explanation"
            ],
            revision: [
                "Revise Encapsulation",
                "Revise Inheritance",
                "Revise Constructors",
                "Re-code 5 Programs Without Seeing",
                "Update Mistake Notebook",
                "Create OOP Revision Notes"
            ]
        }
    },

    {
        day: 14,
        title: "Java Collections Framework + HashMap Problem Solving",
        sections: {
            aptitude: [
                "Mixed Aptitude Revision",
                "Number System Revision",
                "Percentage Revision",
                "Ratio & Proportion Revision",
                "Profit & Loss Revision",
                "Time & Work Revision",
                "Probability Revision",
                "Data Interpretation Revision",
                "Logical Reasoning Revision",
                "Solve 40-50 Mixed Aptitude Questions"
            ],
            java: [
                "Collections Framework Overview",
                "List Interface",
                "Set Interface",
                "Map Interface",
                "ArrayList Fundamentals",
                "ArrayList Methods",
                "LinkedList Basics",
                "HashSet Fundamentals",
                "HashSet Methods",
                "HashMap Fundamentals",
                "HashMap Methods",
                "Iterator Interface",
                "Enhanced For Loop",
                "Collections Utility Class",
                "Comparable Interface",
                "Comparator Interface",
                "Solve 10 Collection Programs"
            ],
            dsa: [
                "Store Students Using ArrayList",
                "Store Employees Using ArrayList",
                "Remove Duplicate Elements Using HashSet",
                "Character Frequency Using HashMap",
                "Word Frequency Counter",
                "Student Search Using ArrayList",
                "Employee Lookup Using HashMap",
                "Top Frequency Element",
                "Solve 5-8 Collection Problems",
                "HashMap Time Complexity",
                "O(1) Average Case",
                "Collision Basics",
                "Hashing Concept"
            ],
            coding: [
                "Two Sum Using HashMap",
                "Frequency Count Using HashMap",
                "First Unique Character",
                "Duplicate Detection Using HashMap",
                "Character Frequency Counter",
                "Word Frequency Counter",
                "Count Occurrences",
                "Most Frequent Element",
                "HashMap Traversal",
                "HashMap Optimization",
                "Student Management System",
                "Employee Management System",
                "Library Management System",
                "Inventory Management System",
                "Word Frequency Counter",
                "Duplicate Detection System",
                "Contact Book Using HashMap",
                "Attendance Tracker",
                "Marks Management System",
                "Two Sum Problem",
                "Contains Duplicate",
                "Valid Anagram",
                "First Non-Repeating Character",
                "Majority Element (Basic)",
                "Solve 8-10 Collection Programs"
            ],
            interview: [
                "What is Collection Framework?",
                "Array vs ArrayList",
                "ArrayList vs LinkedList",
                "HashSet vs TreeSet",
                "HashMap vs Hashtable",
                "HashMap Internal Working",
                "Why HashMap is Fast?",
                "What is Load Factor?",
                "What is Hashing?",
                "What is Collision?",
                "How HashMap Stores Data?",
                "Difference Between HashMap and HashSet",
                "Difference Between HashMap and Hashtable",
                "Rehashing",
                "Comparable vs Comparator",
                "Practice Technical Explanation"
            ],
            revision: [
                "Revise OOP Concepts",
                "Revise Encapsulation",
                "Revise Inheritance",
                "Revise Polymorphism",
                "Re-code 5 Programs Without Seeing",
                "Update Mistake Notebook",
                "Create Collections Summary Notes"
            ]
        }
    },

    {
        day: 15,
        title: "Exception Handling + Week 2 Assessment",
        sections: {
            aptitude: [
                "Mixed Aptitude Practice",
                "Number System Questions",
                "Percentage Questions",
                "Ratio Questions",
                "Profit & Loss Questions",
                "Time & Work Questions",
                "Probability Questions",
                "Data Interpretation Questions",
                "Logical Reasoning Questions",
                "Solve 50 Mixed Aptitude Questions"
            ],
            java: [
                "Exception Fundamentals",
                "Exception Hierarchy",
                "Checked Exceptions",
                "Unchecked Exceptions",
                "try Block",
                "catch Block",
                "finally Block",
                "Multiple catch Blocks",
                "throw Keyword",
                "throws Keyword",
                "Custom Exception Basics",
                "Exception Propagation",
                "Solve 10 Exception Programs"
            ],
            dsa: [
                "Input Validation Using Exceptions",
                "Bank Account Exception Handling",
                "ATM Withdrawal Validation",
                "Student Marks Validation",
                "Age Validation System",
                "Division By Zero Handling",
                "File Exception Basics",
                "Solve 5-8 Practical Problems"
            ],
            coding: [
                "Calculator With Exception Handling",
                "Bank Account Program",
                "ATM Simulation",
                "Student Management Validation",
                "Login Validation Program",
                "Custom Exception Program",
                "Employee Salary Validation",
                "File Reading Exception Program",
                "Library Management Validation",
                "Solve 8-10 Programs"
            ],
            interview: [
                "What is Exception?",
                "Checked vs Unchecked Exception",
                "try vs catch vs finally",
                "throw vs throws",
                "Can finally block be skipped?",
                "Can we have multiple catch blocks?",
                "What is Custom Exception?",
                "Practice Technical Explanation"
            ],
            revision: [
                "20 Java MCQs",
                "10 OOP MCQs",
                "10 Collections MCQs",
                "5 Coding Problems",
                "1 Hour Timed Assessment",
                "Revise Constructors",
                "Revise Encapsulation",
                "Revise Inheritance",
                "Revise Polymorphism",
                "Revise Collections",
                "Re-code 5 Programs Without Seeing",
                "Update Mistake Notebook",
                "Create Java Core Summary Notes"
            ]
        }
    },

    {
        day: 16,
        title: "Linked List Fundamentals",
        sections: {
            aptitude: [
                "Mixed Aptitude Practice",
                "Time Speed Distance Questions",
                "Probability Questions",
                "Reasoning Questions",
                "Data Interpretation Questions",
                "Solve 40-50 Aptitude Questions"
            ],
            java: [],
            dsa: [
                "Why Linked List?",
                "Array vs Linked List",
                "Node Structure",
                "Head Pointer",
                "Linked List Traversal",
                "Linked List Length",
                "Singly Linked List",
                "Doubly Linked List",
                "Circular Linked List",
                "Time Complexity Analysis",
                "Create Node Class",
                "Create Linked List Class",
                "Insert At Beginning",
                "Insert At End",
                "Insert At Position",
                "Delete First Node",
                "Delete Last Node",
                "Delete By Value",
                "Search Element",
                "Display Linked List",
                "Count Nodes",
                "Solve 5-8 Linked List Problems"
            ],
            coding: [
                "Reverse Linked List",
                "Find Middle Node",
                "Search In Linked List",
                "Count Nodes",
                "Find Nth Node",
                "Insert Node",
                "Delete Node",
                "Detect Empty List",
                "Merge Two Lists (Basic)",
                "Solve 8-10 Linked List Programs"
            ],
            interview: [
                "What is Linked List?",
                "Array vs Linked List",
                "Advantages of Linked List",
                "Disadvantages of Linked List",
                "Types of Linked List",
                "Why Insertion is Fast?",
                "Why Random Access is Slow?",
                "Time Complexity of Operations",
                "Practice Technical Explanation"
            ],
            revision: [
                "Revise Collections",
                "Revise OOP",
                "Re-code Linked List Without Seeing",
                "Update Mistake Notebook",
                "Create Linked List Summary Notes"
            ]
        }
    },

    {
        day: 17,
        title: "Stack Fundamentals + Problem Solving",
        sections: {
            aptitude: [
                "Mixed Aptitude Practice",
                "Profit & Loss Questions",
                "Time & Work Questions",
                "Reasoning Questions",
                "Data Interpretation Questions",
                "Solve 40-50 Aptitude Questions"
            ],
            java: [
                "Stack Class",
                "Deque as Stack",
                "ArrayDeque Basics",
                "Stack vs ArrayDeque",
                "Collections Usage in Stack Problems"
            ],
            dsa: [
                "What is Stack?",
                "LIFO Principle",
                "Stack Operations",
                "Push Operation",
                "Pop Operation",
                "Peek Operation",
                "isEmpty Operation",
                "Stack Overflow",
                "Stack Underflow",
                "Applications of Stack",
                "Time Complexity Analysis",
                "Stack Using Array",
                "Stack Using ArrayList",
                "Stack Using Linked List",
                "Implement Push",
                "Implement Pop",
                "Implement Peek",
                "Implement isEmpty",
                "Display Stack Elements",
                "Solve 5-8 Stack Problems"
            ],
            coding: [
                "Balanced Parentheses",
                "Valid Parentheses",
                "Reverse String Using Stack",
                "Decimal to Binary Using Stack",
                "Undo Operation Design",
                "Browser History Design",
                "Minimum Stack (Basic)",
                "Next Greater Element (Intro)",
                "Evaluate Postfix Expression (Intro)",
                "Solve 8-10 Stack Programs"
            ],
            interview: [
                "What is Stack?",
                "LIFO vs FIFO",
                "Applications of Stack",
                "Stack vs Queue",
                "Where is Stack Used?",
                "Why Recursion Uses Stack?",
                "Time Complexity of Push/Pop",
                "Practice Technical Explanation"
            ],
            revision: [
                "Revise Linked List",
                "Revise Collections",
                "Re-code Stack Without Seeing",
                "Update Mistake Notebook",
                "Create Stack Summary Notes"
            ]
        }
    },

    {
        day: 18,
        title: "Queue Fundamentals + Implementation + Problem Solving",
        sections: {
            aptitude: [
                "Mixed Aptitude Practice",
                "Probability Questions",
                "Time Speed Distance Questions",
                "Reasoning Questions",
                "Data Interpretation Questions",
                "Solve 40-50 Aptitude Questions"
            ],
            java: [
                "Queue Interface",
                "LinkedList as Queue",
                "PriorityQueue Basics",
                "ArrayDeque Basics",
                "Queue vs Deque",
                "PriorityQueue Operations"
            ],
            dsa: [
                "What is Queue?",
                "FIFO Principle",
                "Queue Operations",
                "Enqueue Operation",
                "Dequeue Operation",
                "Front Operation",
                "Rear Operation",
                "isEmpty Operation",
                "Queue Overflow",
                "Queue Underflow",
                "Applications of Queue",
                "Time Complexity Analysis",
                "Queue Using Array",
                "Queue Using ArrayList",
                "Queue Using Linked List",
                "Circular Queue Basics",
                "Implement Enqueue",
                "Implement Dequeue",
                "Implement Front",
                "Implement Rear",
                "Display Queue Elements",
                "Solve 5-8 Queue Problems"
            ],
            coding: [
                "Queue Using Array",
                "Queue Using Linked List",
                "Circular Queue",
                "Generate Binary Numbers",
                "First Non-Repeating Character",
                "Queue Reversal",
                "Hot Potato Problem",
                "Printer Queue Simulation",
                "Ticket Booking Queue System",
                "Solve 8-10 Queue Programs"
            ],
            interview: [
                "What is Queue?",
                "FIFO vs LIFO",
                "Queue vs Stack",
                "Applications of Queue",
                "What is Circular Queue?",
                "What is Priority Queue?",
                "Where Queues Are Used?",
                "Time Complexity of Queue Operations",
                "Practice Technical Explanation"
            ],
            revision: [
                "Revise Linked List",
                "Revise Stack",
                "Revise Collections",
                "Re-code Queue Without Seeing",
                "Update Mistake Notebook",
                "Create Queue Summary Notes"
            ]
        }
    },

    {
        day: 19,
        title: "Searching Algorithms + Problem Solving",
        sections: {
            aptitude: [
                "Mixed Aptitude Practice",
                "Number System Questions",
                "Percentage Questions",
                "Reasoning Questions",
                "Data Interpretation Questions",
                "Solve 40-50 Aptitude Questions"
            ],
            java: [
                "Arrays.binarySearch()",
                "Custom Binary Search Implementation",
                "Recursion in Binary Search",
                "Searching with Collections"
            ],
            dsa: [
                "Searching Fundamentals",
                "Linear Search",
                "Binary Search",
                "When to Use Linear Search",
                "When to Use Binary Search",
                "Sorted vs Unsorted Arrays",
                "Iterative Binary Search",
                "Recursive Binary Search",
                "Time Complexity Analysis",
                "Space Complexity Analysis",
                "Linear Search in Array",
                "Linear Search in String",
                "Binary Search in Array",
                "Recursive Binary Search",
                "Count Occurrences",
                "First Occurrence",
                "Last Occurrence",
                "Search Insert Position",
                "Find Missing Number",
                "Solve 5-8 Searching Problems"
            ],
            coding: [
                "Linear Search Program",
                "Binary Search Program",
                "Find First Occurrence",
                "Find Last Occurrence",
                "Count Frequency of Element",
                "Search in Sorted Array",
                "Search in Reverse Sorted Array",
                "Find Peak Element (Intro)",
                "Square Root Using Binary Search",
                "Guess Number Game",
                "Solve 8-10 Searching Problems",
                "2 Easy Searching Problems",
                "2 Medium Searching Problems",
                "1 Timed Coding Challenge (30 Minutes)"
            ],
            interview: [
                "What is Searching?",
                "Linear Search vs Binary Search",
                "Why Binary Search is Faster?",
                "Prerequisite for Binary Search",
                "Time Complexity O(n)",
                "Time Complexity O(log n)",
                "Iterative vs Recursive Binary Search",
                "Practice Technical Explanation"
            ],
            revision: [
                "Revise Arrays",
                "Revise Strings",
                "Revise Linked List",
                "Revise Stack",
                "Revise Queue",
                "Update Mistake Notebook",
                "Create Searching Summary Notes"
            ]
        }
    },

    {
        day: 20,
        title: "Sorting Algorithms + Placement Problem Solving",
        sections: {
            aptitude: [
                "Mixed Aptitude Mock Test",
                "Number System Questions",
                "Percentage Questions",
                "Ratio & Proportion Questions",
                "Profit & Loss Questions",
                "Time & Work Questions",
                "Probability Questions",
                "Data Interpretation Questions",
                "Logical Reasoning Questions",
                "Solve 50 Aptitude Questions"
            ],
            java: [
                "Arrays.sort()",
                "Collections.sort()",
                "Comparator Basics",
                "Comparable Basics",
                "Custom Sorting Logic"
            ],
            dsa: [
                "Why Sorting?",
                "Bubble Sort",
                "Selection Sort",
                "Insertion Sort",
                "Stable vs Unstable Sorting",
                "In-place Sorting",
                "Best Case Analysis",
                "Average Case Analysis",
                "Worst Case Analysis",
                "Time Complexity Comparison",
                "Bubble Sort Implementation",
                "Selection Sort Implementation",
                "Insertion Sort Implementation",
                "Sort Ascending Order",
                "Sort Descending Order",
                "Sort String Array",
                "Sort User Input Array",
                "Count Swaps",
                "Trace Sorting Passes",
                "Solve 5-8 Sorting Problems"
            ],
            coding: [
                "Bubble Sort Program",
                "Selection Sort Program",
                "Insertion Sort Program",
                "Sort Student Marks",
                "Sort Employee Salaries",
                "Find Largest After Sorting",
                "Find Second Largest After Sorting",
                "Remove Duplicates After Sorting",
                "Sort Characters in String",
                "Sort Names Alphabetically",
                "Solve 8-10 Sorting Problems"
            ],
            interview: [
                "What is Sorting?",
                "Bubble Sort Time Complexity",
                "Selection Sort Time Complexity",
                "Insertion Sort Time Complexity",
                "Which Sorting is Better and Why?",
                "Stable vs Unstable Sorting",
                "In-place Sorting Meaning",
                "Practice Technical Explanation"
            ],
            revision: [
                "20 Java MCQs",
                "20 Aptitude MCQs",
                "10 OOP MCQs",
                "5 DSA Coding Problems",
                "1 Full Timed Mock Test",
                "Revise Arrays",
                "Revise Strings",
                "Revise Linked List",
                "Revise Stack",
                "Revise Queue",
                "Revise Searching",
                "Update Mistake Notebook",
                "Create Sorting Summary Notes",
                "Prepare For Phase 2"
            ]
        }
    },

    {
        day: 21,
        title: "Placement Mock Test 1 + Analysis",
        sections: {
            aptitude: [
                "10 Number System Questions",
                "10 Percentage Questions",
                "10 Ratio & Proportion Questions",
                "10 Profit & Loss Questions",
                "10 Time & Work Questions",
                "10 Time Speed Distance Questions",
                "10 Probability Questions",
                "10 Logical Reasoning Questions",
                "10 Data Interpretation Questions",
                "Total: 90 Aptitude Questions",
                "Time Limit: 90 Minutes"
            ],
            java: [
                "Variables & Data Types Program",
                "Conditional Statements Program",
                "Loop Based Program",
                "String Based Program",
                "Array Based Program",
                "OOP Program",
                "Collections Program",
                "Exception Handling Program",
                "Total: 8 Java Programs",
                "Time Limit: 60 Minutes"
            ],
            dsa: [
                "Array Problem",
                "String Problem",
                "Linked List Problem",
                "Stack Problem",
                "Queue Problem",
                "Searching Problem",
                "Sorting Problem",
                "HashMap Problem",
                "Total: 8 DSA Problems",
                "Time Limit: 90 Minutes"
            ],
            coding: [
                "Reverse String",
                "Palindrome Check",
                "Second Largest Element",
                "Frequency Count",
                "Valid Parentheses",
                "Binary Search",
                "Anagram Check",
                "Move Zeros To End",
                "Total: 8 Coding Problems"
            ],
            interview: [
                "Tell Me About Yourself",
                "Explain OOP Concepts",
                "Explain One Project",
                "Strengths & Weaknesses",
                "Why Should We Hire You?",
                "Practice Speaking for 20 Minutes"
            ],
            revision: [
                "Record Aptitude Score",
                "Record Coding Score",
                "Record Java Score",
                "Identify Weak Areas",
                "Update Mistake Notebook",
                "Prepare Improvement Plan",
                "Revise Wrong Answers",
                "Re-code Failed Programs",
                "Re-solve Failed Problems"
            ]
        }
    },

    {
        day: 22,
        title: "Weak Area Analysis + Improvement Day",
        sections: {
            aptitude: [
                "Analyze Mock Test Mistakes",
                "Identify Top 3 Weak Aptitude Topics",
                "Revise Formulas",
                "Re-solve Wrong Questions",
                "Solve 20 New Questions From Weak Topics",
                "Solve 20 Mixed Aptitude Questions"
            ],
            java: [
                "Analyze Java Mock Mistakes",
                "Identify Weak Java Concepts",
                "Revise OOP Concepts",
                "Revise Collections",
                "Revise Exception Handling",
                "Re-code Failed Programs",
                "Solve 5 New Java Programs"
            ],
            dsa: [
                "Analyze DSA Mistakes",
                "Identify Weak Data Structure",
                "Revise Arrays",
                "Revise Strings",
                "Revise Linked List",
                "Revise Stack",
                "Revise Queue",
                "Re-solve Failed Problems",
                "Solve 5 New DSA Problems"
            ],
            coding: [
                "Re-solve Wrong Coding Questions",
                "Optimize Previous Solutions",
                "Practice 5 Easy Problems",
                "Practice 3 Medium Problems",
                "Write Time Complexity for Each Solution"
            ],
            interview: [
                "Improve Self Introduction",
                "Improve Project Explanation",
                "Answer 10 HR Questions",
                "Answer 10 Java Technical Questions",
                "Practice Speaking for 20 Minutes"
            ],
            revision: [
                "Create Weak Topics List",
                "Create Formula Sheet",
                "Create Java Revision Sheet",
                "Create DSA Revision Sheet",
                "Update Mistake Notebook",
                "Solve 3 Previously Failed Problems",
                "Solve Without Notes",
                "Explain Solution Out Loud",
                "Track Improvement Percentage"
            ]
        }
    },

    {
        day: 23,
        title: "Placement Mock Test 2 + Coding Round Simulation",
        sections: {
            aptitude: [
                "Number System Questions",
                "Percentage Questions",
                "Ratio & Proportion Questions",
                "Average Questions",
                "Profit & Loss Questions",
                "Simple & Compound Interest Questions",
                "Time & Work Questions",
                "Time Speed Distance Questions",
                "Probability Questions",
                "Data Interpretation Questions",
                "Logical Reasoning Questions",
                "Solve 75-100 Aptitude Questions",
                "Time Limit: 90 Minutes"
            ],
            java: [
                "1 String Program",
                "1 Array Program",
                "1 OOP Program",
                "1 Collections Program",
                "1 Exception Handling Program",
                "Time Limit: 45 Minutes"
            ],
            dsa: [
                "Array Problem",
                "String Problem",
                "Linked List Problem",
                "Stack Problem",
                "Queue Problem",
                "Searching Problem",
                "Sorting Problem",
                "Time Limit: 60 Minutes"
            ],
            coding: [
                "Reverse String",
                "Palindrome Check",
                "Second Largest Element",
                "Anagram Check",
                "Binary Search",
                "Valid Parentheses",
                "Frequency Count",
                "Move Zeros To End",
                "Longest Common Prefix",
                "First Non-Repeating Character",
                "Solve 10 Coding Problems",
                "Time Limit: 90 Minutes"
            ],
            interview: [
                "Tell Me About Yourself",
                "Explain One Project End-to-End",
                "Explain OOP Concepts",
                "Why Should We Hire You?",
                "Practice Speaking for 20 Minutes"
            ],
            revision: [
                "Calculate Aptitude Accuracy",
                "Calculate Coding Accuracy",
                "Track Time Taken",
                "Identify Top 5 Mistakes",
                "Update Mistake Notebook",
                "Re-solve Wrong Questions",
                "Re-code Failed Programs",
                "Write Lessons Learned"
            ]
        }
    },

    {
        day: 24,
        title: "HR + Technical Interview Preparation",
        sections: {
            aptitude: [],
            java: [],
            dsa: [],
            coding: [],
            interview: [
                "Prepare 1 Minute Self Introduction",
                "Prepare 2 Minute Self Introduction",
                "Prepare Final Year Student Introduction",
                "Record and Review Introduction",
                "Practice Until Natural",
                "Tell Me About Yourself",
                "Why Should We Hire You?",
                "What Are Your Strengths?",
                "What Are Your Weaknesses?",
                "Where Do You See Yourself In 5 Years?",
                "Why Do You Want This Job?",
                "Why Should We Select You?",
                "Tell Me About A Challenge You Faced",
                "How Do You Handle Pressure?",
                "Are You Willing To Relocate?",
                "Practice 20 Common HR Questions",
                "Explain CookieAI Analytics Project",
                "Explain Classroom Project",
                "Explain Canteen Management Project",
                "Problem Statement",
                "Features",
                "Technology Stack",
                "Architecture Overview",
                "Database Design",
                "API Flow",
                "Challenges Faced",
                "How You Solved Challenges",
                "Future Improvements",
                "Explain OOP Concepts",
                "Explain Collections Framework",
                "Explain HashMap",
                "Explain Linked List",
                "Explain Stack",
                "Explain Queue",
                "Explain Binary Search",
                "Explain Sorting Algorithms",
                "Practice 20 Technical Questions",
                "Speak Continuously For 5 Minutes",
                "Speak Continuously For 10 Minutes",
                "Improve Eye Contact",
                "Improve Confidence",
                "Improve Clarity",
                "Avoid Filler Words",
                "Conduct Full HR Mock Interview",
                "Conduct Technical Mock Interview",
                "Answer Without Notes",
                "Record Responses",
                "Review Mistakes"
            ],
            revision: [
                "Create HR Question Notes",
                "Create Project Explanation Notes",
                "Create Technical Interview Notes",
                "Update Interview Mistake Notebook",
                "Answer Questions Out Loud",
                "Practice Positive Body Language",
                "Improve Speaking Speed",
                "Build Interview Confidence"
            ]
        }
    },

    {
        day: 25,
        title: "Project Mastery + Technical Discussion Preparation",
        sections: {
            aptitude: [],
            java: [],
            dsa: [],
            coding: [],
            interview: [
                "Problem Statement",
                "Project Objectives",
                "Frontend Architecture",
                "Backend Architecture",
                "Database Design",
                "Authentication Flow",
                "Analytics Tracking Flow",
                "API Design",
                "Socket.io Real-Time Updates",
                "Challenges Faced",
                "Optimizations Implemented",
                "Future Enhancements",
                "Explain Project End-to-End",
                "Problem Statement",
                "Features Overview",
                "User Flow",
                "Frontend Architecture",
                "Data Management",
                "Video Learning Flow",
                "Challenges Faced",
                "Future Improvements",
                "Explain Project End-to-End",
                "Problem Statement",
                "Student Flow",
                "Admin Flow",
                "Order Management",
                "Authentication Flow",
                "Database Design",
                "API Structure",
                "Challenges Faced",
                "Future Improvements",
                "Explain Project End-to-End",
                "Why React?",
                "Why Node.js?",
                "Why MongoDB?",
                "REST API Concepts",
                "JWT Authentication",
                "State Management",
                "Frontend vs Backend Responsibilities",
                "Database Relationships",
                "Practice 20 Project-Based Questions",
                "Request to Response Lifecycle",
                "Frontend to Backend Communication",
                "Database Query Flow",
                "Authentication Flow",
                "Error Handling Flow",
                "Deployment Flow",
                "Explain CookieAI in 2 Minutes",
                "Explain Classroom Project in 2 Minutes",
                "Explain Canteen Project in 2 Minutes",
                "Explain Favorite Project in 5 Minutes",
                "Answer Follow-Up Questions"
            ],
            revision: [
                "Create Project Notes",
                "Create Architecture Diagrams",
                "Create Project FAQ Sheet",
                "Update Technical Notes",
                "Explain Projects Without Notes",
                "Record Explanation",
                "Review Communication",
                "Improve Technical Clarity"
            ]
        }
    },

    {
        day: 26,
        title: "Coding Round Practice - Arrays + Strings + HashMap",
        sections: {
            aptitude: [
                "Solve 50 Mixed Aptitude Questions",
                "Data Interpretation Practice",
                "Logical Reasoning Practice",
                "Probability Practice",
                "Time Speed Distance Practice"
            ],
            java: [
                "Arrays + HashMap Programs",
                "Strings + HashMap Programs",
                "Collections Based Problems",
                "Solve Without Looking at Solutions"
            ],
            dsa: [
                "Largest Element",
                "Second Largest Element",
                "Move Zeros To End",
                "Remove Duplicates",
                "Check Sorted Array",
                "Reverse Array",
                "Missing Number",
                "Union of Arrays",
                "Intersection of Arrays",
                "Frequency Count",
                "Kadane Algorithm",
                "Two Sum",
                "Solve 10 Array Problems",
                "Reverse String",
                "Palindrome String",
                "Anagram Check",
                "Character Frequency",
                "Remove Spaces",
                "Longest Common Prefix",
                "First Non-Repeating Character",
                "Valid Parentheses",
                "String Compression",
                "Substring Problems",
                "Solve 10 String Problems",
                "HashMap Fundamentals",
                "Frequency Counter",
                "Duplicate Detection",
                "Two Sum Using HashMap",
                "Character Count",
                "Word Count",
                "First Unique Character",
                "Group Anagrams (Basic)",
                "HashMap Optimization",
                "Solve 8-10 HashMap Problems"
            ],
            coding: [
                "3 Easy Problems",
                "3 Medium Problems",
                "1 Timed Assessment (60 Minutes)",
                "Write Time Complexity",
                "Write Space Complexity"
            ],
            interview: [
                "Explain Two Sum",
                "Explain Kadane Algorithm",
                "Explain HashMap Internal Working",
                "Explain Time Complexity",
                "Practice Technical Explanation"
            ],
            revision: [
                "Track Solved Problems",
                "Track Accuracy",
                "Track Time Taken",
                "Update Mistake Notebook",
                "Re-solve Failed Problems"
            ]
        }
    },

    {
        day: 27,
        title: "Full Aptitude Mock Test + Analysis",
        sections: {
            aptitude: [
                "Number System Test",
                "LCM & HCF Test",
                "Percentage Test",
                "Ratio & Proportion Test",
                "Average Test",
                "Profit & Loss Test",
                "Simple & Compound Interest Test",
                "Time & Work Test",
                "Time Speed Distance Test",
                "Probability Test",
                "Data Interpretation Test",
                "Logical Reasoning Test",
                "Calculation Speed Check",
                "Shortcut Usage Check",
                "Time Management Check"
            ],
            java: [],
            dsa: [],
            coding: [],
            interview: [
                "15 Minutes Communication Practice",
                "5 HR Questions Practice"
            ],
            revision: [
                "100 Aptitude Questions",
                "120 Minute Timer",
                "No Notes",
                "No Google",
                "Real Placement Environment",
                "Calculate Accuracy %",
                "Calculate Attempt Rate",
                "Identify Weak Topics",
                "Identify Silly Mistakes",
                "Identify Time Consuming Topics",
                "Re-solve Wrong Questions",
                "Revise Weak Topics",
                "Create Formula Revision Sheet",
                "Update Aptitude Mistake Notebook"
            ]
        }
    },

    {
        day: 28,
        title: "Full Coding Round Mock Test + Analysis",
        sections: {
            aptitude: [],
            java: [],
            dsa: [
                "Array Coding Problem",
                "Searching Problem",
                "Sorting Problem",
                "Palindrome Problem",
                "Anagram Problem",
                "String Manipulation Problem",
                "Frequency Count Problem",
                "Two Sum Problem",
                "Linked List Problem",
                "Stack Problem",
                "Queue Problem"
            ],
            coding: [
                "2 Easy Problems",
                "3 Medium Problems",
                "1 Hard Problem"
            ],
            interview: [
                "Explain Every Solution",
                "Explain Time Complexity",
                "Explain Space Complexity",
                "Practice Technical Communication"
            ],
            revision: [
                "120 Minute Timer",
                "No Notes",
                "No Google",
                "No AI",
                "Real Coding Round Environment",
                "Check Compilation Errors",
                "Check Logic Errors",
                "Check Time Complexity",
                "Check Space Complexity",
                "Calculate Accuracy %",
                "Track Time Per Problem",
                "Re-solve Failed Problems",
                "Optimize Solutions",
                "Write Alternative Approaches",
                "Update Coding Mistake Notebook"
            ]
        }
    },

    {
        day: 29,
        title: "Full Interview Simulation",
        sections: {
            aptitude: [],
            java: [
                "OOP Concepts",
                "Encapsulation",
                "Inheritance",
                "Polymorphism",
                "Abstraction",
                "Collections Framework",
                "HashMap Internal Working",
                "Exception Handling",
                "String vs StringBuilder",
                "ArrayList vs LinkedList"
            ],
            dsa: [
                "Arrays Discussion",
                "Strings Discussion",
                "Linked List Discussion",
                "Stack Discussion",
                "Queue Discussion",
                "Searching Discussion",
                "Sorting Discussion",
                "Time Complexity Questions"
            ],
            coding: [
                "Explain Two Sum",
                "Explain Binary Search",
                "Explain Kadane Algorithm",
                "Explain Frequency Count",
                "Explain HashMap Usage"
            ],
            interview: [
                "Tell Me About Yourself",
                "Why Should We Hire You?",
                "What Are Your Strengths?",
                "What Are Your Weaknesses?",
                "Why Do You Want This Job?",
                "Where Do You See Yourself In 5 Years?",
                "How Do You Handle Pressure?",
                "Tell Me About A Challenge You Faced",
                "Explain Your Career Goals",
                "Relocation Question Practice",
                "Explain CookieAI Analytics",
                "Explain Classroom Project",
                "Explain Canteen Management Project",
                "Project Architecture Discussion",
                "Database Discussion",
                "Authentication Discussion",
                "API Flow Discussion",
                "Challenges Faced",
                "Future Improvements",
                "30 Minute Mock Interview",
                "Answer Without Notes",
                "Record Responses",
                "Review Communication",
                "Improve Confidence"
            ],
            revision: [
                "Identify Technical Weak Areas",
                "Identify Communication Weak Areas",
                "Update Interview Notes",
                "Create Improvement Plan"
            ]
        }
    },

    {
        day: 30,
        title: "Phase 1 Completion + Final Assessment",
        sections: {
            aptitude: [
                "Revise All Formulas",
                "Revise Shortcut Methods",
                "Solve 50 Mixed Questions",
                "Review Weak Topics"
            ],
            java: [
                "Revise Core Java",
                "Revise OOP",
                "Revise Collections",
                "Revise Exception Handling",
                "Review Java Notes"
            ],
            dsa: [
                "Revise Arrays",
                "Revise Strings",
                "Revise Linked List",
                "Revise Stack",
                "Revise Queue",
                "Revise Searching",
                "Revise Sorting"
            ],
            coding: [
                "Re-solve Top 10 Important Problems",
                "Review Time Complexity",
                "Review Space Complexity",
                "Practice Clean Coding"
            ],
            interview: [],
            revision: [
                "Review All Projects",
                "Review Architecture",
                "Review APIs",
                "Review Database Design",
                "Count Total Problems Solved",
                "Count Total Aptitude Questions Solved",
                "Identify Strong Areas",
                "Identify Weak Areas",
                "Review Mistake Notebook",
                "Set Phase 2 Goals",
                "Prepare Advanced DSA Plan",
                "Prepare Company-Specific Strategy",
                "Organize Notes",
                "Create Revision Checklist",
                "Review Progress From Day 1",
                "Celebrate Wins",
                "Build Confidence",
                "Prepare For Phase 2"
            ]
        }
    }
].map(withStats);

export default phase1;
