import React, { useMemo, useState } from 'react';
import { useTable, usePagination, useGlobalFilter } from 'react-table';
import { useNavigate } from 'react-router-dom';
// hello
import {
  LayoutDashboard,
  ClipboardList,
  Search,
  Plus,
  Edit2,
  Trash2,
  Users,
  TrendingUp,
  CheckCircle,
  ChevronRight,
  MoreVertical,
  Download,
  X,
  CreditCard,
  CheckSquare,
  Circle,
  LogOut,
  Menu,
  Settings,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/Card';

// --- Types ---
interface Option {
  text: string;
  emoji: string;
}

interface Question {
  _id?: string;
  order: number;
  questionText: string;
  type: 'single-select' | 'multi-select' | 'text-input' | 'number-input';
  gender: 'both' | 'male' | 'female';
  options: Option[];
  isPopup: boolean;
  isActive: boolean;
}

interface Submission {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  questions: string;
  selectedOptions: string;
  date: string;
}

export const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    'analytics' | 'submissions' | 'questions'
  >('analytics');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(
    null
  );
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

  const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  };

  const handleExportCSV = () => {
    // Define headers
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Gender', 'Question', 'Selected Option', 'Date'];

    // Map data to rows
    const rows = submissionData.map((sub) => [
      sub.id,
      sub.name,
      sub.email,
      sub.phone,
      sub.gender,
      `"${sub.questions.replace(/"/g, '""')}"`,
      `"${sub.selectedOptions.replace(/"/g, '""')}"`,
      sub.date,
    ]);

    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');

    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `submissions_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- Questions CRUD State ---
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  // --- Form State ---
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newQuestionOrder, setNewQuestionOrder] = useState<number>(1);
  const [newQuestionType, setNewQuestionType] = useState<Question['type']>('single-select');
  const [newQuestionGender, setNewQuestionGender] = useState<Question['gender']>('both');
  const [newQuestionIsPopup, setNewQuestionIsPopup] = useState(false);
  const [newQuestionIsActive, setNewQuestionIsActive] = useState(true);
  const [newQuestionOptions, setNewQuestionOptions] = useState<Option[]>([]);

  React.useEffect(() => {
    if (activeTab === 'questions') {
      fetchQuestions();
    }
  }, [activeTab]);

  const fetchQuestions = async () => {
    setLoadingQuestions(true);
    try {
      const resp = await fetch(`${API_URL}/questions`, {
        headers: getHeaders(),
      });
      if (resp.ok) {
        const data = await resp.json();
        const questionsList = data.questions || [];
        setQuestions(questionsList.sort((a: Question, b: Question) => a.order - b.order));
      } else {
        const errorData = await resp.json().catch(() => ({}));
        console.error('Failed to fetch questions:', resp.status, errorData);
        if (resp.status === 401) {
          alert('Session expired. Please login again.');
          handleLogout();
        }
      }
    } catch (err) {
      console.error('Failed to fetch questions:', err);
      alert('Cannot connect to the backend server. Please ensure the backend is running at ' + API_URL);
    } finally {
      setLoadingQuestions(false);
    }
  };

  // --- Submission Data ---
  const submissionData = useMemo<Submission[]>(
    () => [
      {
        id: 'S1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        gender: 'Male',
        questions: 'How familiar are you with the Mediterranean Diet?',
        selectedOptions: 'I know it pretty well',
        date: '2026-02-18',
      },
      {
        id: 'S2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+1987654321',
        gender: 'Female',
        questions: 'What is your main goal right now?',
        selectedOptions: 'Improve my health',
        date: '2026-02-18',
      },
      {
        id: 'S3',
        name: 'David Lee',
        email: 'david@example.com',
        phone: '+1122334455',
        gender: 'Male',
        questions: 'What is your goal weight?',
        selectedOptions: '160 lbs',
        date: '2026-02-17',
      },
      {
        id: 'S4',
        name: 'Alice Brown',
        email: 'alice@example.com',
        phone: '+1444556677',
        gender: 'Female',
        questions: 'What is your main goal right now?',
        selectedOptions: 'Feel more confident',
        date: '2026-02-17',
      },
      {
        id: 'S5',
        name: 'Robert White',
        email: 'robert@example.com',
        phone: '+1555443322',
        gender: 'Male',
        questions: 'How familiar are you with the Mediterranean Diet?',
        selectedOptions: 'I’ve tried it before',
        date: '2026-02-16',
      },
      {
        id: 'S6',
        name: 'Lucy Green',
        email: 'lucy@example.com',
        phone: '+1230987654',
        gender: 'Female',
        questions: 'Stubborn weight gain symptoms?',
        selectedOptions: '⚖️ Stubborn weight gain',
        date: '2026-02-16',
      },
      {
        id: 'S7',
        name: 'Ethan Hunt',
        email: 'ethan@imf.org',
        phone: '+1000000000',
        gender: 'Male',
        questions: 'What is your goal weight?',
        selectedOptions: '170+ lbs',
        date: '2026-02-15',
      },
      {
        id: 'S8',
        name: 'Sarah Connor',
        email: 'sarah@resistance.com',
        phone: '+1999888777',
        gender: 'Female',
        questions: 'What is your main goal right now?',
        selectedOptions: 'Save time on meal prep',
        date: '2026-02-15',
      },
    ],
    []
  );

  // --- Submissions Table Config ---
  const columns = useMemo(
    () => [
      {
        Header: 'User Info',
        accessor: (row: Submission) => (
          <div className="flex flex-col">
            <span className="text-foreground font-bold">{row.name}</span>
            <span className="text-muted-foreground text-xs">{row.email}</span>
          </div>
        ),
        id: 'user',
      },
      { Header: 'Gender', accessor: 'gender' },
      {
        Header: 'Response',
        accessor: (row: Submission) => (
          <div className="flex max-w-[200px] flex-col">
            <span className="text-muted-foreground truncate text-xs">
              {row.questions}
            </span>
            <span className="truncate font-medium" title={row.selectedOptions}>
              {row.selectedOptions}
            </span>
          </div>
        ),
        id: 'response',
      },
      { Header: 'Date', accessor: 'date' },
      {
        Header: 'Actions',
        accessor: (row: Submission) => (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 rounded-full p-0"
            onClick={() => {
              setSelectedSubmission(row);
              setIsSubmissionModalOpen(true);
            }}
          >
            <MoreVertical className="text-muted-foreground h-4 w-4" />
          </Button>
        ),
        id: 'actions',
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { pageIndex },
    canNextPage,
    canPreviousPage,
    pageCount,
    nextPage,
    previousPage,
  } = useTable<Submission>(
    {
      columns,
      data: submissionData,
      initialState: { pageIndex: 0, pageSize: 6 },
    },
    useGlobalFilter,
    usePagination
  );

  // --- Handlers ---

  const handleSaveQuestion = async () => {
    if (!newQuestionText.trim()) {
      alert('Question text is required');
      return;
    }

    const questionData: Partial<Question> = {
      order: newQuestionOrder,
      questionText: newQuestionText,
      type: newQuestionType,
      gender: newQuestionGender,
      options: newQuestionOptions,
      isPopup: newQuestionIsPopup,
      isActive: newQuestionIsActive,
    };

    try {
      const url = editingQuestion
        ? `${API_URL}/questions/${editingQuestion._id}`
        : `${API_URL}/questions`;

      const method = editingQuestion ? 'PUT' : 'POST';

      const resp = await fetch(url, {
        method,
        headers: getHeaders(),
        body: JSON.stringify(questionData),
      });

      if (resp.ok) {
        fetchQuestions();
        closeModal();
      } else {
        const err = await resp.json();
        alert(`Error: ${err.message || 'Failed to save question'}`);
      }
    } catch (err) {
      console.error('Error saving question:', err);
      alert('API Error. Check console.');
    }
  };

  const openEditModal = (q: Question) => {
    setEditingQuestion(q);
    setNewQuestionText(q.questionText);
    setNewQuestionOrder(q.order);
    setNewQuestionType(q.type);
    setNewQuestionGender(q.gender);
    setNewQuestionIsPopup(q.isPopup);
    setNewQuestionIsActive(q.isActive);
    setNewQuestionOptions([...q.options]);
    setIsAddingQuestion(true);
  };

  const closeModal = () => {
    setIsAddingQuestion(false);
    setEditingQuestion(null);
    setNewQuestionText('');
    setNewQuestionOrder(questions.length + 1);
    setNewQuestionType('single-select');
    setNewQuestionGender('both');
    setNewQuestionIsPopup(false);
    setNewQuestionIsActive(true);
    setNewQuestionOptions([]);
  };

  const handleDeleteQuestion = async (id: string) => {
    if (confirm('Are you sure you want to delete this question?')) {
      try {
        const resp = await fetch(`${API_URL}/questions/${id}`, {
          method: 'DELETE',
          headers: getHeaders(),
        });
        if (resp.ok) {
          fetchQuestions();
        }
      } catch (err) {
        console.error('Error deleting question:', err);
      }
    }
  };

  const handleAddOption = () => {
    setNewQuestionOptions([...newQuestionOptions, { text: '', emoji: '' }]);
  };

  const handleUpdateOption = (index: number, field: keyof Option, value: string) => {
    const updated = [...newQuestionOptions];
    updated[index] = { ...updated[index], [field]: value };
    setNewQuestionOptions(updated);
  };

  const handleRemoveOption = (index: number) => {
    setNewQuestionOptions(newQuestionOptions.filter((_, i) => i !== index));
  };

  const seedDefaultQuestions = async () => {
    if (!confirm('This will add the default set of questions to your database. Continue?')) return;

    const defaultQuestions: Partial<Question>[] = [
      { order: 2, questionText: "How old are you?", type: "single-select", gender: "both", options: [{ text: "Under 30", emoji: "🧒" }, { text: "30–39", emoji: "🧑" }, { text: "40–49", emoji: "🧑‍🦳" }, { text: "50–59", emoji: "👴" }, { text: "60+", emoji: "🧓" }], isPopup: false, isActive: true },
      { order: 3, questionText: "How familiar are you with the Mediterranean Diet?", type: "single-select", gender: "both", options: [{ text: "Beginner", emoji: "🌱" }, { text: "I know the basics", emoji: "📖" }, { text: "I've tried it before, but didn't stick with it", emoji: "🔄" }, { text: "I know it pretty well", emoji: "✅" }], isPopup: false, isActive: true },
      { order: 4, questionText: "What is your main goal right now?", type: "single-select", gender: "both", options: [{ text: "Improve my health", emoji: "❤️" }, { text: "Feel more confident", emoji: "💪" }, { text: "Look better", emoji: "✨" }, { text: "Increase energy", emoji: "⚡" }, { text: "Set a good example for my family", emoji: "👨‍👩‍👧" }, { text: "Feel better day to day", emoji: "🌞" }], isPopup: false, isActive: true },
      { order: 5, questionText: "Where are the areas you would like to improve the most?", type: "multi-select", gender: "male", options: [{ text: "Belly / waist", emoji: "🎯" }, { text: "Chest", emoji: "💪" }, { text: "Arms", emoji: "🦾" }, { text: "Back", emoji: "🏋️" }, { text: "Overall fitness", emoji: "🏃" }], isPopup: false, isActive: true },
      { order: 6, questionText: "Where are the areas you would like to improve the most?", type: "multi-select", gender: "female", options: [{ text: "Belly / waist", emoji: "🎯" }, { text: "Hips & thighs", emoji: "🍑" }, { text: "Arms", emoji: "🦾" }, { text: "Bust / chest", emoji: "💕" }, { text: "Overall fitness", emoji: "🏃‍♀️" }], isPopup: false, isActive: true },
      { order: 7, questionText: "What is your height?", type: "text-input", gender: "both", options: [], isPopup: false, isActive: true },
      { order: 8, questionText: "What is your current weight?", type: "number-input", gender: "both", options: [], isPopup: false, isActive: true },
      { order: 9, questionText: "What is your goal weight?", type: "number-input", gender: "both", options: [], isPopup: false, isActive: true },
      { order: 10, questionText: "What was the first sign your body was starting to change?", type: "single-select", gender: "both", options: [{ text: "Stubborn weight gain (especially around the belly)", emoji: "⚖️" }, { text: "Bloating or digestive discomfort", emoji: "🫃" }, { text: "Brain fog or memory lapses", emoji: "☁️" }, { text: "Mood swings or irritability", emoji: "😤" }, { text: "Poor or disrupted sleep", emoji: "😴" }, { text: "Fatigue or low energy", emoji: "🔋" }, { text: "Cravings or emotional eating", emoji: "🍫" }], isPopup: false, isActive: true },
      { order: 11, questionText: "How does your hunger feel throughout the day?", type: "single-select", gender: "both", options: [{ text: "Steady at meals", emoji: "🍽️" }, { text: "Not hungry earlier, more hungry at night", emoji: "🌙" }, { text: "Grazing all day", emoji: "🐑" }, { text: "Up and down depending on stress or tiredness", emoji: "📈" }], isPopup: false, isActive: true },
      { order: 12, questionText: "When cravings hit, what do you reach for?", type: "single-select", gender: "both", options: [{ text: "Sugar and desserts", emoji: "🍰" }, { text: "Salty or crunchy snacks", emoji: "🥨" }, { text: "Fatty foods", emoji: "🍟" }, { text: "It depends on my stress levels", emoji: "😰" }, { text: "I don't get cravings", emoji: "🙅" }], isPopup: false, isActive: true },
      { order: 13, questionText: "Which energy pattern sounds most like you?", type: "single-select", gender: "both", options: [{ text: "Always tired", emoji: "😴" }, { text: "Afternoon slump", emoji: "📉" }, { text: "Up and down", emoji: "🎢" }, { text: "Mostly steady", emoji: "⚡" }], isPopup: false, isActive: true },
      { order: 14, questionText: "How often do you experience puffiness or bloating?", type: "single-select", gender: "both", options: [{ text: "Rarely", emoji: "✅" }, { text: "A few times a week", emoji: "📅" }, { text: "Most days", emoji: "😕" }, { text: "Constantly", emoji: "😩" }], isPopup: false, isActive: true },
      { order: 15, questionText: "How often do you feel stressed or overwhelmed?", type: "single-select", gender: "both", options: [{ text: "Almost always", emoji: "🤯" }, { text: "Several times a day", emoji: "😰" }, { text: "Occasionally", emoji: "😐" }, { text: "Rarely", emoji: "😌" }], isPopup: false, isActive: true },
      { order: 16, questionText: "How active are you right now?", type: "single-select", gender: "both", options: [{ text: "Very active (5+ workouts/week)", emoji: "🏋️" }, { text: "Somewhat active (2–4 workouts/week)", emoji: "🚴" }, { text: "Light activity", emoji: "🚶" }, { text: "Not active", emoji: "🛋️" }], isPopup: false, isActive: true },
      { order: 17, questionText: "How is your sleep, on average?", type: "single-select", gender: "both", options: [{ text: "Very poor", emoji: "😖" }, { text: "Broken or inconsistent", emoji: "🌀" }, { text: "Mostly okay", emoji: "😐" }, { text: "Consistent and restful", emoji: "😴" }], isPopup: false, isActive: true },
      { order: 18, questionText: "Are you working toward a specific event?", type: "single-select", gender: "both", options: [{ text: "Yes, within 4 weeks", emoji: "📅" }, { text: "Yes, 1–3 months away", emoji: "🗓️" }, { text: "Yes, later this year", emoji: "🎯" }, { text: "No specific event", emoji: "🙂" }], isPopup: false, isActive: true },
      { order: 19, questionText: "Any dietary preferences or restrictions?", type: "multi-select", gender: "both", options: [{ text: "Everything", emoji: "🍽️" }, { text: "Vegan", emoji: "🌿" }, { text: "Vegetarian", emoji: "🥦" }, { text: "Gluten Free", emoji: "🌾" }, { text: "Dairy Free", emoji: "🥛" }, { text: "Pescatarian", emoji: "🐟" }], isPopup: false, isActive: true },
      { order: 20, questionText: "Select your preferred protein sources", type: "multi-select", gender: "both", options: [{ text: "Fish (salmon, tuna, sardines)", emoji: "🐟" }, { text: "Shellfish (prawns, mussels, calamari)", emoji: "🦐" }, { text: "Chicken or turkey", emoji: "🍗" }, { text: "Eggs", emoji: "🥚" }, { text: "Greek yogurt, cottage cheese, or cheese", emoji: "🧀" }, { text: "Legumes (lentils, chickpeas, beans)", emoji: "🫘" }, { text: "Tofu or tempeh", emoji: "🌱" }, { text: "Red meat (beef, lamb, pork)", emoji: "🥩" }, { text: "Plant-based protein alternatives", emoji: "🌿" }, { text: "No strong preference", emoji: "🤷" }], isPopup: false, isActive: true },
      { order: 21, questionText: "Which vegetables do you enjoy eating regularly?", type: "multi-select", gender: "both", options: [{ text: "Leafy greens (spinach, kale, rocket)", emoji: "🥬" }, { text: "Tomatoes", emoji: "🍅" }, { text: "Peppers (capsicum)", emoji: "🫑" }, { text: "Zucchini or eggplant", emoji: "🥒" }, { text: "Broccoli or cauliflower", emoji: "🥦" }, { text: "Root vegetables (carrots, sweet potato, beetroot)", emoji: "🥕" }, { text: "Onions, garlic, leeks", emoji: "🧅" }, { text: "Mushrooms", emoji: "🍄" }, { text: "Legumes (beans, lentils)", emoji: "🫘" }, { text: "I struggle to eat vegetables", emoji: "😅" }], isPopup: false, isActive: true },
      { order: 22, questionText: "Which fruits do you enjoy eating regularly?", type: "multi-select", gender: "both", options: [{ text: "Berries (strawberries, blueberries, raspberries)", emoji: "🍓" }, { text: "Citrus fruits (oranges, mandarins, lemons)", emoji: "🍊" }, { text: "Apples or pears", emoji: "🍎" }, { text: "Bananas", emoji: "🍌" }, { text: "Stone fruit (peaches, nectarines, plums)", emoji: "🍑" }, { text: "Grapes", emoji: "🍇" }, { text: "Melon", emoji: "🍈" }, { text: "Figs or dates", emoji: "🫐" }, { text: "I don't eat much fruit", emoji: "😐" }, { text: "No strong preference", emoji: "🤷" }], isPopup: false, isActive: true },
      { order: 23, questionText: "Which meal style suits you best?", type: "single-select", gender: "both", options: [{ text: "3 Balanced meals per day", emoji: "🍽️" }, { text: "2 Meals with snacks", emoji: "🥙" }, { text: "Light meals throughout the day", emoji: "🥗" }, { text: "I'm not sure - I need guidance", emoji: "🤔" }], isPopup: false, isActive: true },
      { order: 24, questionText: "How likely are you to finish what you start when it comes to health goals?", type: "single-select", gender: "both", isPopup: true, options: [{ text: "Very likely — I follow through", emoji: "🏆" }, { text: "I start strong but lose momentum", emoji: "📉" }, { text: "I struggle to stay consistent", emoji: "😓" }, { text: "I usually stop once life gets busy", emoji: "⏸️" }], isActive: true },
      { order: 25, questionText: "What usually gets in the way when things don't stick?", type: "single-select", gender: "both", isPopup: true, options: [{ text: "Plans are too complicated", emoji: "🤯" }, { text: "I don't see results quickly enough", emoji: "⏳" }, { text: "My routine changes week to week", emoji: "🔄" }, { text: "I lose motivation over time", emoji: "😔" }], isActive: true },
    ];

    setLoadingQuestions(true);
    let successCount = 0;
    try {
      for (const q of defaultQuestions) {
        const resp = await fetch(`${API_URL}/questions`, {
          method: 'POST',
          headers: getHeaders(),
          body: JSON.stringify(q),
        });
        if (resp.ok) {
          successCount++;
        } else {
          const errData = await resp.json().catch(() => ({}));
          console.error(`Failed to seed question: ${q.questionText}`, errData);
        }
      }

      if (successCount > 0) {
        alert(`${successCount} questions seeded successfully!`);
        fetchQuestions();
      } else {
        alert('Failed to seed questions. Check console or verify your login status.');
      }
    } catch (err) {
      console.error('Seeding error:', err);
      alert('Connection error while seeding. Is the backend running?');
    } finally {
      setLoadingQuestions(false);
    }
  };

  return (
    <div className="bg-muted/30 text-foreground flex min-h-screen font-sans">
      {/* --- Sidebar --- */}
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside className={`bg-white border-r border-[#1a1a1b]/5 fixed inset-y-0 z-50 flex w-72 flex-col shadow-xl transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-8 pb-4 flex items-center justify-between">
          <div
            className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate('/')}
          >
            <img
              src="/logo.png"
              alt="The Mediterranean Diet"
              className="h-10 w-auto object-contain"
            />
          </div>
          <button
            className="lg:hidden p-2 text-[#1a1a1b]/60 hover:text-[#1a1a1b]"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mt-8 flex-1 space-y-2 px-4">
          <SidebarHeader title="Main Menu" />
          <SidebarLink
            icon={<LayoutDashboard size={20} />}
            label="Overview"
            active={activeTab === 'analytics'}
            onClick={() => setActiveTab('analytics')}
          />
          <SidebarLink
            icon={<ClipboardList size={20} />}
            label="Submissions"
            active={activeTab === 'submissions'}
            onClick={() => setActiveTab('submissions')}
            badge={submissionData.length}
          />

          <div className="pt-6">
            <SidebarHeader title="Management" />
            <SidebarLink
              icon={<Settings size={20} />}
              label="Question Bank"
              active={activeTab === 'questions'}
              onClick={() => setActiveTab('questions')}
            />
          </div>

          <div className="mt-auto pt-6 border-t border-[#1a1a1b]/5">
            <SidebarLink
              icon={<LogOut size={20} />}
              label="Log Out"
              onClick={handleLogout}
            />
          </div>
        </nav>

        <div className="border-t border-[#1a1a1b]/5 bg-muted/30 p-6">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-[#D90655] to-[#FC3F39] shadow-primary/20 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white shadow-lg">
              AD
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="truncate text-sm font-bold text-[#1a1a1b]">Admin User</span>
              <span className="truncate text-xs text-[#1a1a1b]/50">
                admin@quizmaster.com
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* --- Main Content --- */}
      <main className="flex min-w-0 flex-1 flex-col lg:ml-72 transition-all duration-300">
        {/* Header */}
        <header className="bg-background/80 sticky top-0 z-20 flex h-16 md:h-20 items-center justify-between border-b px-4 md:px-8 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 text-foreground/60 hover:text-foreground"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="flex flex-col">
              <h1 className="text-foreground text-xl md:text-2xl font-bold tracking-tight capitalize">
                {activeTab === 'questions' ? 'Question Bank' : activeTab}
              </h1>
              <p className="text-muted-foreground mt-0.5 text-[10px] md:text-xs font-medium">
                Welcome back, get up to speed.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="group relative hidden md:block">
              <Search className="text-muted-foreground group-focus-within:text-primary absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transition-colors" />
              <input
                type="text"
                placeholder="Search anything..."
                className="bg-muted/50 focus:bg-background focus:ring-primary/20 w-64 rounded-full border-none py-2 pr-4 pl-10 text-sm transition-all outline-none focus:ring-2"
              />
            </div>
            {/* Notification Bell Removed */}
          </div>
        </header>

        <div className="mx-auto w-full max-w-[1600px] space-y-6 md:space-y-8 p-3 md:p-8">
          {/* --- Analytics Tab --- */}
          {activeTab === 'analytics' && (
            <div className="animate-in fade-in space-y-8 duration-500">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-6">
                <StatCard
                  icon={<Users className="text-blue-500" />}
                  label="Total Users"
                  value="127,458"
                  trend="+12.5%"
                  color="bg-blue-500/10"
                />
                <StatCard
                  icon={<CheckCircle className="text-green-500" />}
                  label="Completion Rate"
                  value="94.2%"
                  trend="+0.8%"
                  color="bg-green-500/10"
                />
                <StatCard
                  icon={<ClipboardList className="text-orange-500" />}
                  label="Total Submissions"
                  value="2,475"
                  trend="+5.4%"
                  color="bg-orange-500/10"
                />
                <StatCard
                  icon={<CreditCard className="text-purple-500" />}
                  label="Avg. Time"
                  value="2m 14s"
                  trend="-12s"
                  color="bg-purple-500/10"
                />
              </div>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <Card className="overflow-hidden rounded-3xl border-none shadow-sm lg:col-span-2">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Submission Volume</CardTitle>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 rounded-full text-xs"
                      >
                        This Week
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4 p-3 sm:p-6">
                    <div className="overflow-x-auto pb-4 custom-scrollbar">
                      <div className="flex h-[250px] md:h-[300px] min-w-[500px] md:min-w-0 items-end justify-between gap-1.5 md:gap-4 px-2">
                        {[45, 78, 55, 92, 68, 85, 50, 88, 98, 65, 76, 82].map(
                          (h, i) => (
                            <div
                              key={i}
                              className="bg-[#D90655]/10 group hover:bg-gradient-to-t hover:from-[#D90655] hover:to-[#FC3F39] relative w-full rounded-t-xl transition-all"
                              style={{ height: `${h}%` }}
                            >
                              <div className="bg-secondary text-secondary-foreground absolute -top-10 left-1/2 z-10 -translate-x-1/2 rounded px-2 py-1 text-xs font-bold whitespace-nowrap opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                                {h * 12} leads
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                    <div className="text-muted-foreground mt-4 flex justify-between px-2 text-[10px] md:text-xs font-medium tracking-wider uppercase">
                      <span>Mon</span>
                      <span>Tue</span>
                      <span>Wed</span>
                      <span>Thu</span>
                      <span>Fri</span>
                      <span>Sat</span>
                      <span>Sun</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-3xl border-none shadow-sm">
                  <CardHeader>
                    <CardTitle>Demographics</CardTitle>
                    <CardDescription>
                      Gender distribution of respondents
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8 pt-6">
                    <GenderProgress
                      label="Female"
                      percentage={68}
                      color="bg-gradient-to-r from-[#D90655] to-[#FC3F39]"
                    />
                    <GenderProgress
                      label="Male"
                      percentage={28}
                      color="bg-secondary"
                    />
                    <GenderProgress
                      label="Non-Binary"
                      percentage={4}
                      color="bg-gray-300"
                    />

                    <div className="bg-muted/50 mt-8 rounded-2xl p-4">
                      <p className="text-muted-foreground text-center text-xs">
                        Most users are{' '}
                        <span className="text-foreground font-bold">
                          Female
                        </span>{' '}
                        aged{' '}
                        <span className="text-foreground font-bold">25-34</span>
                        .
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* --- Submissions Tab --- */}
          {activeTab === 'submissions' && (
            <Card className="animate-in fade-in overflow-hidden rounded-3xl border-none shadow-sm duration-500">
              <div className="flex items-center justify-between border-b bg-white p-8">
                <div>
                  <h3 className="text-lg font-bold">Recent Submissions</h3>
                  <p className="text-muted-foreground text-sm">
                    Manage and view all quiz attempts
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={handleExportCSV}
                  className="border-muted-foreground/20 gap-2 rounded-full text-xs font-bold"
                >
                  <Download size={14} /> Export CSV
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table {...getTableProps()} className="w-full text-left">
                  <thead className="bg-muted/30">
                    {headerGroups.map((hg: any) => (
                      <tr
                        {...hg.getHeaderGroupProps()}
                        key={hg.id}
                        className="border-b"
                      >
                        {hg.headers.map((col: any) => (
                          <th
                            {...col.getHeaderProps()}
                            key={col.id}
                            className="text-muted-foreground px-8 py-5 text-xs font-bold tracking-widest uppercase"
                          >
                            {col.render('Header')}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    {page.map((row: any) => {
                      prepareRow(row);
                      return (
                        <tr
                          {...row.getRowProps()}
                          key={row.id}
                          className="hover:bg-muted/10 group border-b transition-colors last:border-0"
                        >
                          {row.cells.map((cell: any) => (
                            <td
                              {...cell.getCellProps()}
                              key={cell.column.id}
                              className="px-8 py-5 text-sm"
                            >
                              {cell.render('Cell')}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="bg-muted/20 flex items-center justify-between border-t p-6">
                <div className="text-muted-foreground text-xs font-medium">
                  Showing {page.length} of {submissionData.length} records
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={previousPage}
                    disabled={!canPreviousPage}
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 rounded-full p-0"
                  >
                    <ChevronRight className="h-4 w-4 rotate-180" />
                  </Button>
                  <span className="px-4 text-sm font-medium">
                    Page {pageIndex + 1} of {pageCount}
                  </span>
                  <Button
                    onClick={nextPage}
                    disabled={!canNextPage}
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 rounded-full p-0"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* --- Questions Manager Tab --- */}
          {activeTab === 'questions' && (
            <div className="animate-in fade-in space-y-6 duration-500">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">Quiz Questions</h3>
                  <p className="text-muted-foreground text-sm">
                    Manage the flow of your quiz ({questions.length} questions)
                  </p>
                </div>
                <div className="flex gap-3">
                  {/* <Button
                    onClick={seedDefaultQuestions}
                    variant="outline"
                    className="rounded-full px-4 font-bold border-primary text-primary hover:bg-primary/5"
                  >
                    Seed Defaults
                  </Button> */}
                  {/* <Button
                    onClick={fetchQuestions}
                    variant="outline"
                    className="rounded-full px-4 font-bold border-muted-foreground/20"
                  >
                    Refresh
                  </Button> */}
                  <Button
                    onClick={() => {
                      setIsAddingQuestion(true);
                      setEditingQuestion(null);
                      setNewQuestionType('single-select');
                      setNewQuestionText('');
                      setNewQuestionOrder(questions.length > 0 ? Math.max(...questions.map(q => q.order)) + 1 : 1);
                      setNewQuestionGender('both');
                      setNewQuestionIsPopup(false);
                      setNewQuestionIsActive(true);
                      setNewQuestionOptions([]);
                    }}
                    className="shadow-primary/20 flex items-center gap-2 rounded-full px-4 md:px-6 py-2 md:py-3 font-bold shadow-lg text-sm md:text-base"
                  >
                    <Plus size={18} /> <span className="hidden sm:inline">Add Question</span><span className="sm:hidden">Add</span>
                  </Button>
                </div>
              </div>

              {loadingQuestions ? (
                <div className="flex h-64 items-center justify-center">
                  <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 md:gap-5">
                  {questions.map((q, index) => (
                    <div
                      key={q._id}
                      className={`hover:border-primary/20 group flex rounded-3xl border border-transparent bg-white p-1 shadow-sm transition-all ${!q.isActive ? 'opacity-60' : ''}`}
                    >
                      {/* Numbering Column */}
                      <div className="bg-muted/50 hidden sm:flex w-16 flex-col items-center justify-center gap-2 rounded-l-[20px] rounded-r-lg">
                        <span className="text-muted-foreground/40 text-2xl font-black">
                          {index + 1}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex flex-1 flex-col justify-between gap-4 p-4 md:p-6 md:flex-row md:items-center overflow-hidden">
                        <div className="space-y-3 flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-3">
                            <span
                              className={`rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase ${q.type.includes('multi') ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}
                            >
                              {q.type.replace('-select', '').replace('-input', '')}
                            </span>
                            <span className="bg-gray-100 text-gray-600 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase">
                              For: {q.gender}
                            </span>
                            {q.isPopup && (
                              <span className="bg-orange-50 text-orange-600 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase">
                                Popup
                              </span>
                            )}
                            {!q.isActive && (
                              <span className="bg-red-50 text-red-600 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase">
                                Inactive
                              </span>
                            )}
                          </div>
                          <h4 className="text-foreground text-lg font-bold truncate" title={q.questionText}>
                            {q.questionText}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {q.options.length > 0 ? q.options.map((opt, i) => (
                              <span
                                key={i}
                                className="bg-muted text-foreground/70 rounded-full px-3 py-1.5 text-xs font-medium flex items-center gap-1.5"
                              >
                                {opt.emoji && <span>{opt.emoji}</span>}
                                {opt.text}
                              </span>
                            )) : (
                              <span className="text-muted-foreground text-xs italic">No predefined options</span>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 transition-opacity md:opacity-0 md:group-hover:opacity-100">
                          <Button
                            onClick={() => openEditModal(q)}
                            variant="ghost"
                            size="sm"
                            className="h-9 w-9 rounded-full p-0 hover:bg-blue-50 hover:text-blue-600"
                          >
                            <Edit2 size={16} />
                          </Button>
                          <Button
                            onClick={() => q._id && handleDeleteQuestion(q._id)}
                            variant="ghost"
                            size="sm"
                            className="h-9 w-9 rounded-full p-0 hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {questions.length === 0 && (
                    <div className="bg-white rounded-3xl p-12 text-center flex flex-col items-center justify-center border-2 border-dashed border-muted">
                      <ClipboardList className="h-12 w-12 text-muted-foreground/30 mb-4" />
                      <h3 className="text-lg font-bold text-foreground">No Questions Found</h3>
                      <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                        Get started by adding your first question or syncing with the backend.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* --- Add/Edit Question Modal --- */}
      {isAddingQuestion && (
        <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm duration-200">
          <Card className="max-h-[90vh] w-full max-w-2xl overflow-hidden overflow-y-auto rounded-[32px] border-none shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>
                  {editingQuestion ? 'Edit Question' : 'Create Question'}
                </CardTitle>
                <CardDescription>
                  Configure the query and available options.
                </CardDescription>
              </div>
              <Button
                onClick={closeModal}
                variant="ghost"
                size="sm"
                className="h-8 w-8 rounded-full p-0"
              >
                <X size={18} />
              </Button>
            </CardHeader>
            <CardContent className="space-y-6 pt-6 custom-scrollbar">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-muted-foreground pl-1 text-[10px] font-bold tracking-widest uppercase">
                    Order
                  </label>
                  <input
                    type="number"
                    value={newQuestionOrder}
                    onChange={(e) => setNewQuestionOrder(parseInt(e.target.value))}
                    readOnly={true}
                    className="bg-gray-100 opacity-60 cursor-not-allowed w-full rounded-xl border-2 border-transparent px-5 py-3 text-base font-bold transition-all outline-none"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-muted-foreground pl-1 text-[10px] font-bold tracking-widest uppercase">
                    Gender Target
                  </label>
                  <select
                    value={newQuestionGender}
                    onChange={(e) => setNewQuestionGender(e.target.value as any)}
                    className="bg-muted/50 focus:bg-background focus:border-primary/20 w-full rounded-xl border-2 border-transparent px-5 py-3 text-base font-bold transition-all outline-none appearance-none"
                  >
                    <option value="both">Both</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-muted-foreground pl-1 text-[10px] font-bold tracking-widest uppercase">
                  Question Text
                </label>
                <textarea
                  value={newQuestionText}
                  onChange={(e) => setNewQuestionText(e.target.value)}
                  placeholder="e.g., How familiar are you with..."
                  className="bg-muted/50 focus:bg-background focus:border-primary/20 placeholder:text-muted-foreground/50 w-full h-24 resize-none rounded-xl border-2 border-transparent px-5 py-4 text-base font-medium transition-all outline-none"
                  autoFocus
                />
              </div>

              <div className="space-y-4">
                <label className="text-muted-foreground pl-1 text-[10px] font-bold tracking-widest uppercase">
                  Response Type
                </label>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { id: 'single-select', label: 'Single', icon: <Circle size={14} /> },
                    { id: 'multi-select', label: 'Multiple', icon: <CheckSquare size={14} /> },
                    { id: 'text-input', label: 'Text', icon: <Edit2 size={14} /> },
                    { id: 'number-input', label: 'Number', icon: <TrendingUp size={14} /> },
                  ].map((t) => (
                    <div
                      key={t.id}
                      onClick={() => setNewQuestionType(t.id as any)}
                      className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 p-3 transition-all ${newQuestionType === t.id
                        ? 'border-primary bg-primary/5'
                        : 'bg-muted/50 hover:bg-muted border-transparent'
                        }`}
                    >
                      <div className={`${newQuestionType === t.id ? 'text-primary' : 'text-muted-foreground/40'}`}>
                        {t.icon}
                      </div>
                      <p className={`text-[10px] font-black uppercase ${newQuestionType === t.id ? 'text-primary' : 'text-muted-foreground'}`}>
                        {t.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-6 border-y py-6 border-[#1a1a1b]/5">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setNewQuestionIsPopup(!newQuestionIsPopup)}
                    className={`h-6 w-11 rounded-full transition-colors relative ${newQuestionIsPopup ? 'bg-primary' : 'bg-gray-200'}`}
                  >
                    <div className={`absolute top-1 left-1 bg-white h-4 w-4 rounded-full transition-transform ${newQuestionIsPopup ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                  <span className="text-sm font-bold text-foreground">Popup Question</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setNewQuestionIsActive(!newQuestionIsActive)}
                    className={`h-6 w-11 rounded-full transition-colors relative ${newQuestionIsActive ? 'bg-green-500' : 'bg-gray-200'}`}
                  >
                    <div className={`absolute top-1 left-1 bg-white h-4 w-4 rounded-full transition-transform ${newQuestionIsActive ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                  <span className="text-sm font-bold text-foreground">Active Status</span>
                </div>
              </div>

              {(newQuestionType === 'single-select' || newQuestionType === 'multi-select') && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-muted-foreground pl-1 text-[10px] font-bold tracking-widest uppercase">
                      Answer Options
                    </label>
                    <Button
                      onClick={handleAddOption}
                      variant="ghost"
                      size="sm"
                      className="h-8 rounded-full text-xs font-bold text-primary hover:bg-primary/5"
                    >
                      <Plus size={14} className="mr-1" /> Add Option
                    </Button>
                  </div>

                  <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {newQuestionOptions.map((opt, idx) => (
                      <div key={idx} className="flex gap-3 group">
                        <input
                          type="text"
                          value={opt.emoji}
                          onChange={(e) => handleUpdateOption(idx, 'emoji', e.target.value)}
                          placeholder="Emoji"
                          className="bg-muted/50 focus:bg-background w-16 rounded-xl border-2 border-transparent px-3 py-3 text-center text-lg transition-all outline-none"
                        />
                        <input
                          type="text"
                          value={opt.text}
                          onChange={(e) => handleUpdateOption(idx, 'text', e.target.value)}
                          placeholder={`Option ${idx + 1} text`}
                          className="bg-muted/50 focus:bg-background flex-1 rounded-xl border-2 border-transparent px-5 py-3 text-sm font-bold transition-all outline-none"
                        />
                        <Button
                          onClick={() => handleRemoveOption(idx)}
                          variant="ghost"
                          size="sm"
                          className="h-11 w-11 rounded-xl p-0 text-red-400 hover:bg-red-50 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    ))}
                    {newQuestionOptions.length === 0 && (
                      <div className="p-8 border-2 border-dashed rounded-2xl text-center">
                        <p className="text-muted-foreground text-xs">No options added yet.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 pt-6 border-t border-[#1a1a1b]/5">
                <Button
                  onClick={closeModal}
                  size="lg"
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground rounded-xl font-bold flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveQuestion}
                  size="lg"
                  className="shadow-primary/20 flex-[2] rounded-xl font-bold shadow-lg"
                >
                  {editingQuestion ? 'Update Changes' : 'Create Question'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      {/* --- Submission Details Modal --- */}
      {isSubmissionModalOpen && selectedSubmission && (
        <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm duration-200">
          <Card className="max-h-[90vh] w-full max-w-xl overflow-hidden overflow-y-auto rounded-[32px] border-none shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b p-6 md:p-8">
              <div>
                <CardTitle className="text-xl md:text-2xl font-black">Submission Details</CardTitle>
                <CardDescription>
                  Detailed view of user response
                </CardDescription>
              </div>
              <Button
                onClick={() => setIsSubmissionModalOpen(false)}
                variant="ghost"
                size="sm"
                className="h-8 w-8 rounded-full p-0"
              >
                <X size={18} />
              </Button>
            </CardHeader>
            <CardContent className="p-6 md:p-8 space-y-6 pt-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">Name</p>
                  <p className="font-bold">{selectedSubmission.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">Date</p>
                  <p className="font-bold">{selectedSubmission.date}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">Email</p>
                  <p className="font-bold">{selectedSubmission.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">Phone</p>
                  <p className="font-bold">{selectedSubmission.phone}</p>
                </div>
              </div>

              <div className="bg-muted/30 rounded-2xl p-6 space-y-4">
                <div className="space-y-1">
                  <p className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">Question</p>
                  <p className="font-medium text-sm leading-relaxed">{selectedSubmission.questions}</p>
                </div>
                <div className="space-y-1 border-t border-[#1a1a1b]/5 pt-4">
                  <p className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">User Response</p>
                  <p className="text-primary font-bold text-lg">{selectedSubmission.selectedOptions}</p>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  onClick={() => setIsSubmissionModalOpen(false)}
                  className="w-full h-12 rounded-xl font-bold bg-gradient-to-r from-[#D90655] to-[#FC3F39] text-white hover:opacity-90 shadow-lg shadow-[#D90655]/20"
                >
                  Close Details
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

// --- Helper Components ---

const SidebarLink = ({
  icon,
  label,
  active,
  onClick,
  badge,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
  badge?: number;
}) => (
  <div
    onClick={onClick}
    className={`group mx-2 flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 transition-all ${active
      ? 'bg-gradient-to-r from-[#D90655] to-[#FC3F39] shadow-primary/25 text-white shadow-lg'
      : 'text-[#1a1a1b]/60 hover:bg-[#1a1a1b]/5 hover:text-[#1a1a1b]'
      } `}
  >
    <div
      className={`transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`}
    >
      {icon}
    </div>
    <span className="text-sm font-semibold tracking-tight">{label}</span>
    {badge !== undefined && (
      <span
        className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-bold ${active ? 'text-primary bg-white' : 'bg-[#1a1a1b]/10 text-[#1a1a1b]'}`}
      >
        {badge}
      </span>
    )}
  </div>
);

const SidebarHeader = ({ title }: { title: string }) => (
  <div className="mt-4 mb-2 px-6 py-2">
    <h3 className="text-[10px] font-black tracking-widest text-[#1a1a1b]/30 uppercase">
      {title}
    </h3>
  </div>
);

const StatCard = ({
  icon,
  label,
  value,
  trend,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend: string;
  color: string;
}) => (
  <Card className="group cursor-default overflow-hidden rounded-2xl border-none bg-white shadow-sm transition-all duration-300 hover:shadow-md">
    <CardContent className="p-4 sm:p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-muted-foreground mb-1 text-[10px] md:text-xs font-bold tracking-wider uppercase">
            {label}
          </p>
          <h2 className="text-foreground text-2xl md:text-3xl font-black tracking-tight">
            {value}
          </h2>
        </div>
        <div
          className={`rounded-xl p-3 ${color} transition-transform group-hover:rotate-6`}
        >
          {icon}
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <div className="flex items-center gap-1 rounded bg-green-500/10 px-1.5 py-0.5 text-[11px] font-bold text-green-600">
          <TrendingUp size={10} /> {trend}
        </div>
        <span className="text-muted-foreground text-[11px] font-medium">
          vs last month
        </span>
      </div>
    </CardContent>
  </Card>
);

const GenderProgress = ({
  label,
  percentage,
  color,
}: {
  label: string;
  percentage: number;
  color: string;
}) => (
  <div className="space-y-2">
    <div className="text-foreground/80 flex justify-between text-xs font-bold tracking-wide uppercase">
      <span>{label}</span>
      <span>{percentage}%</span>
    </div>
    <div className="bg-muted flex h-2.5 overflow-hidden rounded-full">
      <div
        className={`h-full ${color} rounded-full transition-all duration-1000 ease-out`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  </div>
);

export default Dashboard;
