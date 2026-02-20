import React, { useMemo, useState } from 'react';
import { useTable, usePagination, useGlobalFilter } from 'react-table';
import {
  LayoutDashboard,
  ClipboardList,
  Settings,
  Search,
  Plus,
  Edit2,
  Trash2,
  Users,
  TrendingUp,
  CheckCircle,
  ChevronRight,
  Filter,
  Download,
  MoreVertical,
  X,
  CreditCard,
  PieChart,
  Bell,
  CheckSquare,
  Circle
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';

// --- Types ---
interface Question {
  id: string;
  text: string;
  type: 'single' | 'multiple';
  options: string[];
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
  const [activeTab, setActiveTab] = useState<'analytics' | 'submissions' | 'questions'>('analytics');

  // --- Questions CRUD State ---
  const [questions, setQuestions] = useState<Question[]>([
    { id: '1', text: 'How familiar are you with the Mediterranean Diet?', type: 'single', options: ['I know it pretty well', 'I know the basics', 'I have heard of it', 'I know nothing about it'] },
    { id: '2', text: 'What is your main goal right now?', type: 'single', options: ['Improve my health', 'Lose weight', 'Feel more confident', 'Save time on meal prep'] },
    { id: '3', text: 'What is your goal weight?', type: 'single', options: ['140 lbs', '150 lbs', '160 lbs', '170+ lbs'] },
    { id: '4', text: 'Which foods do you prefer?', type: 'multiple', options: ['Chicken', 'Fish', 'Vegetables', 'Beef'] },
  ]);
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  // --- Form State ---
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newQuestionOptions, setNewQuestionOptions] = useState('');
  const [newQuestionType, setNewQuestionType] = useState<'single' | 'multiple'>('single');

  // --- Submission Data ---
  const submissionData = useMemo<Submission[]>(() => [
    { id: 'S1', name: 'John Doe', email: 'john@example.com', phone: '+1234567890', gender: 'Male', questions: 'How familiar are you with the Mediterranean Diet?', selectedOptions: 'I know it pretty well', date: '2026-02-18' },
    { id: 'S2', name: 'Jane Smith', email: 'jane@example.com', phone: '+1987654321', gender: 'Female', questions: 'What is your main goal right now?', selectedOptions: 'Improve my health', date: '2026-02-18' },
    { id: 'S3', name: 'David Lee', email: 'david@example.com', phone: '+1122334455', gender: 'Male', questions: 'What is your goal weight?', selectedOptions: '160 lbs', date: '2026-02-17' },
    { id: 'S4', name: 'Alice Brown', email: 'alice@example.com', phone: '+1444556677', gender: 'Female', questions: 'What is your main goal right now?', selectedOptions: 'Feel more confident', date: '2026-02-17' },
    { id: 'S5', name: 'Robert White', email: 'robert@example.com', phone: '+1555443322', gender: 'Male', questions: 'How familiar are you with the Mediterranean Diet?', selectedOptions: 'I’ve tried it before', date: '2026-02-16' },
    { id: 'S6', name: 'Lucy Green', email: 'lucy@example.com', phone: '+1230987654', gender: 'Female', questions: 'Stubborn weight gain symptoms?', selectedOptions: '⚖️ Stubborn weight gain', date: '2026-02-16' },
    { id: 'S7', name: 'Ethan Hunt', email: 'ethan@imf.org', phone: '+1000000000', gender: 'Male', questions: 'What is your goal weight?', selectedOptions: '170+ lbs', date: '2026-02-15' },
    { id: 'S8', name: 'Sarah Connor', email: 'sarah@resistance.com', phone: '+1999888777', gender: 'Female', questions: 'What is your main goal right now?', selectedOptions: 'Save time on meal prep', date: '2026-02-15' },
  ], []);

  // --- Submissions Table Config ---
  const columns = useMemo(() => [
    {
      Header: 'User Info', accessor: (row: Submission) => (
        <div className="flex flex-col">
          <span className="font-bold text-foreground">{row.name}</span>
          <span className="text-xs text-muted-foreground">{row.email}</span>
        </div>
      ), id: 'user'
    },
    { Header: 'Gender', accessor: 'gender' },
    {
      Header: 'Response',
      accessor: (row: Submission) => (
        <div className="flex flex-col max-w-[200px]">
          <span className="truncate text-xs text-muted-foreground">{row.questions}</span>
          <span className="font-medium truncate" title={row.selectedOptions}>{row.selectedOptions}</span>
        </div>
      ),
      id: 'response'
    },
    { Header: 'Date', accessor: 'date' },
    { Header: 'Actions', accessor: () => <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full"><MoreVertical className="w-4 h-4 text-muted-foreground" /></Button>, id: 'actions' },
  ], []);

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
    previousPage
  } = useTable<Submission>({ columns, data: submissionData, initialState: { pageIndex: 0, pageSize: 6 } }, useGlobalFilter, usePagination);

  // --- Handlers ---

  const handleSaveQuestion = () => {
    if (!newQuestionText.trim()) return;

    const optionsList = newQuestionOptions.split(',').map(o => o.trim()).filter(Boolean);

    if (editingQuestion) {
      setQuestions(questions.map(q => q.id === editingQuestion.id ? {
        ...q,
        text: newQuestionText,
        options: optionsList,
        type: newQuestionType
      } : q));
    } else {
      const newQ: Question = {
        id: Math.random().toString(36).substr(2, 9),
        text: newQuestionText,
        type: newQuestionType,
        options: optionsList
      };
      setQuestions([...questions, newQ]);
    }

    closeModal();
  };

  const openEditModal = (q: Question) => {
    setEditingQuestion(q);
    setNewQuestionText(q.text);
    setNewQuestionOptions(q.options.join(', '));
    setNewQuestionType(q.type);
    setIsAddingQuestion(true);
  };

  const closeModal = () => {
    setIsAddingQuestion(false);
    setEditingQuestion(null);
    setNewQuestionText('');
    setNewQuestionOptions('');
    setNewQuestionType('single');
  };

  const handleDeleteQuestion = (id: string) => {
    if (confirm('Are you sure you want to delete this question?')) {
      setQuestions(questions.filter(q => q.id !== id));
    }
  };

  return (
    <div className="flex min-h-screen bg-muted/30 font-sans text-foreground">
      {/* --- Sidebar --- */}
      <aside className="w-72 bg-secondary text-secondary-foreground flex flex-col fixed inset-y-0 z-30 transition-width duration-300 shadow-2xl">
        <div className="p-8 pb-4">
          <div className="flex items-center gap-3">
            {/* Placeholder Logo */}
            <div className="h-10 w-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
              <PieChart className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">QuizMaster</span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-8">
          <SidebarHeader title="Main Menu" />
          <SidebarLink
            icon={<LayoutDashboard size={20} />}
            label="Overview"
            active={activeTab === 'analytics'}
            onClick={() => setActiveTab('analytics')}
          />
          {/* <SidebarLink
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
          </div> */}
        </nav>

        <div className="p-6 border-t border-white/10 bg-black/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold text-sm text-white shadow-lg shadow-primary/20">
              AD
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-bold truncate">Admin User</span>
              <span className="text-xs text-white/50 truncate">admin@quizmaster.com</span>
            </div>
          </div>
        </div>
      </aside>

      {/* --- Main Content --- */}
      <main className="ml-72 flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-20 bg-background/80 backdrop-blur-md border-b sticky top-0 z-20 px-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold capitalize tracking-tight text-foreground">{activeTab === 'questions' ? 'Question Bank' : activeTab}</h1>
            <p className="text-xs font-medium text-muted-foreground mt-0.5">Welcome back, get up to speed.</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search anything..."
                className="pl-10 pr-4 py-2 bg-muted/50 rounded-full text-sm border-none focus:bg-background focus:ring-2 focus:ring-primary/20 w-64 transition-all outline-none"
              />
            </div>
            <Button variant="ghost" size="sm" className="rounded-full w-10 h-10 p-0 text-muted-foreground relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border border-background"></span>
            </Button>
          </div>
        </header>

        <div className="p-8 space-y-8 max-w-[1600px] mx-auto w-full">
          {/* --- Analytics Tab --- */}
          {activeTab === 'analytics' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 border-none shadow-sm rounded-3xl overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Submission Volume</CardTitle>
                      <Button variant="outline" size="sm" className="h-8 rounded-full text-xs">This Week</Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="h-[300px] w-full flex items-end justify-between gap-4 px-2">
                      {[45, 78, 55, 92, 68, 85, 50, 88, 98, 65, 76, 82].map((h, i) => (
                        <div key={i} className="w-full bg-primary/10 rounded-t-xl relative group transition-all hover:bg-primary/80" style={{ height: `${h}%` }}>
                          <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground text-xs font-bold px-2 py-1 rounded shadow-lg transition-opacity whitespace-nowrap z-10">
                            {h * 12} leads
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-4 font-medium uppercase tracking-wider px-2">
                      <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm rounded-3xl">
                  <CardHeader>
                    <CardTitle>Demographics</CardTitle>
                    <CardDescription>Gender distribution of respondents</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8 pt-6">
                    <GenderProgress label="Female" percentage={68} color="bg-primary" />
                    <GenderProgress label="Male" percentage={28} color="bg-secondary" />
                    <GenderProgress label="Non-Binary" percentage={4} color="bg-gray-300" />

                    <div className="p-4 bg-muted/50 rounded-2xl mt-8">
                      <p className="text-xs text-muted-foreground text-center">
                        Most users are <span className="font-bold text-foreground">Female</span> aged <span className="font-bold text-foreground">25-34</span>.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* --- Submissions Tab --- */}
          {activeTab === 'submissions' && (
            <Card className="border-none shadow-sm rounded-3xl overflow-hidden animate-in fade-in duration-500">
              <div className="p-8 border-b flex items-center justify-between bg-white">
                <div>
                  <h3 className="text-lg font-bold">Recent Submissions</h3>
                  <p className="text-sm text-muted-foreground">Manage and view all quiz attempts</p>
                </div>
                <Button variant="outline" className="rounded-full border-muted-foreground/20 text-xs font-bold gap-2">
                  <Download size={14} /> Export CSV
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table {...getTableProps()} className="w-full text-left">
                  <thead className="bg-muted/30">
                    {headerGroups.map((hg: any) => (
                      <tr {...hg.getHeaderGroupProps()} key={hg.id} className="border-b">
                        {hg.headers.map((col: any) => (
                          <th {...col.getHeaderProps()} key={col.id} className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-muted-foreground">
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
                        <tr {...row.getRowProps()} key={row.id} className="border-b last:border-0 hover:bg-muted/10 transition-colors group">
                          {row.cells.map((cell: any) => (
                            <td {...cell.getCellProps()} key={cell.column.id} className="px-8 py-5 text-sm">
                              {cell.render('Cell')}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="p-6 flex items-center justify-between bg-muted/20 border-t">
                <div className="text-xs font-medium text-muted-foreground">
                  Showing {page.length} of {submissionData.length} records
                </div>
                <div className="flex items-center gap-2">
                  <Button onClick={previousPage} disabled={!canPreviousPage} variant="outline" size="sm" className="h-8 w-8 p-0 rounded-full">
                    <ChevronRight className="rotate-180 w-4 h-4" />
                  </Button>
                  <span className="text-sm font-medium px-4">
                    Page {pageIndex + 1} of {pageCount}
                  </span>
                  <Button onClick={nextPage} disabled={!canNextPage} variant="outline" size="sm" className="h-8 w-8 p-0 rounded-full">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* --- Questions Manager Tab --- */}
          {activeTab === 'questions' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">Quiz Questions</h3>
                  <p className="text-sm text-muted-foreground">Manage the flow of your quiz</p>
                </div>
                <Button onClick={() => { setIsAddingQuestion(true); setEditingQuestion(null); setNewQuestionType('single'); setNewQuestionText(''); setNewQuestionOptions(''); }} className="rounded-full px-6 font-bold flex items-center gap-2 shadow-lg shadow-primary/20">
                  <Plus size={18} /> Add Question
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-5">
                {questions.map((q, idx) => (
                  <div key={q.id} className="bg-white rounded-3xl p-1 flex shadow-sm border border-transparent hover:border-primary/20 transition-all group">
                    {/* Numbering Column */}
                    <div className="w-16 bg-muted/50 rounded-l-[20px] rounded-r-lg flex flex-col items-center justify-center gap-2">
                      <span className="font-black text-2xl text-muted-foreground/40">{idx + 1}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider ${q.type === 'single' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                            {q.type} select
                          </span>
                          <h4 className="text-lg font-bold text-foreground">{q.text}</h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {q.options.map((opt, i) => (
                            <span key={i} className="text-xs px-3 py-1.5 bg-muted rounded-full font-medium text-foreground/70">
                              {opt}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                        <Button onClick={() => openEditModal(q)} variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-full hover:bg-blue-50 hover:text-blue-600">
                          <Edit2 size={16} />
                        </Button>
                        <Button onClick={() => handleDeleteQuestion(q.id)} variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-full hover:bg-red-50 hover:text-red-600">
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* --- Add/Edit Question Modal --- */}
      {isAddingQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <Card className="w-full max-w-2xl border-none shadow-2xl rounded-[32px] overflow-hidden max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>{editingQuestion ? 'Edit Question' : 'Create Question'}</CardTitle>
                <CardDescription>Configure the query and available options.</CardDescription>
              </div>
              <Button onClick={closeModal} variant="ghost" size="sm" className="rounded-full w-8 h-8 p-0">
                <X size={18} />
              </Button>
            </CardHeader>
            <CardContent className="space-y-8 pt-6">

              <div className="space-y-3">
                <label className="text-xs font-bold uppercase text-muted-foreground tracking-widest pl-1">Question Text</label>
                <input
                  type="text"
                  value={newQuestionText}
                  onChange={(e) => setNewQuestionText(e.target.value)}
                  placeholder="e.g., What is your primary goal?"
                  className="w-full px-5 py-4 bg-muted/50 rounded-xl text-base border-2 border-transparent focus:bg-background focus:border-primary/20 outline-none font-medium transition-all placeholder:text-muted-foreground/50"
                  autoFocus
                />
              </div>

              <div className="space-y-4">
                <label className="text-xs font-bold uppercase text-muted-foreground tracking-widest pl-1">Response Type</label>
                <div className="grid grid-cols-2 gap-4">
                  {/* Single Choice Selection */}
                  <div
                    onClick={() => setNewQuestionType('single')}
                    className={`p-4 rounded-2xl border-2 flex items-center gap-3 cursor-pointer transition-all ${newQuestionType === 'single'
                      ? 'border-primary bg-primary/5'
                      : 'border-transparent bg-muted/50 hover:bg-muted'
                      }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${newQuestionType === 'single' ? 'border-primary' : 'border-muted-foreground/30'}`}>
                      {newQuestionType === 'single' && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
                    </div>
                    <div>
                      <p className={`font-bold text-sm ${newQuestionType === 'single' ? 'text-primary' : 'text-foreground'}`}>Single Choice</p>
                      <p className="text-[10px] text-muted-foreground">User selects one option</p>
                    </div>
                    <Circle size={16} className={`ml-auto ${newQuestionType === 'single' ? 'text-primary' : 'text-muted-foreground/30'}`} />
                  </div>

                  {/* Multiple Choice Selection */}
                  <div
                    onClick={() => setNewQuestionType('multiple')}
                    className={`p-4 rounded-2xl border-2 flex items-center gap-3 cursor-pointer transition-all ${newQuestionType === 'multiple'
                      ? 'border-primary bg-primary/5'
                      : 'border-transparent bg-muted/50 hover:bg-muted'
                      }`}
                  >
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center ${newQuestionType === 'multiple' ? 'border-primary' : 'border-muted-foreground/30'}`}>
                      {newQuestionType === 'multiple' && <div className="w-2.5 h-2.5 bg-primary rounded-[2px]" />}
                    </div>
                    <div>
                      <p className={`font-bold text-sm ${newQuestionType === 'multiple' ? 'text-primary' : 'text-foreground'}`}>Multiple Choice</p>
                      <p className="text-[10px] text-muted-foreground">User selects one or more</p>
                    </div>
                    <CheckSquare size={16} className={`ml-auto ${newQuestionType === 'multiple' ? 'text-primary' : 'text-muted-foreground/30'}`} />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase text-muted-foreground tracking-widest pl-1">Answer Options</label>
                  <span className="text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">Comma Separated</span>
                </div>
                <textarea
                  value={newQuestionOptions}
                  onChange={(e) => setNewQuestionOptions(e.target.value)}
                  placeholder="Option 1, Option 2, Option 3..."
                  className="w-full h-32 px-5 py-4 bg-muted/50 rounded-xl text-base border-2 border-transparent focus:bg-background focus:border-primary/20 outline-none font-medium transition-all resize-none placeholder:text-muted-foreground/50"
                />
                <p className="text-[11px] text-muted-foreground pl-1">
                  Tip: Enter options separated by commas. For example: "Yes, No, Maybe"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <Button onClick={closeModal} size="lg" variant="ghost" className="rounded-xl font-bold text-muted-foreground hover:text-foreground">Cancel</Button>
                <Button onClick={handleSaveQuestion} size="lg" className="flex-1 rounded-xl font-bold shadow-lg shadow-primary/20">
                  {editingQuestion ? 'Update Changes' : 'Create Question'}
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

const SidebarLink = ({ icon, label, active, onClick, badge }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void, badge?: number }) => (
  <div
    onClick={onClick}
    className={`
      flex items-center gap-3 px-4 py-3 cursor-pointer transition-all rounded-xl mx-2 group
      ${active
        ? 'bg-primary text-white shadow-lg shadow-primary/25'
        : 'text-white/60 hover:bg-white/10 hover:text-white'}
    `}
  >
    <div className={`transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`}>{icon}</div>
    <span className="text-sm font-semibold tracking-tight">{label}</span>
    {badge !== undefined && (
      <span className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full ${active ? 'bg-white text-primary' : 'bg-white/10 text-white'}`}>
        {badge}
      </span>
    )}
  </div>
);

const SidebarHeader = ({ title }: { title: string }) => (
  <div className="px-6 py-2 mt-4 mb-2">
    <h3 className="text-[10px] font-black uppercase tracking-widest text-white/30">{title}</h3>
  </div>
);

const StatCard = ({ icon, label, value, trend, color }: { icon: React.ReactNode, label: string, value: string, trend: string, color: string }) => (
  <Card className="border-none shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300 bg-white group cursor-default">
    <CardContent className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold uppercase text-muted-foreground tracking-wider mb-1">{label}</p>
          <h2 className="text-3xl font-black tracking-tight text-foreground">{value}</h2>
        </div>
        <div className={`p-3 rounded-xl ${color} transition-transform group-hover:rotate-6`}>
          {icon}
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <div className="bg-green-500/10 text-green-600 px-1.5 py-0.5 rounded text-[11px] font-bold flex items-center gap-1">
          <TrendingUp size={10} /> {trend}
        </div>
        <span className="text-[11px] text-muted-foreground font-medium">vs last month</span>
      </div>
    </CardContent>
  </Card>
);

const GenderProgress = ({ label, percentage, color }: { label: string, percentage: number, color: string }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-xs font-bold tracking-wide uppercase text-foreground/80">
      <span>{label}</span>
      <span>{percentage}%</span>
    </div>
    <div className="h-2.5 bg-muted rounded-full overflow-hidden flex">
      <div className={`h-full ${color} rounded-full transition-all duration-1000 ease-out`} style={{ width: `${percentage}%` }} />
    </div>
  </div>
);

export default Dashboard;