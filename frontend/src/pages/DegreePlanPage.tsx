import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthHeader } from '../components/AuthHeader';

type DegreeCourse = {
  id: number;
  category: string;
  code: string;
  title: string;
  credits: string;
  coreqs: string;
  prereqs: string;
  description: string;
};

type DegreePlanData = {
  id: number;
  degreeTitle: string;
  summary: string;
  courses: DegreeCourse[];
};

const DEGREE_PLANS: DegreePlanData[] = [
  {
    id: 1,
    degreeTitle: 'Bachelor of Science in Computer Science',
    summary: 'Complete degree plan for the Bachelor of Science in Computer Science, including core computer science courses, electives, and supporting mathematics and science courses.',
    courses: [
      {
        id: 1,
        category: 'Computer Science Core',
        code: 'CS 135/L',
        title: 'Computer Science I',
        credits: '3',
        coreqs: '',
        prereqs: 'MATH 127 OR MATH 128 OR MATH 181 OR higher',
        description: 'Problem-solving methods and algorithm development in a high-level programming language. Program design, coding, debugging, and documentation using techniques of good programming style. Program development in a powerful operating environment.',
      },
      {
        id: 2,
        category: 'Computer Science Core',
        code: 'CS 202',
        title: 'Computer Science II',
        credits: '3',
        coreqs: '',
        prereqs: 'CS 135',
        description: 'Data structures and algorithms for manipulating linked lists. String and file processing. Recursion, software engineering, structured programming and testing, especially larger programs.',
      },
      {
        id: 3,
        category: 'Computer Science Core',
        code: 'CS 218',
        title: 'Introduction to Systems Programming',
        credits: '3',
        coreqs: '',
        prereqs: 'CS 202 OR CS 238',
        description: 'Algorithms from systems programming including conversion, buffering, device drivers, assemblers and loaders. Use of system services, macros, and linkage conventions. Laboratory exercises programmed in assembly language.',
      },
      {
        id: 4,
        category: 'Computer Science Core',
        code: 'CS 219',
        title: 'Computer Organization',
        credits: '3',
        coreqs: '',
        prereqs: 'CS 218 AND CS 202',
        description: 'Basic organization of digital computers, including I/O units, arithmetic logic units, control units, and memory organization. Number and character representations. Instruction sets and addressing. Microprogramming.',
      },
      {
        id: 5,
        category: 'Computer Science Core',
        code: 'CS 301',
        title: 'Social Implications of Computer Technology',
        credits: '1',
        coreqs: '',
        prereqs: 'COM 101 OR HON 101; CS 218',
        description: 'In-depth examination of moral and ethical issues created by advancing computer technology. Review of ethical theories and examination of issues in malfunction liability, privacy, power, ownership and intellectual property. Discussion of social trends and their possible effects. Extensive reading, classroom discussion, and class presentations required.',
      },
      {
        id: 6,
        category: 'Computer Science Core',
        code: 'CS 302',
        title: 'Data Structures',
        credits: '3',
        coreqs: '',
        prereqs: 'CS 202 AND MATH 181',
        description: 'Introduction to sequential and linked structures. File access including sequential, indexed sequential and other file organizations. Internal structures including stacks, queues, trees, and graphs. Algorithms for implementing and manipulating structured objects. Big-O-notation.',
      },
      {
        id: 7,
        category: 'Computer Science Core',
        code: 'CS 326',
        title: 'Programming Languages, Concepts and Implementation',
        credits: '3',
        coreqs: '',
        prereqs: 'CS 302; CS 219 OR CpE 300',
        description: 'Design, evaluation and implementation of programming languages. Includes data types and data abstraction, sequence control and procedural abstraction, parameter passing techniques, scope rules, referencing environments and run-time storage management. Study and evaluation of a number of current programming languages.',
      },
      {
        id: 8,
        category: 'Computer Science Core',
        code: 'CS 370',
        title: 'Operating Systems',
        credits: '3',
        coreqs: '',
        prereqs: 'CS 302; CS219 OR CpE 300',
        description: 'Operating systems organization, sharing and allocation of system resources, protection mechanisms, and integration of system components.',
      },
      {
        id: 9,
        category: 'Computer Science Core',
        code: 'CS 456',
        title: 'Automata and Formal Languages',
        credits: '3',
        coreqs: '',
        prereqs: 'CS 302 AND MATH 251',
        description: 'Regular expressions. Regular, context-free, and unrestricted grammars. Finite and pushdown automata. Turing machines and the halting problem; introduction to decidability.',
      },
      {
        id: 10,
        category: 'Computer Science Core',
        code: 'CS 460',
        title: 'Compiler Construction',
        credits: '3',
        coreqs: '',
        prereqs: 'CS 326 AND CS 456',
        description: 'Current methods in the design and implementation of compilers. Construction of the components of an actual compiler as a term project.',
      },
      {
        id: 11,
        category: 'Computer Science Core',
        code: 'CS 472',
        title: 'Software Product Design and Development I',
        credits: '3',
        coreqs: '',
        prereqs: 'CS 326 AND CS 370',
        description: 'Current techniques in software design presented with emphasis on architecture first development. Introduction to the processes involved in development. Practice architectural design through a series of homework problems. Students work in teams to prepare the architecture for a software product.',
      },
      {
        id: 12,
        category: 'Computer Science Core',
        code: 'CS 477',
        title: 'Analysis of Algorithms',
        credits: '3',
        coreqs: '',
        prereqs: 'CS 302 AND MATH 251',
        description: 'Analysis of the time and space complexity of algorithms. Techniques for efficient algorithm design and effect of structure choice on efficiency. Fast algorithms for problems such as set, graph and matrix manipulations, pattern matching, sorting, and storage organization. Exponential time problems and introduction to NP-completeness.',
      },
      {
        id: 13,
        category: 'Computer Science Elective',
        code: 'CS 405',
        title: 'Analysis and Presentation',
        credits: '3',
        coreqs: '',
        prereqs: 'CS 302 OR CS 338',
        description: 'The material focuses on Data Science and "Big Data" concepts: analyzing large sets of data, identifying trends, and sharing results with other people. Throughout the semester, we will develop methods of data analysis, including both traditional statistical methods as well as contemporary machine learning and artificial intelligence techniques.',
      },
      {
        id: 14,
        category: 'Computer Science Elective',
        code: 'CS 422',
        title: 'Introduction to Machine Learning',
        credits: '3',
        coreqs: '',
        prereqs: 'STAT 411 OR STAT 463; CS 302',
        description: 'This course covers various machine learning algorithms for regression, classification, clustering and ensemble learning. Students will learn applying machine learning techniques to solve challenging problems in various fields.',
      },
      {
        id: 15,
        category: 'Computer Science Elective',
        code: 'CS 440',
        title: 'Autonomous Racing',
        credits: '3',
        coreqs: '',
        prereqs: 'CS 370',
        description: 'A systems approach to a complex Cyber-Physical System; an autonomous racing vehicle. Students will integrate distinct Computer Science disciplines related to autonomous vehicles into a single system and incorporate modern research into the performance of the vehicle.',
      },
      {
        id: 16,
        category: 'Computer Science Elective',
        code: 'CS 441',
        title: 'Advanced Internet Programming',
        credits: '2',
        coreqs: 'CS 441L',
        prereqs: 'CS 341 AND CS 370',
        description: 'Advanced Internet programming design and applications including client/server technologies and environment and software, client/server network operating systems, client/server database management systems, data warehousing environments, data mining, basic networking models and protocols, CASE tools, Groupware, Middleware, Internet security, privacy considerations.',
      },
      {
        id: 17,
        category: 'Computer Science Elective',
        code: 'CS 441L',
        title: 'Advanced Internet Programming Lab',
        credits: '1',
        coreqs: 'CS 441',
        prereqs: 'CS 341 AND CS 370',
        description: 'Helps student develop practical skills and learn to apply industry-wide standards and practices for advanced Internet and Internet 2 applications.',
      },
      {
        id: 18,
        category: 'Computer Science Elective',
        code: 'CS 442',
        title: 'Cloud Computing',
        credits: '3',
        coreqs: '',
        prereqs: 'CS 302',
        description: 'Exploration of cloud computing services, their use cases and applications, and an overview of best practices including security, scalability, and global infrastructure along with preparation for cloud computing professional certifications.',
      },
      {
        id: 19,
        category: 'Computer Science Elective',
        code: 'CS 443',
        title: 'Information Assurance',
        credits: '3',
        coreqs: '',
        prereqs: 'CS 302',
        description: 'Introduction to the principles of information assurance. Security awareness, survey of information security technologies, cryptography, management and administration techniques necessary to improve information security and respond to a security breach, survey of threats to information security, privacy in computing, legal and ethical issues relating to information security, and case studies.',
      },
      {
        id: 20,
        category: 'Computer Science Elective',
        code: 'CS 445',
        title: 'Internet Security',
        credits: '3',
        coreqs: '',
        prereqs: 'CS 370',
        description: 'Internet security theory and practice, advanced IP concepts, the concepts of stimulus and response in the context of securing a network, network packet and traffic analysis, internet protocol (IP) vulnerabilities, packet filtering, intrusion detection, internet exploits, exploit signatures, internet forensics, network security investigation.',
      },
      {
        id: 21,
        category: 'Computer Science Elective',
        code: 'CS 448',
        title: 'Computer Security',
        credits: '3',
        coreqs: '',
        prereqs: 'CS 370',
        description: 'Overview of computer security, threats, vulnerabilities and controls. Physical security, computer security policies and implementation plans, and computer forensics including penetration testing and investigation. Management issues. Legal, privacy and ethical issues.',
      },
      {
        id: 22,
        category: 'Computer Science Elective',
        code: 'CS 449',
        title: 'Computer and Network Forensics',
        credits: '3',
        coreqs: '',
        prereqs: 'CS 370',
        description: 'Basics of Computer Forensics and Network Forensics. How to protect your privacy on the internet: Email, obfuscation, web sites and servers. Encryption, data hiding, and hostile code. Investigating Windows and Unix. File system recovery/analysis and file management in different OSes. Technical and legal issues regarding digital evidence collection and forensics analysis.',
      },
      {
        id: 23,
        category: 'Computer Science Elective',
        code: 'CS 457',
        title: 'Database Management Systems',
        credits: '3',
        coreqs: '',
        prereqs: 'CS 302 AND MATH 251',
        description: 'Concepts and structures necessary for design and implementation of a database management system. Survey of current database management systems and use of a DBMS.',
      },
      {
        id: 24,
        category: 'Computer Science Elective',
        code: 'CS 465',
        title: 'Computer Networks I',
        credits: '3',
        coreqs: '',
        prereqs: 'CS 370',
        description: 'An introduction to the design and implementation of computer communication networks, their protocols and applications. It covers the technologies and standards in data transmission, telecommunication networks, network architectures, networking hardware, wireless networks, and the basis of the Internet including UDP and TCP as well as a number of application protocols.',
      },
      {
        id: 25,
        category: 'Computer Science Elective',
        code: 'CS 466',
        title: 'Computer Networks II',
        credits: '3',
        coreqs: '',
        prereqs: 'CS 465',
        description: 'Explores advanced topics in computer networks, the protocols, algorithms, hardware, and performance issues, especially in TCP/IP networks. Details of IP routing algorithms, quality of service, protocol implementation issues, router architecture and types, various TCP versions and their performance, the related telecommunication networks, and wireless technologies are discussed.',
      },
      {
        id: 26,
        category: 'Computer Science Elective',
        code: 'CS 470',
        title: 'Networks and Distributed Systems',
        credits: '3',
        coreqs: '',
        prereqs: 'CS 465',
        description: 'Explores protocols and experiments with creating and implementing new protocols. In addition, students will be introduced to concepts such as deadlocks in networks/distributed applications, communication in distributed systems, synchronization, reliability, transparency, and atomicity/transaction semantics.',
      },
      {
        id: 27,
        category: 'Computer Science Elective',
        code: 'CS 473',
        title: 'Software Product Design and Development II',
        credits: '3',
        coreqs: '',
        prereqs: 'CS 472',
        description: 'Synthesis (term project) course to involve students, working in teams, in all of the activities necessary to define, model, implement, test, document, and deliver a program product. Students practice Object-Oriented and Component Based development and utilize UML and CASE tools to model the product and document the process.',
      },
      {
        id: 28,
        category: 'Computer Science Elective',
        code: 'CS 480',
        title: 'Computer Graphics',
        credits: '3',
        coreqs: '',
        prereqs: 'CS 202 AND MATH 365',
        description: 'Graphics hardware, software and applications. Data structures for graphics, graphics languages, computer-aided design, and three-dimensional graphics.',
      },
      {
        id: 29,
        category: 'Computer Science Elective',
        code: 'CS 489',
        title: 'Advanced Computer Science Topics',
        credits: '3',
        coreqs: '',
        prereqs: '',
        description: 'Undergraduate-level course in advanced topics of computer science, depending upon the interest of faculty and students.',
      },
      {
        id: 30,
        category: 'Computer Science Elective',
        code: 'CS 490',
        title: 'Independent Study',
        credits: '1-3',
        coreqs: '',
        prereqs: '',
        description: 'Library research and reports on topics of computer science interest.',
      },
      {
        id: 31,
        category: 'Math/Science',
        code: 'MATH 181',
        title: 'Calculus I',
        credits: '4',
        coreqs: '',
        prereqs: 'MATH 127 OR MATH 128 OR Equivalent',
        description: 'Differentiation and integration of algebraic and transcendental functions, with applications.',
      },
      {
        id: 32,
        category: 'Math/Science',
        code: 'MATH 182',
        title: 'Calculus II',
        credits: '4',
        coreqs: '',
        prereqs: 'MATH 181',
        description: 'Further applications and techniques of integration including integration by parts, sequences and series, polynomial approximations.',
      },
      {
        id: 33,
        category: 'Math/Science',
        code: 'MATH 251',
        title: 'Discrete Mathematics I',
        credits: '3',
        coreqs: '',
        prereqs: 'MATH 182',
        description: 'Topics include set operations, Cartesian product, relations and functions, equivalence relation, graphs and digraphs, propositional calculus, truth tables, mathematical induction, elementary combinatorics with applications.',
      },
      {
        id: 34,
        category: 'Math/Science',
        code: 'MATH 365',
        title: 'Computational Linear Algebra',
        credits: '3',
        coreqs: '',
        prereqs: 'MATH 182; CS 117 OR CS 135',
        description: 'Matrices, linear systems of equations, linear programming, least-squares approximations, determinants, eigenvalues and eigenvectors, matrix inversion, elimination, iteration and other algorithms, precision and error analysis, of computational cost of algorithms. Emphasizes the practical methods using computer algorithms.',
      },
      {
        id: 35,
        category: 'Math/Science',
        code: 'STAT 411',
        title: 'Statistical Methods I',
        credits: '3',
        coreqs: '',
        prereqs: 'MATH 182',
        description: 'Collection and representation of information; elements of probability; Bernoulli trials, hypergeometric, binomial, Poisson and normal distributions; statistical sampling, estimation; testing hypotheses; parametric procedures for one-sample and two-sample problems.',
      },
      {
        id: 36,
        category: 'English',
        code: 'ENG 101',
        title: 'Composition I',
        credits: '3',
        coreqs: 'ENG 100L',
        prereqs: 'ENG 98',
        description: 'A writing-intensive course designed to improve critical thinking, reading, and writing skills across disciplines. Students develop strategies for turning their experience, observations, and analyses into evidence suitable for writing in a variety of genres.',
      },
      {
        id: 37,
        category: 'English',
        code: 'ENG 102',
        title: 'Composition II',
        credits: '3',
        coreqs: '',
        prereqs: 'ENG 101 AND ENG 101F',
        description: 'Builds on the critical thinking, reading, and writing skills developed in ENG 101. Students learn the processes necessary for collecting and incorporating research material into their writing. They learn to cite and document research sources and how to develop arguments and support them with sound evidence.',
      },
      {
        id: 38,
        category: 'Humanities',
        code: 'COM 101',
        title: 'Public Speaking',
        credits: '3',
        coreqs: '',
        prereqs: '',
        description: 'Overviews the basic principles of public speaking and delivering effective presentations. Topics include verbal and nonverbal delivery techniques, strategies to manage public speaking anxiety, speech organization, designing and using visual aids effectively, citing sources orally, and speech practice strategies.',
      },
      {
        id: 39,
        category: 'Humanities',
        code: 'PHIL 422',
        title: 'Advanced Logic',
        credits: '3',
        coreqs: '',
        prereqs: 'PHIL 114',
        description: 'Study of formal logic through first-order logic with identity. Soundness, completeness, compactness and other metatheorems. Other topics may include computability, modal logic, epistemic logic, many-valued logic, the logic of conditionals, higher-order logics, infinitary logics or non-monotonic logics, number theory, Gödel\'s theorems, and the limits of logicism.',
      },
      {
        id: 40,
        category: 'Philosophy',
        code: 'PHIL 114',
        title: 'Introduction to Symbolic Logic',
        credits: '3',
        coreqs: '',
        prereqs: '',
        description: 'Principles of correct reasoning, using modern symbolic techniques of propositional calculus and simple quantification.',
      },
      {
        id: 41,
        category: 'First Year Seminar',
        code: 'EGG 101',
        title: 'Introduction to Engineering Experience',
        credits: '1-2',
        coreqs: '',
        prereqs: '',
        description: 'Seminar: Introduction to UNLV learning outcomes and the programs that reside within the College of Engineering. Topics include professional ethics, technical communication, the design process, and technology\'s impact on a global society.',
      },
      {
        id: 42,
        category: 'First Year Seminar',
        code: 'EGG 202',
        title: 'Second Year Hands-on Design Experiences in Engineering and Computer Science',
        credits: '1',
        coreqs: '',
        prereqs: 'EGG 101',
        description: 'A holistic experience for second-year engineering and computer science students. Lab work, improve study skills, strengthen/solidify their sense of community, career paths exploration, update of their academic plan.',
      },
      {
        id: 43,
        category: 'Technical Writing',
        code: 'ENG 407B',
        title: 'Fundamentals of Technical Writing',
        credits: '3',
        coreqs: '',
        prereqs: '',
        description: 'Examines the rhetorical principles and composing practices necessary for writing effective technical documents and the role of writing in technical and industrial settings.',
      },
      {
        id: 44,
        category: 'Sciences',
        code: 'PHYS 195',
        title: 'Physics for Scientists and Engineers A',
        credits: '3',
        coreqs: 'PHYS 195L',
        prereqs: 'MATH 181',
        description: 'Calculus-based lecture in kinematics, forces, particle dynamics, work and energy, momentum and collisions, angular momentum and rotations, elasticity and oscillations, fluids, and thermophysics. Must take PHYS 196 to satisfy science requirement.',
      },
      {
        id: 45,
        category: 'Sciences',
        code: 'PHYS 195L',
        title: 'Physics for Scientists and Engineers Lab A',
        credits: '1',
        coreqs: 'PHYS 195',
        prereqs: 'MATH 181',
        description: 'Laboratory exercises in kinematics, forces, particle dynamics, work and energy, momentum and collisions, angular momentum and rotations, elasticity and oscillations, fluids, and thermophysics.',
      },
      {
        id: 46,
        category: 'Sciences',
        code: 'PHYS 196',
        title: 'Physics for Scientists and Engineers B',
        credits: '3',
        coreqs: 'PHYS 196L',
        prereqs: 'PHYS 195',
        description: 'Calculus-based lecture in waves and sound, electrostatics, magnetism, DC and AC circuits, electromagnetic waves, geometric and physical optics, quanta, atoms, relativity, nuclei, and elementary particles.',
      },
      {
        id: 47,
        category: 'Sciences',
        code: 'PHYS 196L',
        title: 'Physics for Scientists and Engineers Lab B',
        credits: '1',
        coreqs: 'PHYS 196',
        prereqs: 'PHYS 195 AND PHYS 195L',
        description: 'Laboratory exercises in waves and sound, electrostatics, magnetism, DC and AC circuits, electromagnetic waves, geometric and physical optics, quanta, atoms, relativity, nuclei, and elementary particles.',
      },
    ],
  },
  {
    id: 2,
    degreeTitle: 'Bachelor of Science in Business Administration, Finance',
    summary: 'A sample plan for the Finance degree showing foundational finance courses, business requirements, and electives.',
    courses: [
      {
        id: 1,
        category: 'Finance Core',
        code: 'FIN 301',
        title: 'Corporate Finance',
        credits: '3',
        coreqs: '',
        prereqs: 'ECON 101 OR ECON 102',
        description: 'Introduction to financial decision making in firms, including capital budgeting, capital structure, working capital management, and valuation.',
      },
      {
        id: 2,
        category: 'Finance Core',
        code: 'FIN 320',
        title: 'Investments',
        credits: '3',
        coreqs: '',
        prereqs: 'FIN 301',
        description: 'Fundamental principles of investing, portfolio theory, asset pricing models, and securities analysis.',
      },
      {
        id: 3,
        category: 'Finance Core',
        code: 'FIN 330',
        title: 'Financial Markets',
        credits: '3',
        coreqs: '',
        prereqs: 'FIN 301',
        description: 'Study of financial markets, trading mechanisms, risk management, and the role of institutions in the global financial system.',
      },
      {
        id: 4,
        category: 'Business Requirement',
        code: 'ACC 201',
        title: 'Financial Accounting',
        credits: '3',
        coreqs: '',
        prereqs: 'ENG 101',
        description: 'Introduction to accounting principles, financial statements, and reporting for business organizations.',
      },
      {
        id: 5,
        category: 'Business Elective',
        code: 'FIN 442',
        title: 'Risk Management',
        credits: '3',
        coreqs: '',
        prereqs: 'FIN 301',
        description: 'Study of risk identification, measurement, and mitigation techniques in financial decision making and corporate settings.',
      },
    ],
  },
];

