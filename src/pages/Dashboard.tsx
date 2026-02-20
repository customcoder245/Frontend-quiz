import React, { useMemo, useState } from 'react';
import { useTable, usePagination, useGlobalFilter } from 'react-table';
// hello
import {
  LayoutDashboard,
  ClipboardList,
  // Settings,
  Search,
  Plus,
  Edit2,
  Trash2,
  Users,
  TrendingUp,
  CheckCircle,
  ChevronRight,
  // Filter,
  Download,
  MoreVertical,
  X,
  CreditCard,
  PieChart,
  Bell,
  CheckSquare,
  Circle,
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
  const [activeTab, setActiveTab] = useState<
    'analytics' | 'submissions' | 'questions'
  >('analytics');

  // --- Questions CRUD State ---
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      text: 'How familiar are you with the Mediterranean Diet?',
      type: 'single',
      options: [
        'I know it pretty well',
        'I know the basics',
        'I have heard of it',
        'I know nothing about it',
      ],
    },
    {
      id: '2',
      text: 'What is your main goal right now?',
      type: 'single',
      options: [
        'Improve my health',
        'Lose weight',
        'Feel more confident',
        'Save time on meal prep',
      ],
    },
    {
      id: '3',
      text: 'What is your goal weight?',
      type: 'single',
      options: ['140 lbs', '150 lbs', '160 lbs', '170+ lbs'],
    },
    {
      id: '4',
      text: 'Which foods do you prefer?',
      type: 'multiple',
      options: ['Chicken', 'Fish', 'Vegetables', 'Beef'],
    },
  ]);
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  // --- Form State ---
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newQuestionOptions, setNewQuestionOptions] = useState('');
  const [newQuestionType, setNewQuestionType] = useState<'single' | 'multiple'>(
    'single'
  );

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
        accessor: () => (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 rounded-full p-0"
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

  const handleSaveQuestion = () => {
    if (!newQuestionText.trim()) return;

    const optionsList = newQuestionOptions
      .split(',')
      .map((o) => o.trim())
      .filter(Boolean);

    if (editingQuestion) {
      setQuestions(
        questions.map((q) =>
          q.id === editingQuestion.id
            ? {
                ...q,
                text: newQuestionText,
                options: optionsList,
                type: newQuestionType,
              }
            : q
        )
      );
    } else {
      const newQ: Question = {
        id: Math.random().toString(36).substr(2, 9),
        text: newQuestionText,
        type: newQuestionType,
        options: optionsList,
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
      setQuestions(questions.filter((q) => q.id !== id));
    }
  };

  return (
    <div className="bg-muted/30 text-foreground flex min-h-screen font-sans">
      {/* --- Sidebar --- */}
      <aside className="bg-secondary text-secondary-foreground transition-width fixed inset-y-0 z-30 flex w-72 flex-col shadow-2xl duration-300">
        <div className="p-8 pb-4">
          <div className="flex items-center gap-3">
            {/* Placeholder Logo */}
            <div className="bg-primary/20 text-primary flex h-10 w-10 items-center justify-center rounded-xl">
              <PieChart className="text-primary h-6 w-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              QuizMaster
            </span>
          </div>
        </div>

        <nav className="mt-8 flex-1 space-y-2 px-4">
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

        <div className="border-t border-white/10 bg-black/20 p-6">
          <div className="flex items-center gap-3">
            <div className="bg-primary shadow-primary/20 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white shadow-lg">
              AD
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="truncate text-sm font-bold">Admin User</span>
              <span className="truncate text-xs text-white/50">
                admin@quizmaster.com
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* --- Main Content --- */}
      <main className="ml-72 flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <header className="bg-background/80 sticky top-0 z-20 flex h-20 items-center justify-between border-b px-8 backdrop-blur-md">
          <div>
            <h1 className="text-foreground text-2xl font-bold tracking-tight capitalize">
              {activeTab === 'questions' ? 'Question Bank' : activeTab}
            </h1>
            <p className="text-muted-foreground mt-0.5 text-xs font-medium">
              Welcome back, get up to speed.
            </p>
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
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground relative h-10 w-10 rounded-full p-0"
            >
              <Bell size={20} />
              <span className="bg-primary border-background absolute top-2 right-2 h-2 w-2 rounded-full border"></span>
            </Button>
          </div>
        </header>

        <div className="mx-auto w-full max-w-[1600px] space-y-8 p-8">
          {/* --- Analytics Tab --- */}
          {activeTab === 'analytics' && (
            <div className="animate-in fade-in space-y-8 duration-500">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
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
                  <CardContent className="pt-4">
                    <div className="flex h-[300px] w-full items-end justify-between gap-4 px-2">
                      {[45, 78, 55, 92, 68, 85, 50, 88, 98, 65, 76, 82].map(
                        (h, i) => (
                          <div
                            key={i}
                            className="bg-primary/10 group hover:bg-primary/80 relative w-full rounded-t-xl transition-all"
                            style={{ height: `${h}%` }}
                          >
                            <div className="bg-secondary text-secondary-foreground absolute -top-10 left-1/2 z-10 -translate-x-1/2 rounded px-2 py-1 text-xs font-bold whitespace-nowrap opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                              {h * 12} leads
                            </div>
                          </div>
                        )
                      )}
                    </div>
                    <div className="text-muted-foreground mt-4 flex justify-between px-2 text-xs font-medium tracking-wider uppercase">
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
                      color="bg-primary"
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
                    Manage the flow of your quiz
                  </p>
                </div>
                <Button
                  onClick={() => {
                    setIsAddingQuestion(true);
                    setEditingQuestion(null);
                    setNewQuestionType('single');
                    setNewQuestionText('');
                    setNewQuestionOptions('');
                  }}
                  className="shadow-primary/20 flex items-center gap-2 rounded-full px-6 font-bold shadow-lg"
                >
                  <Plus size={18} /> Add Question
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-5">
                {questions.map((q, idx) => (
                  <div
                    key={q.id}
                    className="hover:border-primary/20 group flex rounded-3xl border border-transparent bg-white p-1 shadow-sm transition-all"
                  >
                    {/* Numbering Column */}
                    <div className="bg-muted/50 flex w-16 flex-col items-center justify-center gap-2 rounded-l-[20px] rounded-r-lg">
                      <span className="text-muted-foreground/40 text-2xl font-black">
                        {idx + 1}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col justify-between gap-4 p-6 md:flex-row md:items-center">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <span
                            className={`rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase ${q.type === 'single' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}
                          >
                            {q.type} select
                          </span>
                          <h4 className="text-foreground text-lg font-bold">
                            {q.text}
                          </h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {q.options.map((opt, i) => (
                            <span
                              key={i}
                              className="bg-muted text-foreground/70 rounded-full px-3 py-1.5 text-xs font-medium"
                            >
                              {opt}
                            </span>
                          ))}
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
                          onClick={() => handleDeleteQuestion(q.id)}
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
              </div>
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
            <CardContent className="space-y-8 pt-6">
              <div className="space-y-3">
                <label className="text-muted-foreground pl-1 text-xs font-bold tracking-widest uppercase">
                  Question Text
                </label>
                <input
                  type="text"
                  value={newQuestionText}
                  onChange={(e) => setNewQuestionText(e.target.value)}
                  placeholder="e.g., What is your primary goal?"
                  className="bg-muted/50 focus:bg-background focus:border-primary/20 placeholder:text-muted-foreground/50 w-full rounded-xl border-2 border-transparent px-5 py-4 text-base font-medium transition-all outline-none"
                  autoFocus
                />
              </div>

              <div className="space-y-4">
                <label className="text-muted-foreground pl-1 text-xs font-bold tracking-widest uppercase">
                  Response Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {/* Single Choice Selection */}
                  <div
                    onClick={() => setNewQuestionType('single')}
                    className={`flex cursor-pointer items-center gap-3 rounded-2xl border-2 p-4 transition-all ${
                      newQuestionType === 'single'
                        ? 'border-primary bg-primary/5'
                        : 'bg-muted/50 hover:bg-muted border-transparent'
                    }`}
                  >
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${newQuestionType === 'single' ? 'border-primary' : 'border-muted-foreground/30'}`}
                    >
                      {newQuestionType === 'single' && (
                        <div className="bg-primary h-2.5 w-2.5 rounded-full" />
                      )}
                    </div>
                    <div>
                      <p
                        className={`text-sm font-bold ${newQuestionType === 'single' ? 'text-primary' : 'text-foreground'}`}
                      >
                        Single Choice
                      </p>
                      <p className="text-muted-foreground text-[10px]">
                        User selects one option
                      </p>
                    </div>
                    <Circle
                      size={16}
                      className={`ml-auto ${newQuestionType === 'single' ? 'text-primary' : 'text-muted-foreground/30'}`}
                    />
                  </div>

                  {/* Multiple Choice Selection */}
                  <div
                    onClick={() => setNewQuestionType('multiple')}
                    className={`flex cursor-pointer items-center gap-3 rounded-2xl border-2 p-4 transition-all ${
                      newQuestionType === 'multiple'
                        ? 'border-primary bg-primary/5'
                        : 'bg-muted/50 hover:bg-muted border-transparent'
                    }`}
                  >
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-md border-2 ${newQuestionType === 'multiple' ? 'border-primary' : 'border-muted-foreground/30'}`}
                    >
                      {newQuestionType === 'multiple' && (
                        <div className="bg-primary h-2.5 w-2.5 rounded-[2px]" />
                      )}
                    </div>
                    <div>
                      <p
                        className={`text-sm font-bold ${newQuestionType === 'multiple' ? 'text-primary' : 'text-foreground'}`}
                      >
                        Multiple Choice
                      </p>
                      <p className="text-muted-foreground text-[10px]">
                        User selects one or more
                      </p>
                    </div>
                    <CheckSquare
                      size={16}
                      className={`ml-auto ${newQuestionType === 'multiple' ? 'text-primary' : 'text-muted-foreground/30'}`}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-muted-foreground pl-1 text-xs font-bold tracking-widest uppercase">
                    Answer Options
                  </label>
                  <span className="text-primary bg-primary/10 rounded-full px-2 py-0.5 text-[10px] font-medium">
                    Comma Separated
                  </span>
                </div>
                <textarea
                  value={newQuestionOptions}
                  onChange={(e) => setNewQuestionOptions(e.target.value)}
                  placeholder="Option 1, Option 2, Option 3..."
                  className="bg-muted/50 focus:bg-background focus:border-primary/20 placeholder:text-muted-foreground/50 h-32 w-full resize-none rounded-xl border-2 border-transparent px-5 py-4 text-base font-medium transition-all outline-none"
                />
                <p className="text-muted-foreground pl-1 text-[11px]">
                  Tip: Enter options separated by commas. For example: "Yes, No,
                  Maybe"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <Button
                  onClick={closeModal}
                  size="lg"
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground rounded-xl font-bold"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveQuestion}
                  size="lg"
                  className="shadow-primary/20 flex-1 rounded-xl font-bold shadow-lg"
                >
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
    className={`group mx-2 flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 transition-all ${
      active
        ? 'bg-primary shadow-primary/25 text-white shadow-lg'
        : 'text-white/60 hover:bg-white/10 hover:text-white'
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
        className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-bold ${active ? 'text-primary bg-white' : 'bg-white/10 text-white'}`}
      >
        {badge}
      </span>
    )}
  </div>
);

const SidebarHeader = ({ title }: { title: string }) => (
  <div className="mt-4 mb-2 px-6 py-2">
    <h3 className="text-[10px] font-black tracking-widest text-white/30 uppercase">
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
    <CardContent className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-muted-foreground mb-1 text-xs font-bold tracking-wider uppercase">
            {label}
          </p>
          <h2 className="text-foreground text-3xl font-black tracking-tight">
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