export default function DegreePlanPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const plan = useMemo(
    () => DEGREE_PLANS.find((degree) => degree.id === Number(id)),
    [id]
  );

  if (!plan) {
    return (
      <div className="min-h-screen bg-gray-50 pt-5">
        <AuthHeader title="Degree Plan" />

        <div className="p-8 max-w-4xl mx-auto text-center text-gray-500">
          <p className="text-lg mb-4">Degree plan not found.</p>
          <button
            onClick={() => navigate('/explore-degrees')}
            className="text-green-600 underline"
          >
            Back to Explore Degrees
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-5">
      <AuthHeader title="Degree Plan" />

      <div className="p-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-900 mb-2">{plan.degreeTitle}</h2>
          <p className="text-gray-600 max-w-3xl">{plan.summary}</p>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          {plan.courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-green-700 font-semibold">
                    {course.category}
                  </p>
                  <h3 className="text-2xl font-semibold text-gray-900 mt-2">{course.code}</h3>
                  <p className="text-lg text-gray-700 mt-1">{course.title}</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex rounded-full bg-blue-100 text-blue-700 px-3 py-1 text-xs font-semibold">
                    {course.credits} credits
                  </span>
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-2 text-sm text-gray-600 mb-4">
                <div>
                  <span className="font-semibold text-gray-800">Coreqs:</span> {course.coreqs || 'None'}
                </div>
                <div>
                  <span className="font-semibold text-gray-800">Prereqs:</span> {course.prereqs || 'None'}
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed">{course.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
